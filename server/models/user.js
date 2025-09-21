import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
     bio:{
       type:String
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


schema.pre("save",async function(next){
    if(!this.isModified("password")) next();  // We need to do this when only the user is created or password modify if not then no need of it.

    this.password = await bcrypt.hash(this.password,10);
})

export const User = mongoose.models.User || mongoose.model("User",schema);
