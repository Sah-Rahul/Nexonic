import React from "react"
import { Link } from "react-router-dom";
import airconditioner from "../AlllJsonData/AirConditioner/AirConditioner.json";
import audiodata from "../AlllJsonData/audioandvideo/audioandvideo.json";
import gadgetdata from "../AlllJsonData/Gadget/Gadget.json";
import homedata from "../AlllJsonData/HomeAppliances/HomeAppliances.json";
import kitchendata from "../AlllJsonData/kitchen/kitchen.json";
import pcandlaptopdata from "../AlllJsonData/PcAndLaptop/PcAndLaptop.json";
import refrigeratordata from "../AlllJsonData/Refrigerator/Refrigerator.json";
import smarthomedata from "../AlllJsonData/SmartHome/Smarthome.json";
import { useTheme } from "../context/ThemeContext";

const Category = () => {
  const { themeColor } = useTheme();

  const categories = [
    {
      id: 1,
      img: "/images/Air.jpg",
      title: "Air CONDITIONER",
      link: "/conditioner_air",
      dataLength: airconditioner.length,
    },
    {
      id: 2,
      img: "/images/TV.jpg",
      title: "AUDIO & VIDEO",
      link: "/video_and_audio",
      dataLength: audiodata.length,
    },
    {
      id: 3,
      img: "/images/Mobile.jpg",
      title: "GADGETS",
      link: "/gadgets",
      dataLength: gadgetdata.length,
    },
    {
      id: 4,
      img: "/images/Home.jpg",
      title: "Home APPLIANCES",
      link: "/appliancess_home",
      dataLength: homedata.length,
    },
    {
      id: 5,
      img: "/images/Kitchen.jpg",
      title: "KITCHEN APPLIANCES",
      link: "/appliances_kitchen",
      dataLength: kitchendata.length,
    },
    {
      id: 6,
      img: "/images/Laptop.jpg",
      title: "PCS & LAPTOP",
      link: "/laptop_and_pc",
      dataLength: pcandlaptopdata.length,
    },
    {
      id: 7,
      img: "/images/Fridge.jpg",
      title: "REFRIGERATOR",
      link: "/refrigerator",
      dataLength: refrigeratordata.length,
    },
    {
      id: 8,
      img: "/images/Speaker.jpg",
      title: "SMART HOME",
      link: "/home_smart",
      dataLength: smarthomedata.length,
    },
  ];

  return (
    <>
      <div  className="md:p-10 relative p-5 bg-[#e8eef3] min-h-screen">
        <div>
          <div className="absolute top-20 left-25">
            <h2 style={{ color: themeColor }} className="font-bold  text-2xl">
              Shop by Category
            </h2>
          </div>
          <div className="h-full border-gray-200 border flex items-center flex-wrap justify-between mt-5 bg-white">
            {categories.map((item, index) => (
              <div
                key={index}
                className="md:h-[25vw] w-64 mb-6 flex justify-center items-center mx-auto"
              >
                <Link
                  to={item.link}
                  className="flex flex-col md:items-center items-center text-center"
                >
                  <img src={item.img} alt={item.title} className="mx-auto" />
                  <span className="text-sm font-bold">{item.title}</span>
                  <span className="text-gray-400 font-semibold">
                    {item.dataLength} products
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="h-44 mt-14 flex flex-col md:flex-row items-center gap-5">
          <div className="h-full md:w-1/2 w-full">
            <img
              className="h-full w-full object-cover"
              src="/images/electronic-banner-2.jpg"
              alt=""
            />
          </div>
          <div className="h-full md:w-1/2 w-full">
            <img
              className="h-full w-full object-cover"
              src="/images/electronic-banner-1.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
