import React, { useState, useEffect } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import Photo from "../../assets/pic1.jpeg"; 

const formatPrice = (price) => <span style={{ color: '#D99255' }}>{`Rp. ${price.toLocaleString('id-ID')}`}</span>;

const Home = () => {
  const navigate = useNavigate();
  const [popularProducts, setPopularProducts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products?_limit=4');
        if (!response.ok) {
          throw new Error('Gagal mengambil data produk populer.');
        }
        const data = await response.json();
        setPopularProducts(data);
      } catch (error) {
        console.error("Error fetching popular products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPopularProducts();
  }, []);


  return (
    <div className="min-h-full"> 
      
      <div className="w-full flex justify-center pt-6">
        <img
          src={Photo}
          alt="Fashion Banner"
          className="rounded-lg w-[90%] shadow-lg"
        />
      </div>

      <div className="p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Vastly Fashion</h1>
        <p className="text-lg mb-6">Find Your Style. Express Yourself.</p>

        <button
          onClick={() => navigate("/shop")} 
          className="text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90"
          style={{ backgroundColor: '#D99255' }}
        >
          Shop Now
        </button>
      </div>

      <div className="px-10">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["T-Shirt", "Hoodie", "Dress", "Shoes"].map((item) => (
            <div
              key={item}
              onClick={() => navigate(`/shop?category=${item}`)} 
              className="bg-white p-6 rounded-xl shadow-md text-center font-semibold cursor-pointer hover:bg-gray-100"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-4">✨ Popular Products</h2>

        {isLoading ? (
          <div className="text-center text-gray-600">Memuat produk...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularProducts.length > 0 ? (
              popularProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`} 
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 group overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-t-xl group-hover:opacity-90 transition duration-300"
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-semibold truncate">{product.name}</h3>
                    <p className="text-md text-orange-600 font-bold mt-1">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 col-span-4 text-center">Tidak ada produk populer yang ditemukan.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;