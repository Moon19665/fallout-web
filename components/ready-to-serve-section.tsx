"use client";

import { useEffect, useState } from "react";

export function ReadyToServeSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("ready-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="ready-section"
      className="py-20 bg-gradient-to-r pb-0 from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
     
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="font-bebas-neue text-5xl md:text-7xl font-bold text-white mb-8 tracking-wider">
            WE ARE READY TO SERVE YOU
          </h2>

          <div className="flex justify-center">
            <div className="w-24 h-1 bg-[#F7C431]"></div>
          </div>
        </div>
      </div>
      <div className="mt-12 w-full">
        <img
          src={
            "/barcode-big.webp"
          }
          alt="Banner"
          className="hidden md:block w-full h-auto object-cover"
        />

        {/* Mobile banner */}
        <img
          src={
            "/barcode-small.webp"
          }
          alt="Banner"
          className="block md:hidden w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}
