'use client'
import { useCart } from '../../lib/CartContext'
import Link from 'next/link'

function formatPrice(price) {
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} Lakh`
  return `₹${price.toLocaleString('en-IN')}`
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

  const gst       = Math.round(totalPrice * 0.18)
  const grandTotal = totalPrice + gst

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">Browse our spare parts catalog and add items to your cart</p>
          <Link
            href="/products?category=spare-parts"
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Browse Spare Parts
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2">Checkout</div>
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <p className="text-gray-400 text-sm mt-1">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT — Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Clear cart */}
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Order Items</h2>
              <button
                onClick={clearCart}
                className="text-sm text-red-400 hover:text-red-600 font-semibold"
              >
                Clear Cart
              </button>
            </div>

            {/* Items */}
            {items.map(item => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">

                {/* Icon */}
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                  {item.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.category}</p>
                  <h3 className="font-bold text-gray-900 mb-1 leading-snug">{item.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{item.brand}</p>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    {/* Quantity */}
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-500 hover:text-gray-900 font-bold text-lg w-5 text-center"
                      >−</button>
                      <span className="font-bold text-gray-900 w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-900 font-bold text-lg w-5 text-center"
                      >+</button>
                    </div>

                    {/* Price + Remove */}
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors text-xl"
                      >🗑️</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/products"
              className="text-sm text-yellow-600 hover:text-yellow-500 font-semibold mt-2 inline-block"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
              <h2 className="font-bold text-gray-900 text-lg mb-5">Order Summary</h2>

              {/* Line items */}
              <div className="flex flex-col gap-3 mb-5">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-500 truncate mr-2">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-gray-900 font-medium flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">GST (18%)</span>
                  <span className="font-medium text-gray-900">{formatPrice(gst)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium text-green-600">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between items-center mb-6">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">{formatPrice(grandTotal)}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-gray-900 hover:bg-yellow-400 hover:text-gray-900 text-white font-bold py-3 rounded-lg text-center text-sm transition-colors mb-3"
              >
                Place Order →
              </Link>

              {/* Trust signals */}
              <div className="flex flex-col gap-2 mt-4">
                {[
                  '🔒 Secure checkout',
                  '🚚 PAN India delivery',
                  '↩️ Easy returns within 30 days',
                ].map(t => (
                  <div key={t} className="text-xs text-gray-400 flex items-center gap-2">{t}</div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
