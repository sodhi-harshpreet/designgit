require('dotenv').config(); // ✅ Make sure this is FIRST

const { createClient } = require('@supabase/supabase-js');

console.log('KEY:', process.env.SUPABASE_KEY); // ✅ Debug check

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = supabase;
