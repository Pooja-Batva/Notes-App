import { ApiError, ApiResponse, asyncHandler } from "../utils/index.js"
import { User } from "../models/index.js"

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        user.save({validateBeforeSave : false});

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "something went erong while generatin access and refresh token");
    }
}

const registerUser = asyncHandler(async(req, res) => {
    // get user detail
    // console.log(req.body);
    const {username, email, password} = req.body;

    // check if empty or not
    if([username, email, password].some(field => (field?.trim() === ""))){
        throw new ApiError(400, "All fields are required..");
    }

    // check if already registered or not
    const existedUser = await User.findOne({email});
    if(existedUser){
        throw new ApiError(409, "user with email already exist..");
    }

    // save
    const user = await User.create(
        {
            username,
            email,
            password
        }
    );

    console.log(user);

    // check if user created successfully
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500, "something went wrong while register user");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            createdUser,
            "User register Successfully"
        )
    );

});

const loginUser = asyncHandler(async(req, res) => {
    // fetch all field
    const {email, password} = req.body;

    // check for empty
    if(!email){
        throw new ApiError(200, "Email is required");
    }

    // find user & check password correctness
    const user = await User.findOne({email});
    
    if(!user){
        throw new ApiError(400, "User not found with this email");
    }

    const isPasswordValid = user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(400, "Password Incorrect");
    }

    // generate access token and refresh token 
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password, -refreshToken");

    // send cookie
    const options = {
        httpOnly : true,
        secure : true,
    };

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user : loggedInUser, accessToken, refreshToken
            },
            "User LoggedIn successfully"
        )
    )
});

const logoutUser = asyncHandler(async(req, res) => {
    // refresh token unset
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset : {
                refreshToken : 1
            }
        },
        {
            new : true
        }
    )

    // clear cookie
    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User Logged Out"
        )
    )
});


export{
    registerUser,
    loginUser,
    logoutUser,
}