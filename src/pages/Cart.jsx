import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardTitle, CardHeader } from '../components/ui/Card';
import { Trash2, ArrowRight, ArrowLeft, ShoppingBag, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, placeOrder, clearCart, updateQuantity } = useShop();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({ name: '', address: '', phone: '' });
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    if (user && showCheckout) {
      setCustomerDetails(prev => ({ 
        ...prev, 
        name: user.name || '',
        address: user.address || '',
        phone: user.phone || ''
      }));
    }
  }, [user, showCheckout]);

  const handleCheckoutClick = () => {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } });
    } else {
      setShowCheckout(true);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newOrderId = placeOrder(customerDetails);
    setOrderId(newOrderId);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">অর্ডার সফল হয়েছে!</h1>
        <p className="text-xl text-slate-600 mb-8">
          ধন্যবাদ {customerDetails.name}, আপনার অর্ডারটি গ্রহণ করা হয়েছে। <br/>
          অর্ডার আইডি: <span className="font-mono font-bold text-slate-800">#{orderId}</span>
        </p>
        <Link to="/">
          <Button size="lg" className="rounded-xl px-8">কেনাকাটা চালিয়ে যান</Button>
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-700 mb-4">আপনার কার্ট খালি</h1>
        <Link to="/products">
           <Button variant="outline">পণ্য দেখুন</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">শপিং কার্ট ({cart.length})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <Card key={`${item.id}-${index}`} className="flex flex-row items-center p-4 gap-4">
               <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
               <div className="flex-1">
                 <h3 className="font-semibold text-lg">{item.name}</h3>
                 <p className="text-slate-600">৳ {item.price.toLocaleString()}</p>
               </div>
               <div className="flex items-center gap-3 mr-4">
                 <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                   <Minus className="h-3 w-3" />
                 </Button>
                 <span className="font-medium text-lg w-4 text-center">{item.quantity}</span>
                 <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, 1)}>
                   <Plus className="h-3 w-3" />
                 </Button>
               </div>
               <Button 
                 variant="danger" 
                 size="sm"
                 onClick={() => removeFromCart(item.id)}
               >
                 <Trash2 className="h-4 w-4" />
               </Button>
            </Card>
          ))}
          {cart.length > 0 && (
             <div className="flex justify-end">
               <Button variant="ghost" className="text-red-500 hover:text-red-700" onClick={clearCart}>সব মুছুন</Button>
             </div>
          )}
        </div>

        {/* Checkout Summary */}
        <Card className="h-fit sticky top-24">
          <CardHeader>
            <CardTitle>অর্ডারের সারাংশ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6 text-lg font-bold">
              <span>সর্বমোট</span>
              <span>৳ {total.toLocaleString()}</span>
            </div>

            {!showCheckout ? (
              <Button className="w-full text-lg py-6" onClick={handleCheckoutClick}>
                চেকআউট করুন <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                <div className="bg-slate-50 p-4 rounded-lg border space-y-3">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">অর্ডারকারী নাম</p>
                    <Input 
                      value={customerDetails.name} 
                      onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                      placeholder="আপনার নাম"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">ঠিকানা</p>
                    <Input 
                      value={customerDetails.address} 
                      onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                      placeholder="আপনার পূর্ণ ঠিকানা"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">ফোন নম্বর</p>
                    <Input 
                      value={customerDetails.phone} 
                      onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                      placeholder="আপনার মোবাইল নম্বর"
                      className="bg-white"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                   <Button variant="outline" className="flex-1" onClick={() => setShowCheckout(false)}>ফিরে যান</Button>
                   <Button 
                     className="flex-1 bg-green-600 hover:bg-green-700"
                     onClick={handlePlaceOrder}
                     disabled={!customerDetails.address || !customerDetails.phone}
                   >
                     অর্ডার নিশ্চিত করুন
                   </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
