import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="text-yellow-400 font-bold text-lg mb-1">Manoj Enterprises</div>
            <div className="text-xs text-gray-500 mb-4">Road Construction Machinery & Spare Parts</div>
            <p className="text-sm leading-relaxed">
              Supplying road rollers, pavers, hot mix plants and spare parts to contractors
              and government agencies across India since 1995.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            {['Road Rollers', 'Pavers', 'Hot Mix Plants', 'Motor Graders', 'Compactors', 'Spare Parts'].map(item => (
              <Link key={item} href="/products" className="block text-sm mb-2 hover:text-yellow-400 transition-colors">
                {item}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            {['About Us', 'Our Brands', 'Testimonials', 'Careers', 'Contact Us'].map(item => (
              <Link key={item} href="/" className="block text-sm mb-2 hover:text-yellow-400 transition-colors">
                {item}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <div className="text-sm space-y-3">
              <div>📞 <span className="ml-2">+91 98765 43210</span></div>
              <div>✉️ <span className="ml-2">info@manojenterprises.in</span></div>
              <div>📍 <span className="ml-2">Mumbai, Maharashtra, India</span></div>
              <div className="pt-2">
                <span className="text-xs bg-green-800 text-green-300 px-3 py-1 rounded-full font-semibold">
                  Mon–Sat: 9AM – 6PM
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <span>© 2026 Manoj Enterprises. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-yellow-400">Privacy Policy</Link>
            <Link href="/" className="hover:text-yellow-400">Terms of Service</Link>
            <Link href="/" className="hover:text-yellow-400">Refund Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
