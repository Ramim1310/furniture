import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/shared/ProductCard';
import { categories } from '../data/mockData';
import { Button } from '../components/ui/Button';

export default function Products() {
  const { products } = useShop();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-slate-900">আমাদের সকল পণ্য</h1>
      
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Button 
          variant={activeCategory === 'All' ? 'primary' : 'outline'}
          onClick={() => setActiveCategory('All')}
          className="rounded-full px-6"
        >
          সব পণ্য
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.name ? 'primary' : 'outline'}
            onClick={() => setActiveCategory(cat.name)}
            className="rounded-full px-6"
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-slate-500">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
