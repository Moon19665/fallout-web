import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactContent } from "@/components/contact-content"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <ContactContent />
      </main>
      <Footer />
    </div>
  )
}
