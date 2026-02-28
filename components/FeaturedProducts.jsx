import Link from 'next/link'

const products = [
  {
    id: 1,
    name: 'Dynapac CA250D Road Roller',
    category: 'Road Rollers',
    price: '18,50,000',
    badge: 'Best Seller',
    badgeColor: 'bg-green-500',
    icon: '🛞',
  },
  {
    id: 2,
    name: 'Wirtgen SP 15 Slipform Paver',
    category: 'Pavers',
    price: '42,00,000',
    badge: 'New Arrival',
    badgeColor: 'bg-blue-500',
    icon: '🏗️',
  },
  {
    id: 3,
    name: 'Atlas Copco Vibratory Compactor',
    category: 'Compactors',
    price: '12,75,000',
    badge: null,
    icon: '🏭',
  },
  {
    id: 4,
    name: 'Parker Hot Mix Plant 80 TPH',
    category: 'Hot Mix Plants',
    price: '68,00,000',
    badge: 'Popular',
    badgeColor: 'bg-yellow-500',
    icon: '🔥',
  },
  {
    id: 5,
    name: 'Drum Bearing Kit — Road Roller',
    category: 'Spare Parts',
    price: '4,200',
    badge: 'In Stock',
    badgeColor: 'bg-green-500',
    icon: '⚙️',
  },
  {
    id: 6,
    name: 'Hydraulic Pump — Paver Machine',
    category: 'Spare Parts',
    price: '28,500',
    badge: null,
    icon: '🔧',
  },
  {
    id: 7,
    name: 'CASE Motor Grader 845B',
    category: 'Motor Graders',
    price: '55,00,000',
    badge: 'New Arrival',
    badgeColor: 'bg-blue-500',
    icon: '🚜',
  },
  {
    id: 8,
    name: 'Screed Plate Set — Paver',
    category: 'Spare Parts',
    price: '12,800',
    badge: 'Fast Moving',
    badgeColor: 'bg-orange-500',
    icon: '🔩',
  },
]

export default function FeaturedProducts() {
  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="text-yellow-600 hover:text-yellow-500 font-semibold text-sm"
          >
            View All →
          </Link>
        </div>

        {/* Grid — 1 col mobile, 2 tablet, 4 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-yellow-400 transition-all duration-200"
            >
              {/* Product Image Area */}
              <div className="relative bg-gray-100 h-44 flex items-center justify-center text-6xl">
                {product.icon}
                {product.badge && (
                  <span className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  {product.category}
                </div>
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-yellow-600 mb-3 leading-snug">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  <button className="bg-gray-900 hover:bg-yellow-400 hover:text-gray-900 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors duration-200">
                    Enquire
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
