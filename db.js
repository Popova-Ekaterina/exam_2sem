const dotenv = require('dotenv');
const db = require('@supabase/supabase-js');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = db.createClient(supabaseUrl, supabaseKey);

module.exports = supabase;