"use client"

import { useEffect, useState } from "react"

export function AboutSection() {
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

    const element = document.getElementById("about-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about-section" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-bebas-neue text-4xl md:text-5xl font-bold text-black mb-8">WHAT IS A SMASHBURGER?</h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              A smashburger is a burger cooked using a technique where the ground beef is pressed down firmly on a hot
              cooking surface, creating a thin patty with crispy, caramelized edges and a juicy interior. This method
              creates maximum surface area contact with the heat, resulting in the perfect balance of crispy exterior
              and tender inside that makes every bite unforgettable.
            </p>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="font-bebas-neue text-2xl font-bold text-black mb-4">THE FALLOUT DIFFERENCE</h3>
              <p className="text-gray-600 leading-relaxed">
                At Fallout, we take the smashburger technique to the next level with our signature spicy blend and premium
                ingredients. Each burger is smashed to perfection on our hot griddle, creating that iconic crispy crust
                while locking in all the juicy flavors that make our burgers the best in Pakistan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
