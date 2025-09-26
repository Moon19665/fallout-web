"use client"

import { useState, useEffect } from "react"

export function JoinUsContent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-rfrom-[#FF5900] via-[#D1991C] to-[#B58215] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#FF5900]/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h1 className="font-bebas-neue text-6xl md:text-7xl font-bold text-white mb-4 tracking-wider">JOIN US</h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
            <h2 className="font-bebas-neue text-4xl md:text-5xl font-bold text-black mb-8">
              OPEN POSITIONS WILL BE LISTED SOON
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-12 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-[#FF5900]" fill="none" stroke="#ff4626" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-800">We're Growing!</h3>

                <p className="text-gray-600 leading-relaxed">
                  Fallout is expanding rapidly across Pakistan, and we're always looking for passionate individuals to join
                  our team. Whether you're interested in kitchen operations, customer service, management, or corporate
                  roles, we'll have exciting opportunities coming soon.
                </p>

                <div className="bg-gray-50 rounded-lg p-6 text-left">
                  <h4 className="font-bold text-lg text-gray-800 mb-3">What We Offer:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#FF5900] rounded-full mr-3"></span>
                      Competitive salary packages
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#FF5900] rounded-full mr-3"></span>
                      Professional development opportunities
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#FF5900] rounded-full mr-3"></span>
                      Dynamic work environment
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#FF5900] rounded-full mr-3"></span>
                      Employee benefits and perks
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#FF5900] rounded-full mr-3"></span>
                      Career growth opportunities
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <p className="text-gray-600 mb-4">
                    Stay tuned for upcoming job openings or reach out to us directly if you're interested in joining the
                    Fallout family.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/contact"
                      className="bg-[#FF5900] text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#FF5900] hover:cursor-pointer hover:border-1 hover:border-[#FF5900] transition-colors"
                    >
                      Contact Us
                    </a>
                    <a
                      href="mailto:careers@Falloutburger.pk"
                      className="border border-[#FF5900] text-[#FF5900] px-8 py-3 rounded-lg font-medium hover:bg-[#FF5900] hover:text-white transition-colors"
                    >
                      Send Resume
                    </a>
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
