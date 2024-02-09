import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface UserState {
  user: User | undefined;
}

export const useUser = create<UserState>()((set) => ({
  user: undefined,
}));
