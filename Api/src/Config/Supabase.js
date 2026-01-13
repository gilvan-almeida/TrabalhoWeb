const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("URL do Supabase carregada:", supabaseUrl ? "SIM" : "NÃO");
console.log("Key do Supabase carregada:", supabaseKey ? "SIM" : "NÃO");

if (!supabaseUrl || !supabaseKey) {
    throw new Error(`Configuração ausente: URL=${!!supabaseUrl}, KEY=${!!supabaseKey}`);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseKey);

module.exports = { supabase, supabaseAdmin };