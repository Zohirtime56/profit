import { createClient } from '@supabase/supabase-js'

// استدعاء القيم من متغيرات البيئة التي سنضبطها في Vercel لاحقاً
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
