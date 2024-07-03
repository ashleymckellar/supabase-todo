// import { config } from "dotenv"

import { createClient } from '@supabase/supabase-js'
//store in .env
// config()
const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;





//

export const supabase = createClient(supabaseURL, supabaseAnonKey)