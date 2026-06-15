import { create } from "zustand";

type User = {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
};

type State = {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
};

export const useUserStore = create<State>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user, loading: false }),
  clearUser: () => set({ user: null, loading: false }),
  setLoading: (loading) => set({ loading }),
}));
