import { useParams, useNavigate, Link } from "react-router-dom";
import type { Product } from "@/redux/slices/productSlice";
import { getProductsApi, getRelatedProductApi } from "@/api/productApi";
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
import Loading from "@/components/Loading";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { themeColor } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.products);

  const { data: getProducts = [] } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  const { data: getRelatedProduct } = useQuery({
    queryKey: ["products", id],
    queryFn: ({ queryKey }) => getRelatedProductApi(queryKey[1] as string),
  });


  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const foundProduct = getProducts.find((item) => item._id === id);

  if (!foundProduct) {
    return <Loading />;
  }

  const product: Product = foundProduct;

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

  const renderStars = (rating: number) => {
    return (
      <div className="flex ">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            style={{ color: i < Math.round(rating) ? themeColor : "#ccc" }}
            className="text-lg"
          >
            {i < Math.round(rating) ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <div style={{ background: themeColor }}>
        <NavBar />
      </div>

      <main className="min-h-screen bg-white p-4 sm:p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 max-w-7xl mx-auto">
        <div className="flex justify-center md:w-1/2">
          <div className="relative shadow-lg hover:cursor-zoom-in bg-white rounded-md overflow-hidden w-full max-w-md md:max-w-full h-auto md:h-[600px] lg:h-[700px] flex items-center justify-center">
            <img
              src={product.productImage}
              alt={product.title}
              className="w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[450px] hover:cursor-crosshair   object-contain transition-transform duration-500 ease-in-out transform hover:scale-110"
            />
            <button className="absolute top-3 sm:top-4 right-3 sm:right-4 h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition">
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {product.title}
          </h1>
          <p className="mt-3 sm:mt-4 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="mt-4 sm:mt-6 flex items-center gap-3 sm:gap-4 flex-wrap">
            <span className="text-gray-500 text-base sm:text-lg line-through">
              Rs{product.price.toFixed(2)}
            </span>

            <span className="text-[18px] sm:text-[20px] font-semibold">
              Rs
              {(
                product.price -
                (product.price * product.discount) / 100
              ).toFixed(2)}
            </span>

            <span className="bg-green-200 text-green-800 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-semibold">
              {product.discount}% OFF
            </span>
          </div>

          <div className="mt-4 sm:mt-5 flex items-center space-x-3 sm:space-x-4 w-full max-w-xs rounded-md p-2">
            <div className="border flex items-center bg-white rounded-md overflow-hidden">
              <button
                onClick={() => handleDecrease(product._id)}
                className="px-3 sm:px-4 py-2 border hover:bg-gray-400 cursor-pointer font-bold transition"
                aria-label="Decrease quantity"
                disabled={productQuantity === 0}
              >
                -
              </button>

              <span className="px-4 sm:px-6 py-2 text-lg font-semibold text-black select-none">
                {productQuantity}
              </span>

              <button
                onClick={() => handleIncrease(product._id)}
                className="px-3 sm:px-4 py-2 border hover:bg-gray-400 cursor-pointer font-bold transition"
              >
                +
              </button>
            </div>

            {productInCart ? (
              <button
                onClick={() => navigate("/cart")}
                className="flex-1 bg-gray-400 text-black font-semibold rounded-md py-2 text-sm sm:text-base cursor-pointer"
              >
                View Cart
              </button>
            ) : (
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 bg-gray-500 text-white font-semibold rounded-md py-2 text-sm sm:text-base cursor-pointer"
              >
                Add to cart
              </button>
            )}
          </div>

          <section className="mt-6 sm:mt-8 bg-orange-100 p-4 sm:p-6 rounded-md w-full">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-orange-900">
              Key Features:
            </h3>
            <ul className="list-disc pl-5 sm:pl-6 space-y-1 sm:space-y-2 text-gray-800 text-xs sm:text-sm md:text-base">
              {product.KeyFeatures?.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <div className="md:h-[45vw] px-11 bg-[#ffffff]">
        <h1 className="font-bold text-3xl">Related products</h1>

        <div className="md:flex items-center justify-between">
          {getRelatedProduct?.data?.relatedProducts?.map((item: any) => (
            <Link key={item._id} to={`/related-product-details/${item._id}`}>
              <div className="mt-5 md:h-[38vw] md:w-[22vw] bg-white">
                <img
                  src={item.productImage}
                  alt={item.title}
                  className="h-[60%] w-full object-cover"
                />

                <div className="flex flex-col p-3">
                  <div style={{ color: themeColor }} className="pt-2">
                    {renderStars(item.Rating)}
                  </div>

                  <label className="text-xl font-bold text-gray-400">
                    {item.title.slice(0, 52)}
                  </label>

                  <small className="pt-4 font-semibold text-xl">
                    ${item.price}
                  </small>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
