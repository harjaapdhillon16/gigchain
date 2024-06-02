import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  "https://brsoxxuzugtzxcugxjvo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyc294eHV6dWd0enhjdWd4anZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3NTAyNTksImV4cCI6MjAzMjMyNjI1OX0.nPX4r0xksBIfg9-Wd2Husw69Bygk_ddjSC-A-J6ixY4"
);
