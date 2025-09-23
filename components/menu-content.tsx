"use client"

import { useState, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/use-cart"
import { ItemSelectionModal } from "@/components/item-selection-modal"

const menuItems = {
  "beef-burgers": [
    {
      id: "spicy-smashdown",
      name: "Spicy Smashdown",
      price: 787.5,
      originalPrice: 875.0,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cheNtWbQPSA0cc3xrdjE0qV09dJDUU.png",
      category: "beef-burgers",
      description:
        "Beef patty smashed with fiery jalapeños, topped with Pepper X sauce, crisp lettuce, diced onions & sriracha mayo in a soft seeded potato bun.",
      discount: "10% OFF",
    },
    {
      id: "brim-maniac",
      name: "Fallout Maniac",
      price: 2965.5,
      originalPrice: 3295.0,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "beef-burgers",
      description:
        "5 Patties, 5 Cheese Layers, Caramelised Onions, Our Fallout Sauce & Signature Sauce & Lettuce in a Soft Seeded Potato Bun.",
      discount: "10% OFF",
    },
    {
      id: "fiery-brimstone",
      name: "Fiery Falloutstone",
      price: 688.5,
      originalPrice: 765.0,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "beef-burgers",
      description:
        "Jalapeños, Cheese, Lettuce, Wild West Sauce, Signature Sauce & Lettuce in a Soft Seeded Potato Bun.",
      discount: "10% OFF",
    },
    {
      id: "the-meltdown",
      name: "The Meltdown",
      price: 750,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "beef-burgers",
      description: "Juicy beef patty with melted cheese and special sauce",
    },
    {
      id: "sweet-chili-titan",
      name: "Sweet Chili Titan",
      price: 750,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "beef-burgers",
      description: "Sweet and spicy combination with crispy onions",
    },
    {
      id: "smashed-showdown",
      name: "Smashed Showdown",
      price: 850,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "beef-burgers",
      description: "Double smashed patties with premium toppings",
    },
  ],
  "chicken-burger": [
    {
      id: "fiery-chicken-brimstone",
      name: "Fiery Chicken Falloutstone",
      price: 650,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "chicken-burger",
      description: "Spicy chicken patty with fiery sauce",
    },
    {
      id: "chicken-meltdown",
      name: "Chicken Meltdown",
      price: 700,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "chicken-burger",
      description: "Tender chicken with melted cheese",
    },
    {
      id: "chicken-run",
      name: "Chicken Run",
      price: 550,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "chicken-burger",
      description: "Classic chicken burger with fresh toppings",
    },
  ],
  "brim-junior": [
    {
      id: "mini-brim",
      name: "Mini Fallout",
      price: 400,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "brim-junior",
      description: "Kid-sized burger perfect for little ones",
    },
  ],
  brimwich: [
    {
      id: "classic-brimwich",
      name: "Classic Falloutwich",
      price: 500,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "brimwich",
      description: "Our signature sandwich with premium ingredients",
    },
  ],
  "naked-box": [
    {
      id: "naked-chicken-box",
      name: "Naked Chicken Box",
      price: 800,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "naked-box",
      description: "Crispy chicken pieces with sides",
    },
  ],
  "hot-dogs": [
    {
      id: "classic-hot-dog",
      name: "Classic Hot Dog",
      price: 400,
      image: "/loaded-hot-dog-with-toppings--professional-food-ph.jpg",
      category: "hot-dogs",
      description: "Traditional hot dog with mustard and ketchup",
    },
    {
      id: "smokin-dog",
      name: "Smokin Dog",
      price: 500,
      image: "/loaded-hot-dog-with-toppings--professional-food-ph.jpg",
      category: "hot-dogs",
      description: "Smoky flavored hot dog with special sauce",
    },
  ],
  "curly-fries": [
    {
      id: "loaded-curly-fries",
      name: "Loaded Curly Fries",
      price: 450,
      image: "/loaded-fries-with-cheese-and-toppings--professio.jpg",
      category: "curly-fries",
      description: "Crispy curly fries loaded with cheese and toppings",
    },
  ],
  fries: [
    {
      id: "classic-fries",
      name: "Classic Fries",
      price: 300,
      image: "/loaded-fries-with-cheese-and-toppings--professio.jpg",
      category: "fries",
      description: "Golden crispy fries",
    },
  ],
}

const categories = [
  { id: "beef-burgers", name: "BEEF BURGERS", emoji: "🐄", count: 6 },
  { id: "chicken-burger", name: "CHICKEN BURGER", emoji: "🐔", count: 3 },
  { id: "brim-junior", name: "Fallout JUNIOR", count: 1 },
  { id: "brimwich", name: "FalloutWICH", count: 1 },
  { id: "naked-box", name: "NAKED BOX", count: 1 },
  { id: "hot-dogs", name: "HOT DOGS", count: 2 },
  { id: "curly-fries", name: "CURLY FRIES", count: 1 },
  { id: "fries", name: "FRIES", count: 1 },
]

export function MenuContent() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categoryScrollPosition, setCategoryScrollPosition] = useState(0)

  const { items } = useCart()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getAllItems = () => {
    if (selectedCategory === "all") {
      return Object.entries(menuItems).flatMap(([category, items]) =>
        items.map((item) => ({
          ...item,
          categoryName: categories.find((cat) => cat.id === category)?.name || category,
        })),
      )
    }
    return menuItems[selectedCategory as keyof typeof menuItems] || []
  }

  const filteredItems = getAllItems()
  const filteredBySearch = filteredItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const groupedItems =
    selectedCategory === "all"
      ? categories.reduce(
          (acc, category) => {
            const categoryItems = filteredBySearch.filter((item) => item.category === category.id)
            if (categoryItems.length > 0) {
              acc[category.id] = { name: category.name, emoji: category.emoji, items: categoryItems }
            }
            return acc
          },
          {} as Record<string, { name: string; emoji?: string; items: any[] }>,
        )
      : {
          [selectedCategory]: {
            name: categories.find((cat) => cat.id === selectedCategory)?.name || "",
            items: filteredBySearch,
          },
        }

  const handleItemClick = (item: any) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  const getItemQuantity = (itemId: string) => {
    const cartItem = items.find((item) => item.id.startsWith(itemId))
    return cartItem ? cartItem.quantity : 0
  }

  const scrollCategories = (direction: "left" | "right") => {
    const container = document.getElementById("category-slider")
    if (container) {
      const scrollAmount = 200
      const newPosition =
        direction === "left"
          ? Math.max(0, categoryScrollPosition - scrollAmount)
          : categoryScrollPosition + scrollAmount

      container.scrollTo({ left: newPosition, behavior: "smooth" })
      setCategoryScrollPosition(newPosition)
    }
  }

  const allCategories = [{ id: "all", name: "ALL ITEMS", count: Object.values(menuItems).flat().length }, ...categories]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Slider */}
        <div className={`mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="relative">
            <button
              onClick={() => scrollCategories("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              id="category-slider"
              className="flex space-x-8 overflow-x-auto scrollbar-hide px-12"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {allCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 text-center pb-4 hover:cursor-pointer border-b-2 transition-colors ${
                    selectedCategory === category.id
                      ? "border-[#F7C431] text-black font-bold"
                      : "border-transparent text-gray-600 hover:text-black"
                  }`}
                >
                  <div className="flex items-center space-x-2 whitespace-nowrap">
                    {category.emoji && <span>{category.emoji}</span>}
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollCategories("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          <div className="relative max-w-full border-b-2 border-black">
            <Search className="absolute !outline-none left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg border-none !outline-none"
            />
          </div>
        </div>

        {/* Menu Items by Category */}
        {Object.entries(groupedItems).map(([categoryId, categoryData]) => (
          <div key={categoryId} className="mb-12">
            {/* Category Title */}
            <div
              className={`mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              <h1 className="font-bebas-neue text-4xl md:text-5xl font-bold text-black mb-2 flex items-center">
                {categoryData.name}
                {categoryData.emoji && <span className="ml-3">{categoryData.emoji}</span>}
              </h1>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
              {categoryData.items.map((item, index) => {
                const quantity = getItemQuantity(item.id)

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 relative ${
                      isVisible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleItemClick(item)}
                  >
                    {/* Discount Badge */}
                    {item.discount && (
                      <div className="absolute top-4 left-4 z-10 bg-[#F7C431] text-white px-3 py-1 rounded-lg text-sm font-bold">
                        {item.discount}
                      </div>
                    )}

                    {/* Quantity Badge */}
                    {quantity > 0 && (
                      <div className="absolute top-4 right-4 z-10 bg-[#F7C431] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {quantity}
                      </div>
                    )}

                    {/* Item Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-black mb-2 group-hover:text-[#F7C431] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {item.originalPrice && (
                            <span className="text-[#F7C431] line-through text-sm">
                              Rs. {item.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-lg font-bold text-black">from Rs. {item.price.toFixed(2)}</span>
                        </div>

                        <Button
                          size="sm"
                          className="bg-[#F7C431] hover:cursor-pointer hover:bg-[#F7C431] text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleItemClick(item)
                          }}
                        >
                          Add To Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* No Results */}
        {filteredBySearch.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* Item Selection Modal */}
      <ItemSelectionModal item={selectedItem} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
