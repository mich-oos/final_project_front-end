import React from "react";
import Header from "./components/header/header";
import Home from "./components/home/Home";
import Footer from "./components/footer/footer";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-6 bg-yellow-300 p-4 rounded">
        App.js
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <Header title="Header" />
        <Home title="Home" />
        <Footer title="Footer" />
      </div>
    </div>
  );
};

export default App;
