import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ShoppingCart,
  Trash2,
  HeartOff,
  ArrowRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  removeFromWishlist,
  type WishlistProduct,
} from "@/redux/slices/Wishlist";
import Layout from "./Layout";
import type { Product } from "@/redux/slices/productSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";

const Wishlist = () => {
  const products = useSelector(
    (state: RootState) => state.wishList.products
  ) as WishlistProduct[];

  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product._id));
    toast.success("Product added to cart");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto text-center p-8">
            <HeartOff className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Save your favorite items to buy them later
            </p>
            <Link to="/products">
              <Button className="w-full">
                Start Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <Layout>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                <h1 className="text-3xl font-bold">My Wishlist</h1>
              </div>
              <p className="text-muted-foreground">
                {products.length} {products.length === 1 ? "item" : "items"}{" "}
                saved for later
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((item) => {
                const totalPrice =
                  item.price - (item.price * item.discount) / 100;

                return (
                  <Card
                    key={item._id}
                    className="overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <Link to={`/product/${item._id}`}>
                          <img
                            src={item.productImage}
                            alt={item.title}
                            className="w-full h-64 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        {item.discount > 0 && (
                          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                            {item.discount}% OFF
                          </Badge>
                        )}

                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 cursor-pointer bg-white/90 hover:bg-white"
                          onClick={() => dispatch(removeFromWishlist(item._id))}
                        >
                          <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                        </Button>
                      </div>

                      <div className="p-4 space-y-3">
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>

                        <Link to={`/product/${item._id}`}>
                          <h3 className="font-semibold text-sm line-clamp-2 hover:text-blue-600 transition-colors min-h-[10">
                            {item.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>

                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">
                            Rs{totalPrice.toFixed(2)}
                          </span>

                          {item.discount > 0 && (
                            <span className="text-sm text-muted-foreground line-through">
                              Rs{item.price.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {item.discount > 0 && (
                          <p className="text-xs text-green-600">
                            You save Rs{(item.price - totalPrice).toFixed(2)}
                          </p>
                        )}

                        <div className="flex gap-2 pt-2 ">
                          <Button
                            onClick={() => handleAddToCart(item)}
                            className="flex-1 gap-2 cursor-pointer"
                          >
                            <ShoppingCart className="w-4 h-4 cursor-pointer" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Wishlist;
