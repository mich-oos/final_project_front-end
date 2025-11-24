import { Link } from 'react-router-dom';
import { useCart } from '../cart/CartContext'; 

const formatPrice = (price) => `Rp. ${price.toLocaleString('id-ID')}`;

const CartPage = () => {
  const { cartItems, removeItemFromCart, updateItemQuantity } = useCart(); 

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="p-16 flex flex-col items-center"> 
      <h2 className="text-4xl font-bold mb-8 text-black">🛒 Keranjang Belanja Anda</h2>
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl">
        
         {cartItems.length === 0 ? (
          <div className="text-center">
            <Link 
              to="/shop"
              className="mt-6 inline-block text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition duration-300"
              style={{ backgroundColor: '#D99255' }}
            >
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex items-center border-b pb-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover mr-6 rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">Ukuran: {item.selectedSize}</p>
                    <p className="text-sm text-gray-500 font-medium">Harga Satuan: {formatPrice(item.price)}</p>

                    <button
                        onClick={() => removeItemFromCart(item.cartItemId)}
                        className="text-red-500 hover:text-red-700 text-sm mt-1"
                    >
                        Batalkan Produk (Hapus)
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">

                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateItemQuantity(item.cartItemId, -1)}
                        className="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                        disabled={item.quantity <= 1} 
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-md border-l border-r border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateItemQuantity(item.cartItemId, 1)}
                        className="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <div className="w-24 text-right">
                    <p className="text-lg font-bold" style={{ color: '#D99255' }}> 
                      {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t-2 border-orange-200">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total Belanja:</span>
                <span style={{ color: '#D99255' }}>{formatPrice(calculateTotal())}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
                <Link
                    to="/shop"
                    className="text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
                    style={{ backgroundColor: '#D99255' }}
                >
                    &larr; Kembali Berbelanja
                </Link>

                <button
                    className="text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
                    onClick={() => alert("Checkout dilakukan! Total yang harus dibayar: " + formatPrice(calculateTotal()))}
                    style={{ backgroundColor: '#D99255' }}
                >
                    Lanjutkan ke Pembayaran
                </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;