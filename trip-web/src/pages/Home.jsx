import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const destinations = [
  { id: 1, name: '重庆', image: 'https://images.unsplash.com/photo-1537531383496-f4749a4b8590?w=400', tips: '山城夜景' },
  { id: 2, name: '成都', image: 'https://images.unsplash.com/photo-1598928506311-c55ez8e90c7?w=400', tips: '美食之都' },
  { id: 3, name: '西安', image: 'https://images.unsplash.com/photo-1598367772323-3a4e5efc5c59?w=400', tips: '古城历史' },
  { id: 4, name: '杭州', image: 'https://images.unsplash.com/photo-1537531383496-f4749a4b8590?w=400', tips: '西湖美景' },
]

const activities = [
  { id: 1, title: '春季赏花季', desc: '全国热门赏花目的地', icon: '🌸', color: 'from-pink-500 to-rose-500' },
  { id: 2, title: '海岛度假', desc: '温暖海岛休闲游', icon: '🏝️', color: 'from-cyan-500 to-blue-500' },
  { id: 3, title: '登山徒步', desc: '春天徒步好时节', icon: '🏔️', color: 'from-green-500 to-emerald-500' },
  { id: 4, title: '城市漫游', desc: '探索城市角落', icon: '🏙️', color: 'from-purple-500 to-violet-500' },
]

const hotels = [
  { id: 1, name: '上海外滩华尔道夫酒店', location: '上海外滩', price: 2800, rating: 4.9, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
  { id: 2, name: '北京王府井文华东方酒店', location: '北京王府井', price: 3200, rating: 4.8, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400' },
]

export default function Home() {
  const [weather, setWeather] = useState(null)
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const date = new Date()
    const options = { month: 'long', day: 'numeric', weekday: 'long' }
    setCurrentDate(date.toLocaleDateString('zh-CN', options))
    
    setWeather({
      temp: 18,
      city: '北京',
      condition: '晴',
      humidity: 45,
      wind: '东北风2级',
      aqi: '优'
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-6 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm">{currentDate}</p>
              <h1 className="text-2xl font-bold mt-1">早安，旅行者</h1>
            </div>
            <Link to="/profile" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
              <span className="text-lg">✈️</span>
            </Link>
          </div>

          {/* Weather Card */}
          {weather && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mt-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-5xl font-light">{weather.temp}°</div>
                  <div className="text-slate-300 mt-1">{weather.city} · {weather.condition}</div>
                </div>
                <div className="text-6xl">☀️</div>
              </div>
              <div className="flex gap-4 mt-3 text-sm text-slate-400">
                <span>💧 {weather.humidity}%</span>
                <span>🌬️ {weather.wind}</span>
                <span>✨ {weather.aqi}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto -mt-12 px-4">
        <Link to="/map" className="flex items-center bg-white rounded-2xl shadow-lg px-4 py-3">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="ml-3 text-slate-400">搜索目的地、景点、酒店...</span>
        </Link>
      </div>

      {/* Activities */}
      <div className="max-w-md mx-auto px-4 mt-6">
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              to="/trips"
              className="flex-shrink-0 w-28"
            >
              <div className={`bg-gradient-to-br ${activity.color} rounded-2xl p-4 text-white`}>
                <div className="text-3xl mb-2">{activity.icon}</div>
                <div className="font-semibold text-sm">{activity.title}</div>
                <div className="text-xs opacity-80 mt-1">{activity.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-4 mt-6">
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: '🗓️', label: '行程', path: '/trips' },
            { icon: '🗺️', label: '地图', path: '/map' },
            { icon: '🍜', label: '美食', path: '/food' },
            { icon: '📍', label: '足迹', path: '/profile' },
          ].map((item) => (
            <Link key={item.label} to={item.path} className="flex flex-col items-center">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl mb-2">
                {item.icon}
              </div>
              <span className="text-sm text-slate-600">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="max-w-md mx-auto px-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">热门目的地</h2>
          <Link to="/trips" className="text-sm text-blue-500">查看全部</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4">
          {destinations.map((dest) => (
            <Link key={dest.id} to="/trips" className="flex-shrink-0 w-40">
              <div className="relative rounded-2xl overflow-hidden h-52">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="font-semibold">{dest.name}</div>
                  <div className="text-xs opacity-80">{dest.tips}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Hotels */}
      <div className="max-w-md mx-auto px-4 mt-8 pb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">精选酒店</h2>
          <Link to="/trips" className="text-sm text-blue-500">更多</Link>
        </div>
        <div className="space-y-3">
          {hotels.map((hotel) => (
            <Link key={hotel.id} to="/trips" className="flex bg-white rounded-2xl shadow-sm overflow-hidden">
              <img src={hotel.image} alt={hotel.name} className="w-28 h-28 object-cover" />
              <div className="flex-1 p-3">
                <div className="font-semibold text-slate-800 text-sm">{hotel.name}</div>
                <div className="text-xs text-slate-500 mt-1">{hotel.location}</div>
                <div className="flex justify-between items-end mt-2">
                  <div>
                    <span className="text-lg font-bold text-orange-500">¥{hotel.price}</span>
                    <span className="text-xs text-slate-400">/起</span>
                  </div>
                  <div className="text-xs text-yellow-500">⭐ {hotel.rating}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}