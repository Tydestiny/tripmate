import { Outlet } from 'react-router-dom'
import TabBar from './TabBar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <TabBar />
    </div>
  )
}