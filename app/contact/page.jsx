'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    category: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate form submission — replace with real API call later
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Page Header */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-2">
            Get in Touch
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Contact Manoj Enterprises</h1>
          <p className="text-gray-300 max-w-xl">
            Looking for road construction machinery or spare parts? Send us an enquiry
            and our team will get back to you within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT — Contact Info */}
          <div className="lg:col-span-1 flex flex-col gap-6">

            {/* Info Cards */}
            {[
              {
                icon: '📞',
                title: 'Call Us',
                lines: ['+91 98110 46144', '+91 98718 81443', '+91 76786 13085'],
                sub: 'Mon–Sat, 9AM to 7PM',
              },
              {
                icon: '✉️',
                title: 'Email Us',
                lines: ['info@manojenterprises.in', 'sales@manojenterprises.in'],
                sub: 'We reply within 24 hours',
              },
              {
                icon: '📍',
                title: 'Visit Us',
                lines: ['123, Industrial Area,', 'Mumbai, Maharashtra — 400001'],
                sub: 'Open Mon–Sat',
              },
              {
                icon: '💬',
                title: 'WhatsApp',
                lines: ['+91 98765 43210'],
                sub: 'Quick replies on WhatsApp',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4 items-start"
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">{item.title}</div>
                  {item.lines.map((line) => (
                    <div key={line} className="text-sm text-gray-700">{line}</div>
                  ))}
                  <div className="text-xs text-gray-400 mt-1">{item.sub}</div>
                </div>
              </div>
            ))}

            {/* Business Hours */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
              <div className="font-bold text-gray-900 mb-3">🕐 Business Hours</div>
              {[
                { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
                { day: 'Saturday',        hours: '9:00 AM – 2:00 PM' },
                { day: 'Sunday',          hours: 'Closed' },
              ].map((row) => (
                <div key={row.day} className="flex justify-between text-sm py-1 border-b border-yellow-100 last:border-0">
                  <span className="text-gray-600">{row.day}</span>
                  <span className={`font-semibold ${row.hours === 'Closed' ? 'text-red-500' : 'text-gray-900'}`}>
                    {row.hours}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT — Enquiry Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">

              {submitted ? (
                /* Success Message */
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Sent!</h2>
                  <p className="text-gray-500 mb-6">
                    Thank you for reaching out. Our team will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name:'', company:'', phone:'', email:'', category:'', message:'' }) }}
                    className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Send an Enquiry</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Fill in the form below and we'll get back to you with pricing and availability.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name + Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Rajesh Kumar"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="e.g. Kumar Constructions"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Phone + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        What are you looking for? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        required
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white"
                      >
                        <option value="">Select a category</option>
                        <option value="road-rollers">Road Rollers</option>
                        <option value="pavers">Pavers</option>
                        <option value="hot-mix-plants">Hot Mix Plants</option>
                        <option value="motor-graders">Motor Graders</option>
                        <option value="compactors">Compactors</option>
                        <option value="spare-parts">Spare Parts</option>
                        <option value="other">Other / Not Sure</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us what you need — model, quantity, location, budget, or any specific requirements..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gray-900 hover:bg-yellow-400 hover:text-gray-900 text-white font-bold py-3 rounded-lg transition-colors duration-200 text-sm disabled:opacity-60"
                    >
                      {loading ? 'Sending Enquiry...' : 'Send Enquiry →'}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      By submitting this form you agree to be contacted by Manoj Enterprises regarding your enquiry.
                    </p>

                  </form>
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
