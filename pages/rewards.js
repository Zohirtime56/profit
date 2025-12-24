  const handleRedeem = async (reward) => {
    // 1. التحقق من الرصيد الحالي للمستخدم
    if (profile.points < reward.cost) {
      alert(`رصيدك غير كافي. تحتاج إلى ${reward.cost - profile.points} نقطة إضافية للحصول على هذه الجائزة. استمر في إنجاز المهام! 🚀`);
      return;
    }

    // 2. طلب وسيلة التواصل إذا كان الرصيد كافياً
    const contactInfo = prompt("يرجى إدخال بريدك الإلكتروني أو رقمك لاستلام الجائزة:");
    
    if (contactInfo) {
      // 3. خصم النقاط وتحديث قاعدة البيانات
      const newPoints = profile.points - reward.cost;
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ points: newPoints })
        .eq('id', profile.id);

      if (!updateError) {
        // 4. تسجيل طلب السحب في جدول withdrawals
        await supabase.from('withdrawals').insert([
          { 
            user_id: profile.id, 
            reward_id: reward.id, 
            details: contactInfo,
            status: 'pending' 
          }
        ]);
        
        setProfile({ ...profile, points: newPoints });
        alert("تم إرسال طلبك بنجاح! سيتم مراجعته وإرسال الجائزة لك قريباً. ✨");
      }
    }
  };
