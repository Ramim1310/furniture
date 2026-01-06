import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';

export default function AdminCustomers() {
  const { users } = useAuth();

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/dashboard">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5"/></Button>
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">কাস্টমার তালিকা</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
             <CardTitle className="flex items-center gap-2"><User className="h-5 w-5"/> সকল রেজিস্টারকৃত কাস্টমার ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
               <p className="text-center text-gray-500 py-8">কোনো কাস্টমার পাওয়া যায়নি</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="border-b">
                         <th className="p-4 font-semibold text-slate-600">নাম</th>
                         <th className="p-4 font-semibold text-slate-600">ইমেইল</th>
                         <th className="p-4 font-semibold text-slate-600">ফোন</th>
                         <th className="p-4 font-semibold text-slate-600">ঠিকানা</th>
                      </tr>
                   </thead>
                   <tbody>
                      {users.map((user, idx) => (
                        <tr key={idx} className="border-b hover:bg-slate-50">
                           <td className="p-4 font-medium">{user.name}</td>
                           <td className="p-4 text-slate-600">{user.email}</td>
                           <td className="p-4 text-slate-600">{user.phone}</td>
                           <td className="p-4 text-slate-600">{user.address}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
