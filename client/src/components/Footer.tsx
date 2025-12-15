import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { MdSupportAgent } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const { themeColor } = useTheme();

  return (
    <footer className="w-full border-t border-gray-300">
      <div
        style={{ backgroundColor: themeColor }}
        className="text-white px-6 md:px-16 py-12"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 text-center md:text-left">
          <div className="flex justify-center md:justify-start">
            <img className="h-20" src="/images/logo6.png" alt="Logo" />
          </div>

          <div>
            <h2 className="font-bold text-xl mb-4">Shop</h2>
            <div className="flex flex-col gap-2 font-semibold">
              <Link to="#" className="hover:text-gray-200">
                Hot deals
              </Link>
              <Link to="#" className="hover:text-gray-200">
                Categories
              </Link>
              <Link to="#" className="hover:text-gray-200">
                Brands
              </Link>
              <Link to="#" className="hover:text-gray-200">
                Refund
              </Link>
              <Link to="#" className="hover:text-gray-200">
                Weekly discount
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-4">Need help?</h2>
            <div className="flex flex-col gap-2 font-semibold">
              <Link to="#" className="hover:text-gray-200">
                Contact
              </Link>
              <Link to="#" className="hover:text-gray-200">
                Order tracking
              </Link>
              <Link to="#" className="hover:text-gray-200">
                FAQs
              </Link>
              <Link to="#" className="hover:text-gray-200">
                Return policy
              </Link>
              <Link to="#" className="hover:text-gray-200">
                Privacy policy
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-4">Contact</h2>
            <div className="flex flex-col gap-3 font-semibold items-center md:items-start">
              <div className="flex items-center gap-3">
                <MapPin /> Kathmandu, New Road
              </div>
              <div className="flex items-center gap-3">
                <Mail /> nexonicsupport@info.com
              </div>
              <div className="flex items-center gap-3">
                <Phone /> Sales: 9800002222
              </div>
              <div className="flex items-center gap-3">
                <FaWhatsapp /> WhatsApp: 9800002222
              </div>
              <div className="flex items-center gap-3">
                <MdSupportAgent /> Support: 9800001111
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1B3C53] py-6 px-6 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white text-center md:text-left">
          <span className="text-sm">
            © {new Date().getFullYear()} Nexonic Store. Powered & Developed by ❤{" "}
            <span style={{ color: themeColor }} className="font-bold">
              Rahul Sah
            </span>
          </span>

          <div className="flex items-center gap-4">
            <img
              className="h-8"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkh_LDiTlmPFGl7wxdEyJVTXTSg6ni6nUDCa91XOJ3jjfvG3mrTcGKYzI7tkAw5Xv0uvY&usqp=CAU"
              alt="Visa"
            />
            <img
              className="h-8"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Hs5PTz2c6EnHlTimU7la4SKSZ3xKMhWZBA&s"
              alt="MasterCard"
            />
            <img
              className="h-8"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAIOu8V2wUmLzF7cUIq0MO0caYT1lyusHXcg&s"
              alt="Amex"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
