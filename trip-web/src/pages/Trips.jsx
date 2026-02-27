import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'trip_planner_trips'

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1

const defaultTrips = [
  {
    id: 1,
    title: '重庆3日游',
    destination: '重庆',
    date: `${currentYear}-${currentMonth + 1}-15`,
    days: 3,
    status: 'upcoming',
    cover: 'https://images.unsplash.com/photo-1537531383496-f4749a4b8590?w=600',
    budget: 2500,
    places: ['洪崖洞', '解放碑', '长江索道', '武隆天生三桥']
  },
  {
    id: 2,
    title: '成都4日美食游',
    destination: '成都',
    date: `${currentYear}-${currentMonth + 2}-05`,
    days: 4,
    status: 'planning',
    cover: 'https://images.unsplash.com/photo-1598928506311-c55ez8e90c7?w=600',
    budget: 3000,
    places: ['宽窄巷子', '锦里', '熊猫基地', '春熙路']
  },
  {
    id: 3,
    title: '西安3日文化游',
    destination: '西安',
    date: `${currentYear}-${currentMonth + 1}-20`,
    days: 3,
    status: 'upcoming',
    cover: 'https://images.unsplash.com/photo-1598367772323-3a4e5efc5c59?w=600',
    budget: 2200,
    places: ['兵马俑', '大雁塔', '古城墙', '回民街']
  },
]

export default function Trips() {
  const [trips, setTrips] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [newTrip, setNewTrip] = useState({ 
    title: '', 
    destination: '', 
    date: '', 
    days: 3,
    budget: 2000 
  })

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setTrips(JSON.parse(saved))
    } else {
      setTrips(defaultTrips)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTrips))
    }
  }, [])

  const addTrip = () => {
    if (!newTrip.title || !newTrip.destination) return
    const trip = {
      id: Date.now(),
      ...newTrip,
      status: 'planning',
      cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
      places: []
    }
    const updated = [...trips, trip]
    setTrips(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setShowAddModal(false)
    setNewTrip({ title: '', destination: '', date: '', days: 3, budget: 2000 })
  }

  const deleteTrip = (id) => {
    const updated = trips.filter(t => t.id !== id)
    setTrips(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const filteredTrips = activeFilter === 'all' 
    ? trips 
    : trips.filter(t => t.status === activeFilter)

  const getStatusConfig = (status) => {
    switch (status) {
      case 'upcoming': 
        return { bg: 'bg-green-100', text: 'text-green-700', label: '即将出行' }
      case 'planning': 
        return { bg: 'bg-blue-100', text: 'text-blue-700', label: '规划中' }
      case 'completed': 
        return { bg: 'bg-slate-100', text: 'text-slate-700', label: '已完成' }
      default: 
        return { bg: 'bg-slate-100', text: 'text-slate-700', label: '未知' }
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white px-4 pt-6 pb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">我的行程</h1>
            <p className="text-blue-100 text-sm mt-1">{trips.length} 个行程 · {trips.reduce((sum, t) => sum + t.days, 0)} 天</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {['all', 'planning', 'upcoming', 'completed'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter 
                  ? 'bg-white text-blue-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {filter === 'all' ? '全部' : 
               filter === 'planning' ? '规划中' : 
               filter === 'upcoming' ? '即将出行' : '已完成'}
            </button>
          ))}
        </div>
      </div>

      {/* Trip List */}
      <div className="max-w-md mx-auto px-4 -mt-4 pb-8">
        {filteredTrips.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="text-5xl mb-4">🗺️</div>
            <div className="text-slate-600 mb-4">还没有行程</div>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-blue-500 font-medium"
            >
              创建第一个行程
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTrips.map((trip) => {
              const statusConfig = getStatusConfig(trip.status)
              return (
                <Link
                  key={trip.id}
                  to={`/trips/${trip.id}`}
                  className="block bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-36">
                    <img src={trip.cover} alt={trip.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                        {statusConfig.label}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="font-bold text-lg">{trip.title}</h3>
                      <div className="text-sm opacity-90">📍 {trip.destination}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex gap-4 text-slate-500">
                        <span>📅 {formatDate(trip.date)}</span>
                        <span>⏱️ {trip.days}天</span>
                        <span>💰 ¥{trip.budget}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          deleteTrip(trip.id)
                        }}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    {trip.places.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {trip.places.slice(0, 4).map((place, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs">
                            {place}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white rounded-t-3xl w-full p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">新建行程</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">行程名称</label>
                <input
                  type="text"
                  value={newTrip.title}
                  onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })}
                  placeholder="例如：重庆3日游"
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">目的地</label>
                <input
                  type="text"
                  value={newTrip.destination}
                  onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                  placeholder="例如：重庆"
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">出发日期</label>
                  <input
                    type="date"
                    value={newTrip.date}
                    onChange={(e) => setNewTrip({ ...newTrip, date: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">天数</label>
                  <input
                    type="number"
                    min="1"
                    value={newTrip.days}
                    onChange={(e) => setNewTrip({ ...newTrip, days: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">预算 (¥)</label>
                <input
                  type="number"
                  value={newTrip.budget}
                  onChange={(e) => setNewTrip({ ...newTrip, budget: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={addTrip}
              className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              创建行程
            </button>
          </div>
        </div>
      )}
    </div>
  )
}