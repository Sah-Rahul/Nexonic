import { BrowserRouter, Route, Routes } from "react-router-dom";
import Apple from "../pages/Apple"
import Rahul from "../pages/Rahul"
import Hero from "../components/Hero";
const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/as" element={<Apple />} />
          <Route path="/op" element={<Rahul />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
