import { useState } from "react";
import { MobileNavbar } from "@/components/MobileNavbar";
import { AIAudioBlob, AudioBlobState } from "@/components/AIAudioBlob";
import { ProductCards, Product } from "@/components/ProductCards";
import { useToast } from "@/hooks/use-toast";

// Import product images
import tshirt1 from "@/assets/product-tshirt-1.jpg";
import tshirt2 from "@/assets/product-tshirt-2.jpg";
import tshirt3 from "@/assets/product-tshirt-3.jpg";
import tshirt4 from "@/assets/product-tshirt-4.jpg";

const Index = () => {
  const { toast } = useToast();
  const [audioState, setAudioState] = useState<AudioBlobState>("inactive");
  
  // Sample products data
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Streetwear Green Tee",
      price: 1999,
      originalPrice: 2999,
      image: tshirt1,
      description: "Premium quality streetwear t-shirt with modern design"
    },
    {
      id: "2", 
      name: "Urban Black Tee",
      price: 1799,
      originalPrice: 2499,
      image: tshirt2,
      description: "Stylish black t-shirt with urban graphics"
    },
    {
      id: "3",
      name: "Minimalist White Tee", 
      price: 1599,
      image: tshirt3,
      description: "Clean and minimalist design for everyday wear"
    },
    {
      id: "4",
      name: "Cool Blue Streetwear",
      price: 2199,
      originalPrice: 2799,
      image: tshirt4,
      description: "Trendy blue t-shirt with modern streetwear vibes"
    }
  ]);

  const handleShoppingList = () => {
    toast({
      title: "Shopping List",
      description: "Opening shopping list...",
    });
  };

  const handleCart = () => {
    toast({
      title: "Shopping Cart", 
      description: "Opening shopping cart...",
    });
  };

  const handleMap = () => {
    toast({
      title: "Store Map",
      description: "Opening in-store map...",
    });
  };

  const handleCamera = () => {
    toast({
      title: "Camera",
      description: "Opening camera...",
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

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-only container - enforces phone aspect ratio */}
      <div className="max-w-sm mx-auto min-h-screen bg-background relative">
        {/* Navigation Bar */}
        <MobileNavbar
          onShoppingListClick={handleShoppingList}
          onCartClick={handleCart}
          onMapClick={handleMap}
          onCameraClick={handleCamera}
        />

        {/* Main Content */}
        <div className="pt-16 pb-4 flex flex-col">
          {/* AI Audio Blob - Centered */}
          <div className="flex-1 flex items-center justify-center py-12">
            <AIAudioBlob
              state={audioState}
              onStateChange={handleAudioStateChange}
              onTap={() => {
                toast({
                  title: "AI Assistant",
                  description: "Blob tapped!",
                });
              }}
            />
          </div>

          {/* Product Cards Section */}
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
      </div>
    </div>
  );
};

export default Index;
