import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Package, Home, Music, Tv, Laptop } from "lucide-react";
import { BiSolidFridge } from "react-icons/bi";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { FaKitchenSet } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { getProductsApi } from "@/api/productApi";
import { useQuery } from "@tanstack/react-query";

const ALLOWED_CATEGORIES = [
  "AIR CONDITIONER",
  "AUDIO & VIDEO",
  "GADGETS",
  "HOME APPLIANCES",
  "KITCHEN APPLIANCES",
  "PCS & LAPTOP",
  "REFRIGERATOR",
  "SMART HOME",
] as const;

type CategoryType = (typeof ALLOWED_CATEGORIES)[number];

interface CategoryData {
  name: CategoryType;
  icon: React.ElementType;
  color: string;
}

const categoriesData: CategoryData[] = [
  {
    name: "AIR CONDITIONER",
    icon: Tv,
    color: "bg-blue-500",
  },
  {
    name: "AUDIO & VIDEO",
    icon: Music,
    color: "bg-pink-500",
  },
  {
    name: "GADGETS",
    icon: Laptop,
    color: "bg-green-500",
  },
  {
    name: "HOME APPLIANCES",
    icon: Home,
    color: "bg-yellow-500",
  },
  {
    name: "KITCHEN APPLIANCES",
    icon: FaKitchenSet,
    color: "bg-orange-500",
  },
  {
    name: "PCS & LAPTOP",
    icon: Laptop,
    color: "bg-purple-500",
  },
  {
    name: "REFRIGERATOR",
    icon: BiSolidFridge,
    color: "bg-red-500",
  },
  {
    name: "SMART HOME",
    icon: CgSmartHomeWashMachine,
    color: "bg-teal-500",
  }
];

const Category = () => {
  const navigate = useNavigate();

  const [categories] = useState<CategoryData[]>(categoriesData);

  const { data } = useQuery({
    queryKey: ["getProductsApi"],
    queryFn: () => getProductsApi(),
  });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Category Management</h1>
          <p className="text-muted-foreground">
            Predefined product categories - Only these categories are allowed
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Categories
              </CardTitle>
              <LayoutGrid className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
              <p className="text-xs text-muted-foreground">Predefined only</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.length ?? 0}</div>

              <p className="text-xs text-muted-foreground">
                Across all categories
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Categories</CardTitle>
            <CardDescription>
              These are the only allowed product categories in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={category.name}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`${category.color} p-3 rounded-lg text-white`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-lg font-bold"
                        ></Badge>
                      </div>

                      <h3 className="font-bold text-lg mb-1">
                        {category.name}
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            navigate(
                              `/category/${category.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`
                            )
                          }
                          variant="outline"
                          size="sm"
                          className="flex-1 cursor-pointer"
                        >
                          View Products
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚠️ Category Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              • <strong>Only predefined categories</strong> are allowed in the
              system
            </p>
            <p>
              • Products must be assigned to one of the{" "}
              <strong>{categories.length} categories</strong> shown above
            </p>
            <p>
              • Adding products with invalid categories will result in an{" "}
              <strong className="text-red-600">error</strong>
            </p>
            <p>
              • Contact development team to add new categories to the system
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Category;
