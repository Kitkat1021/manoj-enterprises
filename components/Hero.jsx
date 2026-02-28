'use client'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        {/* Badge */}
        <div className="inline-block bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6">
          Trusted Since 1995
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-6 max-w-3xl">
          India's Reliable Source for{' '}
          <span className="text-yellow-400">Road Construction</span>{' '}
          Machinery & Spare Parts
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
          Manoj Enterprises supplies road rollers, pavers, hot mix plants and all
          types of road construction machinery spare parts. Trusted by contractors
          and government agencies across India.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/products"
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-lg text-center transition-colors duration-200"
          >
            Browse Machinery
          </Link>
          <Link
            href="/products?category=spare-parts"
            className="border border-gray-500 hover:border-yellow-400 hover:text-yellow-400 text-white font-semibold px-8 py-4 rounded-lg text-center transition-colors duration-200"
          >
            Spare Parts Catalog
          </Link>
        </div>

        {/* Trust Stats */}
        <div className="mt-14 pt-10 border-t border-gray-700 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { num: '500+', label: 'Machines Sold' },
            { num: '1000+', label: 'Spare Parts Listed' },
            { num: '28+', label: 'Years in Business' },
            { num: 'PAN India', label: 'Delivery Available' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-yellow-400 text-2xl font-bold">{stat.num}</div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
