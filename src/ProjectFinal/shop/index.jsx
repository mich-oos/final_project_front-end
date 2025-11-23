import NavbarShop from "./navbar";
import FooterShop from "./footer";

const Shop = () => {
  return (
    <div className="bg-[#EDDFB7] min-h-screen">
      <NavbarShop />

      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-xl font-bold">Hoodie Classic</h3>
            <p className="text-gray-700">Rp 150.000</p>
            <p className="text-yellow-500 text-lg">★★★★★</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-xl font-bold">T-Shirt Oversize</h3>
            <p className="text-gray-700">Rp 95.000</p>
            <p className="text-yellow-500 text-lg">★★★★☆</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-xl font-bold">Jacket Streetwear</h3>
            <p className="text-gray-700">Rp 220.000</p>
            <p className="text-yellow-500 text-lg">★★★★★</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-xl font-bold">Dress Casual</h3>
            <p className="text-gray-700">Rp 180.000</p>
            <p className="text-yellow-500 text-lg">★★★★☆</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-xl font-bold">Sneakers White</h3>
            <p className="text-gray-700">Rp 300.000</p>
            <p className="text-yellow-500 text-lg">★★★★★</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-xl font-bold">Crop Top</h3>
            <p className="text-gray-700">Rp 80.000</p>
            <p className="text-yellow-500 text-lg">★★★★☆</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-xl font-bold">Shirt Formal</h3>
            <p className="text-gray-700">Rp 160.000</p>
            <p className="text-yellow-500 text-lg">★★★★★</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-xl font-bold">Short Pants</h3>
            <p className="text-gray-700">Rp 90.000</p>
            <p className="text-yellow-500 text-lg">★★★☆☆</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-xl font-bold">High Heels Elegant</h3>
            <p className="text-gray-700">Rp 350.000</p>
            <p className="text-yellow-500 text-lg">★★★★★</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-xl font-bold">Cardigan Soft</h3>
            <p className="text-gray-700">Rp 140.000</p>
            <p className="text-yellow-500 text-lg">★★★★☆</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-xl font-bold">Bucket Hat</h3>
            <p className="text-gray-700">Rp 70.000</p>
            <p className="text-yellow-500 text-lg">★★★★☆</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-xl font-bold">Sport Shoes</h3>
            <p className="text-gray-700">Rp 280.000</p>
            <p className="text-yellow-500 text-lg">★★★★★</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-xl font-bold">Mini Skirt</h3>
            <p className="text-gray-700">Rp 85.000</p>
            <p className="text-yellow-500 text-lg">★★★☆☆</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-xl font-bold">Denim Jacket</h3>
            <p className="text-gray-700">Rp 200.000</p>
            <p className="text-yellow-500 text-lg">★★★★★</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
            <h3 className="text-xl font-bold">Flannel Shirt</h3>
            <p className="text-gray-700">Rp 130.000</p>
            <p className="text-yellow-500 text-lg">★★★★☆</p>
          </div>

        </div>
      </div>

      <FooterShop />
    </div>
  );
};

export default Shop; 

