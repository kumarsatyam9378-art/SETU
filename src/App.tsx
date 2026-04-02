import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/LandingPage'
import LanguagePage from './pages/LanguagePage'
import RoleSelectPage from './pages/RoleSelectPage'
import PlaceholderPage from './pages/PlaceholderPage'

// Customer Pages
import CustomerLayout from './pages/customer/CustomerLayout'
import CustomerHome from './pages/customer/CustomerHome'
import CategoryPage from './pages/customer/CategoryPage'
import RestaurantPage from './pages/customer/RestaurantPage'
import CartPage from './pages/customer/CartPage'
import CheckoutPage from './pages/customer/CheckoutPage'
import OrdersPage from './pages/customer/OrdersPage'
import ProfilePage from './pages/customer/ProfilePage'

// Business Pages
import BusinessLayout from './pages/business/BusinessLayout'
import BusinessDashboard from './pages/business/BusinessDashboard'
import BusinessOnboarding from './pages/business/BusinessOnboarding'

export default function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1a2e',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#57FF31', secondary: '#1a1a2e' },
          },
          error: {
            iconTheme: { primary: '#FF6B6B', secondary: '#1a1a2e' },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/language" element={<LanguagePage />} />
        <Route path="/role-select" element={<RoleSelectPage />} />

        {/* Customer Routes */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerHome />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="restaurant/:id" element={<RestaurantPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Business Routes */}
        <Route path="/business/onboarding" element={<BusinessOnboarding />} />
        <Route path="/business" element={<BusinessLayout />}>
          <Route index element={<BusinessDashboard />} />
          <Route path="orders" element={<PlaceholderPage title="Business Orders" />} />
          <Route path="products" element={<PlaceholderPage title="Products Management" />} />
          <Route path="analytics" element={<PlaceholderPage title="Analytics & Reports" />} />
          <Route path="marketing" element={<PlaceholderPage title="Marketing & Promotions" />} />
          <Route path="settings" element={<PlaceholderPage title="Business Settings" />} />
        </Route>
      </Routes>
    </Router>
  )
}
