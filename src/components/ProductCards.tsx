import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  description?: string;
}

interface ProductCardsProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export function ProductCards({ products, onAddToCart }: ProductCardsProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No products available</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3 p-4 w-max">
        {products.map((product) => (
          <Card key={product.id} className="bg-card border-border overflow-hidden w-40 flex-shrink-0">
            <CardContent className="p-0">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2 w-8 h-8 rounded-full"
                  onClick={() => onAddToCart?.(product)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="p-3 space-y-1">
                <h3 className="text-sm font-medium text-foreground line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-foreground">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {product.discount && (
                  <div className="text-xs text-green-600 font-medium">
                    {product.discount}% off
                  </div>
                )}

                {product.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
