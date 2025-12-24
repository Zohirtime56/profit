import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("خطأ في الدخول: " + error.message);
    } else {
      router.push('/'); // الانتقال للصفحة الرئيسية بعد النجاح
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
      <h1>تسجيل الدخول 🔑</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="البريد الإلكتروني" 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ display: 'block', margin: '15px auto', padding: '12px', borderRadius: '8px', border: 'none', width: '80%' }}
        />
        <input 
          type="password" 
          placeholder="كلمة السر" 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ display: 'block', margin: '15px auto', padding: '12px', borderRadius: '8px', border: 'none', width: '80%' }}
        />
        <button type="submit" style={{ padding: '12px 30px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '20px', fontWeight: 'bold' }}>
          دخول
        </button>
      </form>
    </div>
  );
    }
  
