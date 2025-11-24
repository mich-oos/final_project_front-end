import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css'; 
import { CartProvider } from './ProjectFinal/cart/CartContext.jsx'; // PENTING: Import CartProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
      <CartProvider> {/* Bungkus App dengan CartProvider */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);