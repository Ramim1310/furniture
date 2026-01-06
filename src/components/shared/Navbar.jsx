import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ShoppingCart, LogIn, Menu, X } from 'lucide-react';
import { useState } from 'react';

import { useAuth } from '../../context/AuthContext';

import { useShop } from '../../context/ShopContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useShop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-4">
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
            <Link to="/login" className="hidden md:block">
              <Button variant="outline" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" /> লগইন
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-white shadow-lg space-y-4">
          <Link to="/" className="block text-slate-600 hover:text-slate-900 font-medium" onClick={() => setIsMenuOpen(false)}>হোম</Link>
          <Link to="/products" className="block text-slate-600 hover:text-slate-900 font-medium" onClick={() => setIsMenuOpen(false)}>প্রোডাক্ট</Link>
          <Link to="/about" className="block text-slate-600 hover:text-slate-900 font-medium" onClick={() => setIsMenuOpen(false)}>আমাদের কথা</Link>
          
          {user ? (
             <div className="pt-2 border-t">
                <div className="flex items-center gap-3 mb-3">
                   <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm border">
                      {user.name.charAt(0).toUpperCase()}
                   </div>
                   <div>
                       <p className="text-sm font-medium">{user.name}</p>
                       <p className="text-xs text-muted-foreground">{user.role === 'admin' ? 'অ্যাডমিন' : 'কাস্টমার'}</p>
                   </div>
                </div>
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="block text-indigo-600 font-medium mb-2" onClick={() => setIsMenuOpen(false)}>
                    ড্যাশবোর্ড
                  </Link>
                )}
                <button 
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="text-red-600 font-medium w-full text-left"
                >
                  লগআউট
                </button>
             </div>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 mt-2">
                <LogIn className="h-4 w-4" /> লগইন
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
