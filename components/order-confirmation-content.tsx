"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Clock, MapPin, Phone, Mail, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface OrderData {
  items: any[]
  total: number
  customerInfo?: any
  paymentMethod?: string
  paymentStatus?: string
  orderTime: string
  orderId: string
  deliveryType?: string
}

export function OrderConfirmationContent() {
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [estimatedTime, setEstimatedTime] = useState(35)
  const router = useRouter()

  useEffect(() => {
    // Load order data from localStorage
    const savedOrder = localStorage.getItem("brim-order")
    if (savedOrder) {
      try {
        const order = JSON.parse(savedOrder)
        setOrderData(order)
        setIsVisible(true)
      } catch (error) {
        console.error("Error loading order data:", error)
        router.push("/")
      }
    } else {
      // Redirect to home if no order data
      router.push("/")
    }
  }, [router])

  useEffect(() => {
    // Countdown timer for estimated delivery
    if (estimatedTime > 0) {
      const timer = setTimeout(() => {
        setEstimatedTime((prev) => prev - 1)
      }, 60000) // Update every minute

      return () => clearTimeout(timer)
    }
  }, [estimatedTime])

  const handleShareOrder = () => {
    if (navigator.share && orderData) {
      navigator.share({
        title: "My Fallout Burgers Order",
        text: `Order #${orderData.orderId} - Rs ${orderData.total}`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`Order #${orderData?.orderId} - Rs ${orderData?.total}`)
    }
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--color-brim-red)] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  const orderTime = new Date(orderData.orderTime)
  const deliveryTime = new Date(orderTime.getTime() + 35 * 60 * 1000) // Add 35 minutes

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className={`text-center mb-8 ${isVisible ? "animate-bounce-in" : "opacity-0"}`}>
          <div className="mb-6">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="font-bebas-neue text-4xl md:text-5xl font-bold text-black mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 text-lg">Thank you for choosing Fallout Burgers. Your order is being prepared.</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-bold text-xl text-[var(--color-brim-red)]">{orderData.orderId}</p>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Estimated Time</p>
                <p className="font-bold text-xl text-black">{estimatedTime} mins</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                Expected delivery: {deliveryTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card className={`${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-black">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                          <span className="font-bold text-[var(--color-brim-red)]">
                            Rs {item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            {orderData.customerInfo && (
              <Card
                className={`${isVisible ? "animate-slide-in-left" : "opacity-0"}`}
                style={{ animationDelay: "0.1s" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 text-[var(--color-brim-red)] mr-2" />
                    {orderData.customerInfo.deliveryType === "pickup" ? "Pickup Information" : "Delivery Information"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-black">
                        {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}
                      </p>
                      <p className="text-gray-600">{orderData.customerInfo.phone}</p>
                      <p className="text-gray-600">{orderData.customerInfo.email}</p>
                    </div>

                    {orderData.customerInfo.deliveryType === "delivery" ? (
                      <div>
                        <p className="font-medium text-black mb-1">Delivery Address:</p>
                        <p className="text-gray-600">
                          {orderData.customerInfo.address}
                          <br />
                          {orderData.customerInfo.area}, {orderData.customerInfo.city}
                        </p>
                        {orderData.customerInfo.instructions && (
                          <p className="text-sm text-gray-500 mt-2">
                            <strong>Instructions:</strong> {orderData.customerInfo.instructions}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium text-black mb-1">Pickup Location:</p>
                        <p className="text-gray-600">
                          Brim Burgers Main Branch
                          <br />
                          123 Main Street, Gulberg III
                          <br />
                          Lahore, Pakistan
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Information */}
            <Card className={`${isVisible ? "animate-slide-in-left" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium text-black">
                      {orderData.paymentMethod === "card" ? "Credit/Debit Card" : "Cash on Delivery"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className="font-medium text-green-600">
                      {orderData.paymentStatus === "completed" ? "Paid" : "Pending"}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                    <span className="text-black">Total Amount:</span>
                    <span className="text-[var(--color-brim-red)]">Rs {orderData.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Status & Actions */}
          <div className="lg:col-span-1">
            <div className={`space-y-6 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
              {/* Order Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-black">Order Confirmed</p>
                        <p className="text-xs text-gray-500">{orderTime.toLocaleTimeString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-medium text-black">Preparing</p>
                        <p className="text-xs text-gray-500">In progress</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="text-gray-500">
                          {orderData.customerInfo?.deliveryType === "pickup" ? "Ready for Pickup" : "Out for Delivery"}
                        </p>
                        <p className="text-xs text-gray-400">Pending</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="text-gray-500">
                          {orderData.customerInfo?.deliveryType === "pickup" ? "Picked Up" : "Delivered"}
                        </p>
                        <p className="text-xs text-gray-400">Pending</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-[var(--color-brim-red)]" />
                      <div>
                        <p className="font-medium text-black">Call Us</p>
                        <p className="text-sm text-gray-600">0304 1112746</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-[var(--color-brim-red)]" />
                      <div>
                        <p className="font-medium text-black">Email</p>
                        <p className="text-sm text-gray-600">support@brimburgers.pk</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleShareOrder}
                  variant="outline"
                  className="w-full border-[var(--color-brim-red)] text-[var(--color-brim-red)] hover:bg-red-50 bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Order
                </Button>

                <Link href="/menu" className="block">
                  <Button className="w-full bg-[var(--color-brim-red)] hover:bg-red-700 text-white">Order Again</Button>
                </Link>

                <Link href="/" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
