import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const emailContent = `
      New Order Received - Brim Burgers
      
      Order Details:
      Order ID: ${orderData.orderId}
      Customer: ${orderData.customerInfo?.firstName} ${orderData.customerInfo?.lastName}
      Email: ${orderData.customerInfo?.email}
      Phone: ${orderData.customerInfo?.phone}
      
      ${
        orderData.customerInfo?.deliveryType === "delivery"
          ? `Delivery Address: ${orderData.customerInfo?.address}, ${orderData.customerInfo?.area}, ${orderData.customerInfo?.city}`
          : "Pickup Order"
      }
      
      Items Ordered:
      ${orderData.items
        .map((item: any) => `- ${item.name} x${item.quantity} - Rs ${item.price * item.quantity}`)
        .join("\n")}
      
      Total Amount: Rs ${orderData.total}
      Payment Method: ${orderData.paymentMethod === "card" ? "Credit/Debit Card" : "Cash on Delivery"}
      Payment Status: ${orderData.paymentStatus || "Pending"}
      
      ${orderData.customerInfo?.instructions ? `Special Instructions: ${orderData.customerInfo.instructions}` : ""}
      
      Order Time: ${new Date(orderData.orderTime).toLocaleString()}
    `

    // In a real implementation, you would use a service like SendGrid, Nodemailer, or Resend
    // For now, we'll simulate sending the email
    console.log("Sending email to memoonjaved225@gmail.com:", emailContent)

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Order notification email sent successfully",
    })
  } catch (error) {
    console.error("Error sending order email:", error)
    return NextResponse.json({ error: "Failed to send order notification email" }, { status: 500 })
  }
}
