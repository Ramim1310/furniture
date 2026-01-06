import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Trash2, Plus, ShoppingBag, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { products, addProduct, deleteProduct } = useShop();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'sofa', image: '' });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    addProduct({
      ...newProduct,
      price: Number(newProduct.price)
    });
    setNewProduct({ name: '', price: '', category: 'sofa', image: '' });
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">ড্যাশবোর্ড - পণ্য ব্যবস্থাপনা</h1>
        <div className="flex gap-4">
          <Link to="/admin/orders">
             <Button variant="outline"><ShoppingBag className="mr-2 h-4 w-4"/> অর্ডার দেখুন</Button>
          </Link>
          <Link to="/admin/customers">
             <Button variant="outline"><User className="mr-2 h-4 w-4"/> কাস্টমার দেখুন</Button>
          </Link>
          <Button variant="danger" onClick={handleLogout}>লগআউট</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Product Form */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5"/> নতুন পণ্য যোগ করুন</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input 
                placeholder="পণ্যের নাম (যেমন: আলমারি)" 
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
              <Input 
                placeholder="দামে (৳)" 
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                required
              />
              <select 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="sofa">সোফা</option>
                <option value="bed">বেড</option>
                <option value="almirah">আলমারি</option>
                <option value="dining">ডাইনিং টেবিল</option>
              </select>
              <Input 
                placeholder="ছবির লিংক (URL)" 
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              />
              <Button type="submit" className="w-full">যোগ করুন</Button>
            </form>
          </CardContent>
        </Card>

        {/* Product List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4">সকল পণ্যের তালিকা ({products.length})</h2>
          {products.map((product) => (
            <Card key={product.id} className="flex flex-row items-center p-4 gap-4">
              <img 
                src={product.image || "https://placehold.co/100"} 
                alt={product.name} 
                className="w-16 h-16 rounded-lg object-cover bg-gray-100"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-slate-600">৳ {product.price.toLocaleString()}</p>
              </div>
              <Button 
                variant="danger" 
                size="sm" 
                onClick={() => deleteProduct(product.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
