import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudanary = async (file) => {
  try {
    if (!file) return null;
    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    console.log("file is uploaded successfully on cloudinary",response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(file.path);  //remove the locally saved temporary file as the upload operation got failed 
    return null;
  }
};

export { uploadOnCloudanary };