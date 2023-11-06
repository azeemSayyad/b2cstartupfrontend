import microsoft from "../../assets/Images/microsoft.jpg";

import { CgSpinner } from "react-icons/cg";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";

import { Input } from "@material-tailwind/react";

const BASE_URL = "http://localhost:4000";

const UserAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        contact: formData.contact,
        password: formData.password,
      });
      
      dispatch(setLogin(response.data));
      setErrorMessage(null);
      
      setIsLoading(false);

      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
    resetForm();
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      const resp = await axios.post(`${BASE_URL}/auth/userRegistration`, {
        name: formData.name,
        contact: formData.contact,
        password: formData.password,
      });
      console.log(resp);
      setIsLoading(false);
      setIsSignUp(!isSignUp);
      setErrorMessage(null);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMessage(error.response.data.message);
    }
    resetForm();
  };

  const handleForgot = async () => {
    try {
      setIsLoading(true);
      const contact = formData.contact;
      const response = await axios.patch(
        `${BASE_URL}/auth/resetPassword/${contact}`,
        {
          newPassword: formData.password,
        }
      );
      console.log(response);
      setIsLoading(false);
      setIsForgot(false);
      resetForm();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      resetForm();
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) await handleRegister();
    else if (isForgot) await handleForgot();
    else await handleLogin();
  };

  const resetForm = () => {
    formData.name = "";
    formData.contact = "";
    formData.password = "";
  };

  const handleIsSignUp = () => {
    setErrorMessage(null);
    setIsSignUp(!isSignUp);
    setIsLoading(false)
    resetForm();
  };

  return (
    <div className=" bg-[#023e7d] w-full md:pt-[100px] pt-[50px] pb-5 min-w-[384px] max-w-[2400px] min-h-screen">
      <div className="m-auto lg:w-[50%] sm:w-[80%] w-[98%] md:rounded-[30px] bg-white  border space-y-3 p-4 border-black justify-center items-center  rounded-[15px] min-h-[50%]">
        <div className="flex space-y-3 flex-col justify-center items-center">
          <img
            src={microsoft}
            className=" h-[60px] object-cover object-center mb-[-10px]"
            alt="logo"
          />
          <p className="block font-bold text-3xl text-center text-black">
            {isSignUp
              ? "Unlock services with a quick registration"
              : isForgot
              ? "Change Your Password"
              : "Access services right from home – log in now!"}
          </p>

          {!isForgot && (
            <p className="text-center">
              {isSignUp
                ? "Already have an account?"
                : "Don't have an account yet?"}
              <span
                onClick={handleIsSignUp}
                className="ml-1 text-purple-800 hover:text-purple-950 hover:cursor-pointer text-lg"
              >
                {isSignUp ? "SignIn" : "signUp"}
              </span>
            </p>
          )}
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="md:w-[70%] w-[90%] m-auto space-y-3">
            <div className="flex flex-col justify-center items-center space-y-4">
              {errorMessage && (
                <div className="border border-red-900 bg-red-100 w-full p-2 rounded-lg">
                  {errorMessage}
                </div>
              )}
              {isLoading && (
                <div className=" animate-spin">
                  <CgSpinner size={"30px"} />
                </div>
              )}
              {isSignUp && (
                <Input
                  label="name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
              )}
              <Input
                label="Phone Number"
                name="contact"
                onChange={handleChange}
                value={formData.contact}
              />
              <Input
                label={isForgot ? "New Password" : "Password"}
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            {!isSignUp && !isForgot && (
              <div className="flex justify-between">
                <div className="space-x-2">
                  <input type="checkbox" name="check" />
                  <label for="check">Remember me</label>
                </div>
                <p
                  onClick={() => setIsForgot(!isForgot)}
                  className="text-purple-800 hover:text-purple-950 hover:cursor-pointer"
                >
                  Forgot password?
                </p>
              </div>
            )}
            <div className="pb-4 ">
              <input
                type="submit"
                className="bg-[#023e7d] hover:bg-[#002855] w-full p-2 text-center text-white text-lg rounded-md hover:cursor-pointer"
                value={
                  isSignUp ? "Register" : isForgot ? "Reset Password" : "login"
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAuth;
