import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "../components/Hero";
import NotFound from "../components/NotFound";
import { Toaster } from "react-hot-toast";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
