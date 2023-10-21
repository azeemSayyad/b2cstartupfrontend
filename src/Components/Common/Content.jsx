import React from "react";
import Contents from './Contents'

const Content = () => {
  const backgroundImageUrl =
    "https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div
        className="bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})`, minHeight: "50vh" }}
      >
        <div className="w-full sm:w-auto sm:absolute" style={{ left: "2rem" }}>
          <input
            className="w-64 sm:w-96 px-4 py-3 rounded-l-md border-2 border-r-0 border-gray-300 focus:outline-none"
            type="text"
            placeholder="Search..."
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-r-md">
            Search
          </button>
        </div>
      </div>
      <Contents/>
      
    </div>
  );
};

export default Content; 

