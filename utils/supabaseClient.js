import { createClient } from '@supabase/supabase-js'

// إعداد رابط المشروع ومفتاح الوصول العام
const supabaseUrl = 'https://rkgxdhtxqvfvipcznhbp.supabase.co'
const supabaseAnonKey = 'sb_publishable_hBaDBgljXSw-q24spGbW_A_OtBqj5-9'

// إنشاء العميل للاتصال بـ Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

