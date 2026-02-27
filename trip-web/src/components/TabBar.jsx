import { NavLink, useLocation } from 'react-router-dom'

const tabs = [
  { path: '/', icon: 'home', label: '首页' },
  { path: '/trips', icon: 'calendar', label: '行程' },
  { path: '/map', icon: 'map', label: '地图' },
  { path: '/food', icon: 'food', label: '美食' },
  { path: '/profile', icon: 'user', label: '我的' },
]

const icons = {
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  map: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  food: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
}

export default function TabBar() {
  const location = useLocation()
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 safe-area-bottom">
      <div className="max-w-md mx-auto px-2">
        <div className="flex justify-around h-16">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path || 
              (tab.path !== '/' && location.pathname.startsWith(tab.path))
            
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={`flex flex-col items-center justify-center w-16 transition-colors ${
                  isActive
                    ? 'text-blue-500'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div className={`relative p-1.5 rounded-xl transition-colors ${
                  isActive ? 'bg-blue-50' : ''
                }`}>
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                  )}
                  <svg className="w-6 h-6" fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[tab.icon]} />
                  </svg>
                </div>
                <span className={`text-xs mt-0.5 font-medium ${isActive ? 'text-blue-500' : 'text-slate-400'}`}>
                  {tab.label}
                </span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </nav>
  )
}