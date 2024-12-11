const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gpvbthynahjszfayotfw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwdmJ0aHluYWhqc3pmYXlvdGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMjY3NzgsImV4cCI6MjA0ODkwMjc3OH0.zMRwswKOHimYX9NMpH3HuTXF9rDLtZu_GF4sne3zZvc'; // Vervang door jouw public anon key
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
