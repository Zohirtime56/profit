import { createClient } from '@supabase/supabase-js'

// القيم مباشرة كـ Strings بدون process.env
const supabaseUrl = 'https://rkgxdhtxqvfvipcznhbp.supabase.co'
const supabaseAnonKey = 'sb_publishable_hBaDBgljXSw-q24spGbW_A_OtBqj5-9'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

