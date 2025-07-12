
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
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Store sections optimized for mobile layout with clear spacing
  const storeSections = [
    // Top row - Service areas
    { name: "Entrance", x: 20, y: 20, width: 60, height: 30, color: "hsl(var(--primary))", category: "entrance" },
    { name: "Pharmacy", x: 100, y: 20, width: 70, height: 30, color: "hsl(var(--secondary))", category: "service" },
    { name: "Customer Service", x: 190, y: 20, width: 80, height: 30, color: "hsl(var(--secondary))", category: "service" },
    { name: "Restrooms", x: 290, y: 20, width: 60, height: 30, color: "hsl(var(--muted))", category: "service" },
    
    // Second row - Health & Wellness
    { name: "Health & Wellness", x: 20, y: 70, width: 80, height: 30, color: "hsl(var(--card))", category: "health" },
    { name: "Bath & Body", x: 120, y: 70, width: 70, height: 30, color: "hsl(var(--card))", category: "health" },
    { name: "Home & Garden", x: 210, y: 70, width: 80, height: 30, color: "hsl(var(--primary))", category: "home" },
    { name: "Electronics", x: 310, y: 70, width: 70, height: 30, color: "hsl(var(--accent))", category: "electronics" },
    
    // Third row - Women's section
    { name: "Women Accessories", x: 20, y: 120, width: 90, height: 30, color: "#16a34a", category: "clothing" },
    { name: "Women Shoes", x: 130, y: 120, width: 70, height: 30, color: "#16a34a", category: "clothing" },
    { name: "Women Perfume", x: 220, y: 120, width: 80, height: 30, color: "#16a34a", category: "clothing" },
    { name: "Seasonal", x: 320, y: 120, width: 60, height: 30, color: "#dc2626", category: "seasonal" },
    
    // Fourth row - Clothing & Toys
    { name: "Girls Clothing", x: 20, y: 170, width: 80, height: 30, color: "#dc2626", category: "clothing" },
    { name: "Boys Clothing", x: 120, y: 170, width: 80, height: 30, color: "#dc2626", category: "clothing" },
    { name: "Crafts", x: 220, y: 170, width: 60, height: 30, color: "#dc2626", category: "crafts" },
    { name: "Toys", x: 300, y: 170, width: 60, height: 30, color: "hsl(var(--accent))", category: "toys" },
    
    // Fifth row - Checkout areas
    { name: "Self Checkout", x: 20, y: 220, width: 80, height: 30, color: "hsl(var(--muted))", category: "checkout" },
    { name: "Self Checkout", x: 120, y: 220, width: 80, height: 30, color: "hsl(var(--muted))", category: "checkout" },
    { name: "Books & Media", x: 220, y: 220, width: 80, height: 30, color: "#1e40af", category: "media" },
    { name: "Pet Supplies", x: 320, y: 220, width: 70, height: 30, color: "#16a34a", category: "pets" },
    
    // Sixth row - Food & Beverages
    { name: "Beverages", x: 20, y: 270, width: 70, height: 30, color: "#7c3aed", category: "food" },
    { name: "Snacks", x: 110, y: 270, width: 60, height: 30, color: "#7c3aed", category: "food" },
    { name: "Candy", x: 190, y: 270, width: 60, height: 30, color: "#7c3aed", category: "food" },
    { name: "Frozen Foods", x: 270, y: 270, width: 80, height: 30, color: "#1e40af", category: "food" },
    
    // Seventh row - Fresh Foods
    { name: "Dairy", x: 20, y: 320, width: 60, height: 30, color: "#16a34a", category: "food" },
    { name: "Grocery", x: 100, y: 320, width: 70, height: 30, color: "#16a34a", category: "food" },
    { name: "Bakery", x: 190, y: 320, width: 60, height: 30, color: "#a16207", category: "food" },
    { name: "Meat & Seafood", x: 270, y: 320, width: 90, height: 30, color: "#dc2626", category: "food" },
    
    // Bottom row - Produce & Services
    { name: "Produce", x: 20, y: 370, width: 70, height: 30, color: "hsl(var(--accent))", category: "food", isDestination: true },
    { name: "Deli", x: 110, y: 370, width: 50, height: 30, color: "#a16207", category: "food" },
    { name: "Floral", x: 180, y: 370, width: 60, height: 30, color: "#ec4899", category: "floral" },
    { name: "Exit", x: 260, y: 370, width: 50, height: 30, color: "hsl(var(--primary))", category: "exit" },
  ];

  // Simple path calculation for mobile display
  const pathPoints = [
    { x: 50, y: 35 }, // Start at entrance
    { x: 50, y: 100 },
    { x: 200, y: 100 },
    { x: 200, y: 200 },
    { x: 100, y: 200 },
    { x: 100, y: 300 },
    { x: 55, y: 300 },
    { x: 55, y: 385 }, // End at produce
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" className="h-[95vh] bg-background">
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

        {/* Store Map - Optimized for mobile with proper spacing */}
        <div className="relative bg-muted/20 rounded-lg h-[450px] overflow-hidden border border-border mb-4">
          <svg 
            viewBox="0 0 400 420" 
            className="w-full h-full"
            style={{ background: 'hsl(var(--card))' }}
          >
            {/* Store boundary */}
            <rect
              x="10"
              y="10"
              width="380"
              height="400"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              rx="8"
            />

            {/* Store sections with proper spacing */}
            {storeSections.map((section, index) => (
              <g key={`${section.name}-${index}`}>
                <rect
                  x={section.x}
                  y={section.y}
                  width={section.width}
                  height={section.height}
                  fill={section.color}
                  stroke={hoveredSection === `${section.name}-${index}` ? "hsl(var(--accent))" : "hsl(var(--border))"}
                  strokeWidth={hoveredSection === `${section.name}-${index}` ? "2" : "1"}
                  rx="4"
                  className={`cursor-pointer transition-all ${section.isDestination ? 'animate-pulse' : ''}`}
                  style={{ opacity: hoveredSection === `${section.name}-${index}` ? 0.9 : 0.8 }}
                  onClick={() => setSelectedCategory(section.name)}
                  onMouseEnter={() => setHoveredSection(`${section.name}-${index}`)}
                  onMouseLeave={() => setHoveredSection(null)}
                />
                
                {/* Section label */}
                <text
                  x={section.x + section.width / 2}
                  y={section.y + section.height / 2 + 2}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="600"
                  className="pointer-events-none"
                >
                  {section.name}
                </text>
                
                {/* Highlight destination */}
                {section.isDestination && (
                  <rect
                    x={section.x - 2}
                    y={section.y - 2}
                    width={section.width + 4}
                    height={section.height + 4}
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="2"
                    rx="6"
                    className="animate-pulse"
                  />
                )}
              </g>
            ))}

            {/* Navigation Path */}
            <path
              d={`M ${pathPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
              stroke="hsl(var(--accent))"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8,4"
              className="animate-pulse"
            />
            
            {/* Start point */}
            <circle 
              cx={pathPoints[0].x} 
              cy={pathPoints[0].y} 
              r="6" 
              fill="hsl(var(--primary))" 
              stroke="white"
              strokeWidth="2"
              className="animate-pulse"
            />
            
            {/* End point */}
            <circle 
              cx={pathPoints[pathPoints.length - 1].x} 
              cy={pathPoints[pathPoints.length - 1].y} 
              r="8" 
              fill="hsl(var(--accent))" 
              stroke="white"
              strokeWidth="2"
              className="animate-pulse"
            />

            {/* Direction arrows */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="hsl(var(--accent))"
                />
              </marker>
            </defs>
            
            {pathPoints.slice(0, -1).map((point, index) => {
              const nextPoint = pathPoints[index + 1];
              const midX = (point.x + nextPoint.x) / 2;
              const midY = (point.y + nextPoint.y) / 2;
              
              return (
                <line
                  key={`arrow-${index}`}
                  x1={midX - 5}
                  y1={midY - 5}
                  x2={midX + 5}
                  y2={midY + 5}
                  stroke="hsl(var(--accent))"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
          </svg>
        </div>

        {/* Section Info */}
        {hoveredSection && (
          <div className="mb-4 p-3 bg-muted/30 rounded-lg">
            <div className="text-sm text-foreground">
              <span className="font-medium">Section: </span>
              {storeSections.find((s, i) => `${s.name}-${i}` === hoveredSection)?.name}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Tap to set as destination
            </div>
          </div>
        )}

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
