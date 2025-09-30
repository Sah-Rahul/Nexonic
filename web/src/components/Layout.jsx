import Footer from "./Footer";
import NavBar from "./NavBar";
import GoTop from "./GoTop";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}

      <div className="absolute bottom-5 right-14 ">
        <GoTop />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
