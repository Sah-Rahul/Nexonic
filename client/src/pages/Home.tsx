import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { themeColor } = useTheme();

  return (
    <div className="h-screen relative bg-[url(/images/hero-image.jpg)] bg-center md:bg-cover">
      <div className="p-5 flex flex-col items-start pt-16 space-y-5 absolute top-[74.5%] left-[66%] -translate-x-1/2 -translate-y-1/2 md:top-14 md:right-3 md:left-auto md:translate-x-0 md:translate-y-0 bg-white md:h-[400px] md:w-[380px] w-[340px]">
        <h2 className="font-semibold">Nexonic</h2>
        <h1
          className="md:text-4xl text-[20px] font-bold"
          style={{ color: themeColor }}
        >
          The best home entertainment <br /> system is here
        </h1>
        <p className="text-gray-500">
          Sit diam odio eget rhoncus volutpat est nibh velit posuere egestas.
        </p>
        <button className="font-semibold text-blue-500">Shop now</button>
      </div>
    </div>
  );
};

export default Home;
