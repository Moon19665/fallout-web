"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
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

const categories = [
  { id: "burgers", name: "BURGERS", emoji: "🍔", count: 6 },
  { id: "taco", name: "TACOS", emoji: "🌮", count: 3 },
  { id: "wraps", name: "WRAPS", emoji: "🌯", count: 1 },
  { id: "sauces", name: "SAUCES", emoji: "🍶", count: 7 },
  { id: "survival-pack", name: "SURVIVAL PACK / MINI MEALS", emoji: "🍱", count: 1 },
  { id: "appetisers", name: "Fries", emoji: "🌭", count: 2 },
  // { id: "curly-fries", name: "CURLY FRIES", count: 1 },
  // { id: "fries", name: "FRIES", count: 1 },
]


export function FooterMenuContent() {
  const [selectedCategory, setSelectedCategory] = useState("burgers")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [isVisible, setIsVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { addItem, items } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredItems = menuItems[selectedCategory as keyof typeof menuItems] || []

  const handleItemClick = (item: any) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  const getItemQuantity = (itemId: string) => {
    const cartItem = items.find((item) => item.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories and Filters */}
          <div className={`lg:col-span-1 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4 text-black">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategory === category.id}
                        onCheckedChange={() => setSelectedCategory(category.id)}
                      />
                      <label htmlFor={category.id} className="text-sm font-medium text-gray-700 cursor-pointer flex-1">
                        {category.name}
                      </label>
                      <span className="text-xs text-gray-500">{category.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Find a category"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-sm mb-3 text-black">Price</h4>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="text-sm"
                  />
                  <span className="text-gray-500 self-center">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <Button className="w-full text-lg mt-3 bg-[#ff4626] text-white hover:bg-[#ff4626] hover:cursor-pointer">Apply</Button>
              </div>
            </div>
          </div>

          {/* Main Content - Menu Items */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className={`mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
              <h1 className="font-bebas-neue text-4xl md:text-5xl font-bold text-black mb-2">
                {categories.find((cat) => cat.id === selectedCategory)?.name || "Menu"}
              </h1>
              <p className="text-gray-600">
                Make any burger a meal burger - A Fallout best burger compared to Twin Venture
              </p>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => {
                const quantity = getItemQuantity(item.id)

                return (
                  <div
                    key={item.id}
                    className={`text-center cursor-pointer group ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleItemClick(item)}
                  >
                    {/* Item Image */}
                    <div className="relative mb-4">
                      <div className="w-64 h-56 mx-auto rounded p-2 overflow-hidden bg-none   transition-all duration-300 group-hover:scale-105">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {quantity > 0 && (
                        <div className="absolute top-2 right-8 bg-[var(--color-brim-red)] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {quantity}
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg text-black group-hover:text-[#ff4626] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">From Rs {item.price}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Load More Button */}
            {filteredItems.length > 6 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#ff4626] text-[#ff4626] hover:cursor-pointer text-lg font-bold hover:bg-[#ff4626] hover:text-white bg-transparent"
                >
                  Load More Items
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Item Selection Modal */}
      <ItemSelectionModal item={selectedItem} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
