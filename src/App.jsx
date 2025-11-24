import { Routes, Route } from 'react-router-dom'; 
import Navbar from './ProjectFinal/home/navbar'
import Footer from './ProjectFinal/home/footer'
import Home from './ProjectFinal/home/index';
import ShopPage from './ProjectFinal/shop/index'; 
import ProductDetail from './ProjectFinal/detailproduk/index'; 
import CartPage from './ProjectFinal/cart/index'; 
import ProfilePage from './ProjectFinal/profile/index'; 
import { CartProvider } from './ProjectFinal/cart/CartContext'; 


const AppContent = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EDDFB7' }}>
      <Navbar /> 
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<div className="p-20 text-center text-2xl">404 | Halaman tidak ditemukan</div>} />
        </Routes>
      </main>
      <Footer /> 
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}