"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, CreditCard, Lock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface PaymentForm {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
}

export function PaymentContent() {
  const { items, total, itemCount, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"form" | "processing" | "success">("form")

  const [form, setForm] = useState<PaymentForm>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  useEffect(() => {
    setIsVisible(true)

    // Redirect to cart if empty
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items.length, router])

  const deliveryFee = total > 1000 ? 0 : 150
  const finalTotal = total + deliveryFee

  const handleInputChange = (field: keyof PaymentForm, value: string) => {
    let formattedValue = value

    // Format card number with spaces
    if (field === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19)
    }

    // Format expiry date
    if (field === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5)
    }

    // Format CVV
    if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4)
    }

    setForm((prev) => ({ ...prev, [field]: formattedValue }))
  }

  const validateForm = () => {
    if (!form.cardholderName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter the cardholder name.",
        variant: "destructive",
      })
      return false
    }

    if (form.cardNumber.replace(/\s/g, "").length < 16) {
      toast({
        title: "Invalid Card Number",
        description: "Please enter a valid card number.",
        variant: "destructive",
      })
      return false
    }

    if (form.expiryDate.length < 5) {
      toast({
        title: "Invalid Expiry Date",
        description: "Please enter a valid expiry date.",
        variant: "destructive",
      })
      return false
    }

    if (form.cvv.length < 3) {
      toast({
        title: "Invalid CVV",
        description: "Please enter a valid CVV.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsProcessing(true)
    setPaymentStep("processing")

    try {
      // Simulate Stripe payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Create order data
      const orderData = {
        items,
        total: finalTotal,
        paymentMethod: "card",
        paymentStatus: "completed",
        orderTime: new Date().toISOString(),
        orderId: `BRIM-${Date.now()}`,
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

      // Store order data for confirmation page
      localStorage.setItem("brim-order", JSON.stringify(orderData))

      setPaymentStep("success")

      // Clear cart and redirect after success animation
      setTimeout(() => {
        clearCart()
        router.push("/order-confirmation")
      }, 2000)
    } catch (error) {
      setPaymentStep("form")
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return null // Will redirect in useEffect
  }

  if (paymentStep === "processing") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--color-brim-red)] mx-auto mb-4"></div>
          <h2 className="font-bebas-neue text-2xl font-bold text-black mb-2">Processing Payment</h2>
          <p className="text-gray-600">Please wait while we process your payment...</p>
        </div>
      </div>
    )
  }

  if (paymentStep === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center animate-bounce-in">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="font-bebas-neue text-2xl font-bold text-black mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Redirecting to order confirmation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bebas-neue text-4xl md:text-5xl font-bold text-black">Payment</h1>
            <Link href="/checkout" className="text-[var(--color-brim-red)] hover:underline flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Checkout
            </Link>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Lock className="w-4 h-4 mr-2" />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className={`bg-white rounded-lg shadow-lg p-6 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
                <div className="flex items-center mb-6">
                  <CreditCard className="w-5 h-5 text-[var(--color-brim-red)] mr-2" />
                  <h2 className="font-bold text-xl text-black">Card Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name *</Label>
                    <Input
                      id="cardholderName"
                      value={form.cardholderName}
                      onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      value={form.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        value={form.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        value={form.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isProcessing}
                    className="w-full bg-[var(--color-brim-red)] hover:bg-red-700 text-white py-3 text-lg font-bold disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      `Pay Rs ${finalTotal}`
                    )}
                  </Button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Your payment is processed securely by Stripe. We do not store your card information.
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className={`bg-white rounded-lg shadow-lg p-6 sticky top-24 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
            >
              <h2 className="font-bold text-xl text-black mb-6">Order Summary</h2>

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
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>Rs {total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? "FREE" : `Rs ${deliveryFee}`}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-bold text-lg text-black">
                    <span>Total</span>
                    <span>Rs {finalTotal}</span>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Lock className="w-4 h-4 mr-2" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>PCI DSS compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
