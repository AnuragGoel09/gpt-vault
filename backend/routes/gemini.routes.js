import {Router} from 'express'
import { generate } from '../controllers/gemini.controllers.js'

const router = Router()

router.route("/generate").post(generate)

export default router