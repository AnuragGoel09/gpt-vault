import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createFile, deleteFile, getFile, updateFile, updateFileName } from "../controllers/file.controllers.js";

const router=Router()

router.route("/createfile").post(verifyJWT,createFile)

router.route("/updatefile").post(verifyJWT,updateFile)

router.route("/deletefile").post(verifyJWT,deleteFile)

router.route("/getfile").post(verifyJWT,getFile)

router.route("/updatefilename").post(verifyJWT,updateFileName)

export default router