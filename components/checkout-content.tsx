"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, CreditCard, MapPin, User, Clock, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface CheckoutForm {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string

  // Delivery Information
  deliveryType: "delivery" | "pickup"
  address: string
  city: string
  area: string
  instructions: string

  // Payment Information
  paymentMethod: "card" | "cash"

  // Order Preferences
  cutlery: boolean
  newsletter: boolean
}

export function CheckoutContent() {
  const { items, total, itemCount, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const [form, setForm] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    deliveryType: "delivery",
    address: "",
    city: "Lahore",
    area: "",
    instructions: "",
    paymentMethod: "card",
    cutlery: true,
    newsletter: false,
  })

  useEffect(() => {
    setIsVisible(true)

    // Redirect to cart if empty
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items.length, router])

  const deliveryFee = form.deliveryType === "pickup" ? 0 : total > 1000 ? 0 : 150
  const finalTotal = total + deliveryFee

  const handleInputChange = (field: keyof CheckoutForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const required = ["firstName", "lastName", "email", "phone"]
    if (form.deliveryType === "delivery") {
      required.push("address", "area")
    }
    console.log('required', required, form);
    
    for (const field of required) {
      if (!form[field as keyof CheckoutForm]) {
        toast({
          title: "Missing Information",
          description: `Please fill in your ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`,
          variant: "destructive",
        })
        return false
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return false
    }

    // Phone validation
    if (form.phone.length < 10) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid phone number.",
        variant: "destructive",
        className: "bg-red-600 text-white",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('validateForm', validateForm());
    
    if (!validateForm()) return

    setIsProcessing(true)

    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const orderData = {
        items,
        total: finalTotal,
        customerInfo: form,
        orderTime: new Date().toISOString(),
        orderId: `BRIM-${Date.now()}`,
        paymentMethod: form.paymentMethod,
        paymentStatus: form.paymentMethod === "cash" ? "pending" : "completed",
      }

      try {
        await fetch("/api/send-order-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        })
      } catch (emailError) {
        console.error("Failed to send order email:", emailError)
        // Don't fail the order if email fails
      }

      if (form.paymentMethod === "card") {
        // Store order data for payment page
        localStorage.setItem("brim-order", JSON.stringify(orderData))
        router.push("/payment")
      } else {
        // Process cash on delivery
        localStorage.setItem("brim-order", JSON.stringify(orderData))
        clearCart()
        router.push("/order-confirmation")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bebas-neue text-4xl md:text-5xl font-bold text-black">Checkout</h1>
            <Link href="/cart" className="text-[#F7C431] hover:underline flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Cart
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Information */}
              <div className={`bg-white rounded-lg shadow-lg p-6 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
                <div className="flex items-center mb-6">
                  <User className="w-5 h-5 text-[#F7C431] mr-2" />
                  <h2 className="font-bold text-xl text-black">Personal Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={form.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={form.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="03XX XXXXXXX"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div
                className={`bg-white rounded-lg shadow-lg p-6 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}
                style={{ animationDelay: "0.1s" }}
              >
                <div className="flex items-center mb-6">
                  <MapPin className="w-5 h-5 text-[#F7C431] mr-2" />
                  <h2 className="font-bold text-xl text-black">Delivery Information</h2>
                </div>

                {/* Delivery Type */}
                <div className="mb-6">
                  <Label className="text-base font-medium mb-3 block">Delivery Type *</Label>
                  <RadioGroup
                    value={form.deliveryType}
                    onValueChange={(value) => handleInputChange("deliveryType", value)}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery">Home Delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup">Store Pickup</Label>
                    </div>
                  </RadioGroup>
                </div>

                {form.deliveryType === "delivery" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Complete Address *</Label>
                      <Input
                        id="address"
                        value={form.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="House/Building, Street, Block"
                        required={form.deliveryType === "delivery"}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Lahore"
                      />
                    </div>
                    <div>
                      <Label htmlFor="area">Area *</Label>
                      <Input
                        id="area"
                        value={form.area}
                        onChange={(e) => handleInputChange("area", e.target.value)}
                        placeholder="DHA, Gulberg, etc."
                        required={form.deliveryType === "delivery"}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="instructions">Delivery Instructions</Label>
                      <Textarea
                        id="instructions"
                        value={form.instructions}
                        onChange={(e) => handleInputChange("instructions", e.target.value)}
                        placeholder="Any special instructions for delivery..."
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {form.deliveryType === "pickup" && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-black mb-2">Pickup Location:</h4>
                    <p className="text-gray-600">
                      Brim Burgers Main Branch
                      <br />
                      123 Main Street, Gulberg III
                      <br />
                      Lahore, Pakistan
                      <br />
                      Phone: 0304 1112746
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Please bring your order confirmation when picking up.</p>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div
                className={`bg-white rounded-lg shadow-lg p-6 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center mb-6">
                  <CreditCard className="w-5 h-5 text-[#F7C431] mr-2" />
                  <h2 className="font-bold text-xl text-black">Payment Method</h2>
                </div>

                <RadioGroup
                  value={form.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        <span className="font-medium">Credit/Debit Card</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Pay securely with Stripe</p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        <span className="font-medium">Cash on Delivery</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Pay when your order arrives</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Additional Options */}
              <div
                className={`bg-white rounded-lg shadow-lg p-6 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}
                style={{ animationDelay: "0.3s" }}
              >
                <h2 className="font-bold text-xl text-black mb-6">Additional Options</h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cutlery"
                      checked={form.cutlery}
                      onCheckedChange={(checked) => handleInputChange("cutlery", checked as boolean)}
                    />
                    <Label htmlFor="cutlery">Include cutlery and napkins</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={form.newsletter}
                      onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                    />
                    <Label htmlFor="newsletter">Subscribe to our newsletter for exclusive offers</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div
                className={`bg-white rounded-lg shadow-lg p-6 sticky top-24 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
              >
                <div className="flex items-center mb-6">
                  <ShoppingBag className="w-5 h-5 text-[#F7C431] mr-2" />
                  <h2 className="font-bold text-xl text-black">Order Summary</h2>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-black truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-sm">Rs {item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Order Breakdown */}
                <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>Rs {total}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{form.deliveryType === "pickup" ? "Pickup" : "Delivery Fee"}</span>
                    <span>{deliveryFee === 0 ? "FREE" : `Rs ${deliveryFee}`}</span>
                  </div>
                  {deliveryFee === 0 && form.deliveryType === "delivery" && (
                    <p className="text-green-600 text-sm">🎉 Free delivery on orders over Rs 1,000!</p>
                  )}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-bold text-lg text-black">
                      <span>Total</span>
                      <span>Rs {finalTotal}</span>
                    </div>
                  </div>
                </div>

                {/* Estimated Time */}
                <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Estimated {form.deliveryType === "pickup" ? "pickup" : "delivery"}: 25-35 minutes</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isProcessing}
                  className="w-full bg-[#F7C431] hover:bg-[#F7C431] hover:cursor-pointer text-white py-3 text-lg font-bold disabled:opacity-50"
                >
                  {isProcessing ? "Processing..." : `Place Order - Rs ${finalTotal}`}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
