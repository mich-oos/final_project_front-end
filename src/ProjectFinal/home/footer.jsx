const Footer = () => {
  return (
    <footer className="bg-black text-white p-6 mt-auto"> {/* mt-auto memastikan footer di bawah */}
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Vastly Fashion. All rights reserved.</p>
        <div className="mt-2 space-x-4 text-xs">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
          <a href="#" className="hover:text-gray-400">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;