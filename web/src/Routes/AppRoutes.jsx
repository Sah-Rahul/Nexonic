import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Hero from "../components/Hero";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
