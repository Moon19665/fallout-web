"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hotDealsIndex, setHotDealsIndex] = useState(0); // For manual hot deals slider
  const pathname = usePathname();

  const {
    items,
    total,
    itemCount,
    updateQuantity,
    removeItem,
    toggleCart,
    isOpen: cartIsOpen,
  } = useCart();

  const isMenuPage = pathname === "/menu";
  const isMenusPage = pathname === "/menus";
  const hotDeals = [
    {
      id: "deal-1",
      name: "Spicy Smashdown Combo",
      price: 950,
      originalPrice: 1200,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cheNtWbQPSA0cc3xrdjE0qV09dJDUU.png",
      discount: "20% OFF",
    },
    {
      id: "deal-2",
      name: "Double Cheese Delight",
      price: 850,
      originalPrice: 1000,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      discount: "15% OFF",
    },
    {
      id: "deal-3",
      name: "Wings & Fries Combo",
      price: 750,
      originalPrice: 900,
      image: "/buffalo-wings.png",
      discount: "17% OFF",
    },
    {
      id: "deal-4",
      name: "Loaded Fries Special",
      price: 400,
      originalPrice: 500,
      image: "/loaded-fries-with-cheese-and-toppings--professio.jpg",
      discount: "20% OFF",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById("mobile-nav");
      const button = document.getElementById("mobile-menu-button");
      const cartDropdown = document.getElementById("cart-dropdown");
      const cartButton = document.getElementById("cart-button");

      if (
        isOpen &&
        nav &&
        button &&
        !nav.contains(event.target as Node) &&
        !button.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }

      if (
        isCartOpen &&
        cartDropdown &&
        cartButton &&
        !cartDropdown.contains(event.target as Node) &&
        !cartButton.contains(event.target as Node)
      ) {
        setIsCartOpen(false);
      }
    };

    if (isOpen || isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isCartOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/menu", label: "MENU" },
    { href: "/franchising", label: "FRANCHISING" },
    { href: "/contact", label: "CONTACT" },
    { href: "/join-us", label: "JOIN US" },
  ];

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const nextHotDeal = () => {
    setHotDealsIndex((prev) => (prev + 1) % hotDeals.length);
  };

  const prevHotDeal = () => {
    setHotDealsIndex((prev) => (prev - 1 + hotDeals.length) % hotDeals.length);
  };

  return (
    <>
      {/* Top banner */}
      <div className="bg-[#F7C431] text-white text-center py-1 text-sm relative z-50">
        Welcome to Fallout Pakistan
      </div>

      {/* Main navigation */}
      <nav
        className={`relative z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 z-50">
              {/* <div className="bg-black text-white px-4 py-2 font-bebas-neue text-xl font-bold tracking-wider hover:bg-gray-800 transition-colors">
                Fallout
              </div> */}
              {/* <img
                src="/fallout-logo.png"
                alt="fallout Logo"
                className="h-12"
              /> */}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-lg font-bold tracking-wider transition-all duration-200 hover:scale-105 ${
                      pathname === item.href
                        ? "cursor-pointer"
                        : "text-black hover:text-[#F7C431]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {(isMenuPage || isMenusPage) && (
                <div className="relative">
                  <Button
                    id="cart-button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="text-black hover:text-[#F7C431] hover:cursor-pointer relative p-2"
                  >
                    <ShoppingBag style={{ width: "25px", height: "25px" }} />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#F7C431] text-white text-xl rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse-glow">
                        {itemCount}
                      </span>
                    )}
                  </Button>

                  {/* Cart Dropdown */}
                  {isCartOpen && (
                    <div
                      id="cart-dropdown"
                      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-fade-in-up"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-bold text-lg text-black">
                          Cart ({itemCount} items)
                        </h3>
                      </div>

                      {items.length === 0 ? (
                        <div className="p-6 text-center">
                          <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500 mb-4">
                            Your cart is empty
                          </p>
                          <Button
                            size="sm"
                            className="bg-[#F7C431] hover:bg-[#F7C431]-700 text-white"
                            onClick={() => setIsCartOpen(false)}
                          >
                            Start Shopping
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="max-h-64 overflow-y-auto">
                            {items.slice(0, 3).map((item) => (
                              <div
                                key={item.id}
                                className="p-4 border-b border-gray-100 last:border-b-0"
                              >
                                <div className="flex items-start space-x-3">
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-12 h-12 object-cover rounded-lg"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm text-black truncate">
                                      {item.name}
                                    </h4>
                                    <p className="text-[#F7C431] font-bold text-sm">
                                      Rs {item.price}
                                    </p>

                                    <div className="flex items-center space-x-2 mt-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          handleQuantityChange(
                                            item.id,
                                            item.quantity - 1
                                          )
                                        }
                                        className="h-6 w-6 p-0 hover:bg-gray-100"
                                      >
                                        <Minus className="w-3 h-3" />
                                      </Button>
                                      <span className="text-sm font-medium px-2">
                                        {item.quantity}
                                      </span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          handleQuantityChange(
                                            item.id,
                                            item.quantity + 1
                                          )
                                        }
                                        className="h-6 w-6 p-0 hover:bg-gray-100"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeItem(item.id)}
                                        className="h-6 w-6 p-0 text-[#F7C431] hover:bg-red-50 ml-2"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}

                            {items.length > 3 && (
                              <div className="p-3 text-center text-sm text-gray-500">
                                +{items.length - 3} more items
                              </div>
                            )}
                          </div>

                          <div className="border-t border-gray-200 p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-bold text-sm text-black">
                                Hot Item Deals
                              </h4>
                              <div className="flex space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={prevHotDeal}
                                  className="h-6 w-6 p-0 hover:bg-gray-100"
                                >
                                  <ChevronLeft className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={nextHotDeal}
                                  className="h-6 w-6 p-0 hover:bg-gray-100"
                                >
                                  <ChevronRight className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-3 mb-3">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={
                                    hotDeals[hotDealsIndex].image ||
                                    "/placeholder.svg"
                                  }
                                  alt={hotDeals[hotDealsIndex].name}
                                  className="w-12 h-12 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h5 className="font-medium text-sm text-black">
                                    {hotDeals[hotDealsIndex].name}
                                  </h5>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-[#F7C431] line-through text-xs">
                                      Rs {hotDeals[hotDealsIndex].originalPrice}
                                    </span>
                                    <span className="text-[#F7C431] font-bold text-sm">
                                      Rs {hotDeals[hotDealsIndex].price}
                                    </span>
                                    <span className="bg-[#F7C431] text-white px-1 py-0.5 rounded text-xs">
                                      {hotDeals[hotDealsIndex].discount}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-bold text-black">
                                Total:
                              </span>
                              <span className="font-bold text-lg text-[#F7C431]">
                                Rs {total}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <Link href="/cart" className="block">
                                <Button
                                  variant="outline"
                                  className="w-full border-[#F7C431] text-[#F7C431] hover:bg-red-50 bg-transparent"
                                  onClick={() => setIsCartOpen(false)}
                                >
                                  View Cart
                                </Button>
                              </Link>
                              <Link href="/checkout" className="block">
                                <Button
                                  className="w-full bg-[#F7C431] hover:bg-[#F7C431] text-white"
                                  onClick={() => setIsCartOpen(false)}
                                >
                                  Checkout
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  id="mobile-menu-button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-black hover:text-[#F7C431] z-50 relative"
                >
                  <div className="relative w-6 h-6">
                    <Menu
                      className={`h-6 w-6 absolute transition-all duration-300 ${
                        isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                      }`}
                    />
                    <X
                      className={`h-6 w-6 absolute transition-all duration-300 ${
                        isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                      }`}
                    />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-nav"
          className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-4 invisible"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-3 text-base font-bold tracking-wider transition-all duration-200 rounded-lg ${
                  pathname === item.href
                    ? "text-[#F7C431] bg-red-50 border-l-4 border-[#F7C431]"
                    : "text-black hover:text-[#F7C431] hover:bg-gray-50 hover:translate-x-2"
                } ${isOpen ? "animate-fade-in-up" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {(isMenuPage || isMenusPage) && (
              <Link
                href="/cart"
                className={`block px-3 py-3 text-base font-bold tracking-wider transition-all duration-200 rounded-lg text-black hover:text-red-600 hover:bg-gray-50 hover:translate-x-2 ${
                  isOpen ? "animate-fade-in-up" : ""
                }`}
                style={{ animationDelay: `${navItems.length * 0.1}s` }}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-between">
                  <span>CART</span>
                  {itemCount > 0 && (
                    <span className="bg-[#F7C431] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {itemCount}
                    </span>
                  )}
                </div>
              </Link>
            )}
          </div>

          {/* Mobile menu footer */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Best Burgers in Pakistan
            </p>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 transition-opacity duration-300"
          onClick={() => setIsCartOpen(false)}
        />
      )}
    </>
  );
}
