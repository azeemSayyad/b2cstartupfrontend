import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setProfilePictureURL } from "../../state";

import { CgProfile } from "react-icons/cg";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";

import logo from "../../assets/Images/amazon.png";

import editProfileIcon from "../../Icons/editProfileIcon.svg";
import feedbackIcon from "../../Icons/feedbackIcon.svg";
import saveIcon from "../../Icons/saveIcon.svg";

import FetchImageS3 from "../Profile/FetchImageS3";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import axios from "axios";

const Navbar = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND;

  const imageUrl = useSelector((state) => state.profilePictureURL);
  const isToken = Boolean(useSelector((state) => state.token));

  const [showMenu, setShowMenu] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isFeedback, setIsFeedback] = useState(false);
  const [isFeedbackDone, setIsFeedbackDone] = useState(false);
  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleSignUp = () => {
    navigate("/auth");
  };

  const handleBack = () => {
    setShowMenu(false);
  };

  const registerService = () => {
    navigate("/registerService");
  };

  const logout = () => {
    dispatch(setLogout());
    navigate("/auth");
  };

  const editProfile = async () => {
    setIsProfile(false);
    navigate("/editProfile");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToSaved = () => {
    setIsProfile(false);
    navigate("/saved");
  };

  const handleFeedback = async () => {
    try {
      if (user) {
        const user_id = user._id;
        await axios.post(`${BACKEND_URL}/feedback/${user_id}`, {
          feedback,
        });
        setIsFeedbackDone(true);
      } else {
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchImage() {
      try {
        let imagePath = null;
        if (user) {
          imagePath = user.profilePicture;
        }
        if (imagePath) {
          const url = await FetchImageS3({ imagePath });
          dispatch(setProfilePictureURL(url));
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    fetchImage();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full bg-[#023e7d] h-[60px] relative min-w-[384px]">
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
          <div className="py-2 cursor-pointer" onClick={navigateToHome}>
            <img
              className="w-[100px] ml-2 sm:w-[150px] h-auto object-contain"
              src={logo}
              alt="logo"
            />
          </div>
        </div>

        {/* Right container */}
        <div className="flex items-center">
          <div className="flex space-x-4">
            {/* <div className="hidden sm:flex">
              <div className="text-white text-base sm:text-lg p-2 hover:scale-110 transform duration-300">
                <p>Advertise</p>
              </div>
            </div> */}
            <Button
              onClick={registerService}
              className="text-white text-sm bg-inherit font-semibold hover:font-bold p-2 "
            >
              Provide Service
            </Button>
          </div>
          {!isToken ? (
            <div
              onClick={handleSignUp}
              className="bg-[#979dac] hover:bg-[#7d8597] text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300 ease-in-out mx-4"
            >
              <p className="text-base sm:text-lg">SignUp</p>
            </div>
          ) : (
            <div
              onClick={() => setIsProfile(!isProfile)}
              className="hover:scale-105 duration-200 cursor-pointer mx-4 text-white"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="pic"
                  className="object-cover w-[40px] h-[40px] rounded-[50%]"
                />
              ) : (
                <CgProfile size={"30px"} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu component */}
      {isProfile && (
        <div>
          <div
            onClick={() => setIsProfile(!isProfile)}
            className="fixed top-0 left-0 w-[25%] sm:w-[40%] md:w-[60%] lg:w-[70%] maxi:w-[80%] bg-black h-screen opacity-50 "
          ></div>
          <div className="fixed top-0 right-0 h-full bg-white w-[75%] sm:w-[60%] md:w-[40%] lg:w-[30%] maxi:w-[20%] z-50">
            <div className="flex p-4 justify-between">
              <div className="flex ml-2">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="pic"
                    className="object-cover w-[40px] h-[40px] rounded-[50%]"
                  />
                ) : (
                  <CgProfile size={"30px"} />
                )}
                <p className="text-xl ml-3 text-gray-800">Sayyad Azeem</p>
              </div>

              <AiFillCloseCircle
                onClick={() => setIsProfile(!isProfile)}
                className="bg-white cursor-pointer"
                size={"30px"}
              />
            </div>
            <hr className="h-[0.6px] py-1" />

            <div
              onClick={editProfile}
              className=" flex  text-gray-800 cursor-pointer px-5 py-3 hover:bg-gray-300  text-xl duration-200"
            >
              <img src={editProfileIcon} className="w-[30px]" alt="icon" />
              <p className="ml-4">Edit Profile</p>
            </div>
            <div
              className=" flex  text-gray-800 cursor-pointer px-5 py-3 hover:bg-gray-300  text-xl duration-200"
              onClick={navigateToSaved}
            >
              <img className="w-[30px]" src={saveIcon} alt="icon" />
              <p className="ml-4">Saved</p>
            </div>

            <hr className="h-[0.6px] py-1" />

            <div
              onClick={() => setIsFeedback(true)}
              className=" flex  text-gray-800 cursor-pointer px-5 py-3 hover:bg-gray-300  text-xl duration-200"
            >
              <img className="w-[30px]" src={feedbackIcon} alt="icon" />
              <p className="ml-4">Feedback</p>
            </div>
            <div
              onClick={logout}
              className=" flex  text-gray-800 cursor-pointer px-5 py-3 hover:bg-gray-300  text-xl duration-200"
            >
              <AiOutlineLogout
                className="w-[30px]"
                color="black"
                size={"30px"}
              />
              <p className="ml-4">Logout</p>
            </div>
          </div>
          <Dialog
            open={isFeedback}
            handler={() => setIsFeedback(null)}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <DialogHeader>Your Feedback Matters a lot</DialogHeader>
            <DialogBody>
              {isFeedbackDone ? (
                <div className="bg-green-400 rounded-lg text-white">
                  Thanks for providing your valuable Feedback :)
                </div>
              ) : (
                <Input
                  label="Feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              )}
            </DialogBody>
            <DialogFooter>
              {!isFeedbackDone && (
                <Button
                  variant="text"
                  color="white"
                  onClick={() => setIsFeedback(false)}
                  className="mr-1 text-gray-800"
                >
                  <span>Cancel</span>
                </Button>
              )}
              {isFeedbackDone ? (
                <Button
                  variant="gradient"
                  color="red"
                  onClick={() => setIsFeedback(false)}
                >
                  <span>OK</span>
                </Button>
              ) : (
                <Button
                  variant="gradient"
                  color="red"
                  onClick={() => handleFeedback()}
                >
                  <span>Send</span>
                </Button>
              )}
            </DialogFooter>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Navbar;
