import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PaymentContent } from "@/components/payment-content"

export default function PaymentPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24">
        <PaymentContent />
      </main>
      <Footer />
    </div>
  )
}
