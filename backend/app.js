import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js'
import folderRouter from './routes/folder.routes.js'
import fileRouter from './routes/file.routes.js'
import geminiRouter from './routes/gemini.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/gemini",geminiRouter);
app.use("/api/v1/folders",folderRouter)
app.use("/api/v1/files",fileRouter)
export {app}