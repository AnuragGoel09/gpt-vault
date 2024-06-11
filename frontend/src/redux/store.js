import { configureStore } from '@reduxjs/toolkit'
import fileSlice from './fileSlice.js'
import userSlice from './userSlice.js'

export const store = configureStore({
  reducer: {
    file:fileSlice,
    user:userSlice
  },
})