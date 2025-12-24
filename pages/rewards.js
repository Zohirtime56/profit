import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Navbar from '../components/Navbar';

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // جلب بيانات المستخدم ونقاطه
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        let { data: userData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(userData);
      }

      // جلب قائمة الجوائز
      let { data: rewardsData } = await supabase.from('rewards').select('*');
      setRewards(rewardsData || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleRedeem = async (reward) => {
    // 1. التحقق من الرصيد
    if (!profile || profile.points < reward.cost) {
      alert(`عذراً، رصيدك غير كافي. تحتاج إلى ${reward.cost - (profile?.points || 0)} نقطة إضافية. ❌`);
      return;
    }

    // 2. طلب وسيلة التواصل
    const contactInfo = prompt("يرجى إدخال إيميل PayPal أو رقم الهاتف لاستلام الجائزة:");
    
    if (contactInfo) {
      // 3. خصم النقاط من قاعدة البيانات
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ points: profile.points - reward.cost })
        .eq('id', profile.id);

      if (!updateError) {
        // 4. تسجيل الطلب في جدول withdrawals
        await supabase.from('withdrawals').insert([
          { 
            user_id: profile.id, 
            reward_id: reward.id, 
            details: contactInfo,
            status: 'pending' 
          }
        ]);
        
        // تحديث الواجهة فوراً
        setProfile({ ...profile, points: profile.points - reward.cost });
        alert("تم إرسال طلبك بنجاح! سيتم مراجعته قريباً. ✨");
      } else {
        alert("حدث خطأ أثناء معالجة الطلب، حاول مرة أخرى.");
      }
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center font-bold">جاري تحميل المتجر... ⏳</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Navbar />
      <main className="p-6 max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">متجر الجوائز 🏆</h1>
          <p className="text-gray-400">استبدل نقاطك بأفضل المكافآت الحصرية</p>
          <div className="mt-4 inline-block bg-gray-800 px-6 py-2 rounded-full border border-gray-700 text-yellow-400 font-bold">
             رصيدك الحالي: {profile?.points || 0} نقطة 💰
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rewards.map((reward) => (
            <div key={reward.id} className="bg-gray-800 rounded-3xl p-6 border border-gray-700 hover:border-yellow-500 transition-all shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">{reward.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{reward.description}</p>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-6 bg-gray-900/50 py-2 rounded-xl text-center">
                  {reward.cost} <span className="text-xs text-gray-500 uppercase">نقطة</span>
                </div>
                <button 
                  onClick={() => handleRedeem(reward)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black py-4 rounded-2xl shadow-lg transform active:scale-95 transition-all"
                >
                  استبدال الآن 🎁
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
          }
    
