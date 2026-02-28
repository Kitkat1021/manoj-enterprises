import Link from 'next/link'

const categories = [
  { name: 'Road Rollers',     icon: '🛞', slug: 'road-rollers',     count: '24 models' },
  { name: 'Pavers',           icon: '🏗️', slug: 'pavers',           count: '18 models' },
  { name: 'Hot Mix Plants',   icon: '🔥', slug: 'hot-mix-plants',   count: '12 models' },
  { name: 'Motor Graders',    icon: '🚜', slug: 'motor-graders',    count: '10 models' },
  { name: 'Spare Parts',      icon: '⚙️', slug: 'spare-parts',      count: '1000+ parts' },
  { name: 'Compactors',       icon: '🏭', slug: 'compactors',       count: '15 models' },
]

export default function Categories() {
  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Shop by Category
          </h2>
          <Link
            href="/products"
            className="text-yellow-600 hover:text-yellow-500 font-semibold text-sm"
          >
            View All →
          </Link>
        </div>

        {/* Grid — 2 cols on mobile, 3 on tablet, 6 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group bg-gray-50 hover:bg-yellow-400 border border-gray-200 hover:border-yellow-400 rounded-xl p-5 text-center transition-all duration-200"
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <div className="text-sm font-bold text-gray-800 group-hover:text-gray-900 mb-1">
                {cat.name}
              </div>
              <div className="text-xs text-gray-400 group-hover:text-gray-700">
                {cat.count}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
