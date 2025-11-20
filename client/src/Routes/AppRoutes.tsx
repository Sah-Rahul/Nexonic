import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../Auth/ProtectedRoute";
import AdminRoute from "../Auth/AdminRoute";
import AuthBlock from "../Auth/AuthBlock";

// pages
import Hero from "../components/Hero";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import ForgotPassword from "../Auth/ForgotPassword";
import VerifyEmail from "../Auth/VerifyEmail";

// user pages
import HomeAppliances from "../pages/HomeAppliances";
import Audiovideo from "../pages/Audiovideo";
import Refrigerator from "../pages/Refrigerator";
import NewArrivals from "../pages/NewArrivals";
import TodaysDeal from "../pages/TodaysDeal";
import GiftCards from "../pages/GiftCards";
import AirConditioner from "../pages/AirConditioner";
import KitchenAppliances from "../pages/KitchenAppliances";
import PcAndLaptop from "../pages/PcAndLaptop";
import Gadgets from "../pages/Gadgets";
import SmartHome from "../pages/SmartHome";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import ProductDetails from "../Admin/ProductDetails";
import GetCategoryByProducts from "../Admin/GetCategoryByProducts";
import UserProfile from "../components/UserProfile";

// admin pages
import Layout from "@/Admin/Layout";
import Dashboard from "@/Admin/Dashboard";
import Users from "@/Admin/Users";
import Orders from "@/Admin/Orders";
import Products from "@/Admin/Products";
import Calendar from "@/Admin/Calendar";
import Settings from "@/Admin/Settings";
import Category from "@/Admin/Category";
import Profile from "@/Admin/Profile";
import BlockUserPagesForAdmin from "@/Auth/BlockUserPagesForAdmin";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <BlockUserPagesForAdmin>
              <Hero />
            </BlockUserPagesForAdmin>
          }
        />

        <Route
          path="/login"
          element={
            <AuthBlock>
              <Login />
            </AuthBlock>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthBlock>
              <SignUp />
            </AuthBlock>
          }
        />

        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />

        {/* USER PROTECTED ROUTES */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* USER PAGES (public browsing allowed) */}
        <Route path="/appliancess_home" element={<HomeAppliances />} />
        <Route path="/video_and_audio" element={<Audiovideo />} />
        <Route path="/refrigerator" element={<Refrigerator />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/todays-deal" element={<TodaysDeal />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="/conditioner_air" element={<AirConditioner />} />
        <Route path="/appliances_kitchen" element={<KitchenAppliances />} />
        <Route path="/laptop_and_pc" element={<PcAndLaptop />} />
        <Route path="/gadgets" element={<Gadgets />} />
        <Route path="/home-smart" element={<SmartHome />} />
        <Route path="/products-details/:id" element={<ProductDetails />} />
        <Route path="/category/:category" element={<GetCategoryByProducts />} />

        {/* ADMIN PROTECTED ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Layout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="category" element={<Category />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
