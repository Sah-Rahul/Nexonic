import CategoryProducts from "@/components/CategoryProducts";
import Layout from "../components/Layout";
 

const NewArrivals = () => {
  

 

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

        <CategoryProducts category="NEW ARRIVALS" />;
      </div>
    </Layout>
  );
};

export default NewArrivals;
