import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/amazon.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleSignUp = () => {
    navigate("/auth");
  };

  const handleBack = () => {
    setShowMenu(false);
  };

  return (
    <div className="w-full bg-black p-4">
      <div className="flex items-center justify-between px-4 sm:px-6">
        <div className="py-2">
          <img
            className="w-[100px] sm:w-[150px] h-auto object-contain"
            src={logo}
            alt="logo"
          />
        </div>

        {/* Right container */}
        <div className={`ml-auto sm:mr-0 sm:ml-auto`}>
          <div className="hidden sm:flex space-x-4">
            <div className="text-white text-base sm:text-lg p-2 hover:scale-110 transform duration-300">
              <p>Advertise</p>
            </div>
            <div className="text-white text-base sm:text-lg p-2 hover:scale-110 transform duration-300">
              <p>Provide Service</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div
              onClick={handleSignUp}
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300 ease-in-out"
            >
              <p className="text-base sm:text-lg p-2">Sign Up</p>
            </div>
            <div
              className={`sm:hidden text-white`}
              onClick={() => setShowMenu(!showMenu)}
            >
              {/* Updated hamburger menu icon */}
              <div className="flex items-center">
                <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-transparent border-2 border-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu component */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end"
          onClick={handleBack}
        >
          <div className="bg-gray-800 w-2/3 h-full flex flex-col p-4">
            <div className="text-white text-base sm:text-lg p-2 hover:scale-110 transform duration-300">
              <p>Advertise</p>
            </div>
            <div className="text-white text-base sm:text-lg p-2 hover:scale-110 transform duration-300">
              <p>Provide Service</p>
            </div>
            {/* back button for sliding menu*/}
            <div
              onClick={handleBack}
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-4 rounded cursor-pointer transition duration-300 ease-in-out"
            >
              <p className="text-base sm:text-lg p-2">Back</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
