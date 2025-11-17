import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  keyFeatures: string[];
  productImage: string;
  category: string;
}

export interface CartProduct extends Product {
  quantity: number;
}

interface CartState {
  products: CartProduct[];
}

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingProduct = state.products.find(
        (p) => p._id === action.payload._id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    increaseQuantity(state, action: PayloadAction<string>) {
      const product = state.products.find((p) => p._id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },

    decreaseQuantity(state, action: PayloadAction<string>) {
      const product = state.products.find((p) => p._id === action.payload);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.products = state.products.filter(
            (p) => p._id !== action.payload
          );
        }
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },

    clearCart(state) {
      state.products = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
