
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

  // Store sections with better distributed positions
  const storeSections = [
    // Top row - entrance, pharmacy, customer service, restrooms
    { name: "Entrance", color: "bg-blue-600", position: "top-4 left-4", size: "w-16 h-10" },
    { name: "Pharmacy", color: "bg-orange-600", position: "top-4 left-24", size: "w-20 h-10" },
    { name: "Customer Service", color: "bg-orange-600", position: "top-4 left-48", size: "w-24 h-10" },
    { name: "Restrooms", color: "bg-gray-600", position: "top-4 right-4", size: "w-18 h-10" },
    
    // Second row
    { name: "Health & Wellness", color: "bg-gray-700", position: "top-20 left-4", size: "w-22 h-12" },
    { name: "Bath & Body", color: "bg-gray-700", position: "top-20 left-28", size: "w-20 h-12" },
    { name: "Home & Garden", color: "bg-primary", position: "top-20 left-52", size: "w-22 h-12" },
    { name: "Electronics", color: "bg-purple-600", position: "top-20 right-4", size: "w-20 h-12" },
    
    // Third row - Women's section
    { name: "Women Accessories", color: "bg-green-600", position: "top-36 left-4", size: "w-24 h-10" },
    { name: "Women Shoes", color: "bg-green-600", position: "top-36 left-32", size: "w-20 h-10" },
    { name: "Women Perfume", color: "bg-green-600", position: "top-36 left-56", size: "w-22 h-10" },
    { name: "Seasonal", color: "bg-red-600", position: "top-36 right-4", size: "w-18 h-10" },
    
    // Fourth row - Clothing sections
    { name: "Girls Clothing", color: "bg-red-600", position: "top-52 left-4", size: "w-20 h-10" },
    { name: "Boys Clothing", color: "bg-red-600", position: "top-52 left-28", size: "w-20 h-10" },
    { name: "Crafts", color: "bg-red-600", position: "top-52 left-52", size: "w-16 h-10" },
    { name: "Toys", color: "bg-purple-600", position: "top-52 right-4", size: "w-16 h-10" },
    
    // Fifth row - Self checkout and more
    { name: "Self Checkout", color: "bg-gray-600", position: "top-68 left-4", size: "w-22 h-10" },
    { name: "Self Checkout", color: "bg-gray-600", position: "top-68 left-30", size: "w-22 h-10" },
    { name: "Books & Media", color: "bg-blue-700", position: "top-68 left-56", size: "w-20 h-10" },
    { name: "Pet Supplies", color: "bg-green-700", position: "top-68 right-4", size: "w-20 h-10" },
    
    // Bottom rows - Food sections
    { name: "Beverages", color: "bg-purple-600", position: "bottom-32 left-4", size: "w-18 h-10" },
    { name: "Snacks", color: "bg-purple-600", position: "bottom-32 left-26", size: "w-16 h-10" },
    { name: "Candy", color: "bg-purple-600", position: "bottom-32 left-46", size: "w-16 h-10" },
    { name: "Frozen Foods", color: "bg-blue-700", position: "bottom-32 right-4", size: "w-20 h-10" },
    
    { name: "Dairy", color: "bg-green-600", position: "bottom-18 left-4", size: "w-16 h-10" },
    { name: "Grocery", color: "bg-green-600", position: "bottom-18 left-24", size: "w-16 h-10" },
    { name: "Bakery", color: "bg-orange-600", position: "bottom-18 left-44", size: "w-16 h-10" },
    { name: "Meat & Seafood", color: "bg-red-600", position: "bottom-18 right-4", size: "w-22 h-10" },
    
    // Bottom row with highlighted produce
    { name: "Produce", color: "bg-accent", position: "bottom-4 left-4", size: "w-18 h-10", isDestination: true },
    { name: "Deli", color: "bg-orange-600", position: "bottom-4 left-26", size: "w-14 h-10" },
    { name: "Floral", color: "bg-pink-600", position: "bottom-4 left-44", size: "w-16 h-10" },
    { name: "Exit", color: "bg-blue-600", position: "bottom-4 right-4", size: "w-14 h-10" },
  ];

  const pathPoints = [
    { x: 12, y: 95 }, // Start at entrance
    { x: 12, y: 85 },
    { x: 12, y: 75 },
    { x: 12, y: 65 },
    { x: 12, y: 55 },
    { x: 12, y: 45 },
    { x: 12, y: 35 },
    { x: 12, y: 25 },
    { x: 12, y: 15 }, // End at produce
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" className="h-[90vh] bg-background">
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

        {/* Store Map - Made larger and more spaced */}
        <div className="relative bg-muted/20 rounded-lg h-[500px] overflow-hidden border border-border mb-4">
          {/* Store sections */}
          {storeSections.map((section, index) => (
            <div
              key={`${section.name}-${index}`}
              className={`absolute ${section.position} ${section.size} ${section.color} rounded flex items-center justify-center cursor-pointer transition-all hover:opacity-80 hover:scale-105 ${
                section.isDestination ? 'ring-2 ring-accent shadow-lg animate-pulse' : ''
              }`}
              onClick={() => setSelectedCategory(section.name)}
            >
              <span className="text-xs font-medium text-white text-center px-1 leading-tight">
                {section.name}
              </span>
            </div>
          ))}

          {/* Navigation Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d={`M ${pathPoints.map(p => `${p.x * 4} ${p.y * 4}`).join(' L ')}`}
              stroke="hsl(var(--accent))"
              strokeWidth="4"
              fill="none"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
            {/* Start point */}
            <circle 
              cx={pathPoints[0].x * 4} 
              cy={pathPoints[0].y * 4} 
              r="8" 
              fill="hsl(var(--primary))" 
              className="animate-pulse"
            />
            {/* End point */}
            <circle 
              cx={pathPoints[pathPoints.length - 1].x * 4} 
              cy={pathPoints[pathPoints.length - 1].y * 4} 
              r="10" 
              fill="hsl(var(--accent))" 
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
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
