import React from "react";
import { useTheme } from "../context/ThemeContext";

const Testimonial = () => {
  const { themeColor } = useTheme();
  const testimony = [
    {
      rating: "★★★★★",
      description:
        "I bought a Bluetooth speaker from this store and the sound quality is just amazing. Totally worth the price. Delivery was super quick too!",
      img: "/images/testimony1.jpg",
      name: "Rahul Sah",
    },
    {
      rating: "★★★★☆",
      description:
        "Purchased a pair of wireless earbuds. Battery life is great and the audio is crystal clear. Only wish the case was a bit more compact.",
      img: "/images/testimony2.jpg",
      name: "Riya Sah",
    },
    {
      rating: "★★★★★",
      description:
        "Ordered a gaming mouse and keyboard combo. The RGB lighting looks sick and the performance is spot-on. Highly recommended for gamers!",
      img: "/images/testimony3.jpg",
      name: "Sagar Yadav",
    },
    {
      rating: "★★★★★",
      description:
        "Bought a smartwatch during the sale and it works flawlessly. Tracks my steps and notifications perfectly. Great deal for the price!",
      img: "/images/testimony4.jpg",
      name: "Raj nandini",
    },
    {
      rating: "★★★★☆",
      description:
        "Got a new power bank and charger. Fast charging really works. Only thing is the cable wasn’t included, but otherwise excellent product.",
      img: "/images/testimony5.jpg",
      name: "Priti sah",
    },
    {
      rating: "★★★★★",
      description:
        "I ordered a laptop for work, and it was delivered within 3 days. Packaging was secure, and the system runs very smoothly. Will shop again!",
      img: "/images/testimony6.jpg",
      name: "Amit Tiwari",
    },
  ];

  return (
    <>
      <div className="md:px-10  p-5 flex items-center justify-center min-h-screen bg-[#F7FAFD]">
        <div className="h-full  w-full md:pt-10 pt-2">
          <h1 style={{ color: themeColor }} className=" font-bold text-2xl">
            What is everyone saying?
          </h1>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
            {testimony.map((item, index) => (
              <div
                key={index}
                style={{ color: themeColor }}
                className="md:h-[25vw] pt-16 rounded-sm md:w-[29vw] flex flex-col items-start bg-white text-black p-4 space-y-4"
              >
                <span className="text-[18px]">{item.rating}</span>
                <p className="text-gray-500">{item.description}</p>
                <div className="flex items-center gap-5">
                  <img
                    src={item.img}
                    alt="User"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <label htmlFor="" className="font-semibold">
                    {item.name}{" "}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
