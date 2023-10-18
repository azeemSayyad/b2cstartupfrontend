import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/amazon.png";

const Navbar = () => {
    const navigate = useNavigate();

    const handleSignUp = () =>{
        navigate("/auth")
    }

  return (
    <div className="w-full min-w-[320px] sm:min-w-full h-[60px] max-w-[2400px] bg-blue-900">
      <div className="flex items-center justify-between px-4 sm:px-6">
        {/* Left container */}
        <div className="py-2">
          <img className="w-[100px] sm:w-[150px] object-contain" src={logo} alt="logo" />
        </div>

        {/**Right container */}
        <div className="flex space-x-4">
          <div>
            <p className="text-white text-2xl p-4">Advertise</p>
          </div>
          <div>
            <p className="text-white text-2xl p-4">Provide Service</p>
          </div>
          <div onClick={handleSignUp} className="hover:bg-black">
            <p className="text-white text-2xl p-4">signUp</p>
          </div>
        </div>

        {/* Mobile menu icon (to be added) */}
      </div>
    </div>
  );
};

export default Navbar;
