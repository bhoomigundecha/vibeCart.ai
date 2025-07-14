import { useEffect, useState } from "react";
import { MobileNavbar } from "@/components/MobileNavbar";
import { AIAudioBlob, AudioBlobState } from "@/components/AIAudioBlob";
import { ProductCards, Product } from "@/components/ProductCards";
import { ShoppingListPopup, ShoppingItem } from "@/components/ShoppingListPopup";
import { MapPopup } from "@/components/MapPopup";
import { CartPopup } from "@/components/CartPopup";
import { CameraInput } from "@/components/CameraInput";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const { toast } = useToast();

  const [audioState, setAudioState] = useState<AudioBlobState>("inactive");
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([
    { id: "1", name: "Organic Bananas", category: "Fresh Produce", aisle: "Aisle 5" },
    { id: "2", name: "Whole Milk", category: "Fresh Produce", aisle: "Aisle 5" },
    { id: "3", name: "Tomato", category: "Fresh Produce", aisle: "Aisle 5" },
    { id: "4", name: "Pizza", category: "Fresh Produce", aisle: "Aisle 5" },
  ]);

  const addShoppingItems = (items: string[]) => {
    const newItems: ShoppingItem[] = items.map((name) => ({
      id: uuidv4(),
      name,
      category: "Unknown",
      aisle: "Unknown"
    }));
    setShoppingItems((prev) => [...prev, ...newItems]);
  };

  const handleShoppingList = () => setShowShoppingList(true);
  const handleCart = () => setShowCart(true);
  const handleMap = () => setShowMap(true);

  const handleImageCapture = (file: File) => {
    toast({
      title: "Image Captured",
      description: `${file.name} ready for processing`,
    });
  };

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to Cart",
      description: `${product.name} added to your cart`,
    });
  };

  const handleAudioStateChange = (state: AudioBlobState) => {
    setAudioState(state);

    if (state === "listening") {
      toast({
        title: "Listening",
        description: "AI is now listening to your voice...",
      });
    } else if (state === "speaking") {
      toast({
        title: "AI Speaking",
        description: "AI is responding...",
      });
    }
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch("https://top-live-tadpole.ngrok-free.app/recommendations");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.warn("Unexpected recommendations format", data);
        }
      } catch (err) {
        console.error("Failed to fetch product recommendations:", err);
      }
    };

    fetchRecommendations();
    const intervalId = setInterval(fetchRecommendations, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto min-h-screen bg-background relative">
        <MobileNavbar
          onShoppingListClick={handleShoppingList}
          onCartClick={handleCart}
          onMapClick={handleMap}
          onImageCapture={handleImageCapture}
        />

        <div className="pt-16 pb-4 flex flex-col">
          <div className="flex-1 flex items-center justify-center py-12">
            <AIAudioBlob
              state={audioState}
              onStateChange={handleAudioStateChange}
              onTap={() =>
                toast({ title: "AI Assistant", description: "Blob tapped!" })
              }
              addShoppingItems={addShoppingItems}
            />
          </div>

          <div className="flex-shrink-0">
            <div className="px-4 pb-2">
              <h2 className="text-lg font-semibold text-foreground mb-3">Recommended Products</h2>
            </div>
            <ProductCards
              products={products}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>

        <ShoppingListPopup
          open={showShoppingList}
          onOpenChange={setShowShoppingList}
          shoppingItems={shoppingItems}
          setShoppingItems={setShoppingItems}
        />
        <CartPopup open={showCart} onOpenChange={setShowCart} />
        <MapPopup open={showMap} onOpenChange={setShowMap} />
      </div>
    </div>
  );
};

export default Index;
