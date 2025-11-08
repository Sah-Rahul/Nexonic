import Layout from "../components/Layout";
import NewArrival from "../AlllJsonData/NewArrivals/NewArrivals.json";
import { MdPlayArrow } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { Heart } from "lucide-react";

interface NewArrivalItem {
  id: string | number;
  name: string;
  img: string;
  price: number;
  rating: string;
  discount: number;
}

const NewArrivals = () => {
  const { themeColor } = useTheme();
  const [hoveredItemId, setHoveredItemId] = useState<string | number | null>(
    null
  );

  const handleMouseEnter = (id: string | number) => {
    setHoveredItemId(id);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#f6fbfd]">
        <div className="px-14 h-46 border-b border-gray-300   flex items-center justify-between   mx-auto    ">
          <div className="h-full w-1/2 flex items-center  ">
            <h1 className="text-6xl font-extrabold text-[#27323f] whitespace-nowrap">
              New arrivals
            </h1>
          </div>
          <div className="w-px h-24 bg-gray-400"></div>

          <div className="h-full ml-5 w-1/2 flex items-center  ">
            <p className="text-gray-600 max-w-xl">
              Discover the latest trends and innovations in our new arrivals
              collection. Fresh styles, cutting-edge technology, and unbeatable
              quality — just for you.
            </p>
          </div>
        </div>

        <div className="h-full px-5">
          <div className="h-76 flex items-center justify-between mx-auto gap-6 border-b mt-16 border-gray-300">
            <div className="h-62 w-1/2 flex items-center justify-center relative">
              <img
                src="/images/showcase1.jpg"
                alt="banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <h1 className="text-3xl md:text-2xl font-bold mb-3">
                  The only case you need.
                </h1>
                <div className="w-24 h-1 bg-white mb-3"></div>
                <button className="text-base md:text-lg font-semibold underline">
                  Shop Now
                </button>
              </div>
            </div>

            <div className="h-62 w-1/2 flex items-center justify-center relative">
              <img
                src="/images/showcase2.jpg"
                alt="banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <h1 className="text-3xl md:text-2xl font-bold mb-3">
                  The only case you need.
                </h1>
                <div className="w-24 h-1 bg-white mb-3"></div>
                <button className="text-base md:text-lg font-semibold underline">
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          <div className="h-full mt-10 border border-gray-300">
            <div className="relative p-5 bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {(NewArrival as NewArrivalItem[]).map((item) => (
                <div
                  key={item.id}
                  data-aos="fade-up"
                  className="relative group   mt-10  hover:shadow-xl transition-all duration-300"
                >
                  <Badge.Ribbon
                    text="Sale"
                    color={themeColor}
                    style={{
                      fontWeight: "bold",
                      padding: "0 10px",
                      boxShadow: "0 0 2px rgba(0,0,0,0.2)",
                    }}
                    className="absolute top-0 right-5"
                  />
                  <div className="flex    flex-col items-center">
                    <Link to={`/productsdetails/${item.id}`}>
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full  h-64  object-contain p-4 transition-all duration-300 ease-in-out"
                      />
                    </Link>

                    <Link to={`/productsdetails/${item.id}`}>
                      <div className="px-6 flex flex-col text-center">
                        <span
                          className="pt-2 text-xl text-left"
                          style={{ color: themeColor }}
                        >
                          {item.rating}
                        </span>
                        <span className="pt-2 md:text-lg text-sm font-bold">
                          {item.name.slice(0, 70)}...
                        </span>

                        <div className="pt-4 flex justify-center items-center gap-3">
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
                    </Link>
                  </div>

                  <div
                    style={{ backgroundColor: themeColor }}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                    className="h-8 w-8 mt-22 flex items-center justify-center font-bold rounded-full text-white text-xs absolute top-3 right-[-30px] opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300 ease-in-out"
                  >
                    <button>
                      <BsCart4 className="text-xl cursor-pointer" />
                    </button>
                  </div>

                  {hoveredItemId === item.id && (
                    <div className="flex items-center absolute top-26 right-[45px]">
                      <span
                        style={{ backgroundColor: themeColor }}
                        className="text-xs px-2 py-1 text-white shadow-md"
                      >
                        Add to Cart
                      </span>
                      <MdPlayArrow
                        style={{ color: themeColor }}
                        className="text-xl"
                      />
                    </div>
                  )}

                  <div
                    style={{ backgroundColor: themeColor }}
                    className="h-8 w-8 flex items-center justify-center font-bold rounded-full text-white text-xs absolute top-14 right-[-30px] opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    <Heart className="w-4 h-4" />
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

export default NewArrivals;
