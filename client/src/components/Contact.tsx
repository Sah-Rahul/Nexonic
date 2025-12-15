import { LuMailOpen } from "react-icons/lu";
import { useTheme } from "../context/ThemeContext";

const Contact = () => {
  const { themeColor } = useTheme();

  return (
    <div className="w-full">
      <div className="bg-white px-6 md:px-14 py-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-10">
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <div>
              <p className="text-sm text-gray-600">Expert advice</p>
              <div className="h-1px bg-gray-300 my-1 mx-auto md:mx-0 w-12" />
              <h2
                style={{ color: themeColor }}
                className="text-xl md:text-2xl font-bold"
              >
                123-456-7890
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-600">Customer service</p>
              <div className="h-1px bg-gray-300 my-1 mx-auto md:mx-0 w-12" />
              <h2
                style={{ color: themeColor }}
                className="text-xl md:text-2xl font-bold"
              >
                1-222-345-6789
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-600">Have any questions?</p>
              <div className="h-1px bg-gray-300 my-1 mx-auto md:mx-0 w-12" />
              <h2
                style={{ color: themeColor }}
                className="text-xl md:text-2xl font-bold"
              >
                Contact us
              </h2>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/images/support-team.png"
              alt="Support Team"
              className="w-full max-w-sm md:max-w-full h-auto md:h-[18vw] object-contain"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-500 px-6 md:px-14 py-10">
        <div className="flex flex-col md:flex-row items-center gap-8 justify-between text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <LuMailOpen className="text-white text-4xl md:text-6xl" />
            <div>
              <p className="text-xl md:text-2xl text-white font-bold">
                Subscribe to
              </p>
              <p className="text-xl md:text-2xl text-white font-bold">
                our newsletter
              </p>
            </div>
          </div>

          <p className="text-white">
            Sign up for all the latest news <br className="hidden md:block" />
            and special offers
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 h-12 md:h-14 w-full md:w-[22vw] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition"
            />

            <button className="h-12 md:h-14 px-6 bg-white text-black font-bold border border-white transition hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
