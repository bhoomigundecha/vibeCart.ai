import { List, ShoppingCart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CameraInput } from "@/components/CameraInput";

interface MobileNavbarProps {
  onShoppingListClick: () => void;
  onCartClick: () => void;
  onMapClick: () => void;
  onImageCapture?: (file: File) => void;
}

export function MobileNavbar({ 
  onShoppingListClick, 
  onCartClick, 
  onMapClick, 
  onImageCapture 
}: MobileNavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="flex justify-around items-center h-16 px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onShoppingListClick}
          className="w-12 h-12 rounded-full hover:bg-secondary"
        >
          <List className="w-6 h-6 text-foreground" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onCartClick}
          className="w-12 h-12 rounded-full hover:bg-secondary"
        >
          <ShoppingCart className="w-6 h-6 text-foreground" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onMapClick}
          className="w-12 h-12 rounded-full hover:bg-secondary"
        >
          <MapPin className="w-6 h-6 text-foreground" />
        </Button>
        
        <CameraInput onImageCapture={onImageCapture} />
      </div>
    </nav>
  );
}