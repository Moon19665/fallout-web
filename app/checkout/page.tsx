import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CheckoutContent } from "@/components/checkout-content"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-8">
        <CheckoutContent />
      </main>
      <Footer />
    </div>
  )
}
