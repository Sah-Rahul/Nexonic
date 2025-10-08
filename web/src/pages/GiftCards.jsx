import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import AOS from "aos";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { useEffect } from "react";
import Layout from "../components/Layout";

const GiftCards = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
    AOS.refresh();
  }, []);

  const giftCategories = [
    {
      title: "Movie Night",
      image:
        "https://images-na.ssl-images-amazon.com/images/G/01/GiftCards/GCLP/Q1_2024/BGCLP_D_Movie.jpg",
      description: "Perfect for cinema lovers",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Dining Experience",
      image:
        "https://images-na.ssl-images-amazon.com/images/G/01/GiftCards/GCLP/Q1_2024/BGCLP_D_Restaurant.jpg",
      description: "Treat them to a meal",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Fashion & Style",
      image:
        "https://images-na.ssl-images-amazon.com/images/G/01/GiftCards/GCLP/Q1_2024/BGCLP_D_Style.jpg",
      description: "Latest trends & styles",
      color: "from-blue-500 to-teal-500",
    },
    {
      title: "Travel Adventures",
      image:
        "https://images-na.ssl-images-amazon.com/images/G/01/GiftCards/GCLP/Q1_2024/BGCLP_D_Travel.jpg",
      description: "Explore the world",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <Layout>
      <div className="bg-[#F7FAFD] min-h-screen">
        <div className="h-72">
          <Swiper
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={1000}
            
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper h-full"
          >
            <SwiperSlide>
              <div className="h-full   flex items-center justify-center ">
                <img src="/GiftCard/gift1.jpg" alt="gift" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="h-full flex items-center justify-center  not-last:">
                <img src="/GiftCard/gift2.jpg" alt="gift" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="h-full flex items-center justify-center ">
                <img src="/GiftCard/gift3.jpg" alt="gift" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="md:px-10 p-5">
          <h1 className="md:text-3xl text-3xl  font-bold text-gray-500 mb-8">
            Gift Cards
          </h1>

          {/* Gift Card Description */}
          <div className="max-w-4xl  mb-12">
            <p className="md:text-lg text-sm text-gray-600">
              Give the perfect gift with our Gift Cards! Whether it’s for a
              birthday, anniversary, or just because, our gift cards make the
              perfect present. Choose the amount, and send a thoughtful gift to
              your loved ones today!
            </p>
          </div>

          {/* Gift Categories Grid */}
          <div className="mb-12">
            <h2
              className="text-3xl font-bold text-gray-800 mb-8 text-center"
              data-aos="fade-up"
            >
              Popular Categories
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {giftCategories.map((category, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                    ></div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 transform group-hover:translate-y-[-10px] transition-transform duration-500">
                        {category.title}
                      </h3>
                      <p className="text-white/90 mb-4 transform group-hover:translate-y-[-10px] transition-transform duration-500">
                        {category.description}
                      </p>

                      <button className="bg-white text-gray-800 px-6 py-2 rounded-full font-semibold w-fit opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-gray-100">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GiftCards;
