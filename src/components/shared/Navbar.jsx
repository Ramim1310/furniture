import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ShoppingCart, LogIn } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

import { useShop } from '../../context/ShopContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useShop();
  
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-slate-900">হামযা ফার্নিচার</Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-slate-600 hover:text-slate-900 font-medium">হোম</Link>
          <Link to="/products" className="text-slate-600 hover:text-slate-900 font-medium">প্রোডাক্ট</Link>
          <Link to="/about" className="text-slate-600 hover:text-slate-900 font-medium">আমাদের কথা</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
               <ShoppingCart className="h-5 w-5" />
               {cart.length > 0 && (
                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                   {cart.length}
                 </span>
               )}
            </Button>
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 group relative">
                  <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-lg border cursor-pointer">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:block">
                     <p className="text-sm font-medium leading-none">{user.name}</p>
                     <p className="text-xs text-muted-foreground">{user.role === 'admin' ? 'অ্যাডমিন' : 'কাস্টমার'}</p>
                  </div>
                  
                  {/* Dropdown for Logout */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 p-2">
                    {user.role === 'admin' && (
                      <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-slate-50 rounded text-sm mb-1">
                        ড্যাশবোর্ড
                      </Link>
                    )}
                    <button 
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded text-sm font-medium"
                    >
                      লগআউট
                    </button>
                  </div>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="hidden sm:flex items-center gap-2">
                <LogIn className="h-4 w-4" /> লগইন
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
