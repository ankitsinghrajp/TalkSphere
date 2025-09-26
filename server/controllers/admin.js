import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { Message } from "../models/message.js";
import {cookieOptions} from "../utils/features.js"
import jwt from "jsonwebtoken";


const adminLogin = async (req, res, next)=>{
   try {

      const {secretKey} = req.body;

      const adminSecretKey = process.env.ADMIN_SECRET_KEY;

      if(secretKey !== adminSecretKey){
          return next(new Error("Invalid credential!"));
      }

      const token = jwt.sign(secretKey, process.env.JWT_SECRET);


    res.status(200).cookie("talksphere-admin-token",token,{...cookieOptions,maxAge:1000*60*15}).json({
      success:true,
      message:"Admin Login Successfull!"
    })

      
   } catch (error) {
      return next(error);
   }
}

const adminLogout = async (req, res, next)=>{
   try {

      return res.status(200).cookie("talksphere-admin-token","",{...cookieOptions,maxAge:0}).json({
         success:true,
         message:"Logout Successfull!"
      });
      
   } catch (error) {
      return next(error);
   }
}

const getAdminData = async (req, res, next)=>{
   try {

       return res.status(200).json({
         success:true,
         admin:true
       })
      
   } catch (error) {
      return next(error);
   }
}

const allUsers = async (req, res, next)=>{
     try {

      const users = await User.find({});

      const transformedUser = await Promise.all(
         users.map(async ({name, username, avatar, _id})=>{

         const [groups, friends] = await Promise.all([
            Chat.countDocuments({groupChat:true, members:_id}),
            Chat.countDocuments({groupChat:false, members:_id})
         ])

         return {
            _id,
            name,
            username,
            avatar:avatar.url,
            groups,
            friends
         }
      })
      )

      return res.status(200).json({
         success:true,
         transformedUser
      })

     } catch (error) {
        return next(error);
     }
}

const allChats = async (req, res, next)=>{
   try {

      const chats = await Chat.find({}).populate("members", "name avatar").populate("creator", "name avatar");
      
      const transformedChat = await Promise.all(chats.map(async ({members,_id, groupChat, name, creator})=>{

         const totalMessages = await Message.countDocuments({chat:_id});
         return {
            _id,
            groupChat,
            name,
            avatar: members.slice(0,3).map((member)=>member.avatar.url),
            members: members.map(({_id, name, avatar})=>(
               {
                  _id,
                  name,
                  avatar: avatar.url
               }
            )),
            creator:{
               name:creator?.name || "NONE",
               avatar:creator?.avatar.url || "NA"
            },
            totalMembers: members.length,
            totalMessages
         }


      }))


      return res.status(200).json({
         success:true,
         transformedChat
      })


      
   } catch (error) {
      return next(error);
   }
}

const allMessages = async (req, res, next)=>{
   try {

   const messages = await Message.find({}).populate("sender", "name avatar").populate("chat","groupChat");

   const transformedMessages = messages.map(({content, attachments, _id, sender, createdAt, chat})=>({
      _id,
      attachments,
      content,
      createdAt,
      chat:chat._id,
      groupChat: chat.groupChat,
      sender:{
         _id:sender._id,
         name:sender.name,
         avatar: sender.avatar.url,
      }

   }))

   return res.status(200).json({
      success:true,
      transformedMessages
   })
      
   } catch (error) {
      return next(error);
   }
}

const getDashboardStats = async (req, res, next)=>{

   const [groupsCount, usersCount, messagesCount, totalChatsCount] = await Promise.all([
          Chat.countDocuments({groupChat:true}),
          User.countDocuments({}),
          Message.countDocuments({}),
          Chat.countDocuments({}),
   ]);


   const today = new Date();
   const last7Days = new Date();
   last7Days.setDate(last7Days.getDate()-7);

   const last7daysMessages = await Message.find({
      createdAt:{
         $gte: last7Days,
         $lte: today,
      }
   }).select("createdAt");

   const messages = new Array(7).fill(0);

   const dayInMilliSecond = 1000*60*60*24;

   last7daysMessages.forEach((message)=>{
      const indexApx = (today.getTime() - message.createdAt.getTime())/dayInMilliSecond;
      
      const index = Math.floor(indexApx);
      messages[6 -index] ++;
      
   })

   const stats = {
      groupsCount,
      usersCount,
      messagesCount,
      totalChatsCount,
      messages:messages
   }


   try {


      return res.status(200).json({
         success:true,
         stats
      })
      
   } catch (error) {
      return next(error);
   }
}


export {allUsers, allChats, allMessages, getDashboardStats, adminLogin, adminLogout, getAdminData}
