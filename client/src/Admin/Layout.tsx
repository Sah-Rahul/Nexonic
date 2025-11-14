import { useState, type ReactNode, useEffect } from "react";
import SidebarMenu from "./SidebarMenu";

interface ChildrenInterface {
  children: ReactNode;
}

const Layout = ({ children }: ChildrenInterface) => {
  const [closeSideBar, setCloseSideBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const width = closeSideBar ? 60 : 250;

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      {!isMobile && <SidebarMenu collapsed={closeSideBar} width={width} />}

      <nav
        style={{ marginLeft: isMobile ? 0 : width }}
        className="h-16 bg-red-900 transition-all duration-300 flex items-center px-4"
      >
        <h2
          onClick={() => setCloseSideBar(!closeSideBar)}
          className="text-white cursor-pointer select-none"
        >
          Toggle Sidebar
        </h2>
      </nav>

      <div
        style={{ marginLeft: isMobile ? 0 : width }}
        className="p-4 transition-all duration-300"
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
