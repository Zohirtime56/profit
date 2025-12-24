
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false); // للتبديل بين الدخول والتسجيل
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // دالة التعامل مع الدخول أو التسجيل
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      // عملية إنشاء حساب جديد
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
            referred_by: referralCode || null, // اختياري
          }
        }
      });
      if (error) alert(error.message);
      else alert('تم إنشاء الحساب! يرجى التحقق من بريدك الإلكتروني (إن وجد تفعيل).');
    } else {
      // عملية تسجيل الدخول
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert('خطأ في البيانات: ' + error.message);
      else router.push('/tasks'); // الانتقال لصفحة المهام عند النجاح
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700">
        <h1 className="text-4xl font-extrabold text-center text-green-400 mb-2">GAMEWIN 🏆</h1>
        <p className="text-gray-400 text-center mb-8">
          {isSignUp ? 'أنشئ حسابك وابدأ الربح الآن' : 'سجل دخولك لمتابعة مهامك'}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-1">اسم المستخدم</label>
              <input
                type="text"
                placeholder="اختر اسماً مميزاً"
                className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">كلمة السر</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-1">كود الإحالة (اختياري)</label>
              <input
                type="text"
                placeholder="هل لديك كود دعوة؟"
                className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 focus:border-green-500 outline-none"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-900/20"
          >
            {loading ? 'جاري التحميل...' : (isSignUp ? 'إنشاء حساب' : 'دخول')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
          >
            {isSignUp ? 'لديك حساب بالفعل؟ سجل دخولك' : 'ليس لديك حساب؟ أنشئ حساباً جديداً'}
          </button>
        </div>
      </div>
    </div>
  );
    }
    
