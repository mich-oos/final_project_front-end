import Navbar from "./navbar";
import Footer from "./footer";
import Photo from "../../assets/pic1.jpeg";

const Home = ({ goPage }) => {
  return (
    <div className="bg-[#EDDFB7] min-h-screen">
      <Navbar goPage={goPage} />

      <div className="w-full flex justify-center mt-6">
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
          onClick={() => goPage("shop")}
          className="bg-[#D99255] text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90"
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
              className="bg-white p-6 rounded-xl shadow-md text-center font-semibold"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-4">Popular Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className="bg-white h-40 rounded-xl shadow-md flex items-center justify-center"
            >
              <p className="text-gray-500">Image {num}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;