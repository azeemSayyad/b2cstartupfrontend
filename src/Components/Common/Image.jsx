import React, { useEffect, useState } from 'react';
import FetchImageS3 from '../Profile/FetchImageS3';
import { useSelector } from 'react-redux';

const MyComponent = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const imagePath = useSelector(state=>state.user.profilePicture);

  useEffect(() => {
    async function fetchImage() {
      try {
        console.log(imagePath)
        // const imagePath = 'img1.jpeg_2023-10-17T20-27-00.578Z'; // Specify the image path
        const url = await FetchImageS3({ imagePath });
        setImageUrl(url);
        console.log(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }

    fetchImage();
  }, []);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="S3 Image" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default MyComponent;
