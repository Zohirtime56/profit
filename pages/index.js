import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
            referred_by: referralCode || null,
          }
        }
      });
      if (error) alert(error.message);
      else alert('تم إنشاء الحساب! يرجى التحقق من بريدك الإلكتروني.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert('خطأ في البيانات: ' + error.message);
      else router.push('/tasks');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-6 font-sans">
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
        <title>GAMEWIN | دخول - تسجيل</title>
      </Head>

      <div className="w-full max-w-md bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-green-400 tracking-tight">GAMEWIN 🏆</h1>
          <p className="text-gray-400 mt-2">
            {isSignUp ? 'ابدأ رحلة الربح معنا اليوم' : 'عد لمتابعة تجميع نقاطك'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 mr-1">اسم المستخدم</label>
              <input
                type="text"
                placeholder="مثال: zohir_win"
                className="w-full p-4 rounded-2xl bg-gray-900/50 border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 mr-1">البريد الإلكتروني</label>
            <input
              type="email"
              placeholder="name@email.com"
              className="w-full p-4 rounded-2xl bg-gray-900/50 border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 mr-1">كلمة السر</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 rounded-2xl bg-gray-900/50 border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 mr-1">كود الإحالة (اختياري) 🎁</label>
              <input
                type="text"
                placeholder="هل لديك كود دعوة؟"
                className="w-full p-4 rounded-2xl bg-gray-900/50 border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-4 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-900/20 mt-4"
          >
            {loading ? 'جاري المعالجة...' : (isSignUp ? 'إنشاء حساب جديد' : 'تسجيل الدخول')}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-gray-400 hover:text-green-400 text-sm font-semibold transition-colors"
          >
            {isSignUp ? 'لديك حساب بالفعل؟ سجل دخولك' : 'جديد هنا؟ أنشئ حسابك وابدأ الربح'}
          </button>
        </div>
      </div>
    </div>
  );
    }
                  
