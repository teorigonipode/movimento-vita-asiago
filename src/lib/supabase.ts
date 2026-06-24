import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: ReturnType<typeof createClient> | null = null;
let configError: string | null = null;

if (!supabaseUrl || !supabaseKey) {
  configError = 'Configurazione Supabase mancante. Controlla le variabili d\'ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.';
  console.error('[Supabase]', configError);
} else {
  try {
    client = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });
  } catch (err) {
    configError = 'Errore durante l\'inizializzazione di Supabase.';
    console.error('[Supabase] Init error:', err);
  }
}

export const supabase = client;
export const getSupabaseError = () => configError;
