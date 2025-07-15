
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const sections = [
  "Baby & Toddler Toys",
  "Baby Lotion",
  "Baby Massage Oil",
  "Baby Powder",
  "Baby Shampoos",
  "Baby Soaps",
  "Diapers",
  "Briefs & Trunks",
  "Socks & Handkerchiefs",
  "Vests",
  "Leggings & Chudidar",
  "Pyjama Sets",
  "Socks & Handkerchiefs",
  "Coffee",
  "Concentrates",
  "Energy Drinks",
  "Green Tea",
  "Soda & Water",
  "Soft Drinks",
  "Squash & Syrups",
  "Tea Bags",
  "Tea",
  "Butter",
  "Cheese",
  "Curd",
  "Yogurt",
  "Blended Oil",
  "Groundnut Oil",
  "Mustard Oil",
  "Olive Oil",
  "Other Oils",
  "Rice Bran Oil",
  "Sunflower Oil",
  "Chana Dal",
  "Daliya",
  "Masoor Dal",
  "Mix Dal",
  "Moong Dal",
  "Urad Dal",
  "Almonds",
  "Anjeer",
  "Apricot",
  "Cashews",
  "Dates",
  "Makhana",
  "Mixed Dryfruits",
  "Pista",
  "Raisins",
  "Walnuts",
  "Atta",
  "Grains",
  "Other Flours",
  "Ghee",
  "Vanaspati",
  "Chilli Powder",
  "Cooking Pastes",
  "Coriander Powder",
  "Food Essence",
  "Herbs & Seasonings",
  "Powdered Spices",
  "Turmeric Powder",
  "Whole Spices",
  "Chana",
  "Chowli",
  "Groundnut",
  "Masoor",
  "Moong",
  "Rajma",
  "Soya Products",
  "Urad",
  "Basmati Rice",
  "Brown Rice",
  "Kolam Rice",
  "Kurmura",
  "Other Rice",
  "Poha",
  "Jaggery",
  "Salt",
  "Sugar",
  "Floor Cleaners",
  "Other Cleaners",
  "Toilet Cleaners",
  "Detergent Bar",
  "Detergent Powder",
  "Liquid Detergent",
  "Disinfectant Liquid & Spray",
  "Air Fresheners",
  "Mosquito Bat",
  "Repellents",
  "Cabinets",
  "Chair Covers",
  "Table Runner",
  "Wall Clocks",
  "Agarbatti & Dhoop",
  "Camphor & Kapur",
  "Decorative Accessories",
  "Festive Candles",
  "Pooja Items",
  "Bottles",
  "Flasks",
  "Lunch Box",
  "Aluminium Foils",
  "Tissue Paper & Napkins",
  "Toilet Paper",
  "Brooms & Dust Pans",
  "Gloves",
  "Hardware",
  "Kitchen Aprons",
  "Mops & Refills",
  "Cat Food",
  "Bread & Buns",
  "Cakes",
  "Cookies",
  "Digestive Biscuits",
  "Glucose Biscuits",
  "Khari & Toasts",
  "Flakes",
  "Muesli",
  "Chocolates",
  "Dark Chocolates",
  "Gums / Mints / Candies",
  "Parathas & Rotis",
  "Snacks",
  "Veggies",
  "Beverages",
  "Biscuits & Chocolates",
  "Dark Chocolates",
  "Ketchup & Sauces",
  "Noodles & Pasta",
  "Honey",
  "Jams",
  "Mayonnaise",
  "Spreads",
  "Chutney",
  "Ketchup",
  "Vinegar",
  "Hakka Noodles",
  "Pasta",
  "Vermicelli",
  "Chilli Pickles",
  "Chutney & Chutney Powder",
  "Mango Pickles",
  "Mixed Pickles",
  "Other Pickles",
  "Popcorn",
  "Soups",
  "Chips & Wafers",
  "Namkeens",
  "Other Snacks",
  "Bath Soaps & Bars",
  "Talcum Powders",
  "Hair Colour",
  "Hair Combs",
  "Hair Conditioners",
  "Hair Gels & Creams",
  "Hair Oils",
  "Hair Serums",
  "Hair Shampoos",
  "Antiseptics",
  "Chyawanprash",
  "Cold Relief",
  "Contraceptives",
  "Digestive Care",
  "Ear Care",
  "First Aid",
  "Other Healthy Alternatives",
  "Pain Relief",
  "Sugar Substitutes",
  "Vitamins & Supplements",
  "After Shave",
  "Face Wash",
  "Shaving Cream & Brushes",
  "Shaving Foam",
  "Shaving Razors",
  "Mouthwash",
  "Toothbrushes",
  "Toothpaste",
  "Adult Diapers",
  "Hand Wash & Sanitizers",
  "Intimate Wash",
  "Lip Balms",
  "Sunscreen",
  "Decoration",
  "Raincoat",
  "Umbrella",
  "Blankets",
  "Pillow Covers",
  "Pillows",
  "Gas Stoves",
  "Mixers",
  "Toasters & Induction Cooktops",
  "Curtains",
  "Glues / Tapes & More",
  "Files & Folders",
  "Notebooks"
];

type Position = { row: number; col: number };

interface MapPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MapPopup: React.FC<MapPopupProps> = ({ open, onOpenChange }) => {
  const [selectingStart, setSelectingStart] = useState(false);
  const [selectingEnd, setSelectingEnd] = useState(false);
  const [startPoint, setStartPoint] = useState<Position | null>(null);
  const [endPoint, setEndPoint] = useState<Position | null>(null);
  const [path, setPath] = useState<Position[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);

  // Changed to 6 columns for more vertical layout
  const GRID_COLS = 6;
  const GRID_ROWS = Math.ceil(sections.length / GRID_COLS);

  // A* pathfinding algorithm that goes around sections through walkable aisles
  const findPath = (start: Position, end: Position): Position[] => {
    const openSet: Position[] = [start];
    const closedSet: Position[] = [];
    const cameFrom: Map<string, Position> = new Map();
    const gScore: Map<string, number> = new Map();
    const fScore: Map<string, number> = new Map();

    const getKey = (pos: Position) => `${pos.row},${pos.col}`;
    const heuristic = (a: Position, b: Position) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
    
    // Check if a position has a section (is blocked)
    const hasSection = (pos: Position) => {
      return false;
    };

    // Get walkable neighbors - this creates paths around sections
    const getWalkableNeighbors = (pos: Position): Position[] => {
      const neighbors = [];
      
      // Add direct neighbors for aisle walking
      const directions = [
        { row: -1, col: 0 }, // up
        { row: 1, col: 0 },  // down
        { row: 0, col: -1 }, // left
        { row: 0, col: 1 }   // right
      ];

      for (const dir of directions) {
        const newPos = { row: pos.row + dir.row, col: pos.col + dir.col };
        
        // Allow movement to empty spaces (aisles) or to start/end points
        if (!hasSection(newPos) || 
            (start.row === newPos.row && start.col === newPos.col) ||
            (end.row === newPos.row && end.col === newPos.col)) {
          neighbors.push(newPos);
        }
      }

      return neighbors;
    };

    gScore.set(getKey(start), 0);
    fScore.set(getKey(start), heuristic(start, end));

    while (openSet.length > 0) {
      openSet.sort((a, b) => (fScore.get(getKey(a)) || Infinity) - (fScore.get(getKey(b)) || Infinity));
      const current = openSet.shift()!;

      if (current.row === end.row && current.col === end.col) {
        const path: Position[] = [];
        let curr = current;
        while (cameFrom.has(getKey(curr))) {
          path.unshift(curr);
          curr = cameFrom.get(getKey(curr))!;
        }
        path.unshift(start);
        return path;
      }

      closedSet.push(current);

      const neighbors = getWalkableNeighbors(current).filter(pos => 
        !closedSet.some(closed => closed.row === pos.row && closed.col === pos.col)
      );

      for (const neighbor of neighbors) {
        const tentativeGScore = (gScore.get(getKey(current)) || 0) + 1;
        const neighborKey = getKey(neighbor);

        if (!gScore.has(neighborKey) || tentativeGScore < gScore.get(neighborKey)!) {
          cameFrom.set(neighborKey, current);
          gScore.set(neighborKey, tentativeGScore);
          fScore.set(neighborKey, tentativeGScore + heuristic(neighbor, end));

          if (!openSet.some(open => open.row === neighbor.row && open.col === neighbor.col)) {
            openSet.push(neighbor);
          }
        }
      }
    }

    return [];
  };

  const handleSectionClick = (row: number, col: number) => {
    if (selectingStart) {
      setStartPoint({ row, col });
      setSelectingStart(false);
      setPath([]);
    } else if (selectingEnd) {
      setEndPoint({ row, col });
      setSelectingEnd(false);
      setPath([]);
    }
  };

  const handleSelectStart = () => {
    setSelectingStart(true);
    setSelectingEnd(false);
  };

  const handleSelectEnd = () => {
    setSelectingEnd(true);
    setSelectingStart(false);
  };

  const handleReset = () => {
    setStartPoint(null);
    setEndPoint(null);
    setPath([]);
    setSelectingStart(false);
    setSelectingEnd(false);
  };

  useEffect(() => {
    if (startPoint && endPoint) {
      const newPath = findPath(startPoint, endPoint);
      setPath(newPath);
    }
  }, [startPoint, endPoint]);

  const getSectionClass = (row: number, col: number) => {
    const isStart = startPoint && startPoint.row === row && startPoint.col === col;
    const isEnd = endPoint && endPoint.row === row && endPoint.col === col;
    const isOnPath = path.some(pos => pos.row === row && pos.col === col);
    
    let baseStyle = {
      backgroundColor: '#00B8D4',
      borderColor: '#005F6B',
      color: '#FFFFFF'
    };
    
    if (isStart) {
      baseStyle.backgroundColor = '#4CAF50';
      baseStyle.borderColor = '#2E7D32';
    } else if (isEnd) {
      baseStyle.backgroundColor = '#F44336';
      baseStyle.borderColor = '#C62828';
    } else if (isOnPath) {
      baseStyle.backgroundColor = '#FFD600';
      baseStyle.borderColor = '#FFC400';
      baseStyle.color = '#121212';
    }
    
    return {
      className: "relative border-2 rounded-lg p-2 sm:p-3 text-xs font-semibold transition-all duration-300 hover:scale-105 cursor-pointer min-h-[50px] sm:min-h-[60px] flex items-center justify-center text-center shadow-lg",
      style: baseStyle
    };
  };

  // Calculate path lines between connected sections (showing aisle paths with dashed lines)
  const renderPathLines = () => {
    if (path.length < 2) return null;

    const lines: JSX.Element[] = [];
    
    for (let i = 0; i < path.length - 1; i++) {
      const currentPos = path[i];
      const nextPos = path[i + 1];
      
      // Get the actual DOM elements
      const currentElement = document.querySelector(`[data-position="${currentPos.row}-${currentPos.col}"]`);
      const nextElement = document.querySelector(`[data-position="${nextPos.row}-${nextPos.col}"]`);
      
      if (!currentElement || !nextElement || !mapRef.current) continue;
      
      const currentRect = currentElement.getBoundingClientRect();
      const nextRect = nextElement.getBoundingClientRect();
      const containerRect = mapRef.current.getBoundingClientRect();
      
      // Calculate centers of each section relative to container
      const currentCenterX = currentRect.left + currentRect.width / 2 - containerRect.left;
      const currentCenterY = currentRect.top + currentRect.height / 2 - containerRect.top;
      const nextCenterX = nextRect.left + nextRect.width / 2 - containerRect.left;
      const nextCenterY = nextRect.top + nextRect.height / 2 - containerRect.top;
      
      // Create walkable path that goes around sections
      const isHorizontalMove = Math.abs(nextPos.col - currentPos.col) > 0 && nextPos.row === currentPos.row;
      const isVerticalMove = Math.abs(nextPos.row - currentPos.row) > 0 && nextPos.col === currentPos.col;
      
      if (isHorizontalMove) {
        // Horizontal movement - path goes between sections with thick dashed line
        const pathY = Math.min(currentCenterY, nextCenterY) + Math.abs(currentCenterY - nextCenterY) / 2;
        const pathStartX = Math.min(currentCenterX, nextCenterX);
        const pathEndX = Math.max(currentCenterX, nextCenterX);
        const pathWidth = pathEndX - pathStartX;
        
        // Create multiple dashed segments for better visibility
        const dashCount = Math.floor(pathWidth / 20);
        for (let d = 0; d < dashCount; d++) {
          const dashX = pathStartX + (d * 20);
          const dashWidth = Math.min(12, pathWidth - (d * 20));
          
          lines.push(
            <div
              key={`h-dash-${i}-${d}`}
              className="absolute z-10 animate-pulse"
              style={{
                left: dashX,
                top: pathY - 3,
                width: dashWidth,
                height: 8,
                backgroundColor: '#FFD600',
                borderRadius: '4px',
                boxShadow: '0 0 10px rgba(255, 214, 0, 0.6)'
              }}
            />
          );
        }
        
        // Add direction arrow
        lines.push(
          <div
            key={`arrow-${i}`}
            className="absolute font-bold z-20 animate-bounce"
            style={{
              left: pathStartX + pathWidth / 2 - 15,
              top: pathY - 25,
              fontSize: '24px',
              color: '#FFD600',
              textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
              filter: 'drop-shadow(0 0 8px #FFD600)'
            }}
          >
            {nextPos.col > currentPos.col ? '➤' : '⬅'}
          </div>
        );
      } else if (isVerticalMove) {
        // Vertical movement - path goes between sections with thick dashed line
        const pathX = Math.min(currentCenterX, nextCenterX) + Math.abs(currentCenterX - nextCenterX) / 2;
        const pathStartY = Math.min(currentCenterY, nextCenterY);
        const pathEndY = Math.max(currentCenterY, nextCenterY);
        const pathHeight = pathEndY - pathStartY;
        
        // Create multiple dashed segments for better visibility
        const dashCount = Math.floor(pathHeight / 20);
        for (let d = 0; d < dashCount; d++) {
          const dashY = pathStartY + (d * 20);
          const dashHeight = Math.min(12, pathHeight - (d * 20));
          
          lines.push(
            <div
              key={`v-dash-${i}-${d}`}
              className="absolute z-10 animate-pulse"
              style={{
                left: pathX - 4,
                top: dashY,
                width: 8,
                height: dashHeight,
                backgroundColor: '#FFD600',
                borderRadius: '4px',
                boxShadow: '0 0 10px rgba(255, 214, 0, 0.6)'
              }}
            />
          );
        }
        
        // Add direction arrow
        lines.push(
          <div
            key={`arrow-${i}`}
            className="absolute font-bold z-20 animate-bounce"
            style={{
              left: pathX - 25,
              top: pathStartY + pathHeight / 2 - 15,
              fontSize: '24px',
              color: '#FFD600',
              textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
              filter: 'drop-shadow(0 0 8px #FFD600)'
            }}
          >
            {nextPos.row > currentPos.row ? '⬇' : '⬆'}
          </div>
        );
      } else {
        // Diagonal movement - create L-shaped path through aisles with thick dashed lines
        const midX = currentCenterX;
        const midY = nextCenterY;
        
        // Vertical segment dashes
        const vHeight = Math.abs(midY - currentCenterY);
        const vDashCount = Math.floor(vHeight / 20);
        for (let d = 0; d < vDashCount; d++) {
          const dashY = Math.min(currentCenterY, midY) + (d * 20);
          const dashHeight = Math.min(12, vHeight - (d * 20));
          
          lines.push(
            <div
              key={`v-seg-dash-${i}-${d}`}
              className="absolute z-10 animate-pulse"
              style={{
                left: currentCenterX - 4,
                top: dashY,
                width: 8,
                height: dashHeight,
                backgroundColor: '#FFD600',
                borderRadius: '4px',
                boxShadow: '0 0 10px rgba(255, 214, 0, 0.6)'
              }}
            />
          );
        }
        
        // Horizontal segment dashes
        const hWidth = Math.abs(nextCenterX - midX);
        const hDashCount = Math.floor(hWidth / 20);
        for (let d = 0; d < hDashCount; d++) {
          const dashX = Math.min(midX, nextCenterX) + (d * 20);
          const dashWidth = Math.min(12, hWidth - (d * 20));
          
          lines.push(
            <div
              key={`h-seg-dash-${i}-${d}`}
              className="absolute z-10 animate-pulse"
              style={{
                left: dashX,
                top: midY - 3,
                width: dashWidth,
                height: 8,
                backgroundColor: '#FFD600',
                borderRadius: '4px',
                boxShadow: '0 0 10px rgba(255, 214, 0, 0.6)'
              }}
            />
          );
        }
        
        // Add direction arrows for L-shaped path
        lines.push(
          <div
            key={`v-arrow-${i}`}
            className="absolute font-bold z-20 animate-bounce"
            style={{
              left: currentCenterX - 25,
              top: Math.min(currentCenterY, midY) + Math.abs(midY - currentCenterY) / 2 - 15,
              fontSize: '20px',
              color: '#FFD600',
              textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
              filter: 'drop-shadow(0 0 8px #FFD600)'
            }}
          >
            {midY > currentCenterY ? '⬇' : '⬆'}
          </div>
        );
        
        lines.push(
          <div
            key={`h-arrow-${i}`}
            className="absolute font-bold z-20 animate-bounce"
            style={{
              left: Math.min(midX, nextCenterX) + Math.abs(nextCenterX - midX) / 2 - 15,
              top: midY - 25,
              fontSize: '20px',
              color: '#FFD600',
              textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
              filter: 'drop-shadow(0 0 8px #FFD600)'
            }}
          >
            {nextCenterX > midX ? '➤' : '⬅'}
          </div>
        );
      }
    }
    
    return lines;
  };

  // Create a 2D grid for sections only
  const sectionGrid = Array(GRID_ROWS).fill(null).map(() => Array(GRID_COLS).fill(null));
  sections.forEach((section, index) => {
    const row = Math.floor(index / GRID_COLS);
    const col = index % GRID_COLS;
    sectionGrid[row][col] = section;
  });

  // Don't render anything if not open
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      {/* Close button */}
      <button
        onClick={() => onOpenChange(false)}
        className="fixed top-4 right-4 z-30 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        ✕
      </button>

      {/* Control Panel - mobile responsive */}
      <div className="fixed top-4 left-4 right-4 z-20 flex flex-col sm:flex-row gap-2 sm:gap-4 sm:justify-center">
        <Button
          onClick={handleSelectStart}
          className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-white text-sm sm:text-base transition-all duration-300 border-2 ${
            selectingStart 
              ? 'border-white shadow-lg' 
              : 'border-transparent hover:border-white/30'
          }`}
          style={{ 
            backgroundColor: selectingStart ? '#005F6B' : '#00B8D4',
            color: '#FFFFFF'
          }}
        >
          Select Start
        </Button>
        <Button
          onClick={handleSelectEnd}
          className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-white text-sm sm:text-base transition-all duration-300 border-2 ${
            selectingEnd 
              ? 'border-white shadow-lg' 
              : 'border-transparent hover:border-white/30'
          }`}
          style={{ 
            backgroundColor: selectingEnd ? '#005F6B' : '#00B8D4',
            color: '#FFFFFF'
          }}
        >
          Select End
        </Button>
        <Button
          onClick={handleReset}
          className="px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-white text-sm sm:text-base transition-all duration-300 border-2 border-transparent hover:border-white/30"
          style={{ 
            backgroundColor: '#FFD600',
            color: '#121212'
          }}
        >
          Reset
        </Button>
      </div>

      {/* Scrollable Map */}
      <div 
        ref={mapRef}
        className="pt-40 sm:pt-44 p-4 sm:p-8 overflow-auto h-screen relative"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 184, 212, 0.05) 0%, transparent 50%)',
        }}
      >
        {/* Path Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {renderPathLines()}
        </div>

        <div 
          className="grid gap-12 sm:gap-16 mx-auto relative"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_COLS}, minmax(100px, 1fr))`,
            maxWidth: `${GRID_COLS * 140}px`
          }}
        >
          {sectionGrid.map((row, rowIndex) =>
            row.map((section, colIndex) => {
              const sectionStyle = section ? getSectionClass(rowIndex, colIndex) : null;
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  data-position={`${rowIndex}-${colIndex}`}
                  className={
                    section 
                      ? sectionStyle!.className
                      : "min-h-[50px] sm:min-h-[60px] border-2 rounded-lg opacity-20"
                  }
                  style={
                    section 
                      ? sectionStyle!.style
                      : {
                          borderColor: '#333333',
                          backgroundColor: '#1a1a1a'
                        }
                  }
                  onClick={() => section && handleSectionClick(rowIndex, colIndex)}
                >
                  {section && (
                    <>
                      <span className="relative z-10 leading-tight text-xs sm:text-sm" style={{ color: sectionStyle!.style.color }}>{section}</span>
                      {startPoint && startPoint.row === rowIndex && startPoint.col === colIndex && (
                        <div className="absolute top-1 right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full animate-pulse" style={{ backgroundColor: '#4CAF50' }}></div>
                      )}
                      {endPoint && endPoint.row === rowIndex && endPoint.col === colIndex && (
                        <div className="absolute top-1 right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full animate-pulse" style={{ backgroundColor: '#F44336' }}></div>
                      )}
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Entrance, Exit, Checkout at the end of the map */}
        <div className="mt-16 mb-8 flex justify-center gap-6 sm:gap-10">
          <Button 
            className="px-4 py-3 sm:px-6 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: '#4CAF50',
              color: '#FFFFFF'
            }}
          >
            Entrance
          </Button>
          <Button 
            className="px-4 py-3 sm:px-6 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: '#F44336',
              color: '#FFFFFF'
            }}
          >
            Exit
          </Button>
          <Button 
            className="px-4 py-3 sm:px-6 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: '#9C27B0',
              color: '#FFFFFF'
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapPopup;