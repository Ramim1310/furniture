import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { categories } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/shared/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { products } = useShop();
  // Show top 4 products
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            আধুনিক আসবাবপত্র, <br/> আপনার ঘরকে সাজান স্বপ্নের মতন
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            সেরা মানের ফার্নিচার এখন আপনার হাতের নাগালে। হামযা ফার্নিচার হাউস - বিশ্বাস ও আস্থার প্রতীক।
          </p>
          <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 text-lg px-8 py-6 rounded-2xl">
            কেনাকাটা করুন <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">জনপ্রিয় ক্যাটাগরি</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="group cursor-pointer">
              <div className="h-40 bg-white border border-gray-100 shadow-sm rounded-3xl flex items-center justify-center mb-4 group-hover:shadow-md transition-all group-hover:-translate-y-1">
                <span className="text-xl font-semibold text-slate-700">{cat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
         <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">আমাদের কালেকশন</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link to="/products">
                <Button variant="outline" size="lg" className="rounded-xl px-8">সব পণ্য দেখুন</Button>
              </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
