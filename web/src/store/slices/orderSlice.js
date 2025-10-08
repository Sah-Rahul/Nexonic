import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosInstance.js";
import { toast } from "react-hot-toast";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    fetchingOrders: false,
    placingOrder: false,
    finalPrice: null,
    orderStep: 1,
    paymentIntent: "",
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default orderSlice.reducer;
export const {} = orderSlice.actions;
