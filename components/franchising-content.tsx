"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Users, TrendingUp, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FranchisingContent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const benefits = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Proven Business Model",
      description: "Join Pakistan's fastest-growing burger franchise with a proven track record of success.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Comprehensive Training",
      description: "Complete training program covering operations, management, and customer service.",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Marketing Support",
      description: "Full marketing and advertising support to help grow your franchise location.",
    },
  ]

  const requirements = [
    "Minimum investment of PKR 5,000,000",
    "Business experience in food service or retail",
    "Commitment to Fallout brand standards",
    "Prime location in high-traffic area",
    "Passion for quality food and customer service",
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-[#FF5900] via-[#D1991C] to-[#B58215] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/delicious-spicy-burger-with-multiple-layers--sesam.jpg"
            alt="Franchising Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[#FF5900]/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h1 className="font-bebas-neue text-6xl md:text-7xl font-bold text-white mb-4 tracking-wider">
              FRANCHISING
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Partner with Fallout and bring the best burgers in Pakistan to your city
            </p>
          </div>
        </div>
      </section>

      {/* Main Cont*/}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-bebas-neue text-4xl md:text-5xl font-bold text-black mb-6">JOIN THE FALLOUT FAMILY</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Fallout is expanding across Pakistan and we're looking for passionate entrepreneurs to join our franchise
              network. With our proven business model, comprehensive support, and growing brand recognition, now is the
              perfect time to invest in a Fallout franchise.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`text-center p-8 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-[#FF5900] mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="font-bold text-xl text-black mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Requirements and Process */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Requirements */}
            <div className={`${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
              <div className="bg-[#FF5900]/90 text-white rounded-lg p-8">
                <h3 className="font-bebas-neue text-3xl font-bold mb-6">FRANCHISE REQUIREMENTS</h3>
                <ul className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-white">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Process */}
            <div className={`${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="font-bebas-neue text-3xl font-bold text-black mb-6">FRANCHISE PROCESS</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#FF5900] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-1">Initial Inquiry</h4>
                      <p className="text-gray-600 text-sm">Submit your franchise application and initial information</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#FF5900] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-1">Qualification Review</h4>
                      <p className="text-gray-600 text-sm">We review your application and financial qualifications</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#FF5900] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-1">Discovery Meeting</h4>
                      <p className="text-gray-600 text-sm">Meet with our franchise team to discuss opportunities</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#FF5900] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-1">Site Selection & Setup</h4>
                      <p className="text-gray-600 text-sm">
                        Choose location, complete training, and launch your franchise
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div
            className={`text-center mt-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.8s" }}
          >
            <div className="bg-[#FF5900] text-white rounded-lg p-12 max-w-4xl mx-auto">
              <h3 className="font-bebas-neue text-4xl font-bold mb-4">READY TO GET STARTED?</h3>
              <p className="text-xl mb-8 text-white">
                Take the first step towards owning your own Fallout franchise today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-[#FF5900] hover:cursor-pointer hover:bg-gray-100 px-8 py-3 text-lg font-medium">
                  Download Franchise Kit
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:cursor-pointer hover:text-[#FF5900] px-8 py-3 text-lg font-medium bg-transparent"
                >
                  Schedule a Meeting
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
