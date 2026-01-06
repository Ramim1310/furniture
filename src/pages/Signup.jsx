import React from 'react';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { registerCustomer } = useAuth();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  const handleSignup = (e) => {
    e.preventDefault();
    const result = registerCustomer(formData);
    
    if (result.success) {
      toast.success('অ্যাকাউন্ট তৈরি সফল হয়েছে!');
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">সাইন আপ</CardTitle>
          <p className="text-slate-500 mt-2">নতুন অ্যাকাউন্ট তৈরি করুন</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">নাম</label>
              <Input 
                type="text" 
                placeholder="আপনার নাম" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">ইমেইল</label>
              <Input 
                type="email" 
                placeholder="আপনার ইমেইল" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">ফোন নম্বর</label>
              <Input 
                type="tel" 
                placeholder="আপনার মোবাইল নম্বর" 
                required 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">ঠিকানা</label>
              <Input 
                type="text" 
                placeholder="আপনার ঠিকানা" 
                required 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">পাসওয়ার্ড</label>
              <Input 
                type="password" 
                placeholder="গোপন পাসওয়ার্ড দিন" 
                required 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <Button type="submit" className="w-full text-lg">অ্যাকাউন্ট খুলুন</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-6">
          <p className="text-sm text-slate-600">
            ইতিমধ্যে অ্যাকাউন্ট আছে? <Link to="/login" className="text-blue-600 hover:underline font-medium">লগইন করুন</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
