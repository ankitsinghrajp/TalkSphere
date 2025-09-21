import mongoose from "mongoose";

const schema = new mongoose.Schema({
     name: {type:String, required:true},
     username:{
        type:String,
        required:true,
        unique:true,
     },
     password:{
        type:String,
        required:true,
        select:false,
     },
     avatar:{
        public_id: {
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
     },
},{
    timestamps:true,
})

export const User = mongoose.models.User || mongoose.model("User",schema);
