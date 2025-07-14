// src/hooks/useVoiceChat.ts
import { useState } from "react";

export type AudioBlobState = "speaking" | "listening" | "inactive";

export function useVoiceChat() {
  const [state, setState] = useState<AudioBlobState>("inactive");

  const startVoiceChat = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      setState("listening");

      mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        setState("speaking");

        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const audioFile = new File([audioBlob], "speech.webm", { type: "audio/webm" });

        const formData = new FormData();
        formData.append("file", audioFile);
        formData.append("model", "whisper-1");

        try {
          const whisperRes = await fetch("https://api.openai.com/v1/audio/transcriptions", {
            method: "POST",
            headers: {
              Authorization: `Bearer YOUR_OPENAI_API_KEY`,
            },
            body: formData,
          });

          const whisperData = await whisperRes.json();
          const transcript = whisperData.text;

          const chatRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer YOUR_OPENAI_API_KEY`,
            },
            body: JSON.stringify({
              model: "gpt-4",
              messages: [
                { role: "system", content: "You are a helpful voice assistant." },
                { role: "user", content: transcript },
              ],
            }),
          });

          const chatData = await chatRes.json();
          const reply = chatData.choices[0].message.content;

          const utterance = new SpeechSynthesisUtterance(reply);
          utterance.onend = () => setState("inactive");
          window.speechSynthesis.speak(utterance);
        } catch (err) {
          console.error("Whisper/GPT error:", err);
          setState("inactive");
        }
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 5000);
    } catch (err) {
      console.error("Microphone access denied or error:", err);
      setState("inactive");
    }
  };

  return { state, startVoiceChat };
}
