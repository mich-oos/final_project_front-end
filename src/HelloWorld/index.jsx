import { useState } from "react";
import HelloMoon from "../HelloMoon";
//Tipe data props adalah Object

const HelloWorld = ({ text, handleClick }) => {
  const [welcome, setWelcome] = useState("Welcome");
  const handleClickChild = () => {
    setWelcome("Selamat Datang");
  };
  return (
    <>
      <div className="text-[25px] bg-red-500 m-10 p-10 font-serif">
        {text}
        {welcome}
        <HelloMoon />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
        >
          Click Me
        </button>
        <button
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClickChild}
        >
          Click Me
        </button>
      </div>
    </>
  );
};

export default HelloWorld;