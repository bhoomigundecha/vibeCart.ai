import { useEffect, useState, useCallback } from "react";
import { MobileNavbar } from "@/components/MobileNavbar";
import { AIAudioBlob, AudioBlobState } from "@/components/AIAudioBlob";
import { ProductCards, Product } from "@/components/ProductCards";
import { ShoppingListPopup } from "@/components/ShoppingListPopup";
import MapPopup  from "@/components/MapPopup";
import { CartPopup } from "@/components/CartPopup";
import { CameraInput } from "@/components/CameraInput";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  aisle: string;
}

const Index = () => {
  const { toast } = useToast();

  const [audioState, setAudioState] = useState<AudioBlobState>("inactive");
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([
    // { id: uuidv4(), name: "Organic Bananas", category: "Fresh Produce", aisle: "Aisle 5" },
    // { id: uuidv4(), name: "Whole Milk", category: "Fresh Produce", aisle: "Aisle 5" },
    // { id: uuidv4(), name: "Tomato", category: "Fresh Produce", aisle: "Aisle 5" },
    // { id: uuidv4(), name: "Pizza", category: "Frozen", aisle: "Aisle 10" },
  ]);

  const handleItemsChange = (items: ShoppingItem[]) => {
    setShoppingItems(items);
  };

  const fetchRecommendations = useCallback(async (shoppingNames: string[]) => {
    try {
      const res = await fetch("https://top-live-tadpole.ngrok-free.app/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: shoppingNames })
      });

      const data = await res.json();

      if (data.type === "recommendation" && Array.isArray(data.data)) {
        const formattedProducts = data.data.map((item: any, index: number) => ({
          id: `rec-${index}`,
          name: item.product.name,
          price: item.product.selling_price,
          originalPrice: item.product.mrp,
          image: item.product.image,
          description: item.product.description,
          discount: item.product.discount
        }));

        setProducts(formattedProducts);
      } else {
        console.warn("Rcommendation has the wrong from:", data);
      }
    } catch (err) {
      console.error("cant fetch:", err);
    }
  }, []);


  useEffect(() => {
    const shoppingNames = shoppingItems.map(item => item.name);
    fetchRecommendations(shoppingNames);

    const intervalId = setInterval(() => fetchRecommendations(shoppingNames), 30000);
    return () => clearInterval(intervalId);
  }, [shoppingItems, fetchRecommendations]);

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
      toast({ title: "Listening", description: "AI is now listening to your voice..." });
    } else if (state === "speaking") {
      toast({ title: "AI Speaking", description: "AI is responding..." });
    }
  };

  const handleShoppingItemsFromAI = (names: string[]) => {
    const newItems: ShoppingItem[] = names.map((name) => ({
      id: uuidv4(),
      name,
      category: "Unknown",
      aisle: "Unknown"
    }));
    setShoppingItems(prev => [...prev, ...newItems]);
  };

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
                toast({
                  title: "AI Assistant",
                  description: "Blob tapped!",
                })
              }
              addShoppingItems={handleShoppingItemsFromAI}
            />
          </div>

          <div className="flex-shrink-0">
            <div className="px-4 pb-2">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Recommended Products
              </h2>
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
          items={shoppingItems}
          onItemsChange={handleItemsChange}
        />
        <CartPopup open={showCart} onOpenChange={setShowCart} />
        <MapPopup open={showMap} onOpenChange={setShowMap} />
      </div>
    </div>
  );
};

export default Index;
