import { Link } from 'react-router-dom';
import { useCart } from '../cart/CartContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 shadow-md" style={{ backgroundColor: '#F6F6F6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-900" style={{ color: '#D99255' }}>
              Clothify
            </Link>
          </div>

          <nav className="flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-gray-900 font-medium">Shop</Link>
            <Link to="/profile" className="text-gray-700 hover:text-gray-900 font-medium">Profile</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-1 rounded-full text-gray-700 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 rounded-full" 
                      style={{ backgroundColor: '#D99255' }}> 
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar