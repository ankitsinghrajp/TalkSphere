import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import {User} from "../models/user.js"
import { cookieOptions, emitEvent, sendToken, uploadFilesToCloudinary } from "../utils/features.js";
import bcrypt from "bcrypt";
import { getOtherMember } from "../lib/helper.js";
//Create a new user, save it to the database and save cookie

export const newUser = async (req, res, next)=>{

   try {
      
     const {name, username, password, bio} = req.body;

     if(!name || !username || !password) return next(new Error("name username and password is required!"));
     
     const file = req.file;

     if(!file) return next(new Error("Please Upload Avatar"));

     const result = await uploadFilesToCloudinary([file]);

     const avatar = {
      public_id: result[0].public_id,
      url:result[0].url,
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
  const {name=""} = req.query;

  // The problem is that we need to find the user which are not the friend of the current user who is requesting 
  
  const myChats = await Chat.find({
     groupChat:false,
     members: req.user._id
  });

  
 const allUsersFromMyChats = myChats.map((chat)=>chat.members).flat();

 const allUsersExceptMeAndFriends = await User.find({
  _id:{$nin: allUsersFromMyChats.concat(req.user._id)},
  name: {$regex:name,$options:"i"}
 });
 

 const users = allUsersExceptMeAndFriends.map(({_id, name, avatar})=>({_id, name,avatar:avatar.url}));
  return res.status(200).json({
    success:true,
    users
  })
  } catch (error) {
    return next(error);
  }

}

export const sendFriendRequest = async (req, res, next)=>{
  try {

    const {userId} = req.body;

    const request = await Request.findOne({
      $or: [
        {sender:userId, receiver:req.user._id},
        {sender:req.user._id, receiver:userId}
      ]
    })

    if(request) return next(new Error("Request already sent!"));

    await Request.create({
         sender: req.user._id,
         receiver: userId
    });

    emitEvent(req,NEW_REQUEST,[userId],)


    return res.status(200).json({
          success:true,
          message:"Friend Request Sent Successfully!"
    })
    
  } catch (error) {
    return next(error);
  }
}

export const acceptFriendRequest = async (req, res, next)=>{
      try {

        const {requestId, accept} = req.body;

        const request = await Request.findById(requestId).populate("sender","name").populate("receiver","name");
        if(!request) return next(new Error("Request is not found in the database!"));


        if(request.receiver._id.toString() != req.user._id.toString()) return next(new Error("You are unauthorized to accept this request!"));

        if(!accept){
          await request.deleteOne();
          return res.status(200).json({
            success:true,
            message:"Friend Request Rejected!"
          });
        }

        const members =  [request.sender._id, request.receiver._id];

        await Promise.all([Chat.create({
          members,
          name: `${request.sender.name}-${request.receiver.name}`,

        }),
          request.deleteOne()
      ])

       
      emitEvent(req, REFETCH_CHATS, members)


      return res.status(200).json({
        success:true,
        message:"Friend Request Accepted!",
        senderId: request.sender._id
      })

        
      } catch (error) {
        return next(error);
      }
}

export const getAllNotifications = async (req, res, next)=>{
    
    try {

      const requests = await Request.find({receiver:req.user._id}).populate("sender", "name avatar");

      const allRequest = requests.map(({_id, sender})=>({
        _id,
        sender:{
          _id: sender._id,
          name: sender.name,
          avatar: sender.avatar.url,
        }
      }));

      return res.status(200).json({
        success:true,
        requests: allRequest
      })
      
    } catch (error) {
      return next(error);
    }
}

export const getMyFriends = async (req, res, next)=>{
    try {

      const chatId = req.query.chatId;

      const chats = await Chat.find({members:req.user._id, groupChat:false})
      .populate("members", "name avatar");

      const friends = chats.map(({members})=>{
        const otherUser = getOtherMember(members,req.user._id);

        return {
          _id:otherUser._id,
          name: otherUser.name,
          avatar: otherUser.avatar.url,
        }
      });


      if(chatId){

        // This is for adding members in a group 
        const chat = await Chat.findById(chatId);

        const availableFriends = friends.filter(
          (friend)=> !chat.members.includes(friend._id)
        );

       return res.status(200).json({
           success:true,
           friends:availableFriends
       })

      }else{
        return res.status(200).json({
          success:true,
          friends
        })
      }
      

    } catch (error) {
      return next(error);
    }
}