import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "../components/Hero";
import NotFound from "../components/NotFound";
import { Toaster } from "react-hot-toast";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
