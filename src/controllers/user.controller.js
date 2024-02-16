import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asynHandlers.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudenry.js';}
import { ApiResponse } from '../utils/ApiRespones.js';}

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  console.log('email', email);
  if ([fullName, email, username, password].some((field) => field?.trim() === '')) {
    throw new ApiError(400, 'All fields is required');
  }
  const existedUser = User.findOne({
    // check user availablity
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, 'User with email or username already exists');
  }
  const avataLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avataLocalPath) {
    throw new ApiError(400, 'Avatar file is required');
  }
 const avatar= await uploadOnCloudinary(avataLocalPath)
 const coverImage= await uploadOnCloudinary(coverImageLocalPath)

 if(!avatar){
  throw new ApiError(400,"avatar is required!")
}

User.create({
  fullName,
  avatar:avatar.url,
  coverImage:coverImage.url || '',
  email,
  password,
  username:username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
  "-password -refreshToken"
)

if(!createdUser){
  throw new ApiError(500,"error while regstering")
}

return res.status(201).json(new ApiResponse(200,createdUser,"user created successfully!"))
});

export { registerUser };
