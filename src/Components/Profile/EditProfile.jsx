import { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setProfilePictureURL, setUser } from "../../state";

import axios from "axios";
import FetchImageS3 from "./FetchImageS3";
import { IoAddOutline } from "react-icons/io5";

import profileIconImage from "../../assets/Images/profileIconImage.png";

import { Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import FieldCard from "./FieldCard";

import { motion } from "framer-motion";

const EditProfile = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND;

  const user = useSelector((state) => state.user);
  const imageUrl = useSelector((state) => state.profilePictureURL);
  const userServiceList = useSelector((state) => state.userServiceList);

  const fileInputRef = useRef(null);
  const [updatedName, setUpdatedName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const updateProfilePicture = async (img) => {
    try {
      dispatch(setIsLoading());
      const user_id = user._id;
      const formData = new FormData();
      formData.append("image", img);

      const response = await axios.patch(
        `${BACKEND_URL}/user/updatePicture/${user_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      const imagePath = response.data.imagePath;
      console.log(imagePath, "start");
      const url = await FetchImageS3({ imagePath });
      console.log("end");
      dispatch(setProfilePictureURL(url));
      dispatch(setUser({ updatedUser: response.data.updatedUser }));
      dispatch(setIsLoading());
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      updateProfilePicture(selectedFile);
    }
  };

  const updateName = async () => {
    dispatch(setIsLoading());
    try {
      const user_id = user._id;
      const response = await axios.patch(
        `${BACKEND_URL}/user/updateName/${user_id}`,
        { updatedName: updatedName }
      );
      console.log(response.data);
      dispatch(setUser({ updatedUser: response.data.updatedUser }));
      dispatch(setIsLoading());
      setIsEdit(!isEdit);
    } catch (error) {
      dispatch(setIsLoading());
      console.log(error);
    }
  };

  const navigateToProvideService = () => {
    navigate("/registerService");
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100%",
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

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ type: "tween" }}
      className=" md:flex maxi:m-auto max-w-[1500px] min-w-[374px] p-4 gap-1  "
    >
      <div className="flex flex-col md:w-[25%] pt-5 md:h-screen  border border-black  space-y-4 bg-white rounded-lg">
        <div className="flex justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              className="cursor-pointer hover:opacity-80 object-cover rounded-[50%] md:w-[150px] w-[200px] h-[200px] md:h-[150px] "
              alt="pic"
              onClick={openFilePicker}
            />
          ) : (
            <img
              src={profileIconImage}
              className="cursor-pointer hover:opacity-80 object-cover rounded-[50%] md:w-[150px] w-[200px] h-[200px] md:h-[150px] "
              alt="pic"
              onClick={openFilePicker}
            />
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <div className="space-y-3 p-3">
          {!isEdit && (
            <div className="space-y-3">
              <p className="md:text-2xl lg:text-3xl text-3xl text-gray-800 font-semibold text-center ">
                {user && user.name}
              </p>
              <div
                onClick={() => setIsEdit(!isEdit)}
                className="border bg-gray-200 p-2 cursor-pointer hover:bg-gray-300 hover:text-gray-900 text-lg text-gray-800 text-center"
              >
                Edit Name
              </div>
            </div>
          )}
          {isEdit && (
            <div className="space-y-4">
              <Input
                label="update name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />

              <button
                onClick={() => updateName()}
                className="border w-full rounded-lg bg-gray-200 p-2 cursor-pointer hover:bg-gray-300 hover:text-gray-900 text-lg text-gray-800 text-center"
              >
                Update Name
              </button>
            </div>
          )}
        </div>
      </div>

      <div className=" flex flex-col md:w-[75%] md:min-h-screen px-3 border border-black mt-1 md:mt-0 rounded-lg bg-white space-y-4 py-5">
        <p className="text-3xl text-gray-700 font-semibold">Manage Services</p>
        {userServiceList && userServiceList.length > 0 ? (
          <div className="grid grid-cols-1 lg1:grid-cols-2 p-1 md:p-4 gap-2">
            {userServiceList.map(
              ({ _id, experience, location, profession, about, gallery }) => (
                <FieldCard
                  key={_id}
                  _id={_id}
                  experience={experience}
                  location={location}
                  profession={profession}
                  about={about}
                  gallery={gallery}
                />
              )
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center mb-3">
            <div
              onClick={navigateToProvideService}
              className="flex gap-3 rounded-lg bg-purple-500 hover:scale-105 duration-300 cursor-pointer hover:bg-purple-800 p-3 text-white"
            >
              <IoAddOutline size={"30px"} color="white" />
              <p className="text-xl">Provide Service</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EditProfile;

// {isMenu && (
//   <div className={`absolute   z-40 bg-white rounded-lg w-[120px] mt-2 `}>
//     <p
//       onClick={() => setIsDelete(true)}
//       className="py-1 px-3 hover:bg-red-600 text-center text-xl text-gray-800 rounded-lg"
//     >
//       Delete
//     </p>
//   </div>
// )}

//  Header  }
// <div className="flex justify-between px-4 py-1"> */}
//   Views  */}
//   <div className="flex space-x-3">
//     <AiOutlineEye size="30px" />
//     <p className="mt-1">40 views</p>
//   </div>
//   <div onClick={(e) => handleMenu(e)} className=" cursor-pointer">
//     <BsThreeDotsVertical size={"30px"} />
//   </div>
// </div>
// <hr /> */
