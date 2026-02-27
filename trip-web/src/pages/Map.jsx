import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const defaultLocation = [39.9042, 116.4074] // 北京

const mockPlaces = [
  { id: 1, name: '天安门广场', lat: 39.9054, lng: 116.3976, type: '景点' },
  { id: 2, name: '故宫博物院', lat: 39.9163, lng: 116.3972, type: '景点' },
  { id: 3, name: '王府井', lat: 39.9144, lng: 116.4101, type: '购物' },
  { id: 4, name: '三里屯', lat: 39.9384, lng: 116.4473, type: '娱乐' },
]

function ChangeView({ center }) {
  const map = useMap()
  map.setView(center, 14)
  return null
}

export default function Map() {
  const [location, setLocation] = useState(defaultLocation)
  const [places, setPlaces] = useState(mockPlaces)
  const [search, setSearch] = useState('')
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [userLocation, setUserLocation] = useState(null)

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
          setLocation([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.log('获取位置失败:', error)
        }
      )
    }
  }

  const filteredPlaces = places.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="h-[calc(100vh-110px)] flex flex-col">
      {/* Search Bar */}
      <div className="bg-white p-3 border-b">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索地点..."
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={getUserLocation}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            title="定位"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={location}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
        >
          <ChangeView center={location} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* User Location Marker */}
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>
                <div className="text-center">
                  <div className="font-medium">我的位置</div>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Place Markers */}
          {filteredPlaces.map((place) => (
            <Marker
              key={place.id}
              position={[place.lat, place.lng]}
              eventHandlers={{
                click: () => setSelectedPlace(place),
              }}
            >
              <Popup>
                <div className="min-w-32">
                  <div className="font-medium">{place.name}</div>
                  <div className="text-sm text-gray-500">{place.type}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Place List Overlay */}
        {search && filteredPlaces.length > 0 && (
          <div className="absolute top-3 left-3 right-3 bg-white rounded-lg shadow-lg max-h-48 overflow-y-auto z-[1000]">
            {filteredPlaces.map((place) => (
              <button
                key={place.id}
                onClick={() => {
                  setLocation([place.lat, place.lng])
                  setSelectedPlace(place)
                  setSearch('')
                }}
                className="w-full px-4 py-3 text-left border-b hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">{place.name}</div>
                <div className="text-sm text-gray-500">{place.type}</div>
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

      {/* Selected Place Info */}
      {selectedPlace && (
        <div className="bg-white border-t p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg">{selectedPlace.name}</h3>
              <p className="text-gray-500">{selectedPlace.type}</p>
            </div>
            <button
              onClick={() => setSelectedPlace(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
              开始导航
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
              收藏
            </button>
          </div>
        </div>
      )}
    </div>
  )
}