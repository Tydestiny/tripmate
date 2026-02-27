import { useState, useEffect } from 'react'

const restaurants = [
  {
    id: 1,
    name: '利群烧烤',
    type: '烧烤',
    rating: 4.8,
    price: '¥¥',
    location: '朝阳区',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    features: ['必吃榜', '人气高'],
    reviews: 2340,
    openTime: '17:00-02:00',
    dishes: ['羊肉串', '烤生蚝', '蒜蓉扇贝']
  },
  {
    id: 2,
    name: '鼎泰丰',
    type: '小吃',
    rating: 4.6,
    price: '¥¥¥',
    location: '西城区',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400',
    features: ['米其林', '老字号'],
    reviews: 1890,
    openTime: '10:00-21:00',
    dishes: ['小笼包', '虾仁蒸饺', '红烧牛肉面']
  },
  {
    id: 3,
    name: '海底捞火锅',
    type: '火锅',
    rating: 4.7,
    price: '¥¥¥',
    location: '海淀区',
    image: 'https://images.unsplash.com/photo-1580442448007-e7fb23c17c96?w=400',
    features: ['24小时', '服务好'],
    reviews: 5670,
    openTime: '24小时',
    dishes: ['麻辣锅', '番茄锅', '捞面']
  },
  {
    id: 4,
    name: '绿茶餐厅',
    type: '江浙菜',
    rating: 4.3,
    price: '¥¥',
    location: '东城区',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400',
    features: ['性价比高', '排队王'],
    reviews: 3210,
    openTime: '11:00-21:30',
    dishes: ['绿茶烤鸡', '糖醋排骨', '龙井虾仁']
  },
  {
    id: 5,
    name: '全聚德',
    type: '京菜',
    rating: 4.4,
    price: '¥¥¥',
    location: '东城区',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400',
    features: ['老字号', '烤鸭'],
    reviews: 4530,
    openTime: '11:00-13:30, 17:00-19:30',
    dishes: ['烤鸭', '葱爆羊肉', '京酱肉丝']
  },
  {
    id: 6,
    name: '日料放题',
    type: '日料',
    rating: 4.9,
    price: '¥¥¥¥',
    location: '朝阳区',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
    features: ['自助', '食材新鲜'],
    reviews: 1280,
    openTime: '11:30-14:00, 17:30-21:30',
    dishes: ['三文鱼', '金枪鱼', '甜虾']
  },
]

const categories = [
  { id: 'all', name: '全部', icon: '🍽️' },
  { id: '火锅', name: '火锅', icon: '🍲' },
  { id: '烧烤', name: '烧烤', icon: '🍖' },
  { id: '京菜', name: '京菜', icon: '🦆' },
  { id: '日料', name: '日料', icon: '🍣' },
  { id: '小吃', name: '小吃', icon: '🥟' },
]

export default function Food() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [sortBy, setSortBy] = useState('rating')

  useEffect(() => {
    const saved = localStorage.getItem('trip_favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  const filteredRestaurants = showFavorites
    ? restaurants.filter(r => favorites.includes(r.id))
    : activeCategory === 'all'
    ? restaurants
    : restaurants.filter(r => r.type === activeCategory)

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'reviews') return b.reviews - a.reviews
    return 0
  })

  const toggleFavorite = (id) => {
    let newFavorites
    if (favorites.includes(id)) {
      newFavorites = favorites.filter(f => f !== id)
    } else {
      newFavorites = [...favorites, id]
    }
    setFavorites(newFavorites)
    localStorage.setItem('trip_favorites', JSON.stringify(newFavorites))
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 pt-6 pb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">美食推荐</h1>
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              showFavorites ? 'bg-white text-orange-500' : 'bg-white/20 text-white'
            }`}
          >
            ❤️ 收藏 ({favorites.length})
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                setShowFavorites(false)
              }}
              className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id && !showFavorites
                  ? 'bg-white text-orange-500'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="bg-white px-4 py-3 flex items-center gap-4">
        <span className="text-sm text-slate-500">排序:</span>
        {[
          { id: 'rating', label: '评分' },
          { id: 'reviews', label: '人气' },
        ].map((sort) => (
          <button
            key={sort.id}
            onClick={() => setSortBy(sort.id)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              sortBy === sort.id
                ? 'bg-orange-100 text-orange-600'
                : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
            }`}
          >
            {sort.label}
          </button>
        ))}
      </div>

      {/* Restaurant List */}
      <div className="p-4 space-y-4">
        {sortedRestaurants.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🍽️</div>
            <div className="text-slate-600">
              {showFavorites ? '还没有收藏的餐厅' : '暂无推荐'}
            </div>
          </div>
        ) : (
          sortedRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative h-40">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => toggleFavorite(restaurant.id)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-2xl"
                >
                  {favorites.includes(restaurant.id) ? '❤️' : '🤍'}
                </button>
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="font-bold text-lg">{restaurant.name}</div>
                  <div className="text-sm opacity-90">{restaurant.location}</div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-medium">
                      ⭐ {restaurant.rating}
                    </span>
                    <span className="text-slate-500 text-sm">{restaurant.price}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500 text-sm">{restaurant.reviews}条评价</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {restaurant.features.map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="text-sm text-slate-500 mb-3">
                  🕐 {restaurant.openTime}
                </div>

                <div className="flex gap-1 mb-3">
                  {restaurant.dishes.map((dish, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                      {dish}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
                    查看详情
                  </button>
                  <Link
                    to="/map"
                    className="px-4 py-2.5 border rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tips */}
      <div className="px-4 pb-4">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4">
          <div className="flex gap-3">
            <span className="text-3xl">💡</span>
            <div>
              <div className="font-bold text-orange-800">今日精选</div>
              <div className="text-sm text-orange-700 mt-1">
                根据你的位置和口味，为你推荐了以上餐厅
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}