import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Trash2 } from "lucide-react";
import { useState } from "react";

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  aisle: string;
}

interface ShoppingListPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShoppingListPopup({ open, onOpenChange }: ShoppingListPopupProps) {
  const [shoppingItems] = useState<ShoppingItem[]>([
    { id: "1", name: "Organic Bananas", category: "Fresh Produce", aisle: "Aisle 5" },
    { id: "2", name: "Whole Milk", category: "Fresh Produce", aisle: "Aisle 5" },
    { id: "3", name: "Tomato", category: "Fresh Produce", aisle: "Aisle 5" },
    { id: "4", name: "Pizza", category: "Fresh Produce", aisle: "Aisle 5" },
  ]);

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
              <Menu className="w-5 h-5" />
            </Button>
            <SheetTitle className="text-xl font-semibold text-foreground">Shopping List</SheetTitle>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </SheetHeader>

        <div className="space-y-3 mt-6">
          {shoppingItems.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{item.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{item.category}</span>
                    <span>{item.aisle}</span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}