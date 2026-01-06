import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const result = loginAdmin(email, password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      toast.error('ভুল ইমেইল বা পাসওয়ার্ড! (Try: admin@hamza.com / hamza123)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-slate-200 p-3 rounded-full w-fit mb-4">
            <Lock className="h-6 w-6 text-slate-700" />
          </div>
          <CardTitle className="text-2xl font-bold">অ্যাডমিন প্যানেল</CardTitle>
          <p className="text-slate-500 mt-2">অ্যাডমিন হিসেবে প্রবেশ করুন</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">ইমেইল</label>
              <Input 
                type="email" 
                placeholder="" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">পাসওয়ার্ড</label>
              <Input 
                type="password" 
                placeholder="" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">লগইন করুন</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
