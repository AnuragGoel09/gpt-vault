import { createSlice } from '@reduxjs/toolkit'
import { updateChatInDB ,updateFilenameInDB, getFile} from '../utils/file.requests.js'

const initialState = {
    value: {},
}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        initializeFile: (state,action)=>{
            state.value=action.payload
        },
        updateChat: (state, action) => {
            action.payload.content.forEach(element => {
                state.value.content.push(element)
            });
            updateChatInDB(action.payload.content,action.payload.accesstoken,state.value._id)
        
        },
        resetFile:(state)=>{
            state.value={}
        }
    },
})

// Action creators are generated for each case reducer function
export const {initializeFile ,updateChat, resetFile} = fileSlice.actions

export default fileSlice.reducer