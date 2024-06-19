import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    value: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initializeUser:(state,action)=>{
            state.value=action.payload
        },
        logoutUser:(state)=>{
            state.value=null
        }
    },
})

// Action creators are generated for each case reducer function
export const {initializeUser,logoutUser} = userSlice.actions

export default userSlice.reducer