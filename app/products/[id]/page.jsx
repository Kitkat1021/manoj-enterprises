'use client'
import { useState , use} from 'react'
import Link from 'next/link'
import { supabase } from '../../../lib/db'

const PRODUCTS = [
  {
    id: 1,
    name: 'Dynapac CA250D Road Roller',
    category: 'Road Rollers',
    price: 1850000,
    badge: 'Best Seller',
    inStock: true,
    icon: '🛞',
    brand: 'Dynapac',
    description: 'The Dynapac CA250D is a high-performance tandem vibratory roller designed for compaction of asphalt and granular materials. Ideal for highways, airport runways and large infrastructure projects across India.',
    specs: [
      { label: 'Operating Weight',   value: '11,500 kg' },
      { label: 'Engine Power',       value: '129 kW / 173 HP' },
      { label: 'Drum Width',         value: '2,130 mm' },
      { label: 'Travel Speed',       value: '0–12 km/h' },
      { label: 'Vibration Frequency',value: '42 / 50 Hz' },
      { label: 'Fuel Tank Capacity', value: '280 Litres' },
      { label: 'Gradeability',       value: '40%' },
      { label: 'Warranty',           value: '1 Year / 2000 Hours' },
    ],
    brochure: null,
    relatedIds: [2, 3, 11],
  },
  {
    id: 2,
    name: 'BOMAG BW 213 D Road Roller',
    category: 'Road Rollers',
    price: 2100000,
    badge: null,
    inStock: true,
    icon: '🛞',
    brand: 'BOMAG',
    description: 'The BOMAG BW 213 D is a single drum vibratory roller known for its exceptional compaction performance on soil and gravel. Features BOMAG ECONOMIZER for intelligent compaction control.',
    specs: [
      { label: 'Operating Weight',   value: '13,200 kg' },
      { label: 'Engine Power',       value: '138 kW / 185 HP' },
      { label: 'Drum Width',         value: '2,130 mm' },
      { label: 'Travel Speed',       value: '0–10 km/h' },
      { label: 'Vibration Frequency',value: '28 / 35 Hz' },
      { label: 'Fuel Tank Capacity', value: '320 Litres' },
      { label: 'Gradeability',       value: '45%' },
      { label: 'Warranty',           value: '1 Year / 2000 Hours' },
    ],
    brochure: null,
    relatedIds: [1, 3, 11],
  },
  {
    id: 3,
    name: 'Volvo DD25B Compact Roller',
    category: 'Road Rollers',
    price: 950000,
    badge: 'New Arrival',
    inStock: true,
    icon: '🛞',
    brand: 'Volvo',
    description: 'The Volvo DD25B is a lightweight tandem roller ideal for compaction of asphalt in confined areas, footpaths, parking lots and smaller road projects.',
    specs: [
      { label: 'Operating Weight',   value: '2,590 kg' },
      { label: 'Engine Power',       value: '18.4 kW / 24.7 HP' },
      { label: 'Drum Width',         value: '820 mm' },
      { label: 'Travel Speed',       value: '0–9 km/h' },
      { label: 'Vibration Frequency',value: '55 Hz' },
      { label: 'Fuel Tank Capacity', value: '40 Litres' },
      { label: 'Gradeability',       value: '35%' },
      { label: 'Warranty',           value: '1 Year / 1500 Hours' },
    ],
    brochure: null,
    relatedIds: [1, 2, 11],
  },
  {
    id: 4,
    name: 'Wirtgen SP 15 Slipform Paver',
    category: 'Pavers',
    price: 4200000,
    badge: 'New Arrival',
    inStock: true,
    icon: '🏗️',
    brand: 'Wirtgen',
    description: 'The Wirtgen SP 15 is a versatile slipform paver for concrete road construction. Suitable for highways, expressways and airport pavements with high output demands.',
    specs: [
      { label: 'Paving Width',       value: '2,500–8,500 mm' },
      { label: 'Engine Power',       value: '168 kW / 225 HP' },
      { label: 'Paving Speed',       value: '0–3 m/min' },
      { label: 'Paving Thickness',   value: 'Up to 450 mm' },
      { label: 'Operating Weight',   value: '38,000 kg' },
      { label: 'Fuel Tank Capacity', value: '600 Litres' },
      { label: 'Drive System',       value: '4-track crawler' },
      { label: 'Warranty',           value: '1 Year / 2000 Hours' },
    ],
    brochure: null,
    relatedIds: [5, 6, 1],
  },
  {
    id: 5,
    name: 'Vogele Super 1800-3i Paver',
    category: 'Pavers',
    price: 3800000,
    badge: 'Best Seller',
    inStock: false,
    icon: '🏗️',
    brand: 'Vogele',
    description: 'The Vogele Super 1800-3i is one of the most popular tracked pavers in India. Known for its smooth paving performance, user-friendly controls and fuel efficiency.',
    specs: [
      { label: 'Paving Width',       value: '2,550–9,000 mm' },
      { label: 'Engine Power',       value: '129 kW / 175 HP' },
      { label: 'Paving Speed',       value: '0–25 m/min' },
      { label: 'Hopper Capacity',    value: '12,000 kg' },
      { label: 'Operating Weight',   value: '19,500 kg' },
      { label: 'Fuel Tank Capacity', value: '400 Litres' },
      { label: 'Drive System',       value: 'Tracked' },
      { label: 'Warranty',           value: '1 Year / 2000 Hours' },
    ],
    brochure: null,
    relatedIds: [4, 6, 1],
  },
  {
    id: 6,  name: 'ABG Titan 473 Tracked Paver',      category: 'Pavers',         price: 3200000, badge: null,          inStock: true,  icon: '🏗️', brand: 'ABG',         description: 'A reliable tracked paver for medium to large road projects.', specs: [{ label: 'Paving Width', value: '2,500–8,000 mm' }, { label: 'Engine Power', value: '120 kW' }, { label: 'Operating Weight', value: '17,000 kg' }, { label: 'Warranty', value: '1 Year' }], brochure: null, relatedIds: [4, 5, 1] },
  { id: 7,  name: 'Parker 80 TPH Hot Mix Plant',       category: 'Hot Mix Plants', price: 6800000, badge: 'Popular',     inStock: true,  icon: '🔥', brand: 'Parker',       description: 'A trusted hot mix plant for medium scale road construction projects.', specs: [{ label: 'Capacity', value: '80 TPH' }, { label: 'Engine Power', value: '250 kW' }, { label: 'Fuel Type', value: 'Diesel / LDO' }, { label: 'Warranty', value: '1 Year' }], brochure: null, relatedIds: [8, 1, 4] },
  { id: 8,  name: 'Ammann 120 TPH Hot Mix Plant',      category: 'Hot Mix Plants', price: 9500000, badge: null,          inStock: false, icon: '🔥', brand: 'Ammann',       description: 'High capacity hot mix plant ideal for large highway projects.', specs: [{ label: 'Capacity', value: '120 TPH' }, { label: 'Engine Power', value: '380 kW' }, { label: 'Fuel Type', value: 'Diesel / Gas' }, { label: 'Warranty', value: '1 Year' }], brochure: null, relatedIds: [7, 1, 4] },
  { id: 9,  name: 'CASE 845B Motor Grader',            category: 'Motor Graders',  price: 5500000, badge: 'New Arrival', inStock: true,  icon: '🚜', brand: 'CASE',         description: 'The CASE 845B is a versatile motor grader for road maintenance and grading.', specs: [{ label: 'Engine Power', value: '140 kW' }, { label: 'Blade Width', value: '3,660 mm' }, { label: 'Operating Weight', value: '14,200 kg' }, { label: 'Warranty', value: '1 Year' }], brochure: null, relatedIds: [10, 1, 4] },
  { id: 10, name: 'Caterpillar 12M Motor Grader',      category: 'Motor Graders',  price: 7200000, badge: 'Best Seller', inStock: true,  icon: '🚜', brand: 'Caterpillar',  description: 'The Cat 12M is the industry standard motor grader for highway construction.', specs: [{ label: 'Engine Power', value: '162 kW' }, { label: 'Blade Width', value: '3,700 mm' }, { label: 'Operating Weight', value: '15,600 kg' }, { label: 'Warranty', value: '1 Year' }], brochure: null, relatedIds: [9, 1, 4] },
  { id: 11, name: 'Atlas Copco Vibratory Compactor',   category: 'Compactors',     price: 1275000, badge: null,          inStock: true,  icon: '🏭', brand: 'Atlas Copco',  description: 'A compact and powerful vibratory compactor for soil and asphalt compaction.', specs: [{ label: 'Operating Weight', value: '8,500 kg' }, { label: 'Engine Power', value: '97 kW' }, { label: 'Drum Width', value: '1,680 mm' }, { label: 'Warranty', value: '1 Year' }], brochure: null, relatedIds: [12, 1, 2] },
  { id: 12, name: 'Wirtgen W 200 Cold Milling Machine',category: 'Compactors',     price: 8900000, badge: 'Popular',     inStock: false, icon: '🏭', brand: 'Wirtgen',      description: 'The Wirtgen W 200 is a large cold milling machine for road rehabilitation.', specs: [{ label: 'Milling Width', value: '2,000 mm' }, { label: 'Engine Power', value: '537 kW' }, { label: 'Operating Weight', value: '28,000 kg' }, { label: 'Warranty', value: '1 Year' }], brochure: null, relatedIds: [11, 1, 4] },
  { id: 13, name: 'Drum Bearing Kit — Road Roller',    category: 'Spare Parts',    price: 4200,    badge: 'In Stock',    inStock: true,  icon: '⚙️', brand: 'Generic',      description: 'High quality drum bearing kit compatible with most road roller models.', specs: [{ label: 'Compatibility', value: 'Universal fit' }, { label: 'Material', value: 'Hardened Steel' }, { label: 'Warranty', value: '6 Months' }, { label: 'MOQ', value: '1 Set' }], brochure: null, relatedIds: [14, 15, 16] },
  { id: 14, name: 'Hydraulic Pump — Paver Machine',    category: 'Spare Parts',    price: 28500,   badge: null,          inStock: true,  icon: '🔧', brand: 'Generic',      description: 'Replacement hydraulic pump for paver machines. Genuine quality assured.', specs: [{ label: 'Compatibility', value: 'Most paver models' }, { label: 'Pressure Rating', value: '350 bar' }, { label: 'Warranty', value: '6 Months' }, { label: 'MOQ', value: '1 Unit' }], brochure: null, relatedIds: [13, 15, 16] },
  { id: 15, name: 'Screed Plate Set — Paver',          category: 'Spare Parts',    price: 12800,   badge: 'Fast Moving', inStock: true,  icon: '🔩', brand: 'Generic',      description: 'Durable screed plate set for asphalt pavers. Reduces wear and extends machine life.', specs: [{ label: 'Compatibility', value: 'Universal' }, { label: 'Material', value: 'Wear-resistant steel' }, { label: 'Warranty', value: '3 Months' }, { label: 'MOQ', value: '1 Set' }], brochure: null, relatedIds: [13, 14, 16] },
  { id: 16, name: 'Vibratory Motor — Compactor',       category: 'Spare Parts',    price: 18500,   badge: null,          inStock: false, icon: '⚙️', brand: 'Generic',      description: 'Replacement vibratory motor for soil and asphalt compactors.', specs: [{ label: 'Compatibility', value: 'Most compactor models' }, { label: 'Voltage', value: '24V DC' }, { label: 'Warranty', value: '6 Months' }, { label: 'MOQ', value: '1 Unit' }], brochure: null, relatedIds: [13, 14, 15] },
]

function formatPrice(price) {
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} Lakh`
  return `₹${price.toLocaleString('en-IN')}`
}

export default function ProductDetailPage({ params }) {
  const { id: rawId } = use(params)
  const id = parseInt(rawId)
  const product = PRODUCTS.find(p => p.id === id)
  const related = product ? PRODUCTS.filter(p => product.relatedIds.includes(p.id)) : []

  const [form, setForm]           = useState({ name: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-400 mb-6">This product doesn't exist or may have been removed.</p>
          <Link href="/products" className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-lg">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase
      .from('enquiries')
      .insert([{
        name: form.name,
        phone: form.phone,
        email: form.email,
        category: product.category,
        message: `Enquiry for: ${product.name}\n\n${form.message}`,
        company: '',
      }])
    setLoading(false)
    if (error) {
      alert('Something went wrong. Please try again or call us directly.')
      console.error(error)
    } else {
      setSubmitted(true)
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Hi Manoj Enterprises, I am interested in: ${product.name} (₹${formatPrice(product.price)}). Please share more details.`
  )

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-500 flex gap-2 flex-wrap">
          <Link href="/" className="hover:text-yellow-600">Home</Link> /
          <Link href="/products" className="hover:text-yellow-600">Products</Link> /
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT — Product Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Product Header Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

              {/* Image Area */}
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 h-64 sm:h-80 flex items-center justify-center text-8xl sm:text-9xl">
                {product.icon}
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${
                  product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                }`}>
                  {product.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                  {product.category} · {product.brand}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {product.description}
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </div>
                  {/* WhatsApp Button */}
                  <a
                    href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-5 py-3 rounded-lg transition-colors text-sm"
                  >
                    <span>💬</span> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Technical Specifications</h2>
              <div className="divide-y divide-gray-100">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between py-3 text-sm">
                    <span className="text-gray-500 font-medium">{spec.label}</span>
                    <span className="text-gray-900 font-semibold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Brochure */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold text-gray-900 mb-1">📄 Product Brochure</div>
                <div className="text-sm text-gray-500">Download the full technical brochure and specifications PDF</div>
              </div>
              <button
                onClick={() => alert('Brochure coming soon! Contact us and we will email it to you directly.')}
                className="bg-gray-900 hover:bg-yellow-400 hover:text-gray-900 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap"
              >
                ⬇ Download PDF
              </button>
            </div>

          </div>

          {/* RIGHT — Enquiry Form */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">

              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-3">✅</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Enquiry Sent!</h3>
                  <p className="text-gray-400 text-sm mb-5">Our team will contact you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name:'', phone:'', email:'', message:'' }) }}
                    className="bg-yellow-400 text-gray-900 font-bold px-5 py-2 rounded-lg text-sm"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Quick Enquiry</h2>
                  <p className="text-gray-400 text-xs mb-5">Get pricing and availability for this product</p>

                  {/* Product summary */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-5 flex items-center gap-3">
                    <span className="text-3xl">{product.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-gray-900 leading-snug">{product.name}</div>
                      <div className="text-xs text-yellow-600 font-bold">{formatPrice(product.price)}</div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text" name="name" required value={form.name}
                        onChange={handleChange} placeholder="Your name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel" name="phone" required value={form.phone}
                        onChange={handleChange} placeholder="+91 98765 43210"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                      <input
                        type="email" name="email" value={form.email}
                        onChange={handleChange} placeholder="you@example.com"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Message</label>
                      <textarea
                        name="message" value={form.message} onChange={handleChange}
                        rows={3} placeholder="Any specific requirements, quantity, location..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                      />
                    </div>
                    <button
                      type="submit" disabled={loading}
                      className="w-full bg-gray-900 hover:bg-yellow-400 hover:text-gray-900 text-white font-bold py-3 rounded-lg transition-colors text-sm disabled:opacity-60"
                    >
                      {loading ? 'Sending...' : 'Send Enquiry →'}
                    </button>
                  </form>

                  {/* Direct contact */}
                  <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400 mb-2">Or reach us directly</p>
                    <a href="tel:+919876543210" className="text-sm font-bold text-gray-900 hover:text-yellow-600">
                      📞 +91 98765 43210
                    </a>
                  </div>
                </>
              )}

            </div>
          </div>

        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(rp => (
                <Link
                  key={rp.id}
                  href={`/products/${rp.id}`}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-yellow-400 transition-all duration-200"
                >
                  <div className="bg-gray-100 h-36 flex items-center justify-center text-5xl relative">
                    {rp.icon}
                    <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full ${
                      rp.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    }`}>
                      {rp.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-400 mb-1">{rp.category} · {rp.brand}</div>
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-yellow-600 mb-2">{rp.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">{formatPrice(rp.price)}</span>
                      <span className="text-xs text-yellow-600 font-bold">View Details →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
