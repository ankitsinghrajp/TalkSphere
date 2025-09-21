import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const cookieOptions = {
    maxAge: 24*60*60*1000, // 24 hours,
    sameSite:"none",
    httpOnly:true,
    secure:true,
}

export const connectDb = (uri)=>{
    try {

        mongoose.connect(uri,{dbName:"TalkSphere"})


        console.log("The Database connection successfull!");
        
    } catch (error) {
        console.log("The Database Connection failed!");
    }
}



export const sendToken = (res, user, code, message)=>{

    const token = jwt.sign({
        _id:user._id
    },
    process.env.JWT_SECRET
);

    return res.status(code).cookie("talksphere-token",token,cookieOptions).json({
        success:"true",
        Token:token,
        user,
        message,
    })

}