import { useState, useEffect } from "react";

import profileIconImage from "../../assets/Images/profileIconImage.png";
import FetchImageS3 from "../Profile/FetchImageS3";

import { GoClockFill } from "react-icons/go";
import { IoLocation } from "react-icons/io5";

const ServiceProviderCard = ({
  name,
  contact,
  about,
  experience,
  profession,
  profilePicture,
  location,
  gallery,
}) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        if (profilePicture) {
          const imagePath = profilePicture;
          console.log(imagePath);
          // const imagePath = 'img1.jpeg_2023-10-17T20-27-00.578Z'; // Specify the image path
          const url = await FetchImageS3({ imagePath });
          setImageUrl(url);
          console.log(url);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    fetchImage();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col m-2 px-2 py-4 border border-black space-y-2 rounded-lg bg-white ">
      <div className="flex flex-col items-center text-black">
        <div className="w-[150px] h-[150px] border border-red-700 rounded-[50%]">
          {imageUrl ? (
            <img
              src={imageUrl}
              className="object-cover w-full h-full rounded-[50%] "
              alt="pic"
            />
          ) : (
            <img
              src={profileIconImage}
              className="object-cover w-full h-full rounded-[50%] "
              alt="pic"
            />
          )}
        </div>
        <div className=" text-center space-y-2 items-center justify-center">
          <p className=" text-2xl font-mySans">{name}</p>
          
          <div className="flex space-x-3 ">
            <IoLocation fontSize={"30px"}/>
            <p className=" text-2xl">{location}</p>
          </div>

          <div className="flex space-x-3">
            <GoClockFill fontSize={"25px"}/>
            <p className=" text-2xl">{experience}</p>
          </div>
        </div>
        
      </div>

      <div className="flex gap-2 flex-wrap sm:flex-nowrap   p-2 overflow-scroll">
        {profession &&
          profession.map((field, i) => (
            <div
              key={i}
              className=" px-2 py-1 border-purple-400 text-center rounded-lg bg-orange-600 text-white"
            >
              {field}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ServiceProviderCard;
