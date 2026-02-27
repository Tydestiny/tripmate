import { Link } from 'react-router-dom'

const features = [
  { 
    id: 'trips',
    title: '行程规划', 
    desc: '创建和管理旅行计划',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    color: 'from-blue-500 to-blue-600',
    path: '/trips'
  },
  { 
    id: 'map',
    title: '地图导航', 
    desc: '实时定位与导航',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    color: 'from-green-500 to-green-600',
    path: '/map'
  },
  { 
    id: 'food',
    title: '美食推荐', 
    desc: '发现当地美食',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    color: 'from-orange-500 to-orange-600',
    path: '/food'
  },
  { 
    id: 'safety',
    title: '安全提示', 
    desc: '旅行安全指南',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    color: 'from-red-500 to-red-600',
    path: '/profile'
  },
]

const popularTrips = [
  { id: 1, title: '北京3日游', date: '3月15日-17日', image: '🇨🇳' },
  { id: 2, title: '上海周末游', date: '3月22日-23日', image: '🗼' },
  { id: 3, title: '成都美食之旅', date: '4月5日-8日', image: '🐼' },
]

export default function Home() {
  return (
    <div className="pb-4">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-8">
        <h2 className="text-2xl font-bold mb-2">准备开始你的旅程?</h2>
        <p className="text-blue-100 mb-4">发现下一个目的地</p>
        <Link 
          to="/trips"
          className="inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors"
        >
          规划新行程
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="grid grid-cols-4 gap-2">
            {features.map((feature) => (
              <Link
                key={feature.id}
                to={feature.path}
                className="flex flex-col items-center text-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-2`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">{feature.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Trips */}
      <div className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-800">热门行程</h3>
          <Link to="/trips" className="text-blue-500 text-sm">查看全部</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {popularTrips.map((trip) => (
            <Link
              key={trip.id}
              to={`/trips/${trip.id}`}
              className="flex-shrink-0 bg-white rounded-xl shadow-sm p-3 w-36 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">{trip.image}</div>
              <div className="font-medium text-gray-800 text-sm">{trip.title}</div>
              <div className="text-xs text-gray-500">{trip.date}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Weather Widget */}
      <div className="mt-6 px-4">
        <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold">22°</div>
              <div className="text-blue-100">北京</div>
            </div>
            <div className="text-6xl">☀️</div>
          </div>
          <div className="mt-3 flex gap-4 text-sm text-blue-100">
            <span>💧 35%</span>
            <span>🌬️ 东北风3级</span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 px-4">
        <h3 className="font-bold text-lg text-gray-800 mb-3">旅行小贴士</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <div className="font-medium text-yellow-800">提前规划更省钱</div>
              <div className="text-sm text-yellow-700">提前1个月预订机票和酒店可节省20%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}