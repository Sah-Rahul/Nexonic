import AOS from "aos";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import dealdata from "../AlllJsonData/TodayDeals/TodayDeals.json";
import comingsoondata from "../AlllJsonData/TodayDeals/comingSoon.json";

const TodaysDeal = () => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetTime = new Date().setHours(24, 0, 0, 0);
    const updateClock = () => {
      const currentTime = new Date().getTime();
      const difference = targetTime - currentTime;

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTime({ hours, minutes, seconds });
    };

    const timer = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <Layout>
        <div className="bg-[#F7FAFD] min-h-screen py-8">
          <div>
            <div className="px-4 sm:px-6 lg:px-10 mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-500">
                Today's Deals
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Grab the best deals of the day, available for a limited time
                only. Shop now and save big!
              </p>
            </div>

            <div className="flex gap-4 flex-wrap justify-center">
              {dealdata.map((item) => (
                <div
                  data-aos="fade-up"
                  key={item.id}
                  className="px-4 sm:px-6 overflow-hidden relative md:h-[45vw] md:w-[90vw] sm:h-[40vw] sm:w-[42vw] lg:h-[30vw] lg:w-[22vw] group"
                >
                  <div className="flex flex-col items-center">
                    <Link to={`/products-details/${item.id}`}>
                      <img
                        src={item.img}
                        alt={item.name}
                        className="h-44 sm:h-48 lg:h-52 object-cover transition-all duration-300 ease-in-out"
                      />
                    </Link>
                    <div className="flex flex-col">
                      <Link to={`/todaydealsdetails/${item.id}`}>
                        <span className="pt-2 text-sm sm:text-base lg:text-xl text-yellow-400">
                          {item.rating}
                        </span>
                        <span className="pt-2 font-bold text-sm sm:text-base lg:text-lg">
                          {item.name.slice(0, 70)}...
                        </span>
                      </Link>

                      <div className="pt-5 flex gap-3 text-xs sm:text-sm lg:text-base">
                        <label className="font-semibold">
                          Rs
                          {(
                            item.price -
                            (item.price * item.discount) / 100
                          ).toFixed()}
                        </label>
                        <del className="text-gray-600">Rs{item.price}</del>
                        <label className="text-red-600">
                          ({item.discount}% OFF)
                        </label>
                      </div>
                    </div>
                  </div>

                  <span className="py-2 px-4 sm:px-6 font-bold rounded-full bg-white text-blue-500 shadow-md text-xs sm:text-sm absolute top-3 left-3">
                    {item.discount}% off
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-10 h-64 sm:h-80 lg:h-96 relative mt-16 w-full bg-[url('/images/deal-banner.avif')] bg-no-repeat bg-cover flex items-center sm:items-start sm:justify-start justify-center">
            <div className="md:mt-36 font-serif text-blue-50 flex items-center gap-8 sm:gap-16 text-center sm:text-left">
              {["Hours", "Minutes", "Seconds"].map((label, index) => (
                <div key={label} className="flex flex-col">
                  <span className="text-4xl sm:text-6xl lg:text-7xl font-bold">
                    {index === 0
                      ? time.hours
                      : index === 1
                      ? time.minutes
                      : time.seconds}
                  </span>
                  <span className="font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <div className="px-4 sm:px-6 lg:px-10 mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-500">
                Coming Soon
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Exciting deals are just around the corner! Stay tuned as we
                prepare to bring you incredible discounts and exclusive offers.
                Get ready to save big—coming soon!
              </p>
            </div>

            <div className="md:px2 px-5 flex gap-4 flex-wrap justify-center">
              {comingsoondata.map((item) => (
                <div
                  data-aos="fade-up"
                  className=" sm:px-6 overflow-hidden relative md:h-[50vw] md:w-[90vw] sm:h-[40vw] sm:w-[42vw] lg:h-[30vw] lg:w-[22vw] group"
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-44 sm:h-48 lg:h-52 object-cover transition-all duration-300 ease-in-out"
                    />
                    <div className="flex flex-col">
                      <span className="pt-2 text-sm sm:text-base lg:text-xl text-yellow-400">
                        {item.rating}
                      </span>
                      <span className="pt-2 font-bold text-sm sm:text-base lg:text-lg">
                        {item.name.slice(0, 60)}...
                      </span>

                      <div className="pt-5 flex gap-3 text-xs sm:text-sm lg:text-base">
                        <label className="font-semibold">Rs{item.price}</label>
                      </div>
                    </div>
                  </div>

                  <span className="py-2 px-4 sm:px-6 font-bold rounded-full bg-white text-blue-500 shadow-md text-xs sm:text-sm absolute top-3 left-3">
                    Coming Soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TodaysDeal;
