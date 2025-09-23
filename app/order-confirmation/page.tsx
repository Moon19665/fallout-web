import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { OrderConfirmationContent } from "@/components/order-confirmation-content"

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24">
        <OrderConfirmationContent />
      </main>
      <Footer />
    </div>
  )
}
