import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Navbar from '../components/Navbar';

export default function Tasks() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        let { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(data);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-500">مركز المهام 🎮</h1>
        
        {/* مكان عرض الرصيد */}
        <div className="bg-gray-800 p-4 rounded-xl mb-8 text-center border border-gray-700">
           رصيدك الحالي: <span className="text-yellow-400 font-bold">{profile?.points || 0} نقطة</span> 💰
        </div>

        {/* مكان جدار العروض (سأضع لك الكود هنا لاحقاً) */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl min-h-[800px]">
           {/* Monlix Iframe will go here */}
        </div>
      </main>
    </div>
  );
            }
    
