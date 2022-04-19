import { createClient } from '@supabase/supabase-js'

// require('dotenv').config()
// console.log(process.env)

// Database URL and Key
const supabaseUrl = 'https://vkmtcvqheexcvbnvlamo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrbXRjdnFoZWV4Y3ZibnZsYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc3MDU0NTYsImV4cCI6MTk2MzI4MTQ1Nn0.QwtEDMILpjwIZMRjNuWWw19CSpq8SaR-ZnfP_Fv9YKA'
// const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL

// Export the variable to be used in other files
export const supabase = createClient(supabaseUrl, supabaseKey)