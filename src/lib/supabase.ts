import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  notes: string | null;
}

interface VolunteerRequest {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  availability: string | null;
  motivation: string | null;
  status: string;
  notes: string | null;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;
let configError: string | null = null;

if (!supabaseUrl || !supabaseKey) {
  configError = 'Configurazione Supabase mancante. Controlla le variabili d\'ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.';
  console.error('[Supabase]', configError);
} else {
  try {
    client = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: true },
    });
  } catch (err) {
    configError = 'Errore durante l\'inizializzazione di Supabase.';
    console.error('[Supabase] Init error:', err);
  }
}

export const supabase = client;
export const getSupabaseError = () => configError;
export type { ContactMessage, VolunteerRequest };
