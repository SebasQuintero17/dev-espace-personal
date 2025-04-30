// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Reemplaza estos valores con los tuyos de Supabase
const supabaseUrl = 'https://dsremnzvkxlgloasqmkn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzcmVtbnp2a3hsZ2xvYXNxbWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNjc5ODcsImV4cCI6MjA2MDY0Mzk4N30.3nqLpJAHccVv6zFTv6l4pRgflDbqGN-VxVrlO7jPUV4';

const supabase = createClient(supabaseUrl, supabaseKey);

// Exportación con nombre
export { supabase };
