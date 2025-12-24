import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Navbar from '../components/Navbar';

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      // جلب الجوائز من جدول rewards الذي أنشأناه في قاعدة البيانات
      let { data, error } = await supabase.from('rewards').select('*');
      if (!error) setRewards(data);
      setLoading(false);
    };
    fetchRewards();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="p-6 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8 text-yellow-500">متجر الجوائز 🎁</h1>
        
        {loading ? <p>جاري تحميل الجوائز...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rewards.length > 0 ? rewards.map((reward) => (
              <div key={reward.id} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                <h3 className="text-xl font-bold mb-2">{reward.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{reward.description}</p>
                <div className="text-blue-400 font-bold mb-4">{reward.cost} نقطة</div>
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition font-bold w-full">
                  استبدال الآن
                </button>
              </div>
            )) : <p className="col-span-3 text-gray-500">لا توجد جوائز متاحة حالياً.</p>}
          </div>
        )}
      </main>
    </div>
  );
          }
