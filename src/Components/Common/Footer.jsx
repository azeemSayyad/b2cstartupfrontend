import React from "react";

const Footer = () => {
  const contactInfo = {
    phoneNumber: "+1234567890",
    email: "contact@example.com",
  };

  return (
    <footer className="bg-black p-8 min-w-[384px]">
      <div className="max-w-7xl mx-auto text-center text-white">
        <p className="text-lg sm:text-xl">Made with ❤️ by a bunch of friends</p>
        <div className="mt-4 flex flex-col items-center">
          <p className="text-base sm:text-lg text-gray-600">Contact Us</p>
          <p className="mt-2 text-gray-400">Phone: {contactInfo.phoneNumber}</p>
          <p className="text-gray-400">Email: {contactInfo.email}</p>
        </div>
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 mt-4 rounded transition duration-300 ease-in-out">
          Advertise
        </button>
      </div>
    </footer>
  );
};

export default Footer;
