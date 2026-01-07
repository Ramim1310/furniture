import { useShop } from '../../context/ShopContext';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export function ProductCard({ product }) {
  const { name, price, image } = product;
  const { addToCart } = useShop();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="aspect-square w-full bg-gray-100 relative group">
         <img src={image || "https://placehold.co/400x400/e2e8f0/1e293b?text=Furniture"} alt={name} className="w-full aspect-square object-cover " />
         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center">
            <Button 
                variant="primary" 
                className="rounded-full"
                onClick={() => addToCart(product)}
            >
                <ShoppingCart className="h-5 w-5 mr-2" /> কার্টে যোগ করুন
            </Button>
         </div>
      </div>
      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-sm text-slate-500 mb-2">{product.category}</p>
        <p className="text-sm text-slate-700 mb-3 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
           <p className="text-lg font-bold text-indigo-700">৳ {price.toLocaleString()}</p>
           {/* Mobile Only Add to Cart Button */}
           <Button 
             size="sm" 
             className="md:hidden bg-indigo-600 text-white"
             onClick={() => addToCart(product)}
            >
             <ShoppingCart className="h-4 w-4" />
           </Button>
        </div>
      </CardContent>
    </Card>
  );
}
