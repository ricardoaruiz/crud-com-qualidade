import { supabase } from ".";

const SUPABASE_TABLES = {
  TODOS: "todos",
};

export const SUPABASE_ERROR_CODES = {
  NOT_FOUND: "PGRST116",
};

export const SUPABASE_FROM = {
  todos: () => supabase.from(SUPABASE_TABLES.TODOS),
};
