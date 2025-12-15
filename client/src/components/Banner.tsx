const Banner = () => {
  return (
    <div className="w-full bg-[#e8eef3] px-4 md:px-11 py-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-5 w-full">
        <div className="w-full md:w-1/2 h-28 md:h-[172px] relative">
          <img
            src="/images/electronic-banner-1.jpg"
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 h-28 md:h-[172px] relative">
          <img
            src="/images/electronic-banner-2.jpg"
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
