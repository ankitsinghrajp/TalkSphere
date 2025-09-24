import express from "express";
import {getMyProfile, loginController, Logout, newUser, SearchUser} from "../controllers/user.js";
import {singleAvatar} from "../middlewares/multer.js";
import {isAuthenticated} from "../middlewares/auth.js";
const router = express.Router();


// Public routes
router.post("/new",singleAvatar,newUser)
router.post("/login",loginController);

//Private Routes
router.get("/me",isAuthenticated ,getMyProfile);

router.get("/logout",isAuthenticated,Logout);

router.get("/search",isAuthenticated,SearchUser);


export default router;