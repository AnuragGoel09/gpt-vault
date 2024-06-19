import axios from "axios";
let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVjNDVmNjQ5YzY1Mzk5NWU2ZTAwY2QiLCJpYXQiOjE3MTg2NDg2NzYsImV4cCI6MTcxOTUxMjY3Nn0.-7y3lgn1tKZ3-MKlS3VMWbso-kQBFPGeSBBVe5ekzfc";

const getAccess=async(refreshToken)=>{
    const response=await axios.post("http://localhost:8000/api/v1/users/refresh-token",{
        refreshToken
    })
    return response
}
const loginUser=async({email,password})=>{
    const response=await axios.post("http://localhost:8000/api/v1/users/login",{
        email,
        password
    })
    return response
}
const registerUser=async({fullname,email,password})=>{
    const response=await axios.post("http://localhost:8000/api/v1/users/register",{
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