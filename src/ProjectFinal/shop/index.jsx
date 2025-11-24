import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

const formatPrice = (price) => <span style={{ color: '#D99255' }}>{`Rp. ${price.toLocaleString('id-ID')}`}</span>;

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error('Gagal mengambil daftar produk');
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className="p-16 text-center text-xl">Memuat produk...</div>;
  }

  if (error) {
    return (
        <div className="p-16 text-center text-red-600">
            <h2 className="text-2xl font-bold mb-4">Terjadi Kesalahan!</h2>
            <p className="mb-2">Gagal memuat katalog toko: {error}.</p>
            <p className="text-sm mt-4 font-semibold">
                Solusi: Pastikan JSON Server berjalan di Port 3000 (untuk data produk). 
                Jalankan: <code className="bg-red-100 p-1 rounded">json-server --watch db.json --port 3000</code>
            </p>
        </div>
    );
  }

  const getImagePath = (imageFileName) => {
    if (imageFileName) {
        return `${import.meta.env.BASE_URL}${imageFileName}`;
    }
    return ''; 
  };
  return (
    <div className="p-8"> 
      <h2 className="text-4xl font-bold mb-10 text-center text-black">🛍️ Katalog Produk Clothify</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`} 
            className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <div className="h-64 overflow-hidden rounded-t-lg bg-gray-100 flex items-center justify-center">
                <img 
                    src={getImagePath(product.image)} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate text-gray-800">{product.name}</h3>
              <p className="font-bold mt-1">{formatPrice(product.price)}</p> 
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;