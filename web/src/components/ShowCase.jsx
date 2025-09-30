const ShowCase = () => {
  return (
    <>
      <div className="h-[250px] flex gap-5 px-11 mb-16 bg-[#e8eef3] w-full">
        {/* First Box */}
        <div className="h-full w-1/2 flex items-center justify-center   relative">
          <img
            src="/images/showcase1.jpg"
            alt="banner"
            className="w-full h-full object-cover "
          />
          {/* Overlay Text Centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-2xl md:text-2xl font-bold mb-3">
              The only case you need.
            </h1>

            {/* Line under heading */}
            <div className="w-24 h-1 bg-white mb-3"></div>

            {/* Shop Now button */}
            <button className="text-base md:text-lg font-semibold underline">
              Shop Now
            </button>
          </div>
        </div>

        {/* Second Box */}
        <div className="h-full w-1/2 flex items-center justify-center relative ">
          <img
            src="/images/showcase2.jpg"
            alt="banner"
            className="w-full h-full object-cover "
          />
          {/* Overlay Text Centered */}
          <div className="absolute inset-0   flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-3xl md:text-2xl font-bold mb-3">
              The only case you need.
            </h1>

            {/* Line under heading */}
            <div className="w-24 h-1 bg-white mb-3"></div>

            {/* Shop Now button */}
            <button className="text-base md:text-lg font-semibold underline">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowCase;
