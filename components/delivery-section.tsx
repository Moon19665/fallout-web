"use client"

import { useEffect, useState } from "react"

export function DeliverySection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("delivery-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="delivery-section"
      className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left side - "WE DELIVER" */}
          <div className={`text-center lg:text-left ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <h2 className="font-bebas-neue text-6xl md:text-7xl font-bold text-white mb-4">WE DELIVER</h2>
            <p className="text-[#F7C431] text-xl font-bold">IN LAHORE</p>
          </div>

          {/* Center - Delivery bag image */}
          <div
            className={`flex justify-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative animate-float">
              <img
                src="/fallout-logo.png"
                alt="Fallout Delivery Bag"
                className="rounded object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right side - Time display */}
          <div
            className={`text-center lg:text-right ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
            style={{ animationDelay: "0.6s" }}
          >
            <div className="inline-block">
              <div className="bg-black border-2 border-white rounded-lg p-6">
                <div className="font-mono text-4xl md:text-5xl font-bold text-white mb-2">
                  03:00
                  <span className="text-[#F7C431] text-2xl ml-2">am</span>
                </div>
                <p className="text-[#F7C431] text-lg font-bold">TILL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
