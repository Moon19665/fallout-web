import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MenuContent } from "@/components/menu-content"

export default function MenuPage() {
  return (
    <div className="min-h-screen">
   
      <Navigation />
         <div className="w-full">
        <img
          src={
            "/menu-banner.jpg"
          }
          alt="Banner"
          className=" w-full h-auto object-cover"
        />
      </div>
      <main className="">
        <MenuContent />
      </main>
      <Footer />
    </div>
  )
}
