import {User} from "../models/user.js"
import { sendToken } from "../utils/features.js";
//Create a new user, save it to the database and save cookie

export const newUser = async (req,res)=>{
   
     const {name, username, password, bio} = req.body;

     if(!name || !username || !password){
      res.status(400).json({
         status:"failed",
         message:"Name, Username and Password is a required field!"
      })
     }


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
}

export const loginController = (req,res)=>{
     
}
