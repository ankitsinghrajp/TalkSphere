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

export const adminOnly = async(req, res, next)=>{
    try {
        
        const token = req.cookies["talksphere-admin-token"];
     
        if(!token){
            return next(new Error("Admin Session Expired, Login Again!"));
        }
      
        const adminSecretKey = jwt.verify(token,process.env.JWT_SECRET);
        
        if(adminSecretKey !== process.env.ADMIN_SECRET_KEY){
            return next(new Error("Unauthorized User!"));
        }
        
        next();
        
    } catch (error) {
        return next(error);
    }
}