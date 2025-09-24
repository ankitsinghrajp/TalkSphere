import mongoose from "mongoose";
import jwt from "jsonwebtoken";
export const cookieOptions = {
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

export const deleteFilesFromCloudinary = async (public_ids)=>{

}


export const emitEvent = (req, event, user, data)=>{
     console.log("Emitting Event!",event);
}