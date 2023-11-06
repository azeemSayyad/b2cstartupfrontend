import { useState,useEffect } from "react";

import { Button, Typography } from "@material-tailwind/react";
import profileIconImage from '../../assets/Images/profileIconImage.png';
import FetchImageS3 from "../Profile/FetchImageS3";

const ServiceProviderCard = ({name,contact,about,experience,profession,profilePicture,location,gallery}) => {
  const [imageUrl,setImageUrl] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        if(profilePicture){
          const imagePath = profilePicture;
          console.log(imagePath)
          // const imagePath = 'img1.jpeg_2023-10-17T20-27-00.578Z'; // Specify the image path
          const url = await FetchImageS3({ imagePath });
          setImageUrl(url);
          console.log(url);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }

    fetchImage();
    // eslint-disable-next-line
  }, []); 

  return (
    <div className="flex flex-col m-2 px-2 py-4 border border-black space-y-2 rounded-lg bg-white ">
      <div className="flex flex-col items-center text-black">
        <div className="w-[150px] h-[150px] border border-red-700 rounded-[50%]">
          {imageUrl ?(
          <img
            src={imageUrl}
            className="object-cover w-full h-full rounded-[50%] "
            alt="pic"
          />
        ):(
          <img
            src={profileIconImage}
            className="object-cover w-full h-full rounded-[50%] "
            alt="pic"
          />
        )}
        </div>
        <div className=" text-center space-y-2">
          <Typography className=" text-2xl font-mySans">
            {name}
          </Typography>
          <Typography className=" text-xl">{location}</Typography>
          <Typography className=" text-2xl">Experience: {experience}</Typography>
        </div>
        <div className="flex m-auto space-x-4 mt-3">
          <Button>{contact}</Button>
          <Button>Message</Button>
        </div>
      </div>
      <hr className="bg-purple-600 h-[1px] w-full" />

      <div className="flex gap-2 p-2 overflow-scroll">
      {profession && profession.map((field,i)=>(
          <div key={i} className=" px-2 py-1 border-purple-400 text-center rounded-lg bg-orange-600 text-white">{field}</div>
      ))}
      </div>
    </div>
  );
};

export default ServiceProviderCard;
