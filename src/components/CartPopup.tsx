
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Trash2, CreditCard } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface CartPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartPopup({ open, onOpenChange }: CartPopupProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", name: "Whole Milk", category: "Dairy", price: 3.5, quantity: 1 },
    { id: "2", name: "Organic Apples", category: "Produce", price: 3.5, quantity: 1 },
  ]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" className="h-[95vh] bg-background border-accent">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground"
              onClick={() => onOpenChange(false)}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Total:</div>
              <div className="text-xl font-bold text-accent">${total.toFixed(2)}</div>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Scan Items Section */}
          <div className="border border-accent rounded-lg p-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Scan Items</h2>
            <div className="border-2 border-dashed border-muted-foreground rounded-lg p-8 text-center">
              <div className="text-4xl text-muted-foreground mb-2">📱</div>
              <p className="text-muted-foreground">Position item barcode here</p>
            </div>
            <Button className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
              Simulate Scan
            </Button>
          </div>

          {/* Payment Section */}
          <div className="border border-accent rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">Payment</h2>
            </div>
            <div className="bg-muted/30 rounded-lg p-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-foreground">Total Amount:</span>
                <span className="text-accent font-semibold">${total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Pay with Walmart Pay
            </Button>
          </div>

          {/* Cart Items Section */}
          <div className="border border-accent rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">Your Cart ({cartItems.length} items)</h2>
            </div>
            
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-accent rounded-full"></div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                          {item.category}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-foreground">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <div className="w-12 text-right text-accent font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-muted-foreground mt-4 pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-foreground">Total:</span>
                <span className="text-accent">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
