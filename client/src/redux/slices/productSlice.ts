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
  quantity: number; 
  Rating: number
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((p) => p._id !== action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      state.products = state.products.map((p) =>
        p._id === action.payload._id ? action.payload : p
      );
    },
  },
});

export const { setProducts, removeProduct, updateProduct } =
  productSlice.actions;
export default productSlice.reducer;
