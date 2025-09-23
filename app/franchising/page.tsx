import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FranchisingContent } from "@/components/franchising-content"

export default function FranchisingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <FranchisingContent />
      </main>
      <Footer />
    </div>
  )
}
