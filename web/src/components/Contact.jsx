import React from "react";
import { LuMailOpen } from "react-icons/lu";

const Contact = () => {
  return (
    <>
      <div className="h-96 bg-red-500 flex flex-col">
        <div className="  h-full px-14 flex items-center justify-between bg-white">
          {/* Expert Advice Section */}
          <div className="text-left mb-6 md:mb-0">
            <p className="text-sm text-gray-600">Expert advice</p>
            <p className="h-[1px] bg-black"></p>
            <h2 className="text-2xl font-bold text-gray-600">123-456-7890</h2>
          </div>

          {/* Customer Service Section */}
          <div className="text-left mb-6 md:mb-0">
            <p className="text-sm text-gray-600">Customer service</p>
            <p className="h-[1px] bg-black"></p>
            <h2 className="text-2xl font-bold text-gray-600">1-222-345-6789</h2>
          </div>

          {/* Contact Us Section */}
          <div className="text-left mb-6 md:mb-0">
            <p className="text-sm text-gray-600">Have any questions?</p>
            <p className="h-[1px] bg-black"></p>
            <h2 className="text-2xl font-bold text-gray-600">Contact us</h2>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-auto">
            <img
              src="/images/support-team.png"
              alt="Support Team"
              className="w-full md:h-[17vw]  object-cover"
            />
          </div>
        </div>

        <div className="h-full flex items-center justify-between px-14  bg-blue-500">
          <div className="md:flex flex gap-3 items-center justify-center">
            <LuMailOpen className="md:text-6xl text-white text-center text-4xl" />
            <div>
              <span className="text-2xl text-white  font-bold">
                Subscribe to
              </span>
              <h1 className="font-bold text-2xl text-white">our newsletter</h1>
            </div>
          </div>

          <span className="border-r-2 h-24 text-white"></span>

          <div>
            <p className="text-white text-center md:text-left">
              Sign up for all the latest news <br /> and special offers
            </p>
          </div>

          <div className="md:flex gap-5 items-center mt-4 md:mt-0">
            {/* Email input */}
            <input
              className="px-4 h-14 w-full md:w-[25vw] border border-gray-300  focus:outline-none text-white focus:ring-2 focus:ring-blue-500 transition duration-300"
              type="text"
              placeholder="Your email"
            />
            {/* Subscribe button */}
            <button className="px-4 md:mb-0 mb-5 md:mt-0 mt-4 h-14 md:w-fit w-full  border border-gray-300 cursor-pointer  text-black font-bold focus:outline-none focus:ring-2 bg-white   transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
