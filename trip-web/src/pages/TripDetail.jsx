import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'trip_planner_trips'

const allPlaces = {
  '洪崖洞': { lat: 29.5635, lng: 106.5765, type: '景点', desc: '重庆网红打卡地标' },
  '解放碑': { lat: 29.5526, lng: 106.5694, type: '购物', desc: '重庆商业中心' },
  '长江索道': { lat: 29.5881, lng: 106.5718, type: '体验', desc: '山城空中巴士' },
  '武隆天生三桥': { lat: 29.4591, lng: 107.8017, type: '景点', desc: '世界自然遗产' },
  '宽窄巷子': { lat: 30.6717, lng: 104.0577, type: '景点', desc: '成都古街' },
  '锦里': { lat: 30.6575, lng: 104.0565, type: '美食', desc: '成都小吃街' },
  '熊猫基地': { lat: 30.7408, lng: 104.1441, type: '景点', desc: '大熊猫繁育研究基地' },
  '春熙路': { lat: 30.6580, lng: 104.0667, type: '购物', desc: '成都太古里' },
  '兵马俑': { lat: 34.3847, lng: 109.2785, type: '景点', desc: '世界第八大奇迹' },
  '大雁塔': { lat: 34.2194, lng: 108.9594, type: '景点', desc: '唐代著名建筑' },
  '古城墙': { lat: 34.2577, lng: 108.9484, type: '景点', desc: '中国现存最完整城墙' },
  '回民街': { lat: 34.2661, lng: 108.9433, type: '美食', desc: '西安美食一条街' },
}

export default function TripDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const found = trips.find(t => t.id === parseInt(id))
    setTrip(found)
  }, [id])

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <div className="text-slate-600">行程不存在</div>
          <Link to="/trips" className="text-blue-500 mt-4 inline-block">返回行程</Link>
        </div>
      </div>
    )
  }

  const handleNavigate = (placeName) => {
    const place = allPlaces[placeName]
    if (place) {
      navigate(`/map?lat=${place.lat}&lng=${place.lng}&name=${encodeURIComponent(placeName)}`)
    }
  }

  const tabs = [
    { id: 'overview', label: '概览' },
    { id: 'places', label: '景点' },
    { id: 'notes', label: '笔记' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-56">
        <img src={trip.cover} alt={trip.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <Link to="/trips" className="absolute top-4 left-4 w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-2xl font-bold">{trip.title}</h1>
          <div className="flex items-center gap-3 mt-2 text-sm opacity-90">
            <span>📍 {trip.destination}</span>
            <span>📅 {trip.date}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white mx-4 -mt-4 rounded-2xl shadow-sm p-4 relative z-10">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{trip.days}</div>
            <div className="text-xs text-slate-500">天数</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-500">¥{trip.budget}</div>
            <div className="text-xs text-slate-500">预算</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{trip.places.length}</div>
            <div className="text-xs text-slate-500">景点</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white mt-4 px-4">
        <div className="flex gap-6 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-slate-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 pb-20">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold mb-3">行程安排</h3>
              <div className="space-y-3">
                {Array.from({ length: trip.days }, (_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                      D{i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">第{i + 1}天</div>
                      <div className="text-sm text-slate-500">
                        {trip.places.slice(i * 2, i * 2 + 2).join(' → ') || '自由活动'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold mb-3">旅行须知</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">🌡️</span>
                  <span>建议携带雨具，春季多雨</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">👟</span>
                  <span>准备舒适运动鞋</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">📱</span>
                  <span>提前下载离线地图</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'places' && (
          <div className="space-y-3">
            {trip.places.map((placeName, idx) => {
              const place = allPlaces[placeName] || { lat: 0, lng: 0, type: '景点', desc: '' }
              return (
                <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold">{placeName}</div>
                      <div className="text-sm text-slate-500">{place.type} · {place.desc}</div>
                    </div>
                    <button
                      onClick={() => handleNavigate(placeName)}
                      className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm"
                    >
                      导航
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <textarea
              placeholder="添加旅行笔记..."
              className="w-full h-40 resize-none focus:outline-none text-slate-600"
            />
            <button className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium mt-2">
              保存笔记
            </button>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex gap-3">
          <Link
            to="/map"
            className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold text-center"
          >
            开始导航
          </Link>
          <button className="px-4 py-3 border rounded-xl">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}