import { Extra, Size } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type CartItem = {
  name: string;
  id: string;
  image: string;
  basePrice: number;
  quantity?: number;
  size?: Size;
  extras?: Extra[];
};

type CartState = {
  items: CartItem[];
};

const getInitialCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

const initialState: CartState = {
  items: getInitialCart(),
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        existingItem.size = action.payload.size;
        existingItem.extras = action.payload.extras;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          item.quantity! -= 1;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      // Removed localStorage.setItem from reducer for SSR safety
    },
  }

})

export default cartSlice.reducer;

export const selectItemsState = (state: RootState) => state.cart.items;
export const { addCartItem, removeCartItem, clearCart, removeItemFromCart } = cartSlice.actions;