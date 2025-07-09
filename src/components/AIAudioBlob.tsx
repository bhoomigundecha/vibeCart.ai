import { useState, useEffect } from "react";
import { Mic, MicOff, AudioLines } from "lucide-react";

export type AudioBlobState = "speaking" | "listening" | "inactive";

interface AIAudioBlobProps {
  state?: AudioBlobState;
  onStateChange?: (state: AudioBlobState) => void;
  onTap?: () => void;
}

export function AIAudioBlob({ 
  state = "inactive", 
  onStateChange, 
  onTap 
}: AIAudioBlobProps) {
  const [currentState, setCurrentState] = useState<AudioBlobState>(state);
  const [inactiveTimer, setInactiveTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentState(state);
  }, [state]);

  // Auto-switch to inactive after 5 seconds of listening
  useEffect(() => {
    if (currentState === "listening") {
      const timer = setTimeout(() => {
        setCurrentState("inactive");
        onStateChange?.("inactive");
      }, 5000);
      setInactiveTimer(timer);
      return () => clearTimeout(timer);
    } else if (inactiveTimer) {
      clearTimeout(inactiveTimer);
      setInactiveTimer(null);
    }
  }, [currentState, onStateChange]);

  const handleBlobClick = () => {
    onTap?.();
    
    if (currentState === "inactive") {
      setCurrentState("listening");
      onStateChange?.("listening");
    } else if (currentState === "listening") {
      setCurrentState("inactive");
      onStateChange?.("inactive");
    }
    // Speaking state should not be manually changed by tap
  };

  const getBlobClasses = () => {
    const baseClasses = "w-48 h-48 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300";
    
    switch (currentState) {
      case "speaking":
        return `${baseClasses} bg-gradient-speaking animate-blob-speaking shadow-blob-active`;
      case "listening":
        return `${baseClasses} bg-gradient-listening animate-blob-listening shadow-blob-listening`;
      case "inactive":
        return `${baseClasses} bg-gradient-inactive animate-blob-pulse`;
      default:
        return `${baseClasses} bg-gradient-inactive`;
    }
  };

  const getIcon = () => {
    switch (currentState) {
      case "speaking":
        return <AudioLines className="w-12 h-12 text-background" />;
      case "listening":
        return <Mic className="w-12 h-12 text-background" />;
      case "inactive":
        return <MicOff className="w-12 h-12 text-muted-foreground" />;
      default:
        return <MicOff className="w-12 h-12 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={getBlobClasses()}
        onClick={handleBlobClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleBlobClick();
          }
        }}
        aria-label={`AI Assistant - ${currentState}`}
      >
        {getIcon()}
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground capitalize">
          {currentState === "speaking" ? "AI Speaking..." : 
           currentState === "listening" ? "Listening..." : 
           "Tap to speak"}
        </p>
      </div>
    </div>
  );
}