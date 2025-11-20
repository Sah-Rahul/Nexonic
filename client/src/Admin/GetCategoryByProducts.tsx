import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductByCategory } from "@/api/productApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Heart, Star, Package } from "lucide-react";
import Loading from "@/components/Loading";

interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  totalPrice?: number;
  discount?: number;
  productImage: string;
  Rating?: number[];
}

const GetCategoryByProducts: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["category-products", category],
    queryFn: () => getProductByCategory(category || ""),
    enabled: !!category,
  });

  const products: Product[] = data?.data?.products || [];

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryName = category
    ? category.replace(/-/g, " ").toUpperCase()
    : "";

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Invalid category</p>
          <Link to="/admin/category">
            <Button>Back to Categories</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">Failed to load products</p>
          <Link to="/admin/category">
            <Button>Back to Categories</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/admin/category">
            <Button variant="ghost" className="gap-2 cursor-pointer mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Categories
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
              <p className="text-muted-foreground">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"} found
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <Card className="max-w-md mx-auto text-center p-8">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "Try a different search term"
                : "No products in this category yet"}
            </p>
            <Link to="/admin/category">
              <Button>Browse Other Categories</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const avgRating = product.Rating?.length
                ? product.Rating.reduce((sum, r) => sum + r, 0) /
                  product.Rating.length
                : 0;

              return (
                <Card
                  key={product._id}
                  className="overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <Link to={`/admin-products-details/${product._id}`}>
                        <img
                          src={product.productImage}
                          alt={product.title}
                          className="w-full h-64 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {product.discount && product.discount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded">
                          {product.discount}% OFF
                        </div>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold text-sm line-clamp-2 hover:text-blue-600 transition-colors min-h-10">
                        <Link to={`/admin-products-details/${product._id}`}>
                          {product.title}
                        </Link>
                      </h3>

                      {avgRating > 0 && (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(avgRating)
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            ({product.Rating?.length || 0})
                          </span>
                        </div>
                      )}

                      <div className="flex items-baseline gap-2">
                        <span className="text-xl">
                          Rs
                          {product.totalPrice?.toFixed(2) ||
                            product.price.toFixed(2)}
                        </span>
                        {product.discount && product.discount > 0 && (
                          <span className="text-sm text-muted-foreground line-through">
                            Rs{product.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {product.discount && product.discount > 0 && (
                        <p className="text-xs text-green-600">
                          You save Rs
                          {(
                            product.price -
                            (product.totalPrice || product.price)
                          ).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetCategoryByProducts;
