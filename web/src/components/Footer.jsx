import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { MdSupportAgent } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const { themeColor } = useTheme();
  return (
    <>
      <footer className="w-full ">
        <div
          style={{ backgroundColor: themeColor }}
          className="  text-white px-16 flex items-center justify-between h-72"
        >
          <div className="mb-4 md:mt-0 mt-5 md:mb-0">
            <h2 className="font-bold text-3xl">Nexonic</h2>
            {/* <img className="bg-gray-500 h-24" src="/images/logo7.png" alt="Logo" /> */}
          </div>

          <div className="mb-4 md:mb-0">
            <h2 className="font-bold text-2xl pb-5">Shop</h2>
            <div className="flex flex-col space-y-2 font-semibold">
              <Link to="#" className="hover:text-gray-300">
                Hot deals
              </Link>
              <Link to="#" className="hover:text-gray-300">
                Categories
              </Link>
              <Link to="#" className="hover:text-gray-300">
                Brands
              </Link>
              <Link to="#" className="hover:text-gray-300">
                Rebates
              </Link>
              <Link to="#" className="hover:text-gray-300">
                Weekly discount
              </Link>
            </div>
          </div>

          <div className="mb-4 md:mb-0">
            <h2 className="font-bold text-2xl pb-5">Need help?</h2>
            <div className="flex flex-col space-y-2 font-semibold">
              <Link to="#" className="hover:text-gray-300">
                Contact
              </Link>
              <Link to="#" className="hover:text-gray-300">
                Order tracking
              </Link>
              <Link to="#" className="hover:text-gray-300">
                FAQs
              </Link>
              <Link to="#" className="hover:text-gray-300">
                Return policy
              </Link>
              <Link to="#" className="hover:text-gray-300">
                Privacy policy
              </Link>
            </div>
          </div>

          <div className="mb-4 md:mb-0">
            <h2 className="font-bold text-2xl pb-5">Contact</h2>
            <div className="flex flex-col space-y-2 font-semibold">
              <div className="flex items-center gap-4">
                <MapPin className="text-2xl" /> 123 Fifth Avenue, Kathmandu, New
                Road
              </div>

              <div className="flex items-center gap-4">
                <Mail className="text-2xl" /> nexonicsupport@info.com{" "}
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-2xl" /> Sales: 9800002222
              </div>

              <div className="flex items-center gap-4">
                <MdSupportAgent className="text-2xl" /> Support: 9800001111
              </div>
              {/* <div className="flex items-center gap-4"><FaWhatsapp className="text-2xl"/> WhatsApp: 9800002222</div> */}
            </div>
          </div>
        </div>

        <div className="bg-[#1B3C53] h-24 flex items-center">
          <div className="w-full px-16 flex items-center justify-between text-white">
            <span>
              © {new Date().getFullYear()} Electronic Store. Powered by ❤ <span style={{color: themeColor}}><b>Rahul Sah</b></span>
            </span>

            <div className="flex items-center gap-5">
              <img
                className="h-[3vw]"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkh_LDiTlmPFGl7wxdEyJVTXTSg6ni6nUDCa91XOJ3jjfvG3mrTcGKYzI7tkAw5Xv0uvY&usqp=CAU"
                alt="Visa"
              />
              <img
                className="h-[3vw]"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Hs5PTz2c6EnHlTimU7la4SKSZ3xKMhWZBA&s"
                alt="MasterCard"
              />
              <img
                className="h-[3vw]"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAIOu8V2wUmLzF7cUIq0MO0caYT1lyusHXcg&s"
                alt="Amex"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
