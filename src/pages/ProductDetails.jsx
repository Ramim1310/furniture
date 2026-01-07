import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Button } from '../components/ui/Button';
import { ShoppingCart, ArrowLeft, Star, Truck, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const { id } = useParams();
  const { products, addToCart } = useShop();
  const navigate = useNavigate();

  // Find product by ID
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">পণ্যটি পাওয়া যায়নি</h2>
        <Link to="/products">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> সকল পণ্য দেখুন</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <Button 
        variant="ghost" 
        className="mb-6 hover:bg-slate-100"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> ফিরে যান
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          <img 
            src={product.image || "https://placehold.co/600x600/e2e8f0/1e293b?text=Furniture"} 
            alt={product.name} 
            className="w-full h-full object-cover aspect-square"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
              {product.category.toUpperCase()}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-6 text-yellow-500">
             <Star className="h-5 w-5 fill-current" />
             <Star className="h-5 w-5 fill-current" />
             <Star className="h-5 w-5 fill-current" />
             <Star className="h-5 w-5 fill-current" />
             <Star className="h-5 w-5 fill-current" />
             <span className="text-slate-500 text-sm ml-2">(৫.০ রেটিং)</span>
          </div>

          <p className="text-3xl font-bold text-indigo-700 mb-8">৳ {product.price.toLocaleString()}</p>

          <div className="prose prose-slate mb-8">
            <h3 className="text-lg font-semibold mb-2">পণ্যের বিবরণ:</h3>
            <p className="text-slate-600 leading-relaxed">
              {product.description || "এই পণ্যের জন্য বিস্তারিত বিবরণ শীঘ্রই আসছে। এটি আমাদের প্রিমিয়াম কালেকশনের অংশ এবং সর্বোচ্চ মানের উপাদান দিয়ে তৈরি।"}
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-auto">
             <Button 
               size="lg" 
               className="w-full md:w-auto text-lg py-6 bg-slate-900 hover:bg-slate-800"
               onClick={handleAddToCart}
             >
                <ShoppingCart className="mr-2 h-6 w-6" /> কার্টে যোগ করুন
             </Button>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t">
             <div className="flex items-center gap-3 text-slate-600">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                   <Truck className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">দ্রুত ডেলিভারি</span>
             </div>
             <div className="flex items-center gap-3 text-slate-600">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                   <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">১০০% অথেনটিক</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
