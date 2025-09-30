import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosInstance.js";
import { toast } from "react-hot-toast";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    productDetails: {},
    totalProducts: 0,
    topRatedProducts: [],
    newProducts: [],
    aiSearching: false,
    isReviewDeleting: false,
    isPostingReview: false,
    productReviews: [],
  },
  extraReducers: (builder) => {},
});

export default productSlice.reducer;
