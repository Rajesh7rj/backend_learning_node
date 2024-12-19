import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js"

const registerUser = asyncHandler( async (req, res) => {
    console.log("req.body", req.body);

    const {fullName, username, email, password} = req.body;

    if(
        [fullName, username, email, password].some((e) => 
        e.value === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    });

    if(existedUser){
        throw new ApiError(400, "User with email or username already exited")
    };

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar File is required")
    };

    const avatar = await uploadCloudinary(avatarLocalPath)
    const coverImage = await uploadCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar File is required")
    };

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(createdUser){
        throw new ApiError(400, "Something went wrong while registering a user")
    };

    return res.status(201).json(
        new ApiResponse(200, "User registered successfully")
    )

});


export { registerUser }