'use client'
import { useCart } from '../lib/CartContext'
import Link from 'next/link'

function formatPrice(price) {
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`
  return `₹${price.toLocaleString('en-IN')}`
}

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, sidebarOpen, setSidebarOpen } = useCart()

  return (
    <>
      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="bg-gray-900 text-white px-5 py-4 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg">Your Cart</h2>
            <p className="text-gray-400 text-xs">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white text-2xl leading-none"
          >✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="font-bold text-gray-900 mb-1">Your cart is empty</h3>
              <p className="text-gray-400 text-sm mb-5">Add spare parts to get started</p>
              <button
                onClick={() => setSidebarOpen(false)}
                className="bg-yellow-400 text-gray-900 font-bold px-5 py-2.5 rounded-lg text-sm"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {item.icon}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-0.5">{item.category}</p>
                    <p className="text-sm font-semibold text-gray-900 leading-snug truncate">{item.name}</p>
                    <p className="text-sm font-bold text-yellow-600 mt-1">{formatPrice(item.price)}</p>
                  </div>
                  {/* Quantity + Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-500 text-lg leading-none"
                    >✕</button>
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-500 hover:text-gray-900 font-bold w-4 text-center"
                      >−</button>
                      <span className="text-sm font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-900 font-bold w-4 text-center"
                      >+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-5 py-5 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-xl font-bold text-gray-900">{formatPrice(totalPrice)}</span>
            </div>
            <Link
              href="/cart"
              onClick={() => setSidebarOpen(false)}
              className="block w-full bg-gray-900 hover:bg-yellow-400 hover:text-gray-900 text-white font-bold py-3 rounded-lg text-center text-sm transition-colors mb-3"
            >
              Proceed to Checkout →
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="block w-full text-center text-sm text-gray-400 hover:text-gray-700 font-medium"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </>
  )
}
