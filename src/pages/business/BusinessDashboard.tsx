import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 5000, orders: 35 },
  { name: 'Thu', sales: 2780, orders: 15 },
  { name: 'Fri', sales: 6890, orders: 48 },
  { name: 'Sat', sales: 8390, orders: 65 },
  { name: 'Sun', sales: 7490, orders: 52 },
]

const stats = [
  { label: 'Total Revenue', value: '₹37,550', change: '+12.5%', trend: 'up', icon: '💰' },
  { label: 'Total Orders', value: '257', change: '+8.2%', trend: 'up', icon: '📦' },
  { label: 'Active Items', value: '45', change: '0%', trend: 'neutral', icon: '🍔' },
  { label: 'Avg. Rating', value: '4.8', change: '+0.1', trend: 'up', icon: '⭐' },
]

const recentOrders = [
  { id: '#ORD-1024', customer: 'Rahul K.', items: 3, total: '₹450', status: 'Preparing', time: '10 mins ago' },
  { id: '#ORD-1023', customer: 'Priya S.', items: 1, total: '₹120', status: 'Ready', time: '15 mins ago' },
  { id: '#ORD-1022', customer: 'Amit P.', items: 5, total: '₹890', status: 'Delivered', time: '1 hour ago' },
  { id: '#ORD-1021', customer: 'Neha G.', items: 2, total: '₹340', status: 'Delivered', time: '2 hours ago' },
]

export default function BusinessDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl">
                {stat.icon}
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-md \${
                  stat.trend === 'up'
                    ? 'bg-green-50 text-green-600'
                    : stat.trend === 'down'
                    ? 'bg-red-50 text-red-600'
                    : 'bg-gray-50 text-gray-600'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
              <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts & Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Revenue Overview</h2>
            <select className="text-sm border-gray-200 rounded-lg text-gray-600 focus:ring-orange-500 focus:border-orange-500">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={(value) => `₹\${value}`} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`₹\${value}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <button className="text-sm text-orange-500 font-semibold hover:underline">View All</button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{order.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full \${
                        order.status === 'Preparing'
                          ? 'bg-orange-100 text-orange-700'
                          : order.status === 'Ready'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {order.customer} • {order.items} items
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-gray-900">{order.total}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{order.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
