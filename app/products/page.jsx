'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'

const ALL_PRODUCTS = [
  { id: 1,  name: 'Dynapac CA250D Road Roller',         category: 'Road Rollers',   price: 1850000, badge: 'Best Seller', inStock: true,  icon: '🛞', brand: 'Dynapac'  },
  { id: 2,  name: 'BOMAG BW 213 D Road Roller',         category: 'Road Rollers',   price: 2100000, badge: null,          inStock: true,  icon: '🛞', brand: 'BOMAG'    },
  { id: 3,  name: 'Volvo DD25B Compact Roller',         category: 'Road Rollers',   price: 950000,  badge: 'New Arrival', inStock: true,  icon: '🛞', brand: 'Volvo'    },
  { id: 4,  name: 'Wirtgen SP 15 Slipform Paver',       category: 'Pavers',         price: 4200000, badge: 'New Arrival', inStock: true,  icon: '🏗️', brand: 'Wirtgen'  },
  { id: 5,  name: 'Vogele Super 1800-3i Paver',         category: 'Pavers',         price: 3800000, badge: 'Best Seller', inStock: false, icon: '🏗️', brand: 'Vogele'   },
  { id: 6,  name: 'ABG Titan 473 Tracked Paver',        category: 'Pavers',         price: 3200000, badge: null,          inStock: true,  icon: '🏗️', brand: 'ABG'      },
  { id: 7,  name: 'Parker 80 TPH Hot Mix Plant',        category: 'Hot Mix Plants', price: 6800000, badge: 'Popular',     inStock: true,  icon: '🔥', brand: 'Parker'   },
  { id: 8,  name: 'Ammann 120 TPH Hot Mix Plant',       category: 'Hot Mix Plants', price: 9500000, badge: null,          inStock: false, icon: '🔥', brand: 'Ammann'   },
  { id: 9,  name: 'CASE 845B Motor Grader',             category: 'Motor Graders',  price: 5500000, badge: 'New Arrival', inStock: true,  icon: '🚜', brand: 'CASE'     },
  { id: 10, name: 'Caterpillar 12M Motor Grader',       category: 'Motor Graders',  price: 7200000, badge: 'Best Seller', inStock: true,  icon: '🚜', brand: 'Caterpillar'},
  { id: 11, name: 'Atlas Copco Vibratory Compactor',    category: 'Compactors',     price: 1275000, badge: null,          inStock: true,  icon: '🏭', brand: 'Atlas Copco'},
  { id: 12, name: 'Wirtgen W 200 Cold Milling Machine', category: 'Compactors',     price: 8900000, badge: 'Popular',     inStock: false, icon: '🏭', brand: 'Wirtgen'  },
  { id: 13, name: 'Drum Bearing Kit — Road Roller',     category: 'Spare Parts',    price: 4200,    badge: 'In Stock',    inStock: true,  icon: '⚙️', brand: 'Generic'  },
  { id: 14, name: 'Hydraulic Pump — Paver Machine',     category: 'Spare Parts',    price: 28500,   badge: null,          inStock: true,  icon: '🔧', brand: 'Generic'  },
  { id: 15, name: 'Screed Plate Set — Paver',           category: 'Spare Parts',    price: 12800,   badge: 'Fast Moving', inStock: true,  icon: '🔩', brand: 'Generic'  },
  { id: 16, name: 'Vibratory Motor — Compactor',        category: 'Spare Parts',    price: 18500,   badge: null,          inStock: false, icon: '⚙️', brand: 'Generic'  },
]

const CATEGORIES = ['All', 'Road Rollers', 'Pavers', 'Hot Mix Plants', 'Motor Graders', 'Compactors', 'Spare Parts']
const MAX_PRICE = 10000000

function formatPrice(price) {
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} Lakh`
  return `₹${price.toLocaleString('en-IN')}`
}

export default function ProductsPage() {
  const [search, setSearch]         = useState('')
  const [category, setCategory]     = useState('All')
  const [maxPrice, setMaxPrice]     = useState(MAX_PRICE)
  const [stockOnly, setStockOnly]   = useState(false)
  const [sortBy, setSortBy]         = useState('newest')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS]

    if (search)
      list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) ||
                               p.brand.toLowerCase().includes(search.toLowerCase()))
    if (category !== 'All')
      list = list.filter(p => p.category === category)
    if (stockOnly)
      list = list.filter(p => p.inStock)

    list = list.filter(p => p.price <= maxPrice)

    if (sortBy === 'price-asc')  list.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)

    return list
  }, [search, category, maxPrice, stockOnly, sortBy])

  const resetFilters = () => {
    setSearch(''); setCategory('All'); setMaxPrice(MAX_PRICE); setStockOnly(false); setSortBy('newest')
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Page Header */}
      <div className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2">Catalogue</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">All Products</h1>
          <p className="text-gray-300 text-sm">Road construction machinery and spare parts — in stock and ready to ship across India.</p>
        </div>
      </div>

      {/* Search + Sort Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

          {/* Search */}
          <div className="flex flex-1">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search machinery, spare parts, brands..."
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-4 rounded-r-lg font-bold text-sm transition-colors">
              🔍
            </button>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="price-asc">Sort: Price Low → High</option>
            <option value="price-desc">Sort: Price High → Low</option>
          </select>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="sm:hidden bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm font-bold"
          >
            {filtersOpen ? '✕ Close Filters' : '⚙️ Filters'}
          </button>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* SIDEBAR FILTERS */}
          <aside className={`${filtersOpen ? 'block' : 'hidden'} sm:block w-full sm:w-64 flex-shrink-0`}>
            <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-36">

              {/* Header */}
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-gray-900">Filters</h3>
                <button onClick={resetFilters} className="text-xs text-yellow-600 hover:text-yellow-500 font-semibold">
                  Reset All
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Category</div>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`text-left text-sm px-3 py-2 rounded-lg transition-colors font-medium ${
                        category === cat
                          ? 'bg-yellow-400 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                      <span className="ml-1 text-xs opacity-60">
                        ({cat === 'All' ? ALL_PRODUCTS.length : ALL_PRODUCTS.filter(p => p.category === cat).length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Max Price</div>
                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE}
                  step="50000"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-yellow-400"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹0</span>
                  <span className="font-bold text-gray-900">{formatPrice(maxPrice)}</span>
                </div>
              </div>

              {/* Stock Filter */}
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Availability</div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stockOnly}
                    onChange={e => setStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-yellow-400"
                  />
                  <span className="text-sm text-gray-700 font-medium">In Stock Only</span>
                </label>
              </div>

            </div>
          </aside>

          {/* PRODUCT GRID */}
          <div className="flex-1">

            {/* Results count */}
            <div className="flex justify-between items-center mb-5">
              <p className="text-sm text-gray-500">
                Showing <span className="font-bold text-gray-900">{filtered.length}</span> of {ALL_PRODUCTS.length} products
              </p>
            </div>

            {/* No results */}
            {filtered.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-400 text-sm mb-4">Try adjusting your filters or search term</p>
                <button onClick={resetFilters} className="bg-yellow-400 text-gray-900 font-bold px-5 py-2 rounded-lg text-sm">
                  Reset Filters
                </button>
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(product => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-yellow-400 transition-all duration-200"
                >
                  {/* Image Area */}
                  <div className="relative bg-gray-100 h-44 flex items-center justify-center text-6xl">
                    {product.icon}

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                        {product.badge}
                      </span>
                    )}

                    {/* Stock Status */}
                    <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${
                      product.inStock
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {product.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{product.category} · {product.brand}</div>
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-yellow-600 mb-3 leading-snug">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                      <span className="bg-gray-900 group-hover:bg-yellow-400 group-hover:text-gray-900 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors duration-200">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
