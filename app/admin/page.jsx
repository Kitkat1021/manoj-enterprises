'use client'
import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../lib/db'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'manoj1995'

const CATEGORIES = ['All', 'Road Rollers', 'Pavers', 'Hot Mix Plants', 'Motor Graders', 'Compactors', 'Spare Parts', 'Other / Not Sure']

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function AdminDashboard() {
  const [authed, setAuthed]         = useState(false)
  const [password, setPassword]     = useState('')
  const [pwError, setPwError]       = useState(false)

  const [enquiries, setEnquiries]   = useState([])
  const [loading, setLoading]       = useState(true)
  const [selected, setSelected]     = useState(null)

  const [filterCat, setFilterCat]   = useState('All')
  const [filterRead, setFilterRead] = useState('All')
  const [filterDate, setFilterDate] = useState('')
  const [search, setSearch]         = useState('')

  // ── Login ──────────────────────────────────────────────────────────
  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
      setPwError(false)
    } else {
      setPwError(true)
    }
  }

  // ── Fetch enquiries ────────────────────────────────────────────────
  useEffect(() => {
    if (!authed) return
    fetchEnquiries()
  }, [authed])

  const fetchEnquiries = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setEnquiries(data || [])
    setLoading(false)
  }

  // ── Mark as read ───────────────────────────────────────────────────
  const markRead = async (id, value) => {
    await supabase.from('enquiries').update({ is_read: value }).eq('id', id)
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, is_read: value } : e))
    if (selected?.id === id) setSelected(prev => ({ ...prev, is_read: value }))
  }

  // ── Delete enquiry ─────────────────────────────────────────────────
  const deleteEnquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return
    await supabase.from('enquiries').delete().eq('id', id)
    setEnquiries(prev => prev.filter(e => e.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  // ── Filtered list ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return enquiries.filter(e => {
      if (filterCat !== 'All' && e.category !== filterCat) return false
      if (filterRead === 'Unread' && e.is_read) return false
      if (filterRead === 'Read'   && !e.is_read) return false
      if (filterDate && !e.created_at.startsWith(filterDate)) return false
      if (search && ![e.name, e.company, e.phone, e.email, e.message]
        .join(' ').toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [enquiries, filterCat, filterRead, filterDate, search])

  // ── Stats ──────────────────────────────────────────────────────────
  const stats = {
    total:  enquiries.length,
    unread: enquiries.filter(e => !e.is_read).length,
    today:  enquiries.filter(e => e.created_at?.startsWith(new Date().toISOString().split('T')[0])).length,
  }

  // ══ LOGIN SCREEN ════════════════════════════════════════════════════
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🔐</div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Manoj Enterprises</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setPwError(false) }}
                placeholder="Enter admin password"
                className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400 ${pwError ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              />
              {pwError && <p className="text-red-500 text-xs mt-1">Incorrect password. Please try again.</p>}
            </div>
            <button
              type="submit"
              className="bg-gray-900 hover:bg-yellow-400 hover:text-gray-900 text-white font-bold py-3 rounded-lg transition-colors text-sm"
            >
              Login →
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ══ DASHBOARD ═══════════════════════════════════════════════════════
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="bg-gray-900 text-white py-5 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">Admin Panel</div>
          <h1 className="text-2xl font-bold">Enquiries Dashboard</h1>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={fetchEnquiries}
            className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            🔄 Refresh
          </button>
          <button
            onClick={() => setAuthed(false)}
            className="bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {[
            { label: 'Total Enquiries', value: stats.total,  icon: '📋', color: 'text-blue-600' },
            { label: 'Unread',          value: stats.unread, icon: '🔴', color: 'text-red-500'  },
            { label: 'Today',           value: stats.today,  icon: '📅', color: 'text-green-600'},
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
              <div className="text-4xl">{s.icon}</div>
              <div>
                <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="🔍  Search name, phone, email..."
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {/* Category */}
            <select
              value={filterCat} onChange={e => setFilterCat(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            {/* Read status */}
            <select
              value={filterRead} onChange={e => setFilterRead(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
            >
              <option>All</option>
              <option>Unread</option>
              <option>Read</option>
            </select>
            {/* Date */}
            <input
              type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          {(filterCat !== 'All' || filterRead !== 'All' || filterDate || search) && (
            <button
              onClick={() => { setFilterCat('All'); setFilterRead('All'); setFilterDate(''); setSearch('') }}
              className="mt-3 text-xs text-yellow-600 font-semibold hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing <span className="font-bold text-gray-900">{filtered.length}</span> of {enquiries.length} enquiries
        </p>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <div className="text-4xl mb-3 animate-spin">⚙️</div>
            <p className="text-gray-400">Loading enquiries...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <div className="text-5xl mb-3">📭</div>
            <p className="text-gray-500 font-medium">No enquiries found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold">Status</th>
                    <th className="text-left px-5 py-3 font-semibold">Name</th>
                    <th className="text-left px-5 py-3 font-semibold">Phone</th>
                    <th className="text-left px-5 py-3 font-semibold">Category</th>
                    <th className="text-left px-5 py-3 font-semibold">Date</th>
                    <th className="text-left px-5 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map(e => (
                    <tr
                      key={e.id}
                      className={`hover:bg-gray-50 cursor-pointer transition-colors ${!e.is_read ? 'bg-yellow-50' : ''}`}
                      onClick={() => { setSelected(e); if (!e.is_read) markRead(e.id, true) }}
                    >
                      <td className="px-5 py-4">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full ${e.is_read ? 'bg-gray-300' : 'bg-yellow-400'}`} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-gray-900">{e.name}</div>
                        {e.company && <div className="text-xs text-gray-400">{e.company}</div>}
                      </td>
                      <td className="px-5 py-4 text-gray-600">{e.phone}</td>
                      <td className="px-5 py-4">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                          {e.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-xs">{formatDate(e.created_at)}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2" onClick={ev => ev.stopPropagation()}>
                          <button
                            onClick={() => markRead(e.id, !e.is_read)}
                            className="text-xs bg-gray-100 hover:bg-yellow-400 hover:text-gray-900 text-gray-600 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                          >
                            {e.is_read ? 'Unread' : 'Read'}
                          </button>
                          <button
                            onClick={() => deleteEnquiry(e.id)}
                            className="text-xs bg-red-50 hover:bg-red-500 hover:text-white text-red-500 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden divide-y divide-gray-100">
              {filtered.map(e => (
                <div
                  key={e.id}
                  className={`p-4 cursor-pointer ${!e.is_read ? 'bg-yellow-50' : ''}`}
                  onClick={() => { setSelected(e); if (!e.is_read) markRead(e.id, true) }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        {!e.is_read && <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block" />}
                        {e.name}
                      </div>
                      {e.company && <div className="text-xs text-gray-400">{e.company}</div>}
                    </div>
                    <span className="text-xs text-gray-400">{formatDate(e.created_at)}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{e.phone}</div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {e.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── DETAIL POPUP ── */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-screen overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Popup Header */}
            <div className="flex justify-between items-start mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selected.name}</h2>
                {selected.company && <p className="text-sm text-gray-400">{selected.company}</p>}
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">✕</button>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-5">
              {[
                { label: '📞 Phone',    value: selected.phone    },
                { label: '✉️ Email',    value: selected.email || '—' },
                { label: '📂 Category', value: selected.category },
                { label: '📅 Date',     value: formatDate(selected.created_at) },
                { label: '👁️ Status',   value: selected.is_read ? 'Read' : 'Unread' },
              ].map(row => (
                <div key={row.label} className="flex gap-3 text-sm">
                  <span className="text-gray-400 w-28 flex-shrink-0">{row.label}</span>
                  <span className="text-gray-900 font-medium">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Message */}
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Message</div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <a
                href={`tel:${selected.phone}`}
                className="flex-1 bg-gray-900 hover:bg-yellow-400 hover:text-gray-900 text-white font-bold py-3 rounded-lg text-sm text-center transition-colors"
              >
                📞 Call Now
              </a>
              <button
                onClick={() => markRead(selected.id, !selected.is_read)}
                className="flex-1 bg-gray-100 hover:bg-yellow-100 text-gray-700 font-bold py-3 rounded-lg text-sm transition-colors"
              >
                {selected.is_read ? '🔴 Mark Unread' : '✅ Mark Read'}
              </button>
              <button
                onClick={() => deleteEnquiry(selected.id)}
                className="bg-red-50 hover:bg-red-500 hover:text-white text-red-500 font-bold py-3 px-4 rounded-lg text-sm transition-colors"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
