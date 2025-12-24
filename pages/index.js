import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar'; // سننشئه في الخطوة القادمة

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
        // جلب بيانات البروفايل (النقاط وكود الإحالة)
        let { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(data);
      }
    };
    getUserData();
  }, []);

  if (!profile) return <div className="loading">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Navbar />
      
      <main className="p-6 max-w-4xl mx-auto">
        {/* بطاقة الرصيد - تصميم أنيق */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 shadow-2xl mb-8 text-center">
          <p className="text-blue-100 text-lg">رصيدك الحالي 💰</p>
          <h2 className="text-5xl font-bold mt-2">{profile.points} <span className="text-xl">نقطة</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* قسم المهام */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              🎮 مهام اليوم
            </h3>
            <p className="text-gray-400">لا توجد مهام متاحة حالياً، عد لاحقاً!</p>
          </div>

          {/* قسم الإحالة */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-2">🔗 كسب النقاط عبر الإحالة</h3>
            <p className="text-gray-400 text-sm mb-4">شارك كودك مع أصدقائك واحصل على 50 نقطة لكل صديق!</p>
            <div className="bg-gray-900 p-3 rounded-lg border border-dashed border-blue-500 text-center font-mono text-blue-400">
              {profile.referral_code}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
    }
    
