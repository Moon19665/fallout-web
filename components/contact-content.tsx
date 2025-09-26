"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactContent() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    message: "",
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-rfrom-[#FF5900] via-[#D1991C] to-[#B58215] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/delicious-spicy-burger-with-multiple-layers--sesam.jpg"
            alt="Contact Us Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[#FF5900]/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h1 className="font-bebas-neue text-6xl md:text-7xl font-bold text-white mb-4 tracking-wider">
              CONTACT US
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className={`${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="font-bebas-neue text-3xl font-bold text-black mb-2">ASK A QUESTION</h2>
                <p className="text-gray-600 mb-8">You can reach us anytime via</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <Input
                        id="country"
                        name="country"
                        type="text"
                        placeholder="Enter your Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#FF5900] text-white hover:bg-white hover:text-[#FF5900] hover:border-1 hover:border-[#FF5900] hover:cursor-pointer py-3 text-lg font-medium"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Submit Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className={`${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
              <div className="bg-[#FF5900] text-white rounded-lg p-8 h-full">
                <h2 className="font-bebas-neue text-3xl font-bold mb-2">GET IN TOUCH</h2>
                <p className="text-white mb-8">
                  Contact us about anything related to our company or services. We'll do our best to get back to you as
                  soon as possible.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-white mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-white">Falloutburgers-pk@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-white mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Address</p>
                      <p className="text-white">
                        Building No 79, Ground Floor Raya Commercial,
                        <br />
                        Phase 6 DHA, Lahore
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-white mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <p className="text-white">0302 810 2529</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white">
                  <h3 className="font-bold text-lg mb-4">Business Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white">Lahore:</span>
                      <span className="text-white">12:00 PM - 3:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Islamabad:</span>
                      <span className="text-white">11:00 AM - 2:00 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
