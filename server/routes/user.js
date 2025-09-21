import express from "express";
import {loginController, newUser} from "../controllers/user.js";
import {singleAvatar} from "../middlewares/multer.js";
const router = express.Router();

router.post("/new",singleAvatar,newUser)
router.post("/login",loginController);



export default router;