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
  burgers: [
    {
      id: "burger-1",
      name: "Fallout Burger",
      price: 600,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "burgers",
      description: "Make any burger a meal burger - A Fallout best burger compared to Twin Venture",
    },
    {
      id: "burger-2",
      name: "The Meltdown",
      price: 750,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "burgers",
      description: "Juicy beef patty with melted cheese and special sauce",
    },
    {
      id: "burger-3",
      name: "Fiery Falloutstone",
      price: 800,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "burgers",
      description: "Our spiciest burger with jalapeños and hot sauce",
    },
    {
      id: "burger-4",
      name: "Sweet Chili Titan",
      price: 750,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "burgers",
      description: "Sweet and spicy combination with crispy onions",
    },
    {
      id: "burger-5",
      name: "Smashed Showdown",
      price: 850,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "burgers",
      description: "Double smashed patties with premium toppings",
    },
    {
      id: "burger-6",
      name: "Bro Baller",
      price: 1000,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "burgers",
      description: "The ultimate burger experience with triple patties",
    },
    {
      id: "burger-7",
      name: "Fiery Chicken Falloutstone",
      price: 650,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "burgers",
      description: "Spicy chicken patty with fiery sauce",
    },
    {
      id: "burger-8",
      name: "Fallout Maniac",
      price: 1200,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "burgers",
      description: "Our biggest and boldest burger creation",
    },
    {
      id: "burger-9",
      name: "Chicken Meltdown",
      price: 700,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "burgers",
      description: "Tender chicken with melted cheese",
    },
    {
      id: "burger-10",
      name: "Chicken Run",
      price: 550,
      image: "/gourmet-burger-with-sesame-bun--professional-food-.jpg",
      category: "burgers",
      description: "Classic chicken burger with fresh toppings",
    },
  ],
  hotdogs: [
    {
      id: "hotdog-1",
      name: "Classic Hot Dog",
      price: 400,
      image: "/loaded-hot-dog-with-toppings--professional-food-ph.jpg",
      category: "hotdogs",
      description: "Traditional hot dog with mustard and ketchup",
    },
    {
      id: "hotdog-2",
      name: "Smokin Dog",
      price: 500,
      image: "/loaded-hot-dog-with-toppings--professional-food-ph.jpg",
      category: "hotdogs",
      description: "Smoky flavored hot dog with special sauce",
    },
    {
      id: "hotdog-3",
      name: "Street Dog",
      price: 450,
      image: "/loaded-hot-dog-with-toppings--professional-food-ph.jpg",
      category: "hotdogs",
      description: "Street-style hot dog with onions and peppers",
    },
  ],
  loadedfries: [
    {
      id: "fries-1",
      name: "Loaded Cheese Fries",
      price: 450,
      image: "/loaded-fries-with-cheese-and-toppings--professio.jpg",
      category: "loadedfries",
      description: "Crispy fries loaded with melted cheese and bacon bits",
    },
    {
      id: "fries-2",
      name: "Spicy Jalapeño Fries",
      price: 500,
      image: "/loaded-fries-with-cheese-and-toppings--professio.jpg",
      category: "loadedfries",
      description: "Fries topped with jalapeños and spicy sauce",
    },
    {
      id: "fries-3",
      name: "BBQ Ranch Fries",
      price: 550,
      image: "/loaded-fries-with-cheese-and-toppings--professio.jpg",
      category: "loadedfries",
      description: "Fries with BBQ sauce and ranch dressing",
    },
  ],
  desserts: [
    {
      id: "dessert-1",
      name: "Chocolate Brownie",
      price: 350,
      image: "/chocolate-brownie-dessert--professional-food-pho.jpg",
      category: "desserts",
      description: "Rich chocolate brownie with vanilla ice cream",
    },
    {
      id: "dessert-2",
      name: "Vanilla Milkshake",
      price: 300,
      image: "/vanilla-milkshake--professional-food-photography.jpg",
      category: "desserts",
      description: "Creamy vanilla milkshake topped with whipped cream",
    },
  ],
}

const categories = [
  { id: "burgers", name: "Burgers", count: 10 },
  { id: "hotdogs", name: "Hot Dogs", count: 3 },
  { id: "loadedfries", name: "Loaded Fries", count: 3 },
  { id: "desserts", name: "Desserts", count: 2 },
  { id: "brimjunior", name: "Fallout Junior", count: 0 },
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
                <Button className="w-full mt-3 bg-black text-white hover:bg-gray-800">Apply</Button>
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
                      <div className="w-48 h-48 mx-auto rounded-full overflow-hidden bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
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
                      <h3 className="font-bold text-lg text-black group-hover:text-[var(--color-brim-red)] transition-colors">
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
                  className="border-black text-black hover:bg-black hover:text-white bg-transparent"
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
