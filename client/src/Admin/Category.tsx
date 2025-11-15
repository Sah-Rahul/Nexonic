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
import {
  LayoutGrid,
  TrendingUp,
  Package,
  Home,
  Music,
  Tv,
  Laptop,
} from "lucide-react";
import { BiSolidFridge } from "react-icons/bi";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { FaKitchenSet } from "react-icons/fa6";

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
  productCount: number;
  color: string;
  description: string;
}

const categoriesData: CategoryData[] = [
  {
    name: "AIR CONDITIONER",
    icon: Tv,
    productCount: 156,
    color: "bg-blue-500",
    description: "Phones, laptops, gadgets",
  },
  {
    name: "AUDIO & VIDEO",
    icon: Music,
    productCount: 243,
    color: "bg-pink-500",
    description: "Fashion and apparel",
  },
  {
    name: "GADGETS",
    icon: Laptop,
    productCount: 98,
    color: "bg-green-500",
    description: "Furniture and decor",
  },
  {
    name: "HOME APPLIANCES",
    icon: Home,
    productCount: 187,
    color: "bg-yellow-500",
    description: "Books and magazines",
  },
  {
    name: "KITCHEN APPLIANCES",
    icon: FaKitchenSet,
    productCount: 76,
    color: "bg-orange-500",
    description: "Sports equipment",
  },
  {
    name: "PCS & LAPTOP",
    icon: Laptop,
    productCount: 124,
    color: "bg-purple-500",
    description: "Kids toys and games",
  },
  {
    name: "REFRIGERATOR",
    icon: BiSolidFridge,
    productCount: 45,
    color: "bg-red-500",
    description: "Musical instruments",
  },
  {
    name: "SMART HOME",
    icon: CgSmartHomeWashMachine,
    productCount: 89,
    color: "bg-teal-500",
    description: "Smart home devices",
  },
];

const Category = () => {
  const [categories] = useState<CategoryData[]>(categoriesData);

  const totalProducts = categories.reduce(
    (sum, cat) => sum + cat.productCount,
    0
  );

  const mostPopular = categories.reduce((max, cat) =>
    cat.productCount > max.productCount ? cat : max
  );

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
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Across all categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Most Popular
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{mostPopular.name}</div>
              <p className="text-xs text-muted-foreground">
                {mostPopular.productCount} products
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
                        >
                          {category.productCount}
                        </Badge>
                      </div>

                      <h3 className="font-bold text-lg mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {category.description}
                      </p>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
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

        <Card>
          <CardHeader>
            <CardTitle>Product Distribution</CardTitle>
            <CardDescription>Products per category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories
                .sort((a, b) => b.productCount - a.productCount)
                .map((category) => {
                  const percentage = (
                    (category.productCount / totalProducts) *
                    100
                  ).toFixed(1);
                  return (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-muted-foreground">
                          {category.productCount} ({percentage}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${category.color} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Category;
