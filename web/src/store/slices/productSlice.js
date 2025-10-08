import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosInstance.js";
import { toast } from "react-hot-toast";

//  Fetch All Products
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAll",
  async (
    {
      availability = "",
      price = "",
      category = "",
      ratings = "",
      search = "",
      page = "1",
    },
    thunkApi
  ) => {
    try {
      const params = new URLSearchParams();
      if (availability) params.append("availability", availability);
      if (price) params.append("price", price);
      if (category) params.append("category", category);
      if (ratings) params.append("ratings", ratings);
      if (search) params.append("search", search);
      if (page) params.append("page", page);

      const { data } = await axiosInstance.get(
        `/products?${params.toString()}`
      );
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products");
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

//  Fetch Single Product
export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingle",
  async (id, thunkApi) => {
    try {
      const { data } = await axiosInstance.get(`/get-single-product/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch product");
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

//  Post Review
export const postReview = createAsyncThunk(
  "product/postReview",
  async ({ id, reviewData }, thunkApi) => {
    try {
      const { data } = await axiosInstance.put(
        `/post-new/review/${id}`,
        reviewData
      );
      toast.success("Review posted successfully");
      return data.review;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post review");
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

//   Delete Review
export const deleteReview = createAsyncThunk(
  "product/deleteReview",
  async (id, thunkApi) => {
    try {
      const { data } = await axiosInstance.delete(`/delete/review/${id}`);
      toast.success("Review deleted successfully");
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete review");
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

//   Create Product (Admin)
export const createProduct = createAsyncThunk(
  "product/create",
  async (productData, thunkApi) => {
    try {
      const { data } = await axiosInstance.post("/create-product", productData);
      toast.success("Product created successfully");
      return data.product;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product");
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

//  Update Product (Admin)
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, productData }, thunkApi) => {
    try {
      const { data } = await axiosInstance.put(
        `/product/update/${id}`,
        productData
      );
      toast.success("Product updated successfully");
      return data.product;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

//   Delete Product (Admin)
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkApi) => {
    try {
      await axiosInstance.delete(`/product/delete/${id}`);
      toast.success("Product deleted successfully");
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

//  Product Slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    productDetails: {},
    totalProducts: 0,
    topRatedProducts: [],
    newProducts: [],
    productReviews: [],
    isReviewDeleting: false,
    isPostingReview: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.totalProducts = action.payload.totalProducts || 0;
        state.newProducts = action.payload.newProducts || [];
        state.topRatedProducts = action.payload.topRatedProducts || [];
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.loading = false;
      })

      // Fetch Single Product
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.productDetails = action.payload.product || {};
        state.productReviews = action.payload.reviews || [];
      })

      // Post Review
      .addCase(postReview.pending, (state) => {
        state.isPostingReview = true;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.isPostingReview = false;
        state.productReviews.push(action.payload);
      })
      .addCase(postReview.rejected, (state) => {
        state.isPostingReview = false;
      })

      // Delete Review
      .addCase(deleteReview.pending, (state) => {
        state.isReviewDeleting = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isReviewDeleting = false;
        state.productReviews = state.productReviews.filter(
          (rev) => rev.id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state) => {
        state.isReviewDeleting = false;
      })

      // Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })

      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.products.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.products[idx] = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
