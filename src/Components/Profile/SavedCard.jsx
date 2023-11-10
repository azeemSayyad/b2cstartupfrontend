import { useDispatch, useSelector } from "react-redux";
import FetchImageS3 from "./FetchImageS3";

import { Carousel } from "@material-tailwind/react";
import { BiSolidPhoneCall } from "react-icons/bi";

import profileIconImage from "../../assets/Images/profileIconImage.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { setIsLoading, setUser } from "../../state";

const SavedCard = ({
  name,
  experience,
  location,
  about,
  gallery,
  contact,
  profession,
  profilePicture,
  _id,
}) => {
  
const BACKEND_URL = process.env.REACT_APP_BACKEND;

  const [imageUrl, setImageUrl] = useState(null);
  const [galleryUrls, setGalleryUrls] = useState(null);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const removeFromSave = async () => {
    dispatch(setIsLoading());
    try {
      if (user) {
        const user_id = user._id;

        const response = await axios.patch(
          `${BACKEND_URL}/user/removeFromSave/${user_id}`,
          {service_id:_id}
        );
        console.log(response.data);
        dispatch(setUser(response.data));
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(setIsLoading());
  };

  useEffect(() => {
    async function fetchImage() {
      if (profilePicture) {
        const imagePath = profilePicture;
        const url = await FetchImageS3({ imagePath });
        setImageUrl(url);
      }
      if (gallery) {
        const urls = [];
        for (let imagePath of gallery) {
          const url = await FetchImageS3({ imagePath });
          urls.push(url);
        }
        setGalleryUrls(urls);
      }
    }
    fetchImage();
    // eslint-disable-next-line
  }, []); 

  return (
    <div className="md:flex rounded-lg p-2 bg-white w-full">
      <div className="flex flex-col p-2  w-full">
        <div className="flex flex-col md:flex-row justify-center items-center  rounded-sm">
          {/* Image  */}
          <div className="md:w-[50%] flex flex-col justify-center items-center space-y-1  rounded-sm">
            {imageUrl ? (
              <img
                src={imageUrl}
                className="cursor-pointer hover:opacity-80 object-cover rounded-[50%] md:w-[150px] w-[200px] h-[200px] md:h-[150px] "
                alt="pic"
              />
            ) : (
              <img
                src={profileIconImage}
                className="cursor-pointer hover:opacity-80 object-cover rounded-[50%] md:w-[150px] w-[200px] h-[200px] md:h-[150px] "
                alt="pic"
              />
            )}
            <p className="text-2xl text-gray-800 font-semibold">{name}</p>
          </div>
          {/*  */}
          <div className="p-3 md:w-[50%] text-gray-700 text-xl rounded-sm  ">
            <p>
              Experience:{" "}
              <span className=" font-bold text-[18px] text-gray-900 ml-2">
                {experience}
              </span>
            </p>
            <p>
              Location:{" "}
              <span className=" font-bold text-gray-900 ml-2">{location}</span>
            </p>
            <div className="flex flex-col justify-center space-y-3">
              <div className="text-center text-xl">Services</div>
              <div className="flex flex-wrap gap-2">
                {profession &&
                  profession.map((field, i) => (
                    <div
                      className="px-2  bg-[#023e7d] text-center py-1  font-bold rounded-sm text-white  "
                      key={i}
                    >
                      {field}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="  p-2 space-y-3">
          <div className="">
            About: <span>{about}</span>
          </div>
          {/* Gallery Carousel */}
          {gallery.length !== 0 && (
            <div className="h-[200px] md:w-[50%] md:m-auto">
              <Carousel className="rounded-xl">
                {galleryUrls &&
                  galleryUrls.map((url, i) => (
                    <img
                      key={i}
                      className="object-cover w-full h-full"
                      src={url}
                      alt="...."
                    />
                  ))}
              </Carousel>
            </div>
          )}
          {/* Contact button  */}
          <div className=" flex p-1 space-x-3 justify-center bg-green-400 text-white hover:bg-green-500 hover:font-semibold w-full  rounded-lg">
            <BiSolidPhoneCall size={"25px"} />
            <a href={`tel:${contact}`}>Call</a>
          </div>
          <div
            onClick={removeFromSave}
            className="flex justify-center p-1 cursor-pointer text-center bg-red-400 text-white hover:bg-red-500 hover:font-semibold w-full  rounded-lg"
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedCard;
