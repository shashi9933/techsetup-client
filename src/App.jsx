import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import AdminRoutes from './admin/routes/AdminRoutes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import ProfessionPage from './pages/ProfessionPage';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Blog from './pages/Blog';
import Partners from './pages/Partners';
import Careers from './pages/Careers';
import { SettingsProvider } from './context/SettingsContext';
import Settings from './pages/Settings';
import OrderConfirmation from './pages/OrderConfirmation';
import ErrorBoundary from './components/ErrorBoundary';
import AdminPanel from './pages/AdminPanel';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <SettingsProvider>
          <Router>
            <Routes>
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route
                path="/"
                element={
                  <div className="min-h-screen flex flex-col bg-[#000000]">
                    <Header />
                    <main className="flex-grow pt-[5px]">
                      <Outlet />
                    </main>
                    <Footer />
                  </div>
                }
              >
                <Route index element={<Home />} />
                <Route path="profession/:id" element={<ProfessionPage />} />
                <Route path="products" element={<ProductList />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="profile" element={<Profile />} />
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="register" element={<Register />} />
                <Route path="cart" element={<Cart />} />
                <Route path="about" element={<About />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="terms" element={<Terms />} />
                <Route path="cookies" element={<Cookies />} />
                <Route path="blog" element={<Blog />} />
                <Route path="partners" element={<Partners />} />
                <Route path="careers" element={<Careers />} />
                <Route path="category/:type" element={<ProductList />} />
                <Route path="settings" element={<Settings />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/admin" element={<AdminPanel />} />
              </Route>
            </Routes>
          </Router>
        </SettingsProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;