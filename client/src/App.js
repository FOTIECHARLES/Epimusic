import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Suspense, lazy } from 'react';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { SearchProvider } from './context/SearchContext';
import { CartProvider } from './context/CartContext';
import bgAuth from "./assets/bg-auth.webp";
import bgAuthDark from "./assets/bg-auth-dark.webp";
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { HelmetProvider } from "react-helmet-async";

const HomePage = lazy(() => import('./components/pages/HomePage'));
const ProductAdminForm = lazy(() => import('./components/forms/ProductAdminForm'));
const Register = lazy(() => import('./components/AuthForms/Register'));
const Login = lazy(() => import('./components/AuthForms/Login'));
const ProductDetailsPage = lazy(() => import('./components/pages/ProductDetailsPage'));
const ProductCategoriesList = lazy(() => import('./components/pages/ProductCategoriesList'));
const ProductList = lazy(() => import('./components/pages/ProductList'));
const FilteredArticles = lazy(() => import('./components/Filtered/FilteredArticles'));
const AdminPanel = lazy(() => import('./components/pages/AdminPanel'));
const UserProfile = lazy(() => import('./components/user/UserProfile'));
const CartPage = lazy(() => import('./components/pages/Checkout/CartPage'));
const ProductAdminAddModel = lazy(() => import('./components/forms/ProductAdminAddModel'));
const ProductAdminEdit = lazy(() => import('./components/forms/ProductAdminEdit'));
const RhythmGame = lazy(() => import('./components/Game/RhythmGame'));
const ShippingPage = lazy(() => import('./components/pages/Checkout/ShippingPage'));
const DeliveryHomePage = lazy(() => import('./components/pages/Checkout/DeliveryHomePage'));
const StockManagementPage = lazy(() => import('./components/pages/StockManagementPage'));
const PaymentPage = lazy(() => import('./components/pages/Checkout/PaymentPage'));


const App = () => (
    <Router>
  <HelmetProvider>
        <ThemeProvider>
            <SearchProvider>
                <CartProvider>
                    <BackgroundWrapper>
                        <div className="flex flex-col min-h-screen">
                            <Navbar />
                            <div className="flex-grow">
                                <Content />
                            </div>
                            <Footer />
                        </div>
                    </BackgroundWrapper>
                </CartProvider>
            </SearchProvider>
        </ThemeProvider>
  </HelmetProvider>
    </Router>

);

const BackgroundWrapper = ({ children }) => {
    const location = useLocation();
    const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';
    const { isDark } = useTheme();

    const backgroundImage = isAuthRoute ? (isDark ? bgAuthDark : bgAuth) : (isDark ? bgAuthDark : bgAuth);


    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
            }}
        >
            {children}
        </div>
    );
};

const Content = () => {
    return (
        <div>
            <Suspense fallback={<div className="text-center p-4">Chargement...</div>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/products" element={<ProductCategoriesList />} />
                    <Route path="/products/:category/:categoryId" element={<ProductList />} />
                    <Route path="/products/:category/:categoryId/search" element={<ProductList />} />
                    <Route path="/products/search" element={<ProductList />} />
                    <Route
                        path="/admin/*"
                        element={
                            <ProtectedRoute requiredRole="ROLE_ADMIN">
                                <AdminPanel />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile/*"
                        element={
                            <ProtectedRoute requiredRole="ROLE_USER">
                                <UserProfile />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/admin/create-product" element={<ProductAdminForm />} />
                    <Route
                        path="/admin/create-product"
                        element={
                            <ProtectedRoute requiredRole="ROLE_ADMIN">
                                <ProductAdminForm />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/edit-product/:id"
                        element={
                            <ProtectedRoute requiredRole="ROLE_ADMIN">
                                <ProductAdminEdit />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/admin/product/:category/:id/add-model'
                        element={
                            <ProtectedRoute requiredRole="ROLE_ADMIN">
                                <ProductAdminAddModel />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/product/:id"
                        element={<ProductDetailsPage />}
                    />
                    <Route path="/cart" element={<CartPage />} />
                    {/* <Route path="/admin/stock-management" element={<StockManagementPage />} /> */}
                    <Route
                        path="/filters"
                        element={<FilteredArticles />}
                    />
                    <Route path='/delivery' element={<ShippingPage />} />
                    <Route path='/delivery/home-delivery' element={<DeliveryHomePage />} />
                    <Route path='/checkout/payment' element={<PaymentPage />} />
                    <Route path="/rhythm-game" element={<RhythmGame />} />
                </Routes>
            </Suspense> 
        </div>
    );
};

export default App;