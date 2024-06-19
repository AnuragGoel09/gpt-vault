import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAccess } from '../../utils/user.requests.js'
import Cookies from 'js-cookie'
import { initializeUser } from '../../redux/userSlice.js'
import Loader from '../Loader.jsx'

export default function Authenticated({children,setLoader}) {
    const navigate=useNavigate()
    const user=useSelector((state)=>state.user.value)
    const dispatch=useDispatch()
    
    useEffect(()=>{
        console.log("authenticated")
        if(!user){
            let refreshToken=Cookies.get('refreshToken')
            refreshToken=localStorage.getItem('refreshToken') // temp
            console.log("Refresh Token",refreshToken)
            if(!refreshToken){
                navigate("/")
                setLoader(false)
            }
            else{
                const handleAccess=async()=>{
                        try {   
                            const response= await getAccess(refreshToken);
                            console.log("REPONSE",response)
                            const accessToken=response.data.data.accessToken;
                            refreshToken=response.data.data.refreshToken;
                            const fullname=response.data.data.fullname;
                            Cookies.set('refreshToken', refreshToken, { secure: true, httpOnly: true, sameSite: 'Strict' });
            
                            // temp
                            localStorage.setItem('refreshToken',refreshToken)
                            dispatch(initializeUser({accessToken,refreshToken,fullname}));
                            console.log("auth")
                        } catch (error) {
                            navigate("/")
                            console.log(error)
                        }   
        
                        setLoader(false) 
                    }
                    handleAccess()
            }
        }
    },[])
    useEffect(()=>{
        if(user)
            navigate("/dashboard")
    },[user])
    
    return (
    <>
       {children}  
    </>
  )
}
