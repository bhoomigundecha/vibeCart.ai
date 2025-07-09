import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowUp } from "lucide-react";
import { useState } from "react";

interface MapPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MapPopup({ open, onOpenChange }: MapPopupProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Daily");

  const categories = [
    { name: "Beverages", position: "left" },
    { name: "Canned Good", position: "right" },
    { name: "Frozen Foods", position: "left" },
    { name: "Daily", position: "right", active: true },
    { name: "Snacks", position: "left" },
    { name: "Beverages", position: "bottom" },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" className="h-[80vh] bg-background">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground"
              onClick={() => onOpenChange(false)}
            >
              <MapPin className="w-5 h-5" />
            </Button>
            <SheetTitle className="text-xl font-semibold text-yellow-400">Fresh Produce</SheetTitle>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </SheetHeader>

        <div className="flex-1 mt-8 space-y-6">
          {/* Category Grid */}
          <div className="grid grid-cols-2 gap-4">
            {categories.slice(0, 4).map((category) => (
              <Button
                key={category.name}
                variant={category.active ? "default" : "secondary"}
                className={`h-16 text-base font-medium ${
                  category.active 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {categories.slice(4).map((category) => (
              <Button
                key={`${category.name}-2`}
                variant="secondary"
                className="h-16 text-base font-medium bg-muted text-muted-foreground hover:bg-muted/80"
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Navigation Area */}
          <div className="relative h-32 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="absolute bottom-4 right-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                </div>
                <ArrowUp className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium text-foreground mt-1">{selectedCategory}</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}