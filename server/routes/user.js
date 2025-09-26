import express from "express";
import {acceptFriendRequest, getAllNotifications, getMyFriends, getMyProfile, loginController, Logout, newUser, SearchUser, sendFriendRequest} from "../controllers/user.js";
import {singleAvatar} from "../middlewares/multer.js";
import {isAuthenticated} from "../middlewares/auth.js";
import { acceptRequestValidator, loginValidator, registerValidator, sendRequestValidator, validateHandler } from "../lib/validators.js";
const router = express.Router();

// Public routes
router.post("/new",singleAvatar,registerValidator(),validateHandler,newUser)
router.post("/login",loginValidator(),validateHandler,loginController);

//Private Routes
router.get("/me",isAuthenticated ,getMyProfile);

router.get("/logout",isAuthenticated,Logout);

router.get("/search",isAuthenticated,SearchUser);

router.put("/sendrequest",isAuthenticated,sendRequestValidator(),validateHandler, sendFriendRequest);

router.put("/acceptrequest",isAuthenticated,acceptRequestValidator(),validateHandler,acceptFriendRequest);

router.get("/notifications",isAuthenticated,getAllNotifications);

router.get("/friends",isAuthenticated, getMyFriends);

export default router;
