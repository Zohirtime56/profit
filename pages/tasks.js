import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Tasks() {
  const [points, setPoints] = useState(0);

  // كود افتراضي للمهام (يمكنك تغييره لاحقاً لربطه بمولينيكس)
  const availableTasks = [
    { id: 1, title: "عرض مولينيكس المميز", points: 100, description: "أكمل الاستبيان السريع" },
    { id: 2, title: "مشاهدة فيديو إعلاني", points: 20, description: "شاهد لربح نقاط فورية" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* الرأس - Header */}
      <div className="flex justify-between items-center mb-8 bg-gray-800 p-4 rounded-2xl border border-gray-700 shadow-xl">
        <h1 className="text-2xl font-bold text-green-400">GAMEWIN 🏆</h1>
        <div className="text-right">
          <p className="text-sm text-gray-400">رصيدك الحالي</p>
          <p className="text-xl font-bold">💰 {points} نقطة</p>
        </div>
      </div>

      <h2 className="text-3xl font-extrabold mb-6 text-center">مركز المهام 🎮</h2>

      {/* قائمة المهام - Task List */}
      <div className="grid gap-6">
        {availableTasks.map((task) => (
          <div key={task.id} className="bg-gray-800 p-5 rounded-2xl border border-gray-700 hover:border-green-500 transition-all shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold mb-1">{task.title}</h3>
                <p className="text-gray-400 text-sm">{task.description}</p>
              </div>
              <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                +{task.points}
              </div>
            </div>
            <button className="w-full mt-4 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-colors">
              ابدأ المهمة الآن
            </button>
          </div>
        ))}
      </div>

      {/* قسم خاص لـ Moneylix مستقبلاً */}
      <div className="mt-10 p-6 border-2 border-dashed border-gray-700 rounded-2xl text-center">
        <p className="text-gray-500 italic">هنا ستظهر جدران العروض (Offerwalls) من مولينيكس</p>
      </div>
    </div>
  );
}

