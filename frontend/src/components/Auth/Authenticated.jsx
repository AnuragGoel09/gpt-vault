import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAccess } from '../../utils/user.requests.js'
import Cookies from 'js-cookie'
import { initializeUser } from '../../redux/userSlice.js'
import Loader from '../Loader.jsx'

export default function Authenticated({children}) {
    const navigate=useNavigate()
    const user=useSelector((state)=>state.user.value)
    const dispatch=useDispatch()
    const [loader,setLoader]=useState(true);
    
    useEffect(()=>{
        if(!user){
            let refreshToken=Cookies.get('refreshToken')
            refreshToken=localStorage.getItem('refreshToken') // temp
            if(!refreshToken){
                navigate("/")
                setLoader(false)
            }
            else{
                const handleAccess=async()=>{
                        try {   
                            const response= await getAccess(refreshToken);
                            const accessToken=response.data.data.accessToken;
                            refreshToken=response.data.data.refreshToken;
                            const fullname=response.data.data.fullname;
                            Cookies.set('refreshToken', refreshToken, { secure: true, httpOnly: true, sameSite: 'Strict' });
            
                            // temp
                            localStorage.setItem('refreshToken',refreshToken)
                            dispatch(initializeUser({accessToken,refreshToken,fullname}));
                        } catch (error) {
                            navigate("/")
                            console.log(error)
                        }   
        
                        setLoader(false) 
                    }
                    handleAccess()
            }
        }
        else{
            setLoader(false)
        }
    },[])
    useEffect(()=>{
        if(user)
            navigate("/dashboard")
    },[user])
    
    return (
    <> {loader && <Loader/>} 
       {children}  
    </>
  )
}
