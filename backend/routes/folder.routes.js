import { Router } from "express";
import { createFolder, deleteFolder, getFolderContent, getRootFolder } from "../controllers/folder.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/createfolder").post(verifyJWT,createFolder)

router.route("/get-root-folder").post(verifyJWT,getRootFolder)

router.route("/get-folder-contents").post(verifyJWT,getFolderContent)

router.route("/delete-folder").post(verifyJWT,deleteFolder)

export default router