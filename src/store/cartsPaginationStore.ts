import { create } from 'zustand';

type CartsPaginationState = {
  page: number;
  limit: number;
  userIdFilter: string;
};

type CartsPaginationActions = {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setUserIdFilter: (userIdFilter: string) => void;
};

type CartsPaginationStore = CartsPaginationState & CartsPaginationActions;

export const useCartsPaginationStore = create<CartsPaginationStore>((set) => ({
  page: 1,
  limit: 10,
  userIdFilter: '',
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }),
  setUserIdFilter: (userIdFilter) => set({ userIdFilter, page: 1 }),
}));
