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
  quantity: number
}

export interface WishlistProduct extends Product {}

interface WishlistState {
  products: WishlistProduct[];
}

const initialState: WishlistState = {
  products: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<Product>) {
      const exists = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.products.push(action.payload);
      }
    },

    removeFromWishlist(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },

    clearWishlist(state) {
      state.products = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
