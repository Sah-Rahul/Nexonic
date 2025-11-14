import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  MessageCircle,
  Calendar,
  Star,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { title: "Users", icon: Users, path: "/admin/users" },
  { title: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { title: "Products", icon: Package, path: "/admin/products" },
  { title: "Chat", icon: MessageCircle, path: "/admin/chat" },
  { title: "Calendar", icon: Calendar, path: "/admin/calendar" },
  { title: "Reviews", icon: Star, path: "/admin/reviews" },
  { title: "Settings", icon: Settings, path: "/admin/settings" },
];

const SidebarMenu = ({
  collapsed,
  width,
}: {
  collapsed: boolean;
  width: number;
}) => {
  return (
    <TooltipProvider>
      <div
        style={{ width }}
        className="h-screen fixed left-0 top-0 bg-red-500 transition-all duration-300 overflow-hidden"
      >
        <div className="p-4 text-white font-bold text-xl">
          {!collapsed && "Admin Panel"}
        </div>

        <div>
          {menuItems.map((item) => (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <Link to={item.path}>
                  <div className="flex items-center p-3 text-white cursor-pointer hover:bg-red-600 transition-all">
                    <item.icon size={22} />

                    {!collapsed && <span className="ml-3">{item.title}</span>}
                  </div>
                </Link>
              </TooltipTrigger>

              {collapsed && (
                <TooltipContent side="right">{item.title}</TooltipContent>
              )}
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SidebarMenu;
