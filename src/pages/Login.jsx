import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginCustomer } = useAuth();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleLogin = (e) => {
    e.preventDefault();
    const result = loginCustomer(email, password);
    if (result.success) {
      navigate(from);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-[calc(10vh-200px)] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">লগইন</CardTitle>
          <p className="text-slate-500 mt-2">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center">{error}</div>}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">ইমেইল</label>
              <Input 
                type="email" 
                placeholder="আপনার ইমেইল" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">পাসওয়ার্ড</label>
              <Input 
                type="password" 
                placeholder="আপনার পাসওয়ার্ড" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full text-lg">লগইন করুন</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-6">
          <p className="text-sm text-slate-600">
            অ্যাকাউন্ট নেই? <Link to="/signup" className="text-blue-600 hover:underline font-medium">সাইন আপ করুন</Link>
          </p>
          <div className="mt-4 text-center w-full block">
             <Link to="/admin" className="text-sm text-slate-400 hover:text-slate-600">অ্যাডমিন লগইন</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
