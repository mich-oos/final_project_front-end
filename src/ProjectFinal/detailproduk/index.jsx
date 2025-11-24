import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import { useCart } from '../cart/CartContext'; 

const formatPrice = (price) => <span style={{ color: '#D99255' }}>{`Rp. ${price.toLocaleString('id-ID')}`}</span>;

const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 1; i <= 5; i++) {
      let colorClass = 'text-gray-300';
      if (i <= fullStars) {
        colorClass = 'text-black'; 
      }
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${colorClass} fill-current`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.353l-7.416-3.896-7.416 3.896 1.48-8.353-6.064-5.828 8.332-1.151z" />
        </svg>
      );
    }
    return <div className="flex space-x-0.5">{stars}</div>;
};

const ProductDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const { addItemToCart } = useCart(); 

  const [productData, setProductData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const productId = parseInt(id); 
    const fetchProduct = async () => {
      setIsLoading(true); 
      try {
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        if (!response.ok) {
          throw new Error('Gagal mengambil data produk atau produk tidak ditemukan.');
        }
        const data = await response.json();
        setProductData(data);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        } else {
          setSelectedSize(null);
        }
        setError(null);
      } catch (err) {
        // Penanganan error koneksi server yang lebih jelas
        setError(err.message === 'Failed to fetch' 
          ? 'JSON Server Produk (Port 3000) tidak terhubung.' 
          : err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
        fetchProduct();
    }
  }, [id]); 
  
  const handleAddToCart = () => {
    if (!productData || !selectedSize) {
        console.warn("Mohon pilih ukuran terlebih dahulu."); 
        return;
    }
    addItemToCart(productData, selectedSize); 
    navigate('/cart'); 
  };
  
  if (isLoading) {
    return <div className="p-16 text-center text-xl">Memuat detail produk ID {id}...</div>;
  }
  
  if (error || !productData) {
    return (
        <div className="p-16 text-center text-red-600">
            <h2 className="text-2xl font-bold mb-4">Terjadi Kesalahan!</h2>
            <p className="mb-2">Detail Produk ID {id} tidak dapat dimuat. Penyebab: {error}. </p>
            <p className="text-sm mt-4 font-semibold">
                *Solusi:* Pastikan JSON Server untuk Produk berjalan di Port 3000. 
                Jalankan: <code className="bg-red-100 p-1 rounded">json-server --watch db.json --port 3000</code>
            </p>
        </div>
    );
  }

  // 🎯 PERBAIKAN JALUR GAMBAR (Metode Absolut Vite)
  const imagePath = productData.image 
      ? `${import.meta.env.BASE_URL}${productData.image}` 
      : '';
  
  return (
    <div className="p-4 sm:p-8 md:p-12 lg:p-16 min-h-full">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
          
          <Link 
             to="/shop" 
             className="absolute p-2 hidden md:block z-20 hover:text-gray-700 transition"
             style={{ top: '80px', left: '20px' }}
          > 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          
          <div className="md:w-1/2 p-4 flex justify-center items-center bg-gray-50">
            <img 
              src={imagePath} // Menggunakan jalur absolut yang sudah diperbaiki
              alt={productData.name} 
              className="object-cover w-full max-w-sm rounded-lg shadow-md" 
            />
          </div>

          <div className="md:w-1/2 p-8 space-y-6">
            <h2 className="text-3xl font-bold">{productData.name}</h2>
            <p className="text-2xl font-semibold">{formatPrice(productData.price)}</p> 

            <div>
              <h3 className="text-lg font-medium mb-2">Size</h3>
              <div className="flex space-x-3">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)} 
                    className={`
                      w-10 h-10 border border-gray-400 rounded-lg flex items-center justify-center text-sm font-semibold 
                      transition duration-150
                      ${selectedSize === size 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Deskripsi:</h3>
              <p className="text-gray-600 leading-relaxed">
                {productData.description}
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              {renderStars(productData.rating)} 
              <button 
                onClick={handleAddToCart} 
                className="text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: '#D99255' }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ProductDetail;