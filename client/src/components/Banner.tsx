const Banner = () => {
  return (
     
    <>
      <div className="h-[172px] flex gap-5 px-11   bg-[#e8eef3] w-full">
        <div className="h-full w-1/2 flex items-center justify-center   relative">
          <img
            src="/images/electronic-banner-1.jpg"
            alt="banner"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="h-full w-1/2 flex items-center justify-center   relative">
          <img
            src="/images/electronic-banner-2.jpg"
            alt="banner"
            className="w-full h-full object-cover "
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
