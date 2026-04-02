import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Badge from '../../components/ui/Badge'

const MOCK_ORDERS = [
  {
    id: 'ORD-89231',
    date: 'Today, 12:30 PM',
    status: 'Preparing',
    restaurant: 'Burger King',
    items: ['2x Whopper Jr. Veg', '1x Medium Fries'],
    total: 397,
    type: 'Food Delivery',
  },
  {
    id: 'ORD-89230',
    date: 'Yesterday, 8:15 PM',
    status: 'Delivered',
    restaurant: 'Pizza Hut',
    items: ['1x Margherita Pizza (Medium)', '1x Garlic Bread'],
    total: 450,
    type: 'Food Delivery',
  },
  {
    id: 'ORD-89229',
    date: '15 Mar, 10:00 AM',
    status: 'Completed',
    restaurant: 'Dr. Sharma Clinic',
    items: ['General Consultation'],
    total: 500,
    type: 'Healthcare',
  },
]

export default function OrdersPage() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('Active')
  const showSuccess = location.state?.success

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-3"
        >
          <span className="text-2xl">🎉</span>
          <div>
            <h3 className="font-bold">Order Placed Successfully!</h3>
            <p className="text-sm text-green-700">Your order is being processed.</p>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">My Orders</h1>
        <p className="text-sm text-gray-500 mt-1">Track, manage and view your order history</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        {['Active', 'Past Orders'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold transition-colors relative \${
              activeTab === tab ? 'text-orange-500' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="orderTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-t-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {MOCK_ORDERS.filter((o) =>
          activeTab === 'Active' ? o.status === 'Preparing' : o.status !== 'Preparing'
        ).map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-gray-500">{order.type}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-500">{order.date}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900">{order.restaurant}</h3>
                <p className="text-sm text-gray-600 mt-1">{order.items.join(', ')}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-lg text-gray-900">₹{order.total}</p>
                <Badge
                  variant={
                    order.status === 'Delivered' || order.status === 'Completed'
                      ? 'success'
                      : 'warning'
                  }
                  className="mt-2"
                >
                  {order.status}
                </Badge>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-3">
              {order.status === 'Preparing' && (
                <button className="flex-1 py-2 rounded-xl bg-orange-50 text-orange-600 font-bold text-sm hover:bg-orange-100 transition-colors">
                  Track Order
                </button>
              )}
              <button className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">
                {order.status === 'Preparing' ? 'Help' : 'Reorder'}
              </button>
            </div>
          </motion.div>
        ))}

        {MOCK_ORDERS.filter((o) =>
          activeTab === 'Active' ? o.status === 'Preparing' : o.status !== 'Preparing'
        ).length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl mb-4 block">📦</span>
            <h3 className="text-lg font-bold text-gray-900">No {activeTab.toLowerCase()} orders</h3>
            <p className="text-gray-500 mt-1">Looks like you haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
