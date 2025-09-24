import {User} from "../models/user.js"
import { cookieOptions, sendToken } from "../utils/features.js";
import bcrypt from "bcrypt";
//Create a new user, save it to the database and save cookie

export const newUser = async (req, res, next)=>{

   try {
      
     const {name, username, password, bio} = req.body;

     if(!name || !username || !password) return next(new Error("name username and password is required!"));


     const avatar = {
      public_id: "ckdghdkfghskghd",
      url:"https://user48583985.cloudinary.profile.com"
     }
     
     const user = await User.create({
      name,
      username,
      password,
      bio,
      avatar
     })
   

     sendToken(res,user,201,"User created!");

     } catch (error) {
       return next(error);
   }
   
}

export const loginController = async (req, res, next)=>{

   try {
      
     const {username, password} = req.body;

     if(!username || !password) return next(new Error("Both fields are required!"));

     const user = await User.findOne({username}).select("+password");

       if(!user) return next(new Error("Unauthorized Error!"));

     const isMatch = await bcrypt.compare(password,user.password);
     if(!isMatch) return next(new Error("Invalid Username Or Password!"));

     sendToken(res,user,200, "User Login Successfull!"); 

      } catch (error) {
        return next(error);
   }
}

export const getMyProfile = async (req, res, next)=>{

     try {
       res.status(200).json({
        status:"success",
        message:"User information accessed successfully!",
       data: req.user
      });
      
     } catch (error) {
          return next(error);
     }
}

export const Logout = async(req, res, next)=>{
    return res.status(200).cookie("talksphere-token","",{...cookieOptions, maxAge:0}).json({
      status:"success",
      message:"The user logout successfull!",
    })
}

export const SearchUser = async(req,res,next)=>{
  try {
  const {name} = req.query;
  
  return res.status(200).json({
    success:true,
    message:name,
  })
  } catch (error) {
    return next(error);
  }

}