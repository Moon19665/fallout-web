"use client"

import { useEffect, useState } from "react"
import { AlertTriangle } from "lucide-react"
import { Nav } from "react-day-picker"
import { Navigation } from "./navigation"
export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-[#ff4626] overflow-hidden">
      <Navigation/>
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-300/30 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-red-300/30 rounded-full blur-xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300/30 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Text content */}
          <div className={`space-y-8 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            {/* Warning badges */}
            <div className="flex items-center space-x-4">
              {/* <div className="flex items-center space-x-2 bg-[#F7C431] text-white px-4 py-2 rounded-lg animate-pulse-glow">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-bold text-sm">WARNING!</span>
              </div> */}
              <img
                src="/fallout-logo.png"
                alt="fallout Logo"
                className="h-32"
              />
              {/* <div
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg animate-pulse-glow"
                style={{ animationDelay: "0.5s" }}
              >
                <AlertTriangle className="h-5 w-5" />
                <span className="font-bold text-sm">WARNING!</span>
              </div> */}
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="font-bebas-neue text-3xl md:text-4xl lg:text-6xl font-bold text-[#ff4626] leading-none tracking-tight hover:scale-105 transition-transform duration-300 cursor-default">
                CHILLI 🌶️
              </h1>
              <h1
                className="font-bebas-neue text-3xl md:text-4xl lg:text-6xl font-bold text-[#ff4626] leading-none tracking-tight hover:scale-105 transition-transform duration-300 cursor-default"
                style={{ animationDelay: "0.2s" }}
              >
                SMASH
              </h1>
              <h1
                className="font-bebas-neue text-3xl md:text-4xl lg:text-6xl font-bold text-[#ff4626] leading-none tracking-tight hover:scale-105 transition-transform duration-300 cursor-default"
                style={{ animationDelay: "0.4s" }}
              >
                FALLDOWN
              </h1>
            </div>

            {/* Subtitle */}
            <div className="space-y-2">
              <p
                className="text-2xl md:text-3xl font-bold text-black animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                JUST DROPPED
              </p>
            </div>
          </div>

          {/* Right side - Burger image */}
          <div className={`relative ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <div className="relative">
              {/* Main burger image */}
              <div className="relative z-10 animate-float hover:scale-110 transition-transform duration-500">
                <img
                  src="/taco.webp"
                  alt="Spicy Smash Burger"
                  className="w-full max-w-lg mx-auto h-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Decorative elements around burger */}
              <div
                className="absolute -top-10 -right-10 animate-float hover:rotate-12 transition-transform duration-300"
                style={{ animationDelay: "1s" }}
              >
                <img
                  src="/lettuce-leaf-flying--fresh-green-lettuce.jpg"
                  alt="Flying lettuce"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div
                className="absolute -bottom-5 -left-5 animate-float hover:rotate-12 transition-transform duration-300"
                style={{ animationDelay: "2s" }}
              >
                <img
                  src="/cheese-slice-flying--yellow-cheese.jpg"
                  alt="Flying cheese"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div
                className="absolute top-1/4 -left-8 animate-float hover:rotate-12 transition-transform duration-300"
                style={{ animationDelay: "0.5s" }}
              >
                <img
                  src="/tomato-slice-flying--red-tomato.jpg"
                  alt="Flying tomato"
                  className="w-14 h-14 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
