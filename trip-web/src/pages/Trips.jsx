import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'trip_planner_trips'

const defaultTrips = [
  {
    id: 1,
    title: '北京3日游',
    destination: '北京',
    date: '2025-03-15',
    days: 3,
    status: 'upcoming',
    places: ['天安门', '故宫', '长城', '颐和园']
  },
  {
    id: 2,
    title: '上海周末游',
    destination: '上海',
    date: '2025-03-22',
    days: 2,
    status: 'upcoming',
    places: ['外滩', '东方明珠', '田子坊']
  },
  {
    id: 3,
    title: '成都美食之旅',
    destination: '成都',
    date: '2025-04-05',
    days: 4,
    status: 'planning',
    places: ['宽窄巷子', '锦里', '大熊猫基地']
  }
]

export default function Trips() {
  const [trips, setTrips] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTrip, setNewTrip] = useState({ title: '', destination: '', date: '', days: 1 })

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
      places: []
    }
    const updated = [...trips, trip]
    setTrips(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setShowAddModal(false)
    setNewTrip({ title: '', destination: '', date: '', days: 1 })
  }

  const deleteTrip = (id) => {
    const updated = trips.filter(t => t.id !== id)
    setTrips(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-green-100 text-green-700'
      case 'planning': return 'bg-blue-100 text-blue-700'
      case 'completed': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming': return '即将出行'
      case 'planning': return '规划中'
      case 'completed': return '已完成'
      default: return '未知'
    }
  }

  return (
    <div className="p-4 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">我的行程</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          + 新建行程
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📅</div>
          <div className="text-gray-600 mb-4">还没有行程</div>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-blue-500 font-medium"
          >
            创建第一个行程
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{trip.title}</h3>
                  <div className="text-sm text-gray-500">{trip.destination} · {trip.days}天</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                  {getStatusText(trip.status)}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-3">📅 {trip.date}</div>
              {trip.places.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {trip.places.map((place, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                      {place}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <Link
                  to={`/trips/${trip.id}`}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm text-center hover:bg-blue-600 transition-colors"
                >
                  查看详情
                </Link>
                <button
                  onClick={() => deleteTrip(trip.id)}
                  className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-sm p-4">
            <h3 className="font-bold text-lg mb-4">新建行程</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">行程名称</label>
                <input
                  type="text"
                  value={newTrip.title}
                  onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })}
                  placeholder="例如：北京3日游"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">目的地</label>
                <input
                  type="text"
                  value={newTrip.destination}
                  onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                  placeholder="例如：北京"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">出发日期</label>
                <input
                  type="date"
                  value={newTrip.date}
                  onChange={(e) => setNewTrip({ ...newTrip, date: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">天数</label>
                <input
                  type="number"
                  min="1"
                  value={newTrip.days}
                  onChange={(e) => setNewTrip({ ...newTrip, days: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={addTrip}
                className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                创建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}