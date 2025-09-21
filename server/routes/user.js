import express from "express";
import {userController, adminController} from "../controllers/user.js";

const router = express.Router();

router.get("/",userController);
router.get("/admin",adminController);


export default router;