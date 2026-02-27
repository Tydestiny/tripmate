import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'trip_planner_trips'

export default function Profile() {
  const [profile, setProfile] = useState({
    name: '旅行者',
    avatar: '✈️'
  })

  const [stats, setStats] = useState({ upcoming: 0, completed: 0, favorites: 0, totalDays: 0 })
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('trip_planner_profile')
    if (saved) {
      setProfile(JSON.parse(saved))
    }
    
    const trips = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const favorites = JSON.parse(localStorage.getItem('trip_favorites') || '[]')
    
    setStats({
      upcoming: trips.filter(t => t.status === 'upcoming').length,
      completed: trips.filter(t => t.status === 'completed').length,
      favorites: favorites.length,
      totalDays: trips.reduce((sum, t) => sum + t.days, 0)
    })

    setRecentActivity([
      { type: 'trip', title: '创建了重庆3日游', time: '2小时前' },
      { type: 'fav', title: '收藏了利群烧烤', time: '昨天' },
      { type: 'trip', title: '添加了洪崖洞到行程', time: '昨天' },
    ])
  }, [])

  const menuItems = [
    { id: 'trips', icon: '🗓️', label: '我的行程', count: stats.upcoming + stats.completed, path: '/trips', color: 'bg-blue-100 text-blue-600' },
    { id: 'favorites', icon: '❤️', label: '我的收藏', count: stats.favorites, path: '/food', color: 'bg-red-100 text-red-600' },
    { id: 'hotels', icon: '🏨', label: '酒店订单', count: 0, path: '/trips', color: 'bg-purple-100 text-purple-600' },
    { id: 'tickets', icon: '🎫', label: '门票订单', count: 0, path: '/trips', color: 'bg-green-100 text-green-600' },
  ]

  const settingsItems = [
    { id: 'notifications', icon: '🔔', label: '通知设置', path: '/' },
    { id: 'privacy', icon: '🔒', label: '隐私设置', path: '/' },
    { id: 'language', icon: '🌐', label: '语言', path: '/' },
    { id: 'help', icon: '❓', label: '帮助与反馈', path: '/' },
  ]

  const badges = [
    { icon: '🌸', name: '新手旅行者', desc: '完成首次旅行' },
    { icon: '📍', name: '打卡达人', desc: '访问10个景点' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 pt-8 pb-16">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-5xl">
            {profile.avatar}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <div className="text-slate-400 text-sm mt-1">探索世界，从这里开始</div>
            <div className="flex gap-2 mt-3">
              {badges.map((badge, idx) => (
                <span key={idx} className="px-2 py-1 bg-white/10 rounded-full text-xs flex items-center gap-1">
                  <span>{badge.icon}</span>
                  <span>{badge.name}</span>
                </span>
              ))}
            </div>
          </div>
          <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.upcoming + stats.completed}</div>
            <div className="text-xs text-slate-400 mt-1">行程</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.totalDays}</div>
            <div className="text-xs text-slate-400 mt-1">天数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.favorites}</div>
            <div className="text-xs text-slate-400 mt-1">收藏</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.completed}</div>
            <div className="text-xs text-slate-400 mt-1">已完成</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-md mx-auto px-4 -mt-12">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-2xl`}>
                  {item.icon}
                </div>
                {item.count > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </div>
              <div className="font-medium text-slate-800">{item.label}</div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden">
          <div className="px-4 py-3 border-b">
            <span className="font-bold text-slate-800">最近动态</span>
          </div>
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="px-4 py-3 flex items-center gap-3 border-b last:border-b-0">
              <span className="text-xl">
                {activity.type === 'trip' ? '🗓️' : '❤️'}
              </span>
              <div className="flex-1">
                <div className="text-sm text-slate-800">{activity.title}</div>
                <div className="text-xs text-slate-400">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden">
          <div className="px-4 py-3 border-b">
            <span className="font-bold text-slate-800">设置</span>
          </div>
          {settingsItems.map((item, idx) => (
            <Link
              key={item.id}
              to={item.path}
              className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-slate-800">{item.label}</span>
              </div>
              <span className="text-slate-400">›</span>
            </Link>
          ))}
        </div>

        {/* VIP */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 text-white mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold">开通VIP会员</div>
              <div className="text-sm opacity-90 mt-1">享受更多特权</div>
            </div>
            <span className="px-4 py-2 bg-white text-orange-500 rounded-full text-sm font-medium">
              立即开通
            </span>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center text-slate-400 text-sm py-4">
          <div>Trip Planner v2.0</div>
          <div className="mt-1">让旅行更简单</div>
        </div>
      </div>
    </div>
  )
}