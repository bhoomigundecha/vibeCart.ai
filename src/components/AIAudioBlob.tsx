import { useState } from "react";
import { Mic, MicOff, AudioLines } from "lucide-react";
export type AudioBlobState = "speaking" | "listening" | "inactive";

interface AIAudioBlobProps {
  state?: AudioBlobState;
  onStateChange?: (state: AudioBlobState) => void;
  onTap?: () => void;
  addShoppingItems?: (items: string[]) => void;
}

const chatHistory: { role: "system" | "assistant" | "user" | "tools"; content: string }[] = [];


export function AIAudioBlob({
  state = "inactive",
  onStateChange,
  onTap,
  addShoppingItems
}: AIAudioBlobProps) {
  const [currentState, setCurrentState] = useState<AudioBlobState>(state);

  const handleBlobClick = () => {
    onTap?.();

    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      console.error("SpeechRecognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setCurrentState("listening");
    onStateChange?.("listening");

    recognition.start();

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      console.log("Heard:", transcript);

      chatHistory.push({ role: "user", content: transcript });

      setCurrentState("speaking");
      onStateChange?.("speaking");

      try {
        const response = await fetch("https://top-live-tadpole.ngrok-free.app/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: chatHistory })
        });

        const data = await response.json();
        console.log("Full API Response:", data);

        const toolMessage = [...data.response].reverse().find((message: any) => message.role === "tool");

        if (toolMessage) {
          try {
            const toolData = JSON.parse(toolMessage.content);
            const inner = typeof toolData.data === "string" ? JSON.parse(toolData.data) : toolData.data;
            const items = inner?.shopping_list;

            if (Array.isArray(items)) {
              console.log(items)
              console.log("Adding to shopping list:", items);
              addShoppingItems?.(items);
            }
          } catch (err) {
            console.error("Error parsing tool content:", err);
          }
        }


        const last = data.response.find((m: any) => m.role === "assistant" && m.content);
        const aiResponse = last?.content || "";
        console.log("AI:", aiResponse);
        chatHistory.push({ role: "assistant", content: aiResponse });

        if (aiResponse) {
            const ttsResponse = await fetch("https://top-live-tadpole.ngrok-free.app/tts", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ text: aiResponse }),
            });

            if (!ttsResponse.ok) throw new Error("TTS request failed");

            const audioBlob = await ttsResponse.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            const audio = new Audio(audioUrl);
            audio.play();
          }

      } catch (err) {
        console.error("API Error:", err);
      }

      setTimeout(() => {
        setCurrentState("inactive");
        onStateChange?.("inactive");
      }, 1000);
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e);
      setCurrentState("inactive");
      onStateChange?.("inactive");
    };
  };

  const getBlobClasses = () => {
    const base = "w-48 h-48 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300";
    if (currentState === "speaking") return `${base} bg-gradient-speaking animate-blob-speaking shadow-blob-active`;
    if (currentState === "listening") return `${base} bg-gradient-listening animate-blob-listening shadow-blob-listening`;
    return `${base} bg-gradient-inactive animate-blob-pulse`;
  };

  const getIcon = () => {
    if (currentState === "speaking") return <AudioLines className="w-12 h-12 text-background" />;
    if (currentState === "listening") return <Mic className="w-12 h-12 text-background" />;
    return <MicOff className="w-12 h-12 text-muted-foreground" />;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={getBlobClasses()}
        onClick={handleBlobClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleBlobClick();
        }}
        aria-label={`AI Assistant - ${currentState}`}
      >
        {getIcon()}
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground capitalize">
          {currentState === "speaking"
            ? "AI Speaking..."
            : currentState === "listening"
            ? "Listening..."
            : "Tap to speak"}
        </p>
      </div>
    </div>
  );
}
