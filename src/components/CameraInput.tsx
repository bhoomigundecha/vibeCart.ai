import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CameraInputProps {
  onImageCapture?: (file: File) => void;
}

export function CameraInput({ onImageCapture }: CameraInputProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageCapture?.(file);
      toast({
        title: "Image Captured",
        description: `${file.name} has been selected`,
      });
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCameraClick}
        className="w-12 h-12 rounded-full hover:bg-secondary"
      >
        <Camera className="w-6 h-6 text-foreground" />
      </Button>
    </>
  );
}