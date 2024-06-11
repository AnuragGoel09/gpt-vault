import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const generateAccessAndRefreshTokens = async(userId)=>{
    try {

        console.log(userId)
        const user=await User.findById(userId)
        console.log(user)
        const accessToken=user.generateAccessToken()        
        const refreshToken=user.generateRefreshToken()
        
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler( async (req,res) =>{
    // get user details from frontent
    // validations
    // check if user already exists
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {fullname, email, password}=req.body;
    if(
        [fullname,email,password].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400,"All field are required")
    }

    const existedUser=await User.findOne({email})
    if(existedUser)
        throw new ApiError(409,"Account already exists")

    const user = await User.create({
        fullname,
        email,
        password
    })

    const createrUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createrUser)
            throw new ApiError(500,"Something went wrong while registering user")

    return res.status(201).json(
        new ApiResponse(200,createrUser,"User registered successfully")
    )

} )

const loginUser = asyncHandler (async(req,res)=>{
    // get data from frontent
    // validate data
    // find user
    // password check
    // access and refresh generate
    // send cookies

    const {email,password}=req.body;
    if(!email)
        throw new ApiError(400,"email is required")

    const user = await User.findOne({email})

    if(!user)
        throw new ApiError(404,"user does not exists")

    const isPasswordValid=await user.isPasswordCorrect(password)
    if(!isPasswordValid)
        throw new ApiError(401,"invalid credentials")

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly: true,
        secure:true
    }
    const data={
        user:loggedUser,
        accessToken,
        refreshToken
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,data,"User logged in successfully"))
})


const logoutUser = asyncHandler(async(req,res)=>{
    const u=await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },{
            new:true
        }
    )
    const options={
        httpOnly: true,
        secure:true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out"))
})

const refreshAccessToken = asyncHandler(async (req,res)=>{
    const incommingRefreshToken = req.cookies.refreshAccessToken || req.body.refreshToken
    
    if(!incommingRefreshToken)
        throw new ApiError(401,"Unauthorized request")

    try {
        const decodedToken=jwt.verify(incommingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        const user=await User.findById(decodedToken._id)    
        if(!user)
            throw new ApiError(400,"Invalid Refresh Token")
    
        if(incommingRefreshToken!==user?.refreshToken)
            throw new ApiError(401,"Refresh token is expired or used")
    
        const options={
            httpOnly:true,
            secure:true
        }
    
        const {newAccessToken,newRefreshToken}=await generateAccessAndRefreshTokens(user._id)
        return res
        .status(200)
        .cookie("accessToken",newAccessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(new ApiResponse(200,{accessToken:newAccessToken,refreshToken:newRefreshToken},"Access token refreshed"))
    
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid Refresh Token")    
    }
})

const changeCurrentPassword = asyncHandler(async (req,res)=>{
    const {oldPassword,newPassword}=req.body
    const user = await User.findById(req.user._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect)
            throw new ApiError(400,"Wrong Old Password")
    user.password=newPassword
    await user.save({validateBeforeSave:false})
    
    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password Change Successfully"))

})

const getCurrentUser = asyncHandler(async(req,res)=>{
    return res.status(200).json(new ApiResponse(200,req.user,"current user fetched successfully"))
})


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser
}