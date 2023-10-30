import { create } from 'zustand';

export const useJsonStore = create((set) => ({
    cartData: [],
    addInCartData: (jsonData) =>
        set((state) => ({
            cartData: [...state.cartData, jsonData],
        })),
    clearCartData: () => set({ cartData: [] }),
    updateCartData: (newCartData) =>
        set((state) => ({
            cartData: newCartData,
        })),
}));