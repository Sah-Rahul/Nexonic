import { useState, useEffect } from "react";
import SidebarMenu from "./SidebarMenu";
import { RiMenu3Line } from "react-icons/ri";
import { Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  const [closeSideBar, setCloseSideBar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const width = closeSideBar ? 60 : 250;

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const toggleSidebar = () => {
    setCloseSideBar((prev) => !prev);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      {!isMobile && <SidebarMenu collapsed={closeSideBar} width={width} />}

      <nav
        style={{ marginLeft: isMobile ? 0 : width }}
        className="h-16 bg-red-900 transition-all duration-300 flex items-center justify-between px-4"
      >
        <div className="flex items-center gap-5">
          <button
            onClick={toggleSidebar}
            className="text-white text-2xl cursor-pointer"
          >
            <RiMenu3Line />
          </button>
          <h2 className="text-2xl text-white font-semibold">Nexonic</h2>
        </div>

        <div className="flex items-center gap-5 text-white">
          <button className="hover:text-gray-300 transition">
            <Moon size={22} />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="cursor-pointer w-9 h-9">
                <AvatarImage src="https://i.pravatar.cc/300" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 mr-4">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link to="/admin/profile">Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link to="/admin/settings">Settings</Link>
              </DropdownMenuItem>

              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <div
        style={{ marginLeft: isMobile ? 0 : width }}
        className="p-4 transition-all duration-300"
      >
        <Outlet />
      </div>

      <span className="flex items-center justify-center">
        © {new Date().getFullYear()} Nexonic Store. Powered & Develop by ❤{" "}
        <span>
          <b>Rahul Sah</b>
        </span>
      </span>
    </>
  );
};

export default Layout;
