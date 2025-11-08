import Home from "../pages/Home";
import Category from "./Category";
import Layout from "./Layout";
import BestDeal from "./BestDeal";
import PromotionsCard from "./PromotionsCard";
import AudioAndVideo from "./AudioAndVideo";
import AirConditioner from "./AirConditioner";
import Banner from "./Banner";
import HomeAppliances from "./HomeAppliances​";
import KitchenAppliances from "./KitchenAppliances​";
import Refrigerator from "./Refrigerator";
import BannerTwo from "./BannerTwo";
import PcAndLaptop from "./PcAndLaptop";
import Gadget from "./Gadget";
import TopBrands from "./TopBrands";
import Testimonial from "./Testimonial";
import BannerThree from "./BannerThree";
import Contact from "./Contact";

const Hero = () => {
  return (
    <>
      <Layout>
        <Home />
        <Category />
        <Banner />
        <BestDeal />
        <PromotionsCard />
        <AudioAndVideo />
        <HomeAppliances />
        <AirConditioner />
        <BannerTwo />
        <KitchenAppliances />
        <Refrigerator />
        <BannerThree />
        <PcAndLaptop />
        <Gadget />
        <TopBrands />
        <Testimonial />
        <Contact />
      </Layout>
    </>
  );
};

export default Hero;
