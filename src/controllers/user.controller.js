import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudanary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validate user details - not empty
  //check if user already exists - username, email
  //check for images, check for avatar
  //upload them to cloudinary, avatar
  //create user object - create entry in db
  //remove password and refresh token field from response
  //check for user creation 
  //return response



  const {username, email, fullName, password} =  req.body;
  console.log(email, password);

  if(fullName === "" || email === "" || password === "" || username === ""){
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = User.findOne({
    $or: [{username}, {email}]
  })

  if(existedUser){
    throw new ApiError(409, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudanary(avatarLocalPath);
  const coverImage = await uploadOnCloudanary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(500, "Image upload failed");
  }

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    avatar: avatar.url,
    coverImage: coverImage?.url || null,
    email,
    password
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if(!createdUser){
    throw new ApiError(500, "User creation failed");
  }
  
  return res.status(201).json(
    new ApiResponse(201, createdUser, "User created successfully")
  );
});

export { registerUser };