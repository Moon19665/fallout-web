import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="bg-white text-black px-4 py-2 font-bebas-neue text-2xl font-bold tracking-wider inline-block mb-4">
              Fallout
            </div>
          </div>

          {/* Site Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Site Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-300 hover:text-white transition-colors">
                  MENU
                </Link>
              </li>
              <li>
                <Link href="/franchising" className="text-gray-300 hover:text-white transition-colors">
                  FRANCHISING
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  CONTACT
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="text-gray-300 hover:text-white transition-colors">
                  JOIN US
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Menu */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Explore Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/menus#burgers" className="text-gray-300 hover:text-white transition-colors">
                  BURGERS
                </Link>
              </li>
              <li>
                <Link href="/menus#fries" className="text-gray-300 hover:text-white transition-colors">
                  FRIES
                </Link>
              </li>
              <li>
                <Link href="/menus#sides" className="text-gray-300 hover:text-white transition-colors">
                  SIDES
                </Link>
              </li>
              <li>
                <Link href="/menus#drinks" className="text-gray-300 hover:text-white transition-colors">
                  DRINKS
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
            <div className="space-y-3">
              <p className="text-sm text-gray-300">For Complaints/Suggestions:</p>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">0302 8102529</span>
              </div>
              <p className="text-sm text-gray-300">Customer Service Number:</p>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">0304 1112746</span>
              </div>
              <p className="text-sm text-gray-300">To Order:</p>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">0304 1112746</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">info@Falloutburger.pk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Useful Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Useful Links</h3>
            <div className="space-y-2">
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors block">
                TERMS AND CONDITIONS
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors block">
                PRIVACY POLICY
              </Link>
              <div className="flex space-x-4 mt-4">
                <div className="bg-gray-800 px-3 py-2 rounded">
                  <span className="text-xs text-gray-300">GET IT ON</span>
                  <div className="text-white font-bold">Google Play</div>
                </div>
                <div className="bg-gray-800 px-3 py-2 rounded">
                  <span className="text-xs text-gray-300">Download on the</span>
                  <div className="text-white font-bold">App Store</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Opening Hours</h3>
            <div className="space-y-2">
              <div>
                <span className="text-gray-300">Lahore: </span>
                <span className="text-white">12:00 PM to 3:00 AM</span>
              </div>
              <div>
                <span className="text-gray-300">Islamabad: </span>
                <span className="text-white">11:00 AM to 2:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Fallout Burgers</p>
          <p className="text-gray-400 text-sm">Powered by Fallout.com</p>
        </div>
      </div>
    </footer>
  )
}
