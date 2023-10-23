import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/amazon.png";
import menuIcon from "../../Icons/menuIcon.svg" 
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const isToken = Boolean(useSelector((state) => state.token));
  const dispatch  = useDispatch();

  const handleSignUp = () => {
    navigate("/auth");
  };

  const handleBack = () => {
    setShowMenu(false);
  };

  const registerService = () => {
    navigate("/registerService");
  };

  const logout = ()=>{
    dispatch(setLogout());
    navigate("/auth")
  }

  return (
    <div className="w-full bg-purple-500 h-[60px] relative min-w-[384px]">
      {/* Background Overlay */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={handleBack}
        ></div>
      )}

      <div className="flex items-center justify-between">
        {/* Left container */}
        <div className="flex items-center">
          <div className="py-2">
            <img
              className="w-[100px] ml-2 sm:w-[150px] h-auto object-contain"
              src={logo}
              alt="logo"
            />
          </div>
        </div>

        {/* Right container */}
        <div className="flex items-center">
          <div className="hidden sm:flex space-x-4">
            <div className="text-white text-base sm:text-lg p-2 hover:scale-110 transform duration-300">
              <p>Advertise</p>
            </div>
            <div
              onClick={registerService}
              className="text-white text-base sm:text-lg p-2 hover:scale-110 transform duration-300"
            >
              <p>Provide Service</p>
            </div>
          </div>
          <div
            onClick={isToken?logout:handleSignUp}
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300 ease-in-out ml-4"
          >
            <p className="text-base sm:text-lg">{isToken?"Log out":"SignUp"}</p>
          </div>
          <div
            className={`sm:hidden text-white ml-4`}
            onClick={() => setShowMenu(!showMenu)}
          >
            {/* Custom SVG menu icon */}
            <img src={menuIcon} alt="Menu" className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Mobile menu component */}
      {showMenu && (
        <div className="fixed top-0 right-0 h-full bg-gray-800 w-2/3 z-50">
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
      )}
    </div>
  );
};

export default Navbar;

















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/Images/amazon.png";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false);

//   const handleSignUp = () => {
//     navigate("/auth");
//   };

//   const handleBack = () => {
//     setShowMenu(false);
//   };

//   const registerService = () => {
//     navigate("/registerService");
//   };

//   return (
//     <div className="w-full bg-black p-4 relative">
//       {/* Background Overlay */}
//       {showMenu && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-50"
//           onClick={handleBack}
//         ></div>
//       )}

//       <div className="flex items-center justify-between">
//         {/* Left container */}
//         <div className="flex items-center">
//           <div className="py-2">
//             <img
//               className="w-[100px] sm:w-[150px] h-auto object-contain"
//               src={logo}
//               alt="logo"
//             />
//           </div>
//         </div>

//         {/* Right container */}
//         <div className="flex items-center">
//           <div className="hidden sm:flex space-x-4">
//             <div className="text-white text-base sm:text-lg p-2 hover:scale-110 transform duration-300">
//               <p>Advertise</p>
//             </div>
//             <div
//               onClick={registerService}
//               className="text-white text-base sm:text-lg p-2 hover:scale-110 transform duration-300"
//             >
//               <p>Provide Service</p>
//             </div>
//           </div>
//           <div
//             onClick={handleSignUp}
//             className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300 ease-in-out ml-4"
//           >
//             <p className="text-base sm:text-lg">Sign Up</p>
//           </div>
//           <div
//             className={`sm:hidden text-white ml-4`}
//             onClick={() => setShowMenu(!showMenu)}
//           >
//             {/* Updated hamburger menu icon */}
//             <div className="flex items-center">
//               <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
//                 <div className="w-3 h-3 bg-transparent border-2 border-white rounded-full"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu component */}
//       {showMenu && (
//         <div className="fixed top-0 right-0 h-full bg-gray-800 w-2/3 z-50">
//           <div className="text-white text-base sm:text-lg p-2 hover:scale-110 transform duration-300">
//             <p>Advertise</p>
//           </div>
//           <div className="text-white text-base sm:text-lg p-2 hover:scale-110 transform duration-300">
//             <p>Provide Service</p>
//           </div>
//           {/* back button for sliding menu*/}
//           <div
//             onClick={handleBack}
//             className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-4 rounded cursor-pointer transition duration-300 ease-in-out"
//           >
//             <p className="text-base sm:text-lg p-2">Back</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;







// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/Images/amazon.png";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false);

//   const handleSignUp = () => {
//     navigate("/auth");
//   };

//   const handleBack = () => {
//     setShowMenu(false);
//   };

//   const registerService = () => {
//     navigate("/registerService");
//   };

//   return (
//     <div className="w-full bg-black p-4 flex items-center justify-between">
//       {/* Left container */}
//       <div className="flex items-center">
//         <div className="py-2">
//           <img
//             className="w-[100px] sm:w-[150px] h-auto object-contain"
//             src={logo}
//             alt="logo"
//           />
//         </div>
//       </div>

//       {/* Right container */}
//       <div className="flex items-center">
//         <div className="hidden sm:flex space-x-4">
//           <div className="text-white text-base sm:text-lg p-2 hover:scale-110 transform duration-300">
//             <p>Advertise</p>
//           </div>
//           <div
//             onClick={registerService}
//             className="text-white text-base sm:text-lg p-2 hover:scale-110 transform duration-300"
//           >
//             <p>Provide Service</p>
//           </div>
//         </div>
//         <div
//           onClick={handleSignUp}
//           className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300 ease-in-out ml-4"
//         >
//           <p className="text-base sm:text-lg">Sign Up</p>
//         </div>
//         <div
//           className={`sm:hidden text-white ml-4`}
//           onClick={() => setShowMenu(!showMenu)}
//         >
//           {/* Updated hamburger menu icon */}
//           <div className="flex items-center">
//             <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
//               <div className="w-3 h-3 bg-transparent border-2 border-white rounded-full"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu component */}
//       {showMenu && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end"
//           onClick={handleBack}
//         >
//           <div className="bg-gray-800 w-2/3 h-full flex flex-col p-4">
//             <div className="text-white text-base sm:text-lg p-2 hover:scale-110 transform duration-300">
//               <p>Advertise</p>
//             </div>
//             <div className="text-white text-base sm:text-lg p-2 hover:scale-110 transform duration-300">
//               <p>Provide Service</p>
//             </div>
//             {/* back button for sliding menu*/}
//             <div
//               onClick={handleBack}
//               className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-4 rounded cursor-pointer transition duration-300 ease-in-out"
//             >
//               <p className="text-base sm:text-lg p-2">Back</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;


