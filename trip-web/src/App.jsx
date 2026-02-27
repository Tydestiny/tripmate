import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Trips from './pages/Trips'
import Map from './pages/Map'
import Food from './pages/Food'
import Profile from './pages/Profile'
import TripDetail from './pages/TripDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="trips" element={<Trips />} />
          <Route path="trips/:id" element={<TripDetail />} />
          <Route path="map" element={<Map />} />
          <Route path="food" element={<Food />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}