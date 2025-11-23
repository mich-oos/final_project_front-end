import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000';


async function handleRequest(endpoint, method = 'GET', data = null) {
  const url = `${API_BASE_URL}/${endpoint}`;
  
  const config = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data && method !== 'GET') {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} - Gagal ${method} data.`);
    }

    
    if (response.status === 204 || method === 'DELETE') {
      return null; 
    }

    return await response.json();

  } catch (error) {
    console.error(`Gagal berkomunikasi dengan API pada ${endpoint}:`, error);
    throw error;
  }
}


const getCartItems = async () => {
  return handleRequest('cart', 'GET');
};


const updateCartItem = async (id, updatedData) => {
  return handleRequest(`cart/${id}`, 'PUT', updatedData);
};


const deleteCartItem = async (id) => {
  return handleRequest(`cart/${id}`, 'DELETE');
};



const CustomModal = ({ message, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl transform transition-all scale-100">
            <p className="text-lg font-semibold text-gray-800 mb-6">{message}</p>
            <div className="flex justify-end space-x-3">
                {onCancel && (
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150"
                    >
                        Batal
                    </button>
                )}
                {onConfirm && (
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-150 shadow-md"
                    >
                        Ya, Hapus
                    </button>
                )}
                {!onConfirm && !onCancel && (
                    <button
                        onClick={onCancel || onConfirm} 
                        className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-150 shadow-md"
                    >
                        OK
                    </button>
                )}
            </div>
        </div>
    </div>
);


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);

  
  const fetchCartItems = async () => {
    setLoading(true);
    setError(null);
    try {
     
      const data = await getCartItems(); 

      const sanitizedData = data.map(item => ({
        ...item,
        imageUrl: item.imageUrl && item.imageUrl.startsWith('http') ? item.imageUrl : `https://placehold.co/96x96/D99255/FFFFFF?text=${item.name.slice(0, 1)}`
      }));
      setCartItems(sanitizedData);
    } catch (err) {
      setError("Gagal memuat keranjang. Pastikan JSON Server berjalan di port 5000.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  
  const handleRemoveItem = (id) => {
    setModal({
        message: "Apakah Anda yakin ingin menghapus item ini dari keranjang?",
        onConfirm: async () => {
            setModal(null);
            try {
                await deleteCartItem(id);
             
                setCartItems(prevItems => prevItems.filter(item => item.id !== id));
            } catch (err) {
                setModal({
                    message: "Gagal menghapus item: " + err.message,
                    onCancel: () => setModal(null)
                });
            }
        },
        onCancel: () => setModal(null)
    });
  };
  
  
  const handleUpdateQuantity = async (id, change) => {
    const itemToUpdate = cartItems.find(item => item.id === id);
    if (!itemToUpdate) return;

    const newQuantity = itemToUpdate.quantity + change;
    
   
    if (newQuantity <= 0) {
    
      return handleRemoveItem(id); 
    }

    try {
    
      const updatedItem = await updateCartItem(id, { 
          ...itemToUpdate, 
          quantity: newQuantity 
      });

     
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? updatedItem : item
        )
      );
    } catch (err) {
      setModal({
        message: "Gagal memperbarui kuantitas: " + err.message,
        onCancel: () => setModal(null)
      });
    }
  };
  

  const handleCheckout = () => {
    setModal({
        message: "Simulasi: Melanjutkan ke proses Checkout. Terima kasih!",
        onCancel: () => setModal(null)
    });
  };



  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const totalAmount = calculateTotal();

  if (loading) return <div className="text-center p-10 font-inter text-gray-700">Memuat data keranjang...</div>;
  if (error) return <div className="text-center p-10 font-inter text-red-600 bg-red-100 rounded-lg max-w-xl mx-auto mt-10 shadow-lg">{error}</div>;


  return (
    <>
    <div className="cart-container max-w-6xl mx-auto p-8 bg-[#EDDFB7] min-h-screen font-inter">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 border-b-2 pb-2 border-gray-400">Keranjang Belanja</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-xl shadow-lg">
          <p className="text-xl text-gray-600">Keranjang Anda kosong. Yuk, cari barang keren!</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Kolom Kiri: Daftar Item Keranjang */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item flex p-4 bg-white rounded-xl shadow-lg transition duration-300 hover:shadow-xl border border-gray-100">
                <img 
                  src={item.imageUrl} 
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/96x96/D99255/FFFFFF?text=Product"; }}
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-lg mr-6 flex-shrink-0 border border-gray-200"
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
                  
                  {/* Kontrol Kuantitas */}
                  <div className="flex items-center space-x-2 mt-2">
                    <button 
                        onClick={() => handleUpdateQuantity(item.id, -1)} 
                        className="bg-gray-200 text-gray-800 w-8 h-8 rounded-full hover:bg-gray-300 transition font-bold active:scale-[0.95]"
                    >
                        -
                    </button>
                    <span className="font-semibold text-lg">{item.quantity}</span>
                    <button 
                        onClick={() => handleUpdateQuantity(item.id, 1)} 
                        className="bg-[#D99255] text-white w-8 h-8 rounded-full hover:bg-[#C0814C] transition font-bold active:scale-[0.95]"
                    >
                        +
                    </button>
                  </div>
                  
                  <p className="text-lg font-semibold text-[#D99255] mt-2">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="flex flex-col justify-between items-end">
                    <button 
                        onClick={() => handleRemoveItem(item.id)} 
                        className="text-[#FF0202] hover:text-[#CC0000] text-sm font-medium transition duration-150 p-1 rounded-md active:scale-[0.95]"
                    >
                        Hapus
                    </button>
                    <span className="text-sm text-gray-500">Unit: Rp {item.price.toLocaleString('id-ID')}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Kolom Kanan: Ringkasan Total */}
          <div className="lg:col-span-1 sticky top-8 bg-white p-6 rounded-xl shadow-lg h-fit border border-[#D99255]/30">
            <h2 className="text-2xl font-bold mb-5 text-gray-800 border-b pb-3 border-gray-200">Ringkasan Pesanan</h2>
            <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} Produk)</span>
                    <span className="font-medium">Rp {totalAmount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Pengiriman</span>
                    <span className="font-medium text-green-600">Gratis</span>
                </div>
            </div>
            
            <div className="flex justify-between mt-5 pt-4 border-t border-dashed border-gray-300">
              <span className="text-xl font-bold">Total Pembayaran</span>
              <span className="text-2xl font-extrabold text-[#D99255]">Rp {totalAmount.toLocaleString('id-ID')}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full mt-6 bg-[#D99255] text-white py-3 rounded-xl font-semibold text-lg hover:bg-[#C0814C] transition duration-300 shadow-lg shadow-[#D99255]/50 active:scale-[0.98]"
            >
              Lanjut ke Checkout
            </button>
          </div>
        </div>
      )}
    </div>
    {/* Tampilkan Modal jika state modal terisi */}
    {modal && <CustomModal {...modal} />}
    </>
  );
};

export default CartPage;