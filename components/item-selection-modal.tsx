"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Minus, Plus, X, ChevronDown, ChevronUp } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

interface MenuItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  description: string
}

interface ItemSelectionModalProps {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
}

const sizeOptions = [
  { id: "standard", name: "Standard", price: 0, originalPrice: 875 },
  { id: "serious", name: "Serious", price: 396, originalPrice: 1215 },
  { id: "smashing", name: "Smashing", price: 792, originalPrice: 1755 },
]

const mealOptions = [
  { id: "fries-drink", name: "Fries + Drink", price: 200 },
  { id: "loaded-fries-drink", name: "Loaded Fries + Drink", price: 350 },
]

const extraToppings = [
  { id: "extra-cheese", name: "Extra Cheese", price: 50 },
  { id: "extra-bacon", name: "Extra Bacon", price: 80 },
  { id: "extra-patty", name: "Extra Patty", price: 200 },
  { id: "jalapeños", name: "Jalapeños", price: 30 },
  { id: "onions", name: "Grilled Onions", price: 25 },
  { id: "pickles", name: "Extra Pickles", price: 20 },
  { id: "lettuce", name: "Extra Lettuce", price: 15 },
  { id: "tomato", name: "Extra Tomato", price: 20 },
  { id: "mushrooms", name: "Mushrooms", price: 40 },
  { id: "avocado", name: "Avocado", price: 60 },
]

const frequentlyBoughtTogether = [
  {
    id: "loaded-fries",
    name: "Loaded Cheese Fries",
    price: 450,
    image: "/loaded-fries-with-cheese-and-toppings--professio.jpg",
  },
  {
    id: "vanilla-shake",
    name: "Vanilla Milkshake",
    price: 300,
    image: "/vanilla-milkshake--professional-food-photography.jpg",
  },
  { id: "chicken-wings", name: "Buffalo Wings", price: 550, image: "/buffalo-wings.png" },
  { id: "onion-rings", name: "Onion Rings", price: 350, image: "/crispy-onion-rings.png" },
  { id: "mozzarella-sticks", name: "Mozzarella Sticks", price: 400, image: "/mozzarella-sticks.png" },
  { id: "garlic-bread", name: "Garlic Bread", price: 250, image: "/garlic-bread.png" },
  { id: "coleslaw", name: "Coleslaw", price: 200, image: "/creamy-coleslaw.png" },
  { id: "chocolate-shake", name: "Chocolate Shake", price: 320, image: "/chocolate-milkshake.png" },
  { id: "strawberry-shake", name: "Strawberry Shake", price: 320, image: "/strawberry-milkshake.jpg" },
]

export function ItemSelectionModal({ item, isOpen, onClose }: ItemSelectionModalProps) {
  const [selectedSize, setSelectedSize] = useState("standard")
  const [selectedMeal, setSelectedMeal] = useState<string>("")
  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [specialInstructions, setSpecialInstructions] = useState("")
const [quantity, setQuantity] = useState<number>(1)
  const [expandedSections, setExpandedSections] = useState({
    meal: false,
    toppings: false,
    extras: false,
  })

  const { addItem } = useCart()
  const { toast } = useToast()

  if (!item) return null

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleToppingChange = (toppingId: string, checked: boolean) => {
    if (checked && selectedToppings.length >= 10) {
      toast({
        title: "Maximum limit reached",
        description: "You can only select up to 10 extra toppings.",
        variant: "destructive",
      })
      return
    }

    if (checked) {
      setSelectedToppings([...selectedToppings, toppingId])
    } else {
      setSelectedToppings(selectedToppings.filter((id) => id !== toppingId))
    }
  }

  const handleExtraChange = (extraId: string, checked: boolean) => {
    if (checked && selectedExtras.length >= 9) {
      toast({
        title: "Maximum limit reached",
        description: "You can only select up to 9 items.",
        variant: "destructive",
      })
      return
    }

    if (checked) {
      setSelectedExtras([...selectedExtras, extraId])
    } else {
      setSelectedExtras(selectedExtras.filter((id) => id !== extraId))
    }
  }

  const calculateTotalPrice = () => {
    const size = sizeOptions.find((s) => s.id === selectedSize)
    let total = (item.price + (size?.price || 0)) * quantity

    // Add meal price
    if (selectedMeal) {
      const meal = mealOptions.find((m) => m.id === selectedMeal)
      if (meal) total += meal.price * quantity
    }

    // Add toppings price
    selectedToppings.forEach((toppingId) => {
      const topping = extraToppings.find((t) => t.id === toppingId)
      if (topping) total += topping.price * quantity
    })

    // Add extras price
    selectedExtras.forEach((extraId) => {
      const extra = frequentlyBoughtTogether.find((e) => e.id === extraId)
      if (extra) total += extra.price * quantity
    })

    return total
  }

  const getOriginalPrice = () => {
    const size = sizeOptions.find((s) => s.id === selectedSize)
    return size?.originalPrice || item.originalPrice || item.price
  }

  const handleAddToCart = () => {
    const size = sizeOptions.find((s) => s.id === selectedSize)
    const meal = selectedMeal ? mealOptions.find((m) => m.id === selectedMeal) : null
    const toppings = extraToppings.filter((t) => selectedToppings.includes(t.id))

    let itemName = item.name
    if (size && size.id !== "standard") {
      itemName += ` (${size.name})`
    }
    if (meal) {
      itemName += ` + ${meal.name}`
    }
    if (toppings.length > 0) {
      itemName += ` + ${toppings.map((t) => t.name).join(", ")}`
    }

    addItem({
      id: `${item.id}-${Date.now()}`,
      name: itemName,
      price: calculateTotalPrice() / quantity,
      image: item.image,
      category: item.category,
      description: item.description,
      // quantity: quantity,
    })

    // Add selected extras as separate items
    selectedExtras.forEach((extraId) => {
      const extra = frequentlyBoughtTogether.find((e) => e.id === extraId)
      if (extra) {
        addItem({
          id: `${extra.id}-${Date.now()}`,
          name: extra.name,
          price: extra.price,
          image: extra.image,
          category: "extras",
          description: "",
          // quantity: quantity,
        })
      }
    })

    toast({
      title: "Added to cart!",
      description: `${itemName} has been added to your cart.`,
      duration: 2000,
    })

    // Reset form
    setSelectedSize("standard")
    setSelectedMeal("")
    setSelectedToppings([])
    setSelectedExtras([])
    setSpecialInstructions("")
    setQuantity(1)
    setExpandedSections({ meal: false, toppings: false, extras: false })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full !max-w-[1200px]  max-h-[95vh] overflow-hidden p-0 bg-white">
        <div className="flex  h-[95vh]">
          {/* Left side - Image */}
          <div className="flex-1 relative bg-black">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8">
              <h1 className="text-5xl font-bold text-white mb-4">{item.name}</h1>
              <p className="text-white/90 text-lg leading-relaxed max-w-2xl">{item.description}</p>
            </div>
          </div>

          {/* Right side - Options */}
          <div className=" flex-1 bg-white relative flex flex-col">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Size Selection */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-800">Choose Any One</h3>
                    <span className="bg-[#ff4626] text-white px-3 mr-6 py-1 rounded text-sm font-medium">Required</span>
                  </div>

                  <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="space-y-4">
                    {sizeOptions.map((size) => (
                      <div
                        key={size.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={size.id} id={size.id} />
                          <Label htmlFor={size.id} className="font-medium text-gray-800 text-base">
                            {size.name}
                          </Label>
                        </div>
                        <div className="text-right">
                          {size.originalPrice && (
                            <div className="text-[#ff4626] line-through text-sm">{size.originalPrice.toFixed(2)}</div>
                          )}
                          <div className="font-medium text-gray-800">Rs. {(item.price + size.price).toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Make It A Meal */}
                <div className="border-t border-gray-200 pt-6">
                  <button
                    onClick={() => toggleSection("meal")}
                    className="flex items-center justify-between w-full text-left p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <h3 className="text-lg font-medium text-gray-800">Make It A Meal</h3>
                    {expandedSections.meal ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {expandedSections.meal && (
                    <div className="mt-4 space-y-3">
                      <RadioGroup value={selectedMeal} onValueChange={setSelectedMeal}>
                        {mealOptions.map((meal) => (
                          <div
                            key={meal.id}
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value={meal.id} id={meal.id} />
                              <Label htmlFor={meal.id} className="font-medium text-gray-800">
                                {meal.name}
                              </Label>
                            </div>
                            <div className="font-medium text-gray-800">+Rs. {meal.price}</div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                </div>

                {/* Extra Toppings */}
                <div className="border-t border-gray-200 pt-6">
                  <button
                    onClick={() => toggleSection("toppings")}
                    className="flex items-center justify-between w-full text-left p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-800">Extra Topping</h3>
                      <span className="bg-[#ff4626] text-white px-2 py-1 rounded text-xs">maximum 10</span>
                    </div>
                    {expandedSections.toppings ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {expandedSections.toppings && (
                    <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
                      {extraToppings.map((topping) => (
                        <div
                          key={topping.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id={topping.id}
                              checked={selectedToppings.includes(topping.id)}
                              onChange={(e) => handleToppingChange(topping.id, e.target.checked)}
                              className="w-4 h-4 text-[#ff4626] border-gray-300 rounded focus:ring-[#ff4626]"
                            />
                            <Label htmlFor={topping.id} className="font-medium text-gray-800">
                              {topping.name}
                            </Label>
                          </div>
                          <div className="font-medium text-gray-800">+Rs. {topping.price}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Frequently Bought Together */}
                <div className="border-t border-gray-200 pt-6">
                  <button
                    onClick={() => toggleSection("extras")}
                    className="flex items-center justify-between w-full text-left p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-800">Frequently Bought Together</h3>
                      <span className="bg-[#ff4626] text-white px-2 py-1 rounded text-xs">maximum 9</span>
                    </div>
                    {expandedSections.extras ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {expandedSections.extras && (
                    <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
                      {frequentlyBoughtTogether.map((extra) => (
                        <div
                          key={extra.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id={extra.id}
                              checked={selectedExtras.includes(extra.id)}
                              onChange={(e) => handleExtraChange(extra.id, e.target.checked)}
                              className="w-4 h-4 text-[#ff4626] border-gray-300 rounded focus:ring-[#ff4626]"
                            />
                            <img
                              src={extra.image || "/placeholder.svg"}
                              alt={extra.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <Label htmlFor={extra.id} className="font-medium text-gray-800">
                              {extra.name}
                            </Label>
                          </div>
                          <div className="font-medium text-gray-800">Rs. {extra.price}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Special Instructions */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Special Instructions ( Optional )</h3>
                  <Textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requests..."
                    className="min-h-[80px] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Fixed bottom section */}
            <div className="border-t border-gray-200 p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-14 h-14 p-0 bg-[#ff4626] text-white hover:cursor-pointer hover:bg-[#ff4626] hover:text-white border-[#ff4626]"
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <span className="text-2xl font-medium w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-14 h-14 p-0 bg-[#ff4626] text-white hover:text-white hover:bg-[#ff4626] hover:cursor-pointer "
                  >
                    <Plus className="w-8 h-8 " />
                  </Button>
                </div>

                <div className="text-right">
                  <div className="text-[#ff4626] line-through text-sm">{getOriginalPrice().toFixed(2)}</div>
                  <div className="text-xl font-bold">from Rs. {(calculateTotalPrice() / quantity).toFixed(2)}</div>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-[#ff4626] hover:border-1 hover:border-[#ff4626] hover:bg-white hover:text-[#ff4626] hover:cursor-pointer text-white py-6 text-xl  font-medium"
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
