import {createClient} from "@supabase/supabase-js"

//export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export const supabase = createClient("https://fgrbobbhvvwehmkekzjx.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZncmJvYmJodnZ3ZWhta2Vremp4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMzYyNDkyNywiZXhwIjoyMDI5MjAwOTI3fQ.DI0TU_E-RP7gIj8afljx-4tSGeIWm5D_qLHBvFOVi08");