import React from 'react';
import { useShop } from '../context/ShopContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, XCircle, Trash2 } from 'lucide-react';

export default function AdminOrders() {
  const { orders, updateOrderStatus, deleteOrder, products } = useShop();

  const getProductName = (id) => {
    const p = products.find(prod => prod.id === id);
    return p ? p.name : 'Unknown Product';
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/dashboard">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5"/></Button>
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">অর্ডার ম্যানেজমেন্ট</h1>
      </div>

      <div className="grid gap-6">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">কোনো অর্ডার নেই</p>
        ) : (
          orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
                <div className="bg-slate-50 p-4 border-b flex justify-between items-center">
                <div>
                   <span className="font-bold text-lg">অর্ডার #{order.id}</span>
                   <span className="text-slate-500 text-sm ml-4">{order.date}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium 
                  ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {order.status === 'Delivered' ? 'ডেলিভারড' : order.status === 'Cancelled' ? 'বাতিল' : 'পেন্ডিং'}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">কাস্টমার নাম: {order.customerName}</h4>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-slate-600">
                          {getProductName(item.productId)} x {item.quantity}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-slate-900 mb-4">মোট: ৳ {order.total.toLocaleString()}</p>
                    
                    <div className="flex justify-end gap-2">
                        {order.status === 'Pending' && (
                           <>
                             <Button 
                               variant="outline"
                               onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                               className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                             >
                               <XCircle className="h-4 w-4 mr-2"/> বাতিল করুন
                             </Button>
                             <Button 
                               onClick={() => updateOrderStatus(order.id, 'Delivered')}
                               className="bg-green-600 hover:bg-green-700 text-white"
                             >
                               <CheckCircle className="h-4 w-4 mr-2"/> ডেলিভারি সম্পন্ন করুন
                             </Button>
                           </>
                        )}
                        {order.status === 'Delivered' && (
                           <Button variant="outline" disabled className="bg-green-50 text-green-700 border-green-200">
                             <CheckCircle className="h-4 w-4 mr-2"/> সম্পন্ন হয়েছে
                           </Button>
                        )}
                        {order.status === 'Cancelled' && (
                           <Button variant="outline" disabled className="bg-red-50 text-red-700 border-red-200">
                             <XCircle className="h-4 w-4 mr-2"/> অর্ডার বাতিল
                           </Button>
                        )}
                        
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                                if(window.confirm('আপনি কি নিশ্চিত এই অর্ডারটি মুছে ফেলতে চান?')) {
                                    deleteOrder(order.id);
                                }
                            }}
                            className="bg-red-100 hover:bg-red-200 text-red-600 border border-red-200"
                            title="অর্ডার মুছে ফেলুন"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
