
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { useState } from "react";

interface MapPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MapPopup({ open, onOpenChange }: MapPopupProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Produce");

  // Store sections with colors and positions
  const storeSections = [
    { name: "Entrance", color: "bg-blue-600", position: "top-4 left-4", size: "w-20 h-12" },
    { name: "Exit", color: "bg-blue-600", position: "bottom-4 left-4", size: "w-20 h-12" },
    { name: "Pharmacy", color: "bg-orange-600", position: "top-4 left-28", size: "w-32 h-12" },
    { name: "Customer Service", color: "bg-orange-600", position: "top-4 left-64", size: "w-32 h-12" },
    { name: "Restrooms", color: "bg-gray-600", position: "top-4 right-4", size: "w-24 h-12" },
    
    // Middle sections
    { name: "Health & Wellness", color: "bg-gray-700", position: "top-20 left-28", size: "w-28 h-16" },
    { name: "Bath & Body", color: "bg-gray-700", position: "top-20 left-60", size: "w-28 h-16" },
    { name: "Home & Garden", color: "bg-primary", position: "top-20 right-32", size: "w-28 h-16" },
    { name: "Electronics", color: "bg-purple-600", position: "top-20 right-4", size: "w-24 h-16" },
    
    // Women's section
    { name: "Women Accessories", color: "bg-green-600", position: "top-40 left-28", size: "w-32 h-12" },
    { name: "Women Shoes", color: "bg-green-600", position: "top-56 left-28", size: "w-32 h-12" },
    { name: "Women Perfume", color: "bg-green-600", position: "top-72 left-28", size: "w-32 h-12" },
    
    // Clothing sections
    { name: "Girls Clothing", color: "bg-red-600", position: "top-40 left-64", size: "w-28 h-12" },
    { name: "Seasonal", color: "bg-red-600", position: "top-40 right-16", size: "w-28 h-12" },
    { name: "Boys Clothing", color: "bg-red-600", position: "top-56 left-64", size: "w-28 h-12" },
    { name: "Crafts", color: "bg-red-600", position: "top-56 right-16", size: "w-28 h-12" },
    
    // Right side sections
    { name: "Electronics", color: "bg-purple-600", position: "top-40 right-4", size: "w-24 h-12" },
    { name: "Electronics", color: "bg-purple-600", position: "top-72 right-4", size: "w-24 h-12" },
    
    // Self checkout areas
    { name: "Self Checkout", color: "bg-gray-600", position: "top-88 left-4", size: "w-28 h-12" },
    { name: "Self Checkout", color: "bg-gray-600", position: "top-72 left-64", size: "w-28 h-12" },
    
    // Bottom sections - Food areas
    { name: "Beverages", color: "bg-purple-600", position: "bottom-20 left-32", size: "w-24 h-12" },
    { name: "Snacks", color: "bg-purple-600", position: "bottom-20 left-60", size: "w-20 h-12" },
    { name: "Snacks", color: "bg-purple-600", position: "bottom-20 left-84", size: "w-20 h-12" },
    { name: "Frozen Foods", color: "bg-blue-700", position: "bottom-20 right-4", size: "w-28 h-12" },
    
    // Main produce section (highlighted as destination)
    { name: "Produce", color: "bg-accent", position: "bottom-4 left-32", size: "w-24 h-12", isDestination: true },
    { name: "Dairy", color: "bg-green-600", position: "bottom-20 right-32", size: "w-20 h-12" },
    { name: "Dairy", color: "bg-green-600", position: "bottom-4 right-4", size: "w-20 h-12" },
    
    // Bottom row
    { name: "Grocery", color: "bg-green-600", position: "bottom-4 left-60", size: "w-20 h-12" },
    { name: "Bakery", color: "bg-orange-600", position: "bottom-4 left-84", size: "w-20 h-12" },
    { name: "Meat & Seafood", color: "bg-red-600", position: "bottom-4 left-108", size: "w-28 h-12" },
    { name: "Meat & Seafood", color: "bg-red-600", position: "bottom-4 left-140", size: "w-28 h-12" },
  ];

  const pathPoints = [
    { x: 14, y: 95 }, // Start at entrance
    { x: 14, y: 85 },
    { x: 40, y: 85 },
    { x: 40, y: 95 }, // End at produce
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" className="h-[85vh] bg-background">
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
            <SheetTitle className="text-xl font-semibold text-accent">Store Map</SheetTitle>
            <div className="w-10" />
          </div>
        </SheetHeader>

        {/* Navigation Info */}
        <div className="mb-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-foreground">Start: Entrance</span>
          </div>
          <div className="flex items-center gap-2 text-sm mt-1">
            <Navigation className="w-4 h-4 text-accent" />
            <span className="text-foreground">End: {selectedCategory}</span>
          </div>
        </div>

        {/* Store Map */}
        <div className="relative bg-muted/20 rounded-lg h-96 overflow-hidden border border-border">
          {/* Store sections */}
          {storeSections.map((section, index) => (
            <div
              key={`${section.name}-${index}`}
              className={`absolute ${section.position} ${section.size} ${section.color} rounded flex items-center justify-center cursor-pointer transition-all hover:opacity-80 ${
                section.isDestination ? 'ring-2 ring-accent shadow-lg' : ''
              }`}
              onClick={() => setSelectedCategory(section.name)}
            >
              <span className="text-xs font-medium text-white text-center px-1">
                {section.name}
              </span>
            </div>
          ))}

          {/* Navigation Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d={`M ${pathPoints.map(p => `${p.x * 4} ${p.y * 4}`).join(' L ')}`}
              stroke="hsl(var(--accent))"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8,4"
              className="animate-pulse"
            />
            {/* Start point */}
            <circle 
              cx={pathPoints[0].x * 4} 
              cy={pathPoints[0].y * 4} 
              r="6" 
              fill="hsl(var(--primary))" 
              className="animate-pulse"
            />
            {/* End point */}
            <circle 
              cx={pathPoints[pathPoints.length - 1].x * 4} 
              cy={pathPoints[pathPoints.length - 1].y * 4} 
              r="8" 
              fill="hsl(var(--accent))" 
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => setSelectedCategory("Produce")}
          >
            Reset Path
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
          >
            Get Directions
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
          >
            Share Location
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
