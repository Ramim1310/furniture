import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Award, Heart, Users, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">আমাদের গল্প</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            হামযা ফার্নিচার হাউস - যেখানে ঐতিহ্য এবং আধুনিকতার এক অপূর্ব সংমিশ্রণ ঘটে। আমরা গত ১০ বছর ধরে আপনাদের ঘর সাজানোর সঙ্গী।
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
             <img 
               src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800" 
               alt="Furniture Workshop" 
               className="rounded-lg shadow-xl"
             />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">আমাদের লক্ষ্য ও উদ্দেশ্য</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              হামযা ফার্নিচার হাউস একটি পারিবারিক উদ্যোগ যা সততা এবং গুণগত মানের উপর ভিত্তি করে প্রতিষ্ঠিত। আমাদের মূল লক্ষ্য হলো বাংলাদেশের প্রতিটি ঘরে সাশ্রয়ী মূল্যে বিশ্বমানের আসবাবপত্র পৌঁছে দেওয়া।
            </p>
            <p className="text-slate-600 leading-relaxed">
              আমরা বিশ্বাস করি আসবাবপত্র কেবল একটি বস্তু নয়, এটি আপনার রুচি এবং ব্যক্তিত্বের প্রতিচ্ছবি। তাই আমরা প্রতিটি পণ্য তৈরিতে সর্বোচ্চ সতর্কতা এবং যত্ন অবলম্বন করি।
            </p>
          </div>
        </div>

        {/* Why Choose Us Icons */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">কেন আমাদের বেছে নেবেন?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Award className="h-8 w-8 text-indigo-600"/>}
              title="উন্নত গুণমান"
              desc="আমরা ব্যবহার করি ১০০% সিজন করা সেগুন ও মেহগনি কাঠ, যা দীর্ঘস্থায়ী।"
            />
            <FeatureCard 
              icon={<Heart className="h-8 w-8 text-indigo-600"/>}
              title="আধুনিক ডিজাইন"
              desc="আমাদের দক্ষ ডিজাইনাররা সবসময় সময়ের সাথে মানানসই ডিজাইন তৈরি করেন।"
            />
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-indigo-600"/>}
              title="কাস্টমাইজেশন"
              desc="আপনার পছন্দ এবং ঘরের মাপ অনুযায়ী ফার্নিচার তৈরির সুব্যবস্থা।"
            />
            <FeatureCard 
              icon={<Clock className="h-8 w-8 text-indigo-600"/>}
              title="দ্রুত ডেলিভারি"
              desc="আমরা কথা দিয়ে কথা রাখি। নির্দিষ্ট সময়ে পণ্য ডেলিভারি নিশ্চিত করি।"
            />
          </div>
        </div>

        {/* Contact Strip */}
        <div className="bg-indigo-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">আপনার স্বপ্নের ফার্নিচার খুঁজছেন?</h2>
          <p className="mb-8 text-indigo-100">আজই আমাদের শোরুমে ভিজিট করুন অথবা অনলাইনে অর্ডার করুন।</p>
          <div className="flex flex-col md:flex-row justify-center gap-6 text-lg font-medium">
             <span>📞 01700-000000</span>
             <span>📍 মিরপুর-১০, ঢাকা</span>
             <span>✉️ info@hamzafurniture.com</span>
          </div>
        </div>

      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <Card className="text-center hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-slate-800">{title}</h3>
        <p className="text-slate-600 text-sm">{desc}</p>
      </CardContent>
    </Card>
  )
}
