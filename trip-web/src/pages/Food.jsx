import { useState } from 'react'

const mockRestaurants = [
  {
    id: 1,
    name: '全聚德烤鸭店',
    type: '京菜',
    rating: 4.5,
    price: '¥¥¥',
    location: '东城区',
    image: '🦆',
    features: ['老字号', '必吃榜'],
    distance: '1.2km'
  },
  {
    id: 2,
    name: '海底捞火锅',
    type: '火锅',
    rating: 4.7,
    price: '¥¥¥',
    location: '朝阳区',
    image: '🍲',
    features: ['24小时', '服务好'],
    distance: '2.5km'
  },
  {
    id: 3,
    name: '绿茶餐厅',
    type: '江浙菜',
    rating: 4.3,
    price: '¥¥',
    location: '海淀区',
    image: '🥢',
    features: ['性价比高', '排队王'],
    distance: '3.1km'
  },
  {
    id: 4,
    name: '鼎泰丰',
    type: '小吃',
    rating: 4.6,
    price: '¥¥¥',
    location: '朝阳区',
    image: '🥟',
    features: ['米其林', '小笼包'],
    distance: '1.8km'
  },
  {
    id: 5,
    name: '便宜坊烤鸭',
    type: '京菜',
    rating: 4.4,
    price: '¥¥¥',
    location: '崇文区',
    image: '🦆',
    features: ['老字号', '焖炉烤鸭'],
    distance: '4.0km'
  },
]

const categories = ['全部', '京菜', '火锅', '川菜', '粤菜', '日料', '西餐']

export default function Food() {
  const [activeCategory, setActiveCategory] = useState('全部')
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)

  const filteredRestaurants = showFavorites
    ? mockRestaurants.filter(r => favorites.includes(r.id))
    : activeCategory === '全部'
    ? mockRestaurants
    : mockRestaurants.filter(r => r.type === activeCategory)

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <div className="p-4 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">美食推荐</h2>
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            showFavorites ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {showFavorites ? '❤️ 收藏' : '🤍 收藏'}
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-2 -mx-4 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat)
              setShowFavorites(false)
            }}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat && !showFavorites
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Restaurant List */}
      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🍽️</div>
          <div className="text-gray-600">
            {showFavorites ? '还没有收藏的餐厅' : '暂无推荐'}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex">
                <div className="w-28 h-28 bg-gray-100 flex items-center justify-center text-5xl">
                  {restaurant.image}
                </div>
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">{restaurant.name}</h3>
                      <div className="text-sm text-gray-500">{restaurant.type} · {restaurant.price}</div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(restaurant.id)}
                      className="text-xl"
                    >
                      {favorites.includes(restaurant.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-yellow-500">⭐ {restaurant.rating}</span>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-500 text-sm">{restaurant.location}</span>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-500 text-sm">{restaurant.distance}</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {restaurant.features.map((feature, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t px-3 py-2 flex gap-2">
                <button className="flex-1 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
                  查看详情
                </button>
                <button className="px-3 py-1.5 border rounded text-sm hover:bg-gray-50 transition-colors">
                  导航
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Tips */}
      <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
        <div className="flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <div className="font-medium text-orange-800">今日推荐</div>
            <div className="text-sm text-orange-700">
              根据你的位置和口味，我们为你精选了以上餐厅
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}