import logo from "../../assets/Images/amazon.png";

const Navbar = () => {
  return (
    <div className="w-full min-w-[384px] h-[60px] max-w-[2400px] bg-stone-900">
      <div className="flex justify-between">
        {/**Left container */}
        <div className="p-4 ">
          <img className="w-[120px] object-cover" src={logo} alt="logo" />
        </div>

        {/**Right container */}
        <div className="flex space-x-4">
          <div>
            <p className="text-white text-2xl p-4">Advertise</p>
          </div>
          <div>
            <p className="text-white text-2xl p-4">Provide Service</p>
          </div>
          <div>
            <p className="text-white text-2xl p-4">signUp</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;