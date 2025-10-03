import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, quantity } = action.payload;
      state.cart.push({ product, quantity });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(
        (item) => item.product.id !== action.payload.id
      );
      toast.success('item removed from cart ')
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.removeItem("cart");
    },
    updateCartQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => item.product.id === id);
      if (item) item.quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
