import AWS from "aws-sdk";

const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
const SECRETE_ACCESS_KEY = process.env.REACT_APP_SECRETE_ACCESS_KEY;
const BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;


AWS.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRETE_ACCESS_KEY,
});

const s3 = new AWS.S3();

const FetchImageS3 = async ({ imagePath }) => {
  try {
    
    if (imagePath) {

      const params = {
        Bucket: BUCKET_NAME,
        Key: imagePath,
      };

      const data = await s3.getObject(params).promise();

      // Use the data to display or manipulate the image
      const imageUrl = URL.createObjectURL(new Blob([data.Body]));
      return imageUrl;
    }
  } catch (error) {
    console.error("Error fetching image from S3:", error);
  }
};

export default FetchImageS3;


// import AWS from "aws-sdk";
// import ExifParser from "exif-parser";

// const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
// const SECRETE_ACCESS_KEY = process.env.REACT_APP_SECRETE_ACCESS_KEY;
// const BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;

// AWS.config.update({
  // accessKeyId: ACCESS_KEY_ID,
  // secretAccessKey: SECRETE_ACCESS_KEY,
// });

// const s3 = new AWS.S3();

// const FetchImageS3 = async ({ imagePath }) => {
//   try {
//     if (imagePath) {
//       const params = {
//         Bucket: BUCKET_NAME,
//         Key: imagePath,
//       };

//       const data = await s3.getObject(params).promise();

//       // Extract EXIF data
//       const exifParser = ExifParser.create(data.Body);
//       const exifData = exifParser.parse();

//       // Determine rotation based on EXIF orientation
//       const rotation = getRotationFromExif(exifData);

//       // Use the data to display or manipulate the image
//       const imageUrl = await processAndRotateImage(data.Body, rotation);

//       return imageUrl;
//     }
//   } catch (error) {
//     console.error("Error fetching image from S3:", error);
//   }
// };

// // Function to extract the rotation value from EXIF data
// function getRotationFromExif(exifData) {
//   const orientation = exifData.tags.Orientation;
//   switch (orientation) {
//     case 3:
//       return 180;
//     case 6:
//       return 90;
//     case 8:
//       return -90;
//     default:
//       return 0;
//   }
// }

// // Function to process and rotate the image
// async function processAndRotateImage(imageData, rotation) {
//   const blob = new Blob([imageData], { type: "image/jpeg" });
//   const imageUrl = URL.createObjectURL(blob);
//   if (rotation !== 0) {
//     // Rotate the image using a canvas
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     // Set the canvas dimensions based on image size
//     canvas.width = blob.width;
//     canvas.height = blob.height;

//     // Rotate the image
//     ctx.translate(blob.width / 2, blob.height / 2);
//     ctx.rotate((rotation * Math.PI) / 180);
//     ctx.drawImage(imageUrl, -blob.width / 2, -blob.height / 2);

//     // Create a new blob from the canvas
//     const rotatedBlob = await new Promise((resolve) => {
//       canvas.toBlob(resolve, "image/jpeg");
//     });

//     // Return the URL of the rotated image
//     return URL.createObjectURL(rotatedBlob);
//   }

//   return imageUrl;
// }

// export default FetchImageS3;
