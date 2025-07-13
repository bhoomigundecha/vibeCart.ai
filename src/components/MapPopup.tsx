
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { useState, useEffect } from "react";

interface MapPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MapPopup({ open, onOpenChange }: MapPopupProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [startPoint, setStartPoint] = useState<any>(null);
  const [endPoint, setEndPoint] = useState<any>(null);
  const [isSelectingStart, setIsSelectingStart] = useState(false);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);
  const [path, setPath] = useState<{x: number, y: number}[]>([]);

  // Store sections based on reference layout
  const storeSections = [
    // Top row
    { id: "auto", name: "Auto", x: 20, y: 30, width: 50, height: 40, color: "hsl(var(--muted))" },
    { id: "paint", name: "Paint", x: 80, y: 30, width: 40, height: 40, color: "hsl(var(--muted))" },
    { id: "hardware", name: "Hardware", x: 130, y: 30, width: 50, height: 40, color: "hsl(var(--muted))" },
    { id: "homeoffice", name: "Home Office", x: 190, y: 30, width: 60, height: 40, color: "hsl(var(--muted))" },
    { id: "electronics", name: "Electronics", x: 260, y: 30, width: 80, height: 40, color: "hsl(var(--muted))" },
    { id: "pet", name: "Pet", x: 350, y: 30, width: 40, height: 40, color: "hsl(var(--muted))" },
    { id: "cleaning", name: "Cleaning", x: 400, y: 30, width: 50, height: 40, color: "hsl(var(--muted))" },
    { id: "household", name: "Household Paper", x: 460, y: 30, width: 60, height: 40, color: "hsl(var(--muted))" },
    { id: "dairy", name: "Dairy", x: 530, y: 30, width: 50, height: 60, color: "hsl(var(--muted))" },
    
    // Second row
    { id: "sporting", name: "Sporting Goods", x: 20, y: 90, width: 60, height: 50, color: "hsl(var(--muted))" },
    { id: "furniture", name: "Furniture", x: 130, y: 90, width: 70, height: 50, color: "hsl(var(--muted))" },
    { id: "girls", name: "Girls", x: 260, y: 90, width: 40, height: 50, color: "hsl(var(--muted))" },
    { id: "baby", name: "Baby", x: 310, y: 90, width: 50, height: 50, color: "hsl(var(--muted))" },
    { id: "beverages", name: "Adult Beverages", x: 400, y: 90, width: 70, height: 50, color: "hsl(var(--muted))" },
    { id: "snacks", name: "Snacks", x: 480, y: 90, width: 50, height: 50, color: "hsl(var(--muted))" },
    { id: "deli", name: "Deli", x: 540, y: 90, width: 40, height: 50, color: "hsl(var(--muted))" },
    
    // Third row
    { id: "toys", name: "Toys", x: 20, y: 160, width: 50, height: 60, color: "hsl(var(--muted))" },
    { id: "crafts", name: "Crafts", x: 130, y: 160, width: 40, height: 40, color: "hsl(var(--muted))" },
    { id: "boys", name: "Boys", x: 180, y: 160, width: 40, height: 40, color: "hsl(var(--muted))" },
    { id: "mens", name: "Mens", x: 230, y: 160, width: 50, height: 40, color: "hsl(var(--muted))" },
    { id: "grocery", name: "Grocery", x: 400, y: 160, width: 50, height: 40, color: "hsl(var(--muted))" },
    { id: "meat", name: "Meat", x: 460, y: 160, width: 40, height: 40, color: "hsl(var(--muted))" },
    
    // Fourth row
    { id: "garden", name: "Garden", x: 20, y: 240, width: 50, height: 60, color: "hsl(var(--muted))" },
    { id: "home", name: "Home", x: 130, y: 220, width: 50, height: 50, color: "hsl(var(--muted))" },
    { id: "celebrate", name: "Celebrate", x: 130, y: 280, width: 50, height: 40, color: "hsl(var(--muted))" },
    { id: "shoes", name: "Shoes", x: 190, y: 220, width: 50, height: 40, color: "hsl(var(--muted))" },
    { id: "sleepwear", name: "Sleepwear & Panties", x: 250, y: 220, width: 80, height: 40, color: "hsl(var(--muted))" },
    { id: "frozen", name: "Frozen", x: 400, y: 220, width: 50, height: 40, color: "hsl(var(--muted))" },
    { id: "bakery", name: "Bakery", x: 460, y: 220, width: 50, height: 40, color: "hsl(var(--muted))" },
    
    // Fifth row
    { id: "seasonal", name: "Seasonal", x: 130, y: 340, width: 50, height: 40, color: "hsl(var(--accent))" },
    { id: "jewelry", name: "Jewelry & Accessories", x: 190, y: 280, width: 80, height: 40, color: "hsl(var(--muted))" },
    { id: "ladies", name: "Ladies'", x: 280, y: 280, width: 50, height: 40, color: "hsl(var(--muted))" },
    { id: "produce", name: "Fresh Produce", x: 400, y: 280, width: 80, height: 60, color: "hsl(var(--muted))" },
    { id: "deli2", name: "Deli", x: 490, y: 350, width: 40, height: 30, color: "hsl(var(--muted))" },
    
    // Bottom row
    { id: "health", name: "Health & Wellness", x: 90, y: 400, width: 70, height: 40, color: "hsl(var(--muted))" },
    { id: "health2", name: "Health", x: 170, y: 400, width: 50, height: 40, color: "hsl(var(--muted))" },
    { id: "checkout", name: "Checkout", x: 250, y: 380, width: 100, height: 60, color: "hsl(var(--primary))" },
  ];

  // Calculate simple path between two points
  const calculatePath = (start: any, end: any) => {
    if (!start || !end) return [];

    const startCenter = {
      x: start.x + start.width / 2,
      y: start.y + start.height / 2
    };
    
    const endCenter = {
      x: end.x + end.width / 2,
      y: end.y + end.height / 2
    };

    // Create L-shaped path through walkable areas
    const midX = startCenter.x + (endCenter.x - startCenter.x) * 0.5;
    
    return [
      startCenter,
      { x: midX, y: startCenter.y },
      { x: midX, y: endCenter.y },
      endCenter
    ];
  };

  // Handle section selection
  const handleSectionClick = (section: any) => {
    if (isSelectingStart) {
      setStartPoint(section);
      setIsSelectingStart(false);
    } else if (isSelectingEnd) {
      setEndPoint(section);
      setIsSelectingEnd(false);
    }
  };

  // Update path when points change
  useEffect(() => {
    if (startPoint && endPoint) {
      const pathPoints = calculatePath(startPoint, endPoint);
      setPath(pathPoints);
    } else {
      setPath([]);
    }
  }, [startPoint, endPoint]);

  const resetPath = () => {
    setStartPoint(null);
    setEndPoint(null);
    setPath([]);
    setIsSelectingStart(false);
    setIsSelectingEnd(false);
  };

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

        {/* Control Panel */}
        <div className="mb-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex flex-wrap gap-2 items-center mb-2">
            <Button
              size="sm"
              variant={isSelectingStart ? "default" : "outline"}
              onClick={() => {
                setIsSelectingStart(true);
                setIsSelectingEnd(false);
              }}
              className="text-xs"
            >
              Select Start Point
            </Button>
            
            <Button
              size="sm"
              variant={isSelectingEnd ? "default" : "outline"}
              onClick={() => {
                setIsSelectingEnd(true);
                setIsSelectingStart(false);
              }}
              className="text-xs"
            >
              Select End Point
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={resetPath}
              className="text-xs"
            >
              Reset
            </Button>
          </div>
          
          <div className="flex flex-col gap-1 text-xs">
            {startPoint && (
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="w-3 h-3" />
                <span>Start: {startPoint.name}</span>
              </div>
            )}
            {endPoint && (
              <div className="flex items-center gap-2 text-accent">
                <Navigation className="w-3 h-3" />
                <span>End: {endPoint.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Store Map */}
        <div className="relative bg-muted/20 rounded-lg h-[500px] overflow-hidden border border-border mb-4">
          <svg 
            viewBox="0 0 600 480" 
            className="w-full h-full"
            style={{ background: 'hsl(var(--card))' }}
          >
            {/* Store boundary */}
            <rect
              x="10"
              y="10"
              width="580"
              height="460"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              rx="8"
            />

            {/* Store sections */}
            {storeSections.map((section) => (
              <g key={section.id}>
                <rect
                  x={section.x}
                  y={section.y}
                  width={section.width}
                  height={section.height}
                  fill={section.color}
                  stroke={hoveredSection === section.id ? "hsl(var(--accent))" : "hsl(var(--border))"}
                  strokeWidth={hoveredSection === section.id ? "2" : "1"}
                  rx="4"
                  className="cursor-pointer transition-all"
                  style={{ opacity: hoveredSection === section.id ? 0.9 : 0.8 }}
                  onClick={() => handleSectionClick(section)}
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                />
                
                <text
                  x={section.x + section.width / 2}
                  y={section.y + section.height / 2 + 2}
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="600"
                  className="pointer-events-none"
                >
                  {section.name}
                </text>
              </g>
            ))}

            {/* Navigation Path in Yellow */}
            {path.length > 1 && (
              <g>
                {/* Path line */}
                <path
                  d={`M ${path.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                  stroke="hsl(var(--accent))"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,4"
                  className="animate-pulse"
                />
                
                {/* Start point marker */}
                <circle 
                  cx={path[0].x} 
                  cy={path[0].y} 
                  r="6" 
                  fill="hsl(var(--primary))" 
                  stroke="white"
                  strokeWidth="2"
                />
                
                {/* End point marker */}
                <circle 
                  cx={path[path.length - 1].x} 
                  cy={path[path.length - 1].y} 
                  r="6" 
                  fill="hsl(var(--accent))" 
                  stroke="white"
                  strokeWidth="2"
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
              </g>
            )}

            {/* Entrance and Exit labels */}
            <text x="30" y="470" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Entrance</text>
            <text x="150" y="470" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Exit</text>
            <text x="450" y="470" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Exit</text>
            <text x="570" y="470" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Entrance</text>
          </svg>
        </div>

        {/* Section Info */}
        {hoveredSection && (
          <div className="mb-4 p-3 bg-muted/30 rounded-lg">
            <div className="text-sm text-foreground">
              <span className="font-medium">Section: </span>
              {storeSections.find(s => s.id === hoveredSection)?.name}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {isSelectingStart ? "Tap to set as start point" : isSelectingEnd ? "Tap to set as destination" : "Tap 'Select Start Point' or 'Select End Point' first"}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
