import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    value: {
        fullname:"Anurag Goel",
        email:"anurag@gmail.com",
        accesstoken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVjNDVmNjQ5YzY1Mzk5NWU2ZTAwY2QiLCJlbWFpbCI6ImFAZ21haWwuY3BtIiwiZnVsbG5hbWUiOiJhbnVyYWciLCJpYXQiOjE3MTc5OTcxODksImV4cCI6MTcxODA4MzU4OX0.jkqfVHHkW6Ze_2If1AKUCb8Yq4DoNpMWmGyUMBhVyeQ"
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
})

// Action creators are generated for each case reducer function
export const {} = userSlice.actions

export default userSlice.reducer