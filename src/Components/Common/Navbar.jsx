import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setProfilePictureURL } from "../../state";

import { CgProfile } from "react-icons/cg";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { SiHelpscout } from "react-icons/si";
import { IoIosArrowBack } from "react-icons/io";

import logo from "../../assets/Images/company_logo.png";

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
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { motion } from "framer-motion";

const Navbar = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND;

  const imageUrl = useSelector((state) => state.profilePictureURL);
  const isToken = Boolean(useSelector((state) => state.token));

  const [showMenu, setShowMenu] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isFeedback, setIsFeedback] = useState(false);
  const [isFeedbackDone, setIsFeedbackDone] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [suggestedFields, setSuggestedFields] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

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
    setIsProfile(false);
    navigate("/");
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

  const handleSearchTerm = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    const newSuggestions = fields.filter(({ field }) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestedFields(newSuggestions);
  };

  const navigateToCategory = (service) => {
    setIsSearch(false);
    setSearchTerm("");
    setSuggestedFields([])
    navigate(`/category/${service}`);
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

  const pageVariants = {
    initial: {
      opacity: 0,
      x: "200%",
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
    },
  };

  const fields = [
    {
      field: "civil_engineer",
      id: 1,
    },
    {
      field: "mation",
      id: 2,
    },
    {
      field: "electrician",
      id: 3,
    },
    {
      field: "painting",
      id: 4,
    },
    {
      field: "tiles",
      id: 5,
    },
    {
      field: "ceiling",
      id: 6,
    },
    {
      field: "carpenter",
      id: 7,
    },
    {
      field: "plumber",
      id: 8,
    },
    {
      field: "iron_work",
      id: 9,
    },
    {
      field: "centring",
      id: 10,
    },
    {
      field: "steel_railing",
      id: 11,
    },
    {
      field: "cupboard",
      id: 12,
    },
    {
      field: "welder",
      id: 13,
    },
    {
      field: "chipping",
      id: 14,
    },
    {
      field: "ground_diggers",
      id: 15,
    },
  ];

  return (
    <div className="flex flex-col bg-[#023e7d] min-w-[374px]">
      {/* navbar main  */}
      <div className="w-full  h-[55px]  relative ">
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
                className="w-[140px] ml-2  h-auto object-contain"
                src={logo}
                alt="logo"
              />
            </div>
          </div>

          {/* Middle container  */}
          <div className="hidden md:flex">
            <div className="mx-5 maxi:mx-20 flex lg:w-[30rem] maxi:w-[50rem] pb-1  relative">
              {/* Set a fixed width on the parent */}
              <input
                placeholder="search..."
                value={searchTerm}
                onChange={handleSearchTerm}
                className="px-2 w-full rounded-l-sm border-r-white"
              />
              {suggestedFields.length > 0 && (
                <div
                  className="absolute  z-10 mt-9 bg-white border rounded w-full"
                >
                  {suggestedFields.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => navigateToCategory(option.field)}
                      className="px-4 py-2  cursor-pointer hover:bg-[#023e7d]"
                    >
                      {option.field}
                    </div>
                  ))}
                </div>
              )}
              <AiOutlineSearch
                className="h-9 rounded-r-sm bg-white border-l-white w-12 cursor-pointer"
                size={"25px"}
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
                className="hidden sm:block text-white text-sm bg-inherit font-semibold hover:font-bold p-2 "
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
            {/**blur area */}
            <div
              onClick={() => setIsProfile(!isProfile)}
              // className="fixed top-0 left-0 w-[25%] sm:w-[40%] md:w-[60%] lg:w-[70%] maxi:w-[80%] bg-black h-screen opacity-50 z-50 "
              className="fixed top-0 left-0 w-full   bg-black h-screen opacity-50 z-50 "
            ></div>
            {/**side bar */}
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ type: "tween" }}
              className="fixed top-0 right-0 h-full bg-white w-[75%] sm:w-[60%] md:w-[40%] lg:w-[30%] maxi:w-[20%] z-50 "
            >
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
                  <p className="text-xl ml-3 text-gray-800 mt-2 font-semibold">
                    {user.name}
                  </p>
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
                className=" flex sm:hidden text-gray-800 cursor-pointer px-5 py-3 hover:bg-gray-300  text-xl duration-200"
                onClick={registerService}
              >
                <SiHelpscout className="w-[30px]" color="black" size={"25px"} />
                <p className="ml-4">Provide Service</p>
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
                <img className="w-[38px]" src={feedbackIcon} alt="icon" />
                <p className="ml-4 mt-2">Feedback</p>
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
            </motion.div>
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
                  <Textarea
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

      {/* navbar 2 */}
      <div className="flex  md:hidden pb-1 w-full h-10 ">
        <div onClick={() => setIsSearch(true)} className="w-full flex mx-2 ">
          <input
            placeholder="search..."
            className=" px-2 w-[95%] focus:border-none rounded-l-sm border border-none "
          />
          <AiOutlineSearch
            className="h-9  rounded-r-sm bg-white border-l-white w-12 cursor-pointer"
            size={"27px"}
          />
        </div>
      </div>

      {isSearch && (
        <div className="flex flex-col fixed left-0 w-full top-0  z-40 h-screen bg-[#023e7d] px-2">
          <div className="flex">
            <div onClick={() => setIsSearch(false)}>
              <IoIosArrowBack
                size={"30px"}
                color={"white"}
                className="cursor-pointer mt-3 mr-2 "
              />
            </div>
            <div className="flex mt-2 w-full">
              <input
                placeholder="search..."
                value={searchTerm}
                onChange={handleSearchTerm}
                className="h-8 rounded-lg pl-4 w-[100%] focus:border-none border border-none"
              />
            </div>
          </div>
          <div>
            {suggestedFields.length > 0 && (
              <div className="  z-10  bg-white border rounded w-full ">
                {suggestedFields.map((option, index) => (
                  <div
                    key={index}
                    className="flex space-x-3 px-3"
                    onClick={() => navigateToCategory(option.field)}
                  >
                    <AiOutlineSearch size={"25px"} className="mt-2" />

                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      {option.field}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
