import { Outlet } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import BottomNav from '../../components/layout/BottomNav'
import ChatSupport from '../../components/customer/ChatSupport'

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
      <ChatSupport />
    </div>
  )
}
