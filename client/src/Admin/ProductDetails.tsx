import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "@/redux/slices/productSlice";
import { getProductsApi } from "@/api/productApi";
import { useQuery } from "@tanstack/react-query";
import NavBar from "@/components/NavBar";
import { useTheme } from "@/context/ThemeContext";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";
import { useEffect } from "react";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {SlideshowLightbox} from 'lightbox.js-react'

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { themeColor } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: getProducts = [],
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const foundProduct = getProducts.find((item) => item._id === id);

  if (!foundProduct) {
    return (
      <h2 className="text-center text-red-500 text-xl mt-10">
        Product Not Found!
      </h2>
    );
  }

  const product: Product = foundProduct;

  const cartItems = useSelector((state: RootState) => state.cart.products);

  const productInCart = cartItems.find((item) => item._id === product._id);
  const productQuantity = productInCart?.quantity || 0;

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success("Product added to cart");
  };

  const handleIncrease = (productId: string) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecrease = (productId: string) => {
    dispatch(decreaseQuantity(productId));
  };

  return (
    <>
      <div style={{ background: themeColor }}>
        <NavBar />
      </div>

      <main className="min-h-screen bg-white p-6 md:p-10 flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        <div className="flex justify-center md:w-1/2">
          <div className="relative shadow-lg bg-white rounded-md overflow-hidden w-full max-w-md md:max-w-full h-auto md:h-[700px] flex items-center justify-center">
            <img
              src={product.productImage}
              alt={product.title}
              className="object-contain w-full h-[400px] md:h-[700px]"
            />
            <button className="absolute top-4 right-4 h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition">
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="mt-4 text-gray-700 text-base md:text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <span className="text-gray-500 text-lg line-through">
              Rs{product.price.toFixed(2)}
            </span>

            <span className="text-[20px] font-semibold  ">
              Rs
              {(
                product.price -
                (product.price * product.discount) / 100
              ).toFixed(2)}
            </span>

            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-md text-sm font-semibold">
              {product.discount}% OFF
            </span>
          </div>

          <section className="mt-8 bg-orange-100 p-6 rounded-md max-w-full md:max-w-[96]">
            <h3 className="text-xl font-semibold mb-3 text-orange-900">
              Key Features:
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 text-sm md:text-base">
              {product.KeyFeatures?.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            <div className="mt-5 flex items-center space-x-4 w-full max-w-xs rounded-md p-2">
              <div className="flex items-center bg-white rounded-md overflow-hidden">
                <button
                  onClick={() => handleDecrease(product._id)}
                  className="px-4 py-2 cursor-pointer font-bold transition"
                  aria-label="Decrease quantity"
                  disabled={productQuantity === 0}
                >
                  -
                </button>

                <span className="px-6 py-2 text-lg font-semibold text-black select-none">
                  {productQuantity}
                </span>

                <button
                  onClick={() => handleIncrease(product._id)}
                  className="px-4 py-2 cursor-pointer font-bold transition"
                >
                  +
                </button>
              </div>

              {productInCart ? (
                <button
                  onClick={() => navigate("/cart")}
                  className="flex-1 bg-white text-red-500 font-semibold rounded-md py-2 cursor-pointer"
                >
                  View Cart
                </button>
              ) : (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-white text-red-500 font-semibold rounded-md py-2 cursor-pointer"
                >
                  Add to cart
                </button>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetails;
