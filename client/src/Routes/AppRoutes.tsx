import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "../components/Hero";
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
import Login from "../Auth/Login";
import ForgotPassword from "../Auth/ForgotPassword";
import SignUp from "../Auth/SignUp";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          // pages routes
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
