import Layout from "./Layout";
import Home from "../pages/Home";
import Category from "./Category";
import BestDeal from "./bestDeal";
import Video from "./Video";
import HomeAppliances from "./HomeAppliances​";
import ShowCase from "./ShowCase";
import KitchenAppliances from "./KitchenAppliances​";
import Refrigerator from "./Refrigerator";
import PCLaptop from "./PCLaptop";
import Gadget from "./Gadget​";
import TopBrands from "./TopBrands";
import Testimonial from "./Testimonial";
import Contact from "./Contact";
import AirConditioner from "./AirConditioner";
import BannerOne from "./BannerOne";
import PromotionsCard from "./PromotionsCard";

const Hero = () => {
  return (
    <Layout>
      <Home />
      <Category />
      <BestDeal />
      <PromotionsCard />
      <Video />
      <HomeAppliances />
      <AirConditioner />
      <ShowCase />
      <KitchenAppliances />
      <Refrigerator />
      <BannerOne />
      <PCLaptop />
      <Gadget />
      <TopBrands />
      <Testimonial />
      <Contact />
    </Layout>
  );
};

export default Hero;
