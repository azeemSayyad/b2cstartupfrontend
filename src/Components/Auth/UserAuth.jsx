import { useEffect, useState } from "react";
import microsoft from "../../assets/Images/microsoft.jpg";

const UserAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    console.log(formData);
    
    formData.name = '';
    formData.contact = '';
    formData.password = '';
  };

  const handleRegister = async () => {
    
    formData.name = '';
    formData.contact = '';
    formData.password = '';
  };

  const handleForgot = async () => {};

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) await handleRegister();
    else if (isForgot) await handleForgot();
    else await handleLogin();
  };

  useEffect(()=>{
    formData.name = '';
    formData.contact = '';
    formData.password = '';
  },[isSignUp])

  return (
    <div className=" bg-purple-700 w-full md:pt-[100px] pt-[50px] pb-5 min-w-[384px] max-w-[2400px] min-h-screen">
      <div className="m-auto md:w-[50%] w-[98%] md:rounded-[30px] bg-white  border space-y-3 p-4 border-black justify-center items-center  rounded-[15px] min-h-[50%]">
        <div className="flex space-y-3 flex-col justify-center items-center">
          <img
            src={microsoft}
            className=" h-[60px] object-cover object-center mb-[-10px]"
            alt="logo"
          />
          <p className="block font-bold text-3xl text-center text-black">
          {isSignUp ? "Register Account" : "Login to your account"}
          </p>
          <p className="text-center">
            {isSignUp
              ? "Already have an account?"
              : "Don't have an account yet?"}
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-1 text-purple-800 hover:text-purple-950 hover:cursor-pointer text-lg"
            >
              {isSignUp ? "SignIn" : "signUp"}
            </span>
          </p>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="md:w-[70%] w-[90%] m-auto space-y-3">
            <div className="flex flex-col justify-center items-center ">
              {isSignUp && (
                <input
                  placeholder="Your Name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  className="p-2 rounded-lg border w-full border-black my-3"
                />
              )}
              <input
                placeholder="Phone Number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="p-2 rounded-lg border w-full border-black my-3"
              />
              <input
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="p-2 rounded-lg border w-full border-black my-3"
              />
            </div>

            {!isSignUp && (
              <div className="flex justify-between">
                <div className="space-x-2">
                  <input type="checkbox" name="check" />
                  <label for="check">Remember me</label>
                </div>
                <p
                  onClick={() => setIsForgot(!true)}
                  className="text-purple-800 hover:text-purple-950 hover:cursor-pointer"
                >
                  Forgot password?
                </p>
              </div>
            )}
            <div className="pb-4 ">
              <input
                type="submit"
                className="bg-purple-800 hover:bg-purple-900 w-full p-2 text-center text-white text-lg rounded-md hover:cursor-pointer"
                value={isSignUp ? "Register" : "Login"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAuth;
