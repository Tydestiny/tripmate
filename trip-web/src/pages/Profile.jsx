import { useState, useEffect } from 'react'

const STORAGE_KEY = 'trip_planner_profile'

export default function Profile() {
  const [profile, setProfile] = useState({
    name: '旅行者',
    avatar: '✈️',
    trips: 0,
    days: 0,
    cities: 0
  })

  const [stats, setStats] = useState({ upcoming: 0, completed: 0, favorites: 0 })

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setProfile(JSON.parse(saved))
    }
    
    const trips = JSON.parse(localStorage.getItem('trip_planner_trips') || '[]')
    setStats({
      upcoming: trips.filter(t => t.status === 'upcoming').length,
      completed: trips.filter(t => t.status === 'completed').length,
      favorites: 0
    })
  }, [])

  const menuItems = [
    { id: 'trips', icon: '📅', label: '我的行程', count: stats.upcoming, path: '/trips' },
    { id: 'favorites', icon: '❤️', label: '我的收藏', count: stats.favorites, path: '/food' },
    { id: 'history', icon: '📊', label: '旅行足迹', count: null, path: '/' },
    { id: 'coupons', icon: '🎫', label: '优惠券', count: null, path: '/' },
  ]

  const settingsItems = [
    { id: 'notifications', icon: '🔔', label: '通知设置', path: '/' },
    { id: 'privacy', icon: '🔒', label: '隐私设置', path: '/' },
    { id: 'language', icon: '🌐', label: '语言', path: '/' },
    { id: 'help', icon: '❓', label: '帮助与反馈', path: '/' },
  ]

  return (
    <div className="p-4 pb-4">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl">
            {profile.avatar}
          </div>
          <div>
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <div className="text-blue-100 text-sm">探索世界，从这里开始</div>
          </div>
        </div>
        <div className="flex justify-around mt-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.upcoming + stats.completed}</div>
            <div className="text-xs text-blue-100">行程</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.completed}</div>
            <div className="text-xs text-blue-100">已完成</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.favorites}</div>
            <div className="text-xs text-blue-100">收藏</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-xl shadow-sm mb-4">
        {menuItems.map((item, idx) => (
          <a
            key={item.id}
            href={item.path}
            className={`flex items-center justify-between px-4 py-3 ${idx !== menuItems.length - 1 ? 'border-b' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="text-gray-800">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.count !== null && item.count > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
              <span className="text-gray-400">›</span>
            </div>
          </a>
        ))}
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl shadow-sm mb-4">
        <div className="px-4 py-3 border-b">
          <span className="font-medium text-gray-800">设置</span>
        </div>
        {settingsItems.map((item, idx) => (
          <a
            key={item.id}
            href={item.path}
            className={`flex items-center justify-between px-4 py-3 ${idx !== settingsItems.length - 1 ? 'border-b' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="text-gray-800">{item.label}</span>
            </div>
            <span className="text-gray-400">›</span>
          </a>
        ))}
      </div>

      {/* App Info */}
      <div className="text-center text-gray-400 text-sm py-4">
        <div>Trip Planner v1.0.0</div>
        <div className="mt-1">让旅行更简单</div>
      </div>
    </div>
  )
}