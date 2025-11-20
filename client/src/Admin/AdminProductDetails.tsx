import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "@/redux/slices/productSlice";
import { getProductsApi } from "@/api/productApi";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";

const AdminProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate()

  const { data: getProducts = [] } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const foundProduct = getProducts.find((item) => item._id === id);

  if (!foundProduct) {
    return <Loading />;
  }

  const product: Product = foundProduct;

  return (
    <>
      <main className="min-h-screen bg-white p-4 sm:p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 max-w-7xl mx-auto">
        <Button onClick={() => navigate('/admin/category')} className="bg-black text-white cursor-pointer hover:bg-black">Back</Button>
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

            <span className="text-[18px] text-black sm:text-[20px] font-semibold">
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
    </>
  );
};

export default AdminProductDetails;
