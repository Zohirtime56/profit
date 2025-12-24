import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-gray-800 border-b border-gray-700 shadow-md">
      <div className="text-2xl font-black tracking-tighter text-blue-500">
        GAME<span className="text-white">WIN</span> 🏆
      </div>
      <div className="flex gap-6 text-sm font-bold uppercase tracking-widest text-gray-300">
        <Link href="/" className="hover:text-blue-400 transition">الرئيسية</Link>
        <Link href="/rewards" className="hover:text-blue-400 transition">الجوائز</Link>
        <Link href="/referrals" className="hover:text-blue-400 transition">الإحالات</Link>
      </div>
    </nav>
  );
    }
