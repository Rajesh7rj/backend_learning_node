import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js"

const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { fullName, username, email, password } = req.body;

        if ([fullName, email, username, password].some((field) => !field?.trim())) {
            return next(new ApiError(400, "All fields are required"));
            // return next(new ApiError(400, `The following fields are required: ${missingFields.join(', ')}`));
        }

        console.log('Request body:', req.body);

        const existedUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existedUser) {
            console.log('User already exists:', existedUser);
            return next(new ApiError(409, "User with email or username already exists"));
        }

        const avatarLocalPath = req.files?.avatar?.[0]?.path;
        const coverImageLocalPath = req.files?.coverImage[0]?.path;

        if (!avatarLocalPath) {
            return next(new ApiError(400, "Avatar file is required"));
        }

        console.log('Avatar path:', avatarLocalPath);

        const avatar = await uploadCloudinary(avatarLocalPath);
        const coverImage = await uploadCloudinary(coverImageLocalPath);
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

        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        if (!createdUser) {
            return next(new ApiError(400, "Failed to fetch created user"));
        }

        res.status(201).json(new ApiResponse(200, "User registered successfully"));
    } catch (error) {
        console.error('Error during registration:', error);
        return next(new ApiError(error.statusCode || 500, error.message || "Internal server error"));
    }
});

export { registerUser }