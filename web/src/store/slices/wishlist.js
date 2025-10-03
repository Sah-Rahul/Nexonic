import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    addToWishlist(state, action) {
      const product = action.payload;
      const exists = state.wishlist.find((item) => item.id === product.id);
      if (!exists) {
        state.wishlist.push(product);
      }
    },

    removeFromWishlist(state, action) {
      const id = action.payload;
      state.wishlist = state.wishlist.filter((item) => item.id !== id);
    },

    clearWishlist(state) {
      state.wishlist = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
