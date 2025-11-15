import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import {
  Users,
  ShoppingCart,
  Package,
  MessageCircle,
  Calendar,
  Star,
  Settings,
  LayoutGrid,
  UserPen,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { RiDashboard2Line } from "react-icons/ri";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", icon: RiDashboard2Line, path: "/admin/dashboard" },
  { title: "Users", icon: Users, path: "/admin/users" },
  { title: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { title: "Products", icon: Package, path: "/admin/products" },
  { title: "Category", icon: LayoutGrid, path: "/admin/category" },
  { title: "Chat", icon: MessageCircle, path: "/admin/chat" },
  { title: "Calendar", icon: Calendar, path: "/admin/calendar" },
  { title: "Reviews", icon: Star, path: "/admin/reviews" },
  { title: "Profile", icon: UserPen, path: "/admin/profile" },
  { title: "Settings", icon: Settings, path: "/admin/settings" },
];

const SidebarMenu = ({
  collapsed,
  width,
}: {
  collapsed: boolean;
  width: number;
}) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <TooltipProvider>
      <div
        style={{ width }}
        className="h-screen fixed left-0 top-0 bg-red-500 transition-all duration-300 overflow-hidden z-50"
      >
        {/* LOGO / TITLE */}
        <div className="h-16 flex items-center justify-center text-white font-bold text-xl border-b border-red-600/30">
          {collapsed ? (
            <div className="h-12 w-12 shadow-lg bg-white overflow-hidden rounded-full transition-transform duration-300 hover:scale-110">
              <img
                src="/images/logo6.png"
                alt="brandlogo"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <span
              className="whitespace-nowrap mr-24 transition-all duration-500 ease-in-out"
              style={{
                opacity: collapsed ? 0 : 1,
                transform: collapsed ? "translateX(-20px)" : "translateX(0)",
              }}
            >
              Admin Panel
            </span>
          )}
        </div>

        {/* MENU ITEMS */}
        <div className="py-4">
          {menuItems.map((item, index) => (
            <Tooltip key={item.title} delayDuration={300}>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  onClick={(e) => e.stopPropagation()} // 🟢 prevents sidebar toggle
                >
                  <div
                    className={`
                      flex items-center p-3 mx-2 rounded-lg cursor-pointer text-white
                      transition-all duration-300 ease-in-out
                      ${
                        isActive(item.path)
                          ? "bg-red-600 shadow-lg"
                          : "hover:bg-red-600/70"
                      }
                    `}
                    style={{
                      transitionDelay: `${index * 30}ms`,
                    }}
                  >
                    <div className="shrink-0">
                      <item.icon size={22} />
                    </div>

                    {!collapsed && (
                      <span
                        className="ml-3 whitespace-nowrap overflow-hidden transition-all duration-500 ease-in-out"
                        style={{
                          opacity: collapsed ? 0 : 1,
                          transform: collapsed
                            ? "translateX(-10px)"
                            : "translateX(0)",
                          maxWidth: collapsed ? "0px" : "150px",
                        }}
                      >
                        {item.title}
                      </span>
                    )}
                  </div>
                </Link>
              </TooltipTrigger>

              {/* Tooltip only when collapsed */}
              {collapsed && (
                <TooltipContent side="right" className="bg-gray-900 text-white">
                  {item.title}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SidebarMenu;
