import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "../components/Hero";
import NotFound from "../components/NotFound";
import { Toaster } from "react-hot-toast";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import ProtectedRoutes from "../components/ProtectedRoutes";
import PublicRoute from "../components/PublicRoute";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useEffect } from "react";
import ForgotPassword from "../pages/ForgotPassword";
import PasswordReset from "../pages/PasswordReset";
import HomeAppliances from "../pages/HomeAppliances";
import Audiovideo from "../pages/Audiovideo";

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      dispatch(login.fulfilled(JSON.parse(storedUser)));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*   Public routes only when NOT logged in */}
          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/*   Protected routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Hero />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<PasswordReset />} />

          {/* pages routes  */}
          <Route
            path="/appliancess_home"element={<HomeAppliances />}
          />
          <Route
            path="/video_and_audio"element={<Audiovideo />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
