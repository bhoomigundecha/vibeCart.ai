
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

  // Vertical store layout with proper walkable paths
  const storeSections = [
    // Top row - Entrance area
    { id: "entrance1", name: "Entrance", x: 20, y: 20, width: 80, height: 30, color: "hsl(var(--muted))" },
    { id: "entrance2", name: "Entrance", x: 120, y: 20, width: 80, height: 30, color: "hsl(var(--muted))" },
    { id: "pharmacy", name: "Pharmacy", x: 220, y: 20, width: 80, height: 30, color: "hsl(var(--muted))" },
    { id: "restrooms", name: "Restrooms", x: 320, y: 20, width: 60, height: 30, color: "hsl(var(--muted))" },
    
    // Second row - Health & Beauty
    { id: "health1", name: "Health & Wellness", x: 20, y: 70, width: 80, height: 40, color: "hsl(var(--muted))" },
    { id: "beauty", name: "Beauty", x: 120, y: 70, width: 80, height: 40, color: "hsl(var(--muted))" },
    { id: "pharmacy2", name: "Pharmacy", x: 220, y: 70, width: 80, height: 40, color: "hsl(var(--muted))" },
    { id: "vision", name: "Vision Center", x: 320, y: 70, width: 60, height: 40, color: "hsl(var(--muted))" },
    
    // Third row - Clothing
    { id: "womens", name: "Women's", x: 20, y: 130, width: 80, height: 50, color: "hsl(var(--muted))" },
    { id: "mens", name: "Men's", x: 120, y: 130, width: 80, height: 50, color: "hsl(var(--muted))" },
    { id: "kids", name: "Kids", x: 220, y: 130, width: 80, height: 50, color: "hsl(var(--muted))" },
    { id: "shoes", name: "Shoes", x: 320, y: 130, width: 60, height: 50, color: "hsl(var(--muted))" },
    
    // Fourth row - Electronics & Home
    { id: "electronics", name: "Electronics", x: 20, y: 200, width: 80, height: 50, color: "hsl(var(--muted))" },
    { id: "home", name: "Home", x: 120, y: 200, width: 80, height: 50, color: "hsl(var(--muted))" },
    { id: "toys", name: "Toys", x: 220, y: 200, width: 80, height: 50, color: "hsl(var(--muted))" },
    { id: "auto", name: "Auto", x: 320, y: 200, width: 60, height: 50, color: "hsl(var(--muted))" },
    
    // Fifth row - Grocery entrance
    { id: "deli", name: "Deli", x: 20, y: 270, width: 80, height: 40, color: "hsl(var(--muted))" },
    { id: "bakery", name: "Bakery", x: 120, y: 270, width: 80, height: 40, color: "hsl(var(--muted))" },
    { id: "meat", name: "Meat & Seafood", x: 220, y: 270, width: 80, height: 40, color: "hsl(var(--muted))" },
    { id: "produce", name: "Fresh Produce", x: 320, y: 270, width: 60, height: 40, color: "hsl(var(--muted))" },
    
    // Sixth row - Frozen & Dairy
    { id: "frozen1", name: "Frozen Foods", x: 20, y: 330, width: 80, height: 40, color: "hsl(var(--muted))" },
    { id: "dairy", name: "Dairy", x: 120, y: 330, width: 80, height: 40, color: "hsl(var(--muted))" },
    { id: "frozen2", name: "Frozen Foods", x: 220, y: 330, width: 80, height: 40, color: "hsl(var(--muted))" },
    { id: "beverages", name: "Beverages", x: 320, y: 330, width: 60, height: 40, color: "hsl(var(--muted))" },
    
    // Seventh row - Grocery aisles
    { id: "grocery1", name: "Grocery", x: 20, y: 390, width: 80, height: 40, color: "hsl(var(--muted))" },
    { id: "grocery2", name: "Grocery", x: 120, y: 390, width: 80, height: 40, color: "hsl(var(--muted))" },
    { id: "grocery3", name: "Grocery", x: 220, y: 390, width: 80, height: 40, color: "hsl(var(--muted))" },
    { id: "snacks", name: "Snacks", x: 320, y: 390, width: 60, height: 40, color: "hsl(var(--muted))" },
    
    // Bottom row - Checkout
    { id: "checkout1", name: "Checkout", x: 20, y: 450, width: 100, height: 30, color: "hsl(var(--primary))" },
    { id: "checkout2", name: "Checkout", x: 140, y: 450, width: 100, height: 30, color: "hsl(var(--primary))" },
    { id: "exit", name: "Exit", x: 260, y: 450, width: 120, height: 30, color: "hsl(var(--muted))" },
  ];

  // Define walkable corridors (horizontal and vertical paths between sections)
  const walkablePaths = [
    // Main horizontal corridors
    { x: 0, y: 55, width: 400, height: 10 }, // Between entrance and health
    { x: 0, y: 115, width: 400, height: 10 }, // Between health and clothing  
    { x: 0, y: 185, width: 400, height: 10 }, // Between clothing and electronics
    { x: 0, y: 255, width: 400, height: 10 }, // Between electronics and deli
    { x: 0, y: 315, width: 400, height: 10 }, // Between deli and frozen
    { x: 0, y: 375, width: 400, height: 10 }, // Between frozen and grocery
    { x: 0, y: 435, width: 400, height: 10 }, // Between grocery and checkout
    
    // Main vertical corridors
    { x: 105, y: 0, width: 10, height: 500 }, // Between first and second column
    { x: 205, y: 0, width: 10, height: 500 }, // Between second and third column
    { x: 305, y: 0, width: 10, height: 500 }, // Between third and fourth column
    
    // Side corridors
    { x: 0, y: 0, width: 15, height: 500 }, // Left side
    { x: 385, y: 0, width: 15, height: 500 }, // Right side
  ];

  // Improved pathfinding that follows walkable corridors
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

    // Find nearest walkable path intersections
    const findNearestCorridor = (point: any) => {
      let nearestHorizontal = null;
      let nearestVertical = null;
      let minHDist = Infinity;
      let minVDist = Infinity;

      walkablePaths.forEach(path => {
        if (path.height === 10) { // Horizontal corridor
          const dist = Math.abs(point.y - (path.y + path.height / 2));
          if (dist < minHDist && point.x >= path.x && point.x <= path.x + path.width) {
            minHDist = dist;
            nearestHorizontal = { x: point.x, y: path.y + path.height / 2 };
          }
        } else { // Vertical corridor
          const dist = Math.abs(point.x - (path.x + path.width / 2));
          if (dist < minVDist && point.y >= path.y && point.y <= path.y + path.height) {
            minVDist = dist;
            nearestVertical = { x: path.x + path.width / 2, y: point.y };
          }
        }
      });

      return { horizontal: nearestHorizontal, vertical: nearestVertical };
    };

    const startCorridors = findNearestCorridor(startCenter);
    const endCorridors = findNearestCorridor(endCenter);

    // Create path using L-shaped movement through corridors
    const path = [startCenter];

    if (startCorridors.horizontal && endCorridors.vertical) {
      // Move to horizontal corridor first
      path.push(startCorridors.horizontal);
      // Move along horizontal corridor to vertical intersection
      path.push({ x: endCorridors.vertical.x, y: startCorridors.horizontal.y });
      // Move along vertical corridor to end
      path.push(endCorridors.vertical);
    } else if (startCorridors.vertical && endCorridors.horizontal) {
      // Move to vertical corridor first
      path.push(startCorridors.vertical);
      // Move along vertical corridor to horizontal intersection
      path.push({ x: startCorridors.vertical.x, y: endCorridors.horizontal.y });
      // Move along horizontal corridor to end
      path.push(endCorridors.horizontal);
    } else {
      // Simple L-shaped path
      const midX = startCenter.x + (endCenter.x - startCenter.x) * 0.5;
      path.push({ x: midX, y: startCenter.y });
      path.push({ x: midX, y: endCenter.y });
    }

    path.push(endCenter);
    return path;
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

        {/* Store Map - Made more vertical */}
        <div className="relative bg-muted/20 rounded-lg h-[600px] overflow-auto border border-border mb-4">
          <svg 
            viewBox="0 0 400 500" 
            className="w-full h-full"
            style={{ background: 'hsl(var(--card))' }}
          >
            {/* Store boundary */}
            <rect
              x="5"
              y="5"
              width="390"
              height="490"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              rx="8"
            />

            {/* Walkable path indicators (light gray) */}
            {walkablePaths.map((path, index) => (
              <rect
                key={`path-${index}`}
                x={path.x}
                y={path.y}
                width={path.width}
                height={path.height}
                fill="hsl(var(--muted))"
                opacity="0.3"
              />
            ))}

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
                  fontSize="9"
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
                  stroke="#fbbf24"
                  strokeWidth="4"
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
                  fill="#fbbf24" 
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
                      fill="#fbbf24"
                    />
                  </marker>
                </defs>
              </g>
            )}

            {/* Entrance and Exit labels */}
            <text x="60" y="495" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="bold">Entrance</text>
            <text x="340" y="495" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="bold">Exit</text>
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
