import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CartContent } from "@/components/cart-content"

export default function CartPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mt-8">
        <CartContent />
      </main>
      <Footer />
    </div>
  )
}
