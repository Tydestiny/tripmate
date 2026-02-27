import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const defaultCenter = [39.9042, 116.4074]

const attractions = {
  '洪崖洞': { lat: 29.5635, lng: 106.5765, type: '景点', desc: '重庆网红打卡地标', city: 'chongqing' },
  '解放碑': { lat: 29.5526, lng: 106.5694, type: '购物', desc: '重庆商业中心', city: 'chongqing' },
  '长江索道': { lat: 29.5881, lng: 106.5718, type: '体验', desc: '山城空中巴士', city: 'chongqing' },
  '武隆天生三桥': { lat: 29.4591, lng: 107.8017, type: '景点', desc: '世界自然遗产', city: 'chongqing' },
  '宽窄巷子': { lat: 30.6717, lng: 104.0577, type: '景点', desc: '成都古街', city: 'chengdu' },
  '锦里': { lat: 30.6575, lng: 104.0565, type: '美食', desc: '成都小吃街', city: 'chengdu' },
  '熊猫基地': { lat: 30.7408, lng: 104.1441, type: '景点', desc: '大熊猫繁育研究基地', city: 'chengdu' },
  '春熙路': { lat: 30.6580, lng: 104.0667, type: '购物', desc: '成都太古里', city: 'chengdu' },
  '兵马俑': { lat: 34.3847, lng: 109.2785, type: '景点', desc: '世界第八大奇迹', city: 'xian' },
  '大雁塔': { lat: 34.2194, lng: 108.9594, type: '景点', desc: '唐代著名建筑', city: 'xian' },
  '古城墙': { lat: 34.2577, lng: 108.9484, type: '景点', desc: '中国现存最完整城墙', city: 'xian' },
  '回民街': { lat: 34.2661, lng: 108.9433, type: '美食', desc: '西安美食一条街', city: 'xian' },
  '天安门': { lat: 39.9054, lng: 116.3976, type: '景点', desc: '北京心脏', city: 'beijing' },
  '故宫': { lat: 39.9163, lng: 116.3972, type: '景点', desc: '明清皇宫', city: 'beijing' },
  '长城': { lat: 40.4319, lng: 116.5704, type: '景点', desc: '万里长城', city: 'beijing' },
}

const cityCenters = {
  beijing: [39.9042, 116.4074],
  shanghai: [31.2304, 121.4737],
  chongqing: [29.5635, 106.5765],
  chengdu: [30.5728, 104.0668],
  xian: [34.3416, 108.9398],
}

function MapEvents({ onLocationFound }) {
  useMapEvents({
    locationfound: (e) => {
      onLocationFound([e.latlng.lat, e.latlng.lng])
    },
  })
  return null
}

function ChangeView({ center }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 15)
  }, [center, map])
  return null
}

export default function Map() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [userLocation, setUserLocation] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [activeCity, setActiveCity] = useState('beijing')
  const [showRoute, setShowRoute] = useState(false)
  const mapRef = useRef(null)

  const initialLat = searchParams.get('lat')
  const initialLng = searchParams.get('lng')
  const initialName = searchParams.get('name')
  
  const initialCenter = initialLat && initialLng 
    ? [parseFloat(initialLat), parseFloat(initialLng)]
    : cityCenters[activeCity]

  useEffect(() => {
    if (initialName && attractions[initialName]) {
      setSelectedPlace(attractions[initialName])
    }
  }, [initialName])

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = [position.coords.latitude, position.coords.longitude]
          setUserLocation(loc)
        },
        (error) => {
          console.log('获取位置失败:', error.message)
        }
      )
    }
  }

  const attractionsList = Object.entries(attractions)
    .filter(([name]) => name.toLowerCase().includes(search.toLowerCase()))
    .filter(([_, data]) => !activeCity || data.city === activeCity)

  const startNavigation = (place) => {
    const isAndroid = /Android/i.test(navigator.userAgent)
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
    
    const encodedName = encodeURIComponent(place.name)
    const url = `https://www.amap.com/search?query=${encodedName}&lat=${place.lat}&lng=${place.lng}`
    
    window.open(url, '_blank')
  }

  const cities = [
    { id: 'beijing', name: '北京', icon: '🏯' },
    { id: 'shanghai', name: '上海', icon: '🗼' },
    { id: 'chongqing', name: '重庆', icon: '🌆' },
    { id: 'chengdu', name: '成都', icon: '🐼' },
    { id: 'xian', name: '西安', icon: '🏰' },
  ]

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Search Header */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索景点、酒店、餐厅..."
              className="w-full px-4 py-2.5 pl-10 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={getUserLocation}
            className="p-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            title="定位"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* City Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => {
                setActiveCity(city.id)
                setSelectedPlace(null)
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCity === city.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
              }`}
            >
              <span>{city.icon}</span>
              <span>{city.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={initialCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <ChangeView center={initialCenter} />
          <MapEvents onLocationFound={setUserLocation} />
          <TileLayer
            attribution='© 高德地图'
            url="https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
            subdomains={['1', '2', '3', '4']}
          />
          
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>
                <div className="text-center">
                  <div className="font-medium">我的位置</div>
                </div>
              </Popup>
            </Marker>
          )}

          {attractionsList.slice(0, 20).map(([name, data]) => (
            <Marker
              key={name}
              position={[data.lat, data.lng]}
              eventHandlers={{
                click: () => setSelectedPlace({ name, ...data }),
              }}
            >
              <Popup>
                <div className="min-w-32">
                  <div className="font-medium">{name}</div>
                  <div className="text-sm text-gray-500">{data.type} · {data.desc}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Search Results */}
        {search && attractionsList.length > 0 && (
          <div className="absolute top-3 left-3 right-3 bg-white rounded-xl shadow-lg max-h-64 overflow-y-auto z-[1000]">
            {attractionsList.slice(0, 10).map(([name, data]) => (
              <button
                key={name}
                onClick={() => {
                  setSelectedPlace({ name, ...data })
                  setSearch('')
                }}
                className="w-full px-4 py-3 text-left border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">{name}</div>
                <div className="text-sm text-gray-500">{data.type} · {data.desc}</div>
              </button>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-[1000]">
          <button
            onClick={getUserLocation}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            title="回到当前位置"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Place Info Panel */}
      {selectedPlace && (
        <div className="bg-white border-t rounded-t-3xl p-4 pb-24 animate-slide-up">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold">{selectedPlace.name}</h3>
              <p className="text-slate-500">{selectedPlace.type} · {selectedPlace.desc}</p>
            </div>
            <button
              onClick={() => setSelectedPlace(null)}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-slate-400"
            >
              ✕
            </button>
          </div>
          
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
              📍 {selectedPlace.city === 'beijing' ? '北京' : 
                  selectedPlace.city === 'shanghai' ? '上海' :
                  selectedPlace.city === 'chongqing' ? '重庆' :
                  selectedPlace.city === 'chengdu' ? '成都' : '西安'}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
              📐 {selectedPlace.lat.toFixed(4)}, {selectedPlace.lng.toFixed(4)}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => startNavigation(selectedPlace)}
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              开始导航
            </button>
            <button 
              className="px-4 py-3 border rounded-xl hover:bg-gray-50 transition-colors"
              onClick={() => {
                const trips = JSON.parse(localStorage.getItem('trip_planner_trips') || '[]')
                if (trips.length > 0) {
                  const currentTrip = trips[0]
                  if (!currentTrip.places.includes(selectedPlace.name)) {
                    currentTrip.places.push(selectedPlace.name)
                    localStorage.setItem('trip_planner_trips', JSON.stringify(trips))
                    alert('已添加到行程中！')
                  } else {
                    alert('该景点已在行程中')
                  }
                } else {
                  alert('请先创建行程')
                }
              }}
            >
              <svg className="w-6 h-6 text-red-500" fill={false} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}