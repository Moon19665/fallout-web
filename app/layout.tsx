import type React from "react"
import type { Metadata } from "next"
import { Inter, Bebas_Neue } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CartProvider } from "@/contexts/cart-context"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Fallout - Best Burgers in Pakistan",
  description:
    "Experience the spiciest and most delicious burgers in Pakistan. BRIM delivers the best smash burgers, loaded fries, and more.",
  generator: "v0.app",
  keywords: "burgers, pakistan, spicy, smash burgers, delivery, lahore, food",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${bebasNeue.variable}`}>
        <CartProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </CartProvider>
        <Analytics />
         <Toaster />
      </body>
    </html>
  )
}
