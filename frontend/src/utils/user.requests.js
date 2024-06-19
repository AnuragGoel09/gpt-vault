import axios from "axios";
import {serverUrl} from '../constants.js'

const getAccess=async(refreshToken)=>{
    const response=await axios.post(`${serverUrl}/api/v1/users/refresh-token`,{
        refreshToken
    })
    return response
}
const loginUser=async({email,password})=>{
    const response=await axios.post(`${serverUrl}/api/v1/users/login`,{
        email,
        password
    })
    return response
}
const registerUser=async({fullname,email,password})=>{
    const response=await axios.post(`${serverUrl}/api/v1/users/register`,{
        fullname,
        email,
        password
    })
    return response
}

export {
    getAccess,
    loginUser,
    registerUser
}