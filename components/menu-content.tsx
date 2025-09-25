"use client"

import { useState, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/use-cart"
import { ItemSelectionModal } from "@/components/item-selection-modal"

const menuItems = {
  "burgers": [
    {
      id: "spicy-smashdown",
      name: "Chilli Dog",
      price: 850,
      originalPrice: 935,
      image: "/chilli-dog.png",
      category: "burgers",
      description:
        "Steamy Hot Dog with Mexican Beef Filling",
      discount: "10% OFF",
    },
    {
      id: "brim-maniac",
      name: "Mini Vault",
      price: 999,
      originalPrice: 1098,
      image: "/mini-vault.png",
      category: "burgers",
      description:
        "4 Mini Burgers with in house signature sauce",
      discount: "10% OFF",
    },
    {
      id: "fiery-brimstone",
      name: "Fallout Beast",
      price: 700,
      originalPrice: 770.0,
      image: "/fallout-beast.webp",
      category: "burgers",
      description:
        "Juicy Burger with pepperoni touch",
      discount: "10% OFF",
    },
    {
      id: "the-meltdown",
      name: "Zinger 111",
      price: 650,
      image: "/zinger.png",
      category: "burgers",
      description: "",
    },
    // {
    //   id: "sweet-chili-titan",
    //   name: "Sweet Chili Titan",
    //   price: 750,
    //   image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
    //   category: "beef-burgers",
    //   description: "Sweet and spicy combination with crispy onions",
    // },
    // {
    //   id: "smashed-showdown",
    //   name: "Smashed Showdown",
    //   price: 850,
    //   image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
    //   category: "beef-burgers",
    //   description: "Double smashed patties with premium toppings",
    // },
  ],
  "taco": [
    {
      id: "soft-taco",
      name: "Soft Shell (x2)",
      price: 899,
      image: "/soft-shell.png",
      category: "taco",
      description: "With mexican Sauce",
    },
    {
      id: "hard-taco",
      name: "Hard Shell (x2)",
      price: 650,
      image: "/hard-shell.png",
      category: "taco",
      description: "With grilled chicken and special Mexican sauce",
    },
    // {
    //   id: "chicken-run",
    //   name: "Chicken Run",
    //   price: 550,
    //   image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
    //   category: "chicken-burger",
    //   description: "Classic chicken burger with fresh toppings",
    // },
  ],
  "wraps": [
    {
      id: "sWrap",
      name: "Small Wrap",
      price: 450,
      image: "/swrap.webp",
      category: "wraps",
      description: "",
    },
    {
      id: "bWrap",
      name: "Large Wrap",
      price: 650  ,
      image: "/lwrap.webp",
      category: "wraps",
      description: "",
    },
  ],
  "sauces": [
    {
      id: "fallout-special",
      name: "Fallout Special Sauce",
      price: 100,
      image: "special-sauce.webp",
      category: "sauces",
      description: "",
    },
     {
      id: "cocktail-sauce",
      name: "Cocktail Sauce",
      price: 100,
      image: "cocktail-sauce.jfif",
      category: "sauces",
      description: "",
    }, {
      id: "Atomic-sauce",
      name: "Atomic Sauce",
      price: 100,
      image: "atomi-sauce.png",
      category: "sauces",
      description: "",
    }, {
      id: "kids-special",
      name: "Kids Special Sauce",
      price: 100,
      image: "kids-sauce.webp",
      category: "sauces",
      description: "",
    }, {
      id: "garlic-sauce",
      name: "Garlic Sauce",
      price: 100,
      image: "garlic-sauce.avif",
      category: "sauces",
      description: "",
    }, {
      id: "honey-sauce",
      name: "Honey Sauce",
      price: 100,
      image: "honey-sauce.webp",
      category: "sauces",
      description: "",
    }, {
      id: "chipotle-sauce",
      name: "Chipotle Sauce",
      price: 100,
      image: "chipotle-sauce.png",
      category: "sauces",
      description: "",
    },
  ],
  "survival-pack": [
    {
      id: "meal-box-one",
      name: "Burger, Fries, Chocolate Milk & Toy",
      price: 850,
      image: "/meal-one.png",
      category: "survival-pack",
      description: "",
    },
    {
      id: "meal-box-two",
      name: "Chicken Tenders, Fries, Chocolate Milk & Toy",
      price: 850,
      image: "/meal-two.png",
      category: "survival-pack",
      description: "",
    },
  ],
  "appetisers": [
    {
      id: "vault-fries",
      name: "Small Loaded Fries",
      price: 450,
      image: "/sfries.png",
      category: "appetisers",
      description: "Loaded Fries with spicy or normal",
    },
    {
      id: "smokin-dog",
      name: "Large Loaded Fries",
      price: 650,
      image: "/lfries.webp",
      category: "appetisers",
      description: "Loaded Fries with spicy or normal",
    },
     {
      id: "porcorn-bite-small",
      name: "porcorn Bite (S)",
      price: 450,
      image: "/lpopcorn.png",
      category: "appetisers",
      description: "Popcorn Chicken with Fries",
    },
    {
      id: "porcorn-bite-large",
      name: "porcorn Bite (L)",
      price: 650,
      image: "/spopcorn.png",
      category: "appetisers",
      description: "Popcorn Chicken with Fries",
    },
  ],
  // "curly-fries": [
  //   {
  //     id: "loaded-curly-fries",
  //     name: "Loaded Curly Fries",
  //     price: 450,
  //     image: "/loaded-fries-with-cheese-and-toppings--professio.jpg",
  //     category: "curly-fries",
  //     description: "Crispy curly fries loaded with cheese and toppings",
  //   },
  // ],
  // "fries": [
  //   {
  //     id: "classic-fries",
  //     name: "Classic Fries",
  //     price: 300,
  //     image: "/loaded-fries-with-cheese-and-toppings--professio.jpg",
  //     category: "fries",
  //     description: "Golden crispy fries",
  //   },
  // ],
}

type Category = {
  id: string
  name: string
  count: number
  emoji?: string
}

const categories: Category[] = [
  { id: "burgers", name: "BURGERS", emoji: "🍔", count: 6 },
  { id: "taco", name: "TACOS", emoji: "🌮", count: 3 },
  { id: "wraps", name: "WRAPS", emoji: "🌯", count: 1 },
  { id: "sauces", name: "SAUCES", emoji: "🍶", count: 7 },
  { id: "survival-pack", name: "SURVIVAL PACK / MINI MEALS", emoji: "🍱", count: 1 },
  { id: "appetisers", name: "FRIES", emoji: "🌭", count: 2 },
  // { id: "curly-fries", name: "CURLY FRIES", count: 1 },
  // { id: "fries", name: "FRIES", count: 1 },
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
              className="absolute left-0 top-3/12 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              id="category-slider"
              className="flex  space-x-8 overflow-x-auto scrollbar-hide px-12"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {allCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 text-center pb-4 hover:cursor-pointer border-b-2 transition-colors ${
                    selectedCategory === category.id
                      ? "border-[#ff4626] text-black font-bold"
                      : "border-transparent text-gray-600 hover:text-black"
                  }`}
                >
                  <div className="flex items-center space-x-2 whitespace-nowrap">
                    {category.emoji && <span>{category.emoji}</span>}
                    <span className="text-md font-medium">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollCategories("right")}
              className="absolute right-0 top-3/12 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
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
                      <div className="absolute top-4 left-4 z-10 bg-[#ff4626] text-white px-3 py-1 rounded-lg text-sm font-bold">
                        {item.discount}
                      </div>
                    )}

                    {/* Quantity Badge */}
                    {quantity > 0 && (
                      <div className="absolute top-4 right-4 z-10 bg-[#ff4626] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {quantity}
                      </div>
                    )}

                    {/* Item Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full  object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-black mb-2 group-hover:text-[#ff4626] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {item.originalPrice && (
                            <span className="text-[#ff4626] line-through text-sm">
                              Rs. {item.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-lg font-bold text-black">from Rs. {item.price.toFixed(2)}</span>
                        </div>

                        <Button
                          size="sm"
                          className="bg-[#ff4626] hover:cursor-pointer hover:bg-[#ff4626] text-white"
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
