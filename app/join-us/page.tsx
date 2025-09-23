import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { JoinUsContent } from "@/components/join-us-content"

export default function JoinUsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <JoinUsContent />
      </main>
      <Footer />
    </div>
  )
}
