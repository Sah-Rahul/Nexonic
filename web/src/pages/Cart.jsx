import React from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  Tag,
  Package,
  CreditCard,
} from "lucide-react";
import { removeFromCart, updateCartQuantity } from "../store/slices/cartSlice";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { themeColor } = useTheme();
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //  Totals
  const subtotal = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const discount = cart.reduce((total, item) => {
    return (
      total + (item.product.price * item.product.discount * item.quantity) / 100
    );
  }, 0);

  const total = subtotal - discount;

  const handleIncrease = (productId, currentQty) => {
    dispatch(updateCartQuantity({ id: productId, quantity: currentQty + 1 }));
  };

  const handleDecrease = (productId, currentQty) => {
    if (currentQty <= 1) return;
    dispatch(updateCartQuantity({ id: productId, quantity: currentQty - 1 }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart({ id: productId }));
  };

  //   Empty Cart
  if (cart.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-16">
              <div className="relative inline-block mb-8">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-200 animate-ping opacity-50"></div>
                  <div className="absolute inset-2 rounded-full border-4 border-gray-300 animate-pulse"></div>
                  <ShoppingCart className="w-16 h-16 text-gray-400 animate-bounce relative z-10" />
                </div>
                <div
                  className="absolute -top-2 -right-2 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                Your Cart is Empty
              </h3>
              <p className="text-gray-500 mb-8">
                Add some products to get started!
              </p>

              <Link to={"/products"}>
                <button className="cursor-pointer px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full font-semibold hover:from-blue-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Start Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  //   Cart Page
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">{cart.length} items in your cart</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden">
                        <img
                          src={item.product.img}
                          alt={item.product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                            {item.product.name.slice(0, 50)}...
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-yellow-500">
                              {item.product.rating}
                            </span>
                            {item.product.discount > 0 && (
                              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                                {item.product.discount}% OFF
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleRemove(item.product.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all"
                        >
                          <Trash2 className="w-5 h-5 cursor-pointer" />
                        </button>
                      </div>

                      {/* Key Features */}
                      <div className="mb-4">
                        <ul className="text-sm text-gray-600 space-y-1">
                          {item.product.keyFeatures
                            ?.slice(0, 2)
                            .map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                                {feature}
                              </li>
                            ))}
                        </ul>
                      </div>

                      {/* Price + Quantity */}
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-teal-600">
                            $
                            {(
                              item.product.price -
                              (item.product.price * item.product.discount) / 100
                            ).toFixed(2)}
                          </span>
                          {item.product.discount > 0 && (
                            <span className="text-sm text-gray-400 line-through">
                              ${item.product.price}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              handleDecrease(item.product.id, item.quantity)
                            }
                            className="w-8 cursor-pointer h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-lg font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleIncrease(item.product.id, item.quantity)
                            }
                            className="w-8 h-8 bg-teal-500 hover:bg-teal-600 text-white rounded-lg flex items-center cursor-pointer justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.length} items)</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        Discount
                      </span>
                      <span className="font-semibold">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span className="text-teal-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout */}
                <button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-300 shadow-lg mb-4">
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
