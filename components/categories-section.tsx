"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const categories = [
  {
    id: "burgers",
    name: "BURGERS",
    image: "/zinger.png",
  },
  {
    id: "hot-dogs",
    name: "TACOS",
    image: "/soft-shell.png",
  },
  {
    id: "loaded-fries",
    name: "WRAPS",
    image: "/swrap.webp",
  },
  {
    id: "brimwich",
    name: "SAUCES",
    image: "/special-sauce.webp",
  },
  {
    id: "brim-junior",
    name: "SURVIVAL PACK",
    image: "/meal-two.png",
  },
  {
    id: "sips-scoops",
    name: "FRIES",
    image: "/lfries.webp",
  },
  {
    id: "desserts",
    name: "MINI MEALS",
    image: "/meal-one.png",
  },
  // {
  //   id: "naked-box",
  //   name: "TOPPINGS",
  //   image: "/honey-sauce.webp",
  // },
]

export function CategoriesSection() {
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

    const element = document.getElementById("categories-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="categories-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-bebas-neue text-5xl md:text-6xl font-bold text-black mb-4">BEST BURGERS</h2>
          <h3 className="font-bebas-neue text-4xl md:text-5xl font-bold text-black mb-8">IN PAKISTAN</h3>
          <p className="text-xl font-bold text-black mb-8">OUR CATEGORIES</p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/menu#${category.id}`}
              className={`group ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className=" rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 ">
                {/* Category image */}
                <div className="aspect-square  flex items-center justify-center p-4">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Category name */}
                <div className="p-4 m-2 border-3 border-[#FF5900] rounded text-center">
                  <h3 className="font-bold text-[#FF5900] text-sm md:text-xl tracking-wider">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
