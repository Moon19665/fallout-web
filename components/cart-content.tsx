"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";


export function CartContent() {
  const { items, total, updateQuantity, removeItem } = useCart();
  const [isVisible, setIsVisible] = useState(true);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="font-bebas-neue text-4xl font-bold text-black mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Looks like you haven't added any delicious items to your cart yet.
            </p>
            <Button
              size="lg"
              className="bg-[#ff4626] hover:bg-[#ff4626] hover:cursor pointer text-white px-8 py-3 text-lg"
            >
              <Link href="/menu" className="flex items-center">
                Start Shopping
              </Link>
            </Button>
          </div>

          {/* Suggested Items */}
          <div className="mt-16">
            <h2 className="font-bebas-neue text-3xl font-bold text-black mb-8 text-center">
              Popular Items
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Chilli Hot Dog",
                  price: 850,
                  image:
                    "chilli-dog.png",
                },
                {
                  name: "Zinger 111",
                  price: 650,
                  image:
                    "/zinger.png",
                },
                {
                  name: "Loaded Fries",
                  price: 450,
                  image:
                    "/lfries.webp",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-contain"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-black mb-2">
                      {item.name}
                    </h3>
                    <p className="text-[#ff4626] font-bold text-lg">
                      Rs {item.price}
                    </p>
                    <Link
                      href="/menu"
                      className="text-[#ff4626] hover:underline flex items-center"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back to Menu
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div
          className={`mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bebas-neue text-4xl font-bold text-black">
              Your Cart
            </h1>
            <Link
              href="/menu"
              className="text-[#ff4626] hover:underline flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Continue Shopping
            </Link>
          </div>
          <p className="text-gray-600">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="font-bold text-xl text-black">
                  Cart Items ({items.length})
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-6 ${
                      isVisible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Item Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-black mb-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.description}
                        </p>

                        {/* Customizations */}
                        {item.customizations && (
                          <div className="mb-3">
                            {item.customizations.size && (
                              <p className="text-sm text-gray-600">
                                Size: {item.customizations.size}
                              </p>
                            )}
                            {item.customizations.addOns &&
                              item.customizations.addOns.length > 0 && (
                                <p className="text-sm text-gray-600">
                                  Add-ons:{" "}
                                  {item.customizations.addOns.join(", ")}
                                </p>
                              )}
                            {item.customizations.removals &&
                              item.customizations.removals.length > 0 && (
                                <p className="text-sm text-gray-600">
                                  Remove:{" "}
                                  {item.customizations.removals.join(", ")}
                                </p>
                              )}
                            {item.customizations.specialInstructions && (
                              <p className="text-sm text-gray-600">
                                Special:{" "}
                                {item.customizations.specialInstructions}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Price and Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="border-[#ff4626] text-[#ff4626]  hover:bg-[#ff4626] hover:cursor-pointer"
                            >
                              <Minus className="w-6 h-6" />
                            </Button>
                            <span className="font-medium text-lg px-3">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="border-[#ff4626] text-[#ff4626]  hover:bg-[#ff4626] hover:cursor-pointer"
                            >
                              <Plus className="w-6 h-6 " />
                            </Button>
                          </div>

                          <div className="flex items-center space-x-4">
                            <p className="font-bold text-xl text-black">
                              Rs {(item.price * item.quantity).toFixed(2)}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className={`bg-white rounded-lg shadow-lg p-6 sticky top-24 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <h2 className="font-bold text-xl text-black mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rs {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">Rs 50.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">
                    Rs {(total * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-xl text-black">
                      Rs {(total + 50 + total * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button
                  size="lg"
                  className="w-full bg-[#ff4626] hover:bg-[#ff4626] hover:cursor-pointer text-white py-3 text-lg font-bold"
                >
                  Proceed to Checkout
                </Button>
              </Link>

              <div className="mt-4 text-center">
                <Link
                  href="/menu"
                  className="text-[#ff4626] hover:underline text-sm"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
