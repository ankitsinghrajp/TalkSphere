import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = async(req, res, next)=>{
    try {

        const token = req.cookies["talksphere-token"];
        
        if(!token) return next(new Error("Session Out! Please Login Again"));

        const userId = jwt.verify(token, process.env.JWT_SECRET);
        
        // set the user in req

        req.user = await User.findById(userId);
       
         next();

    } catch (error) {
        return next(error);
    }
}