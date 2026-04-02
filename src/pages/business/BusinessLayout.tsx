import { Outlet } from 'react-router-dom'
import BusinessSidebar from '../../components/layout/BusinessSidebar'
import BusinessHeader from '../../components/layout/BusinessHeader'

export default function BusinessLayout() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <BusinessSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <BusinessHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
