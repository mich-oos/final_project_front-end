const Navbar = ({ goPage }) => {
  return (
    <nav className="bg-[#F6F6F6] p-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">Vastly Fashion</h1>

      <div className="flex space-x-10 text-lg">
        <button onClick={() => goPage("home")} className="hover:opacity-60">Home</button>
        <button onClick={() => goPage("shop")} className="hover:opacity-60">Shop</button>
        <button onClick={() => goPage("cart")} className="hover:opacity-60">Cart</button>
        <button onClick={() => goPage("profile")} className="hover:opacity-60">Profile</button>
      </div>
    </nav>
  );
};

export default Navbar; 

