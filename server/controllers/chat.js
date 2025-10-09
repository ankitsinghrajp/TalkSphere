import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import {Chat} from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { deleteFilesFromCloudinary, emitEvent, uploadFilesToCloudinary } from "../utils/features.js";


export const newGroupChat = async (req,res,next)=>{
   try {

    const {name, members} = req.body;

    const allMembers = [...members, req.user];

    await Chat.create({
          name,
          groupChat:true,
          creator:req.user._id,
          members:allMembers,
    });

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} Group`);
    emitEvent(req, REFETCH_CHATS, members);

    return res.status(201).json({
        success:true,
        message:"Group Created",
    })


   } catch (error) {
       return next(error);
   }
}

export const getMyChats = async (req, res, next)=>{
    try {
      
        const chats = await Chat.find({members:req.user}).populate(
            "members",
            "name avatar"
        );

        const transformedChats = chats.map(({_id,name,groupChat,members})=>{

            const otherMember = getOtherMember(members,req.user._id);

            return {
                _id,
                groupChat,
                avatar: groupChat?members.slice(0,3).map(({avatar})=>avatar.url):[otherMember.avatar.url],
                name: groupChat? name: otherMember.name ,
                members: members.reduce((prev, curr)=>{

                    if(curr._id.toString() !== req.user._id.toString()){

                        prev.push(curr._id);
                    }
                    return prev;
                },[])
               
            }

        })

        return res.status(200).json({
            success:true,
            chats:transformedChats,
        })
        
    } catch (error) {
        return next(error);
    }
}


export const getMyGroups = async (req, res, next)=>{
   try {

    const chats = await Chat.find({
        members:req.user._id,
        groupChat: true,
        creator:req.user._id,
    }).populate("members", "name avatar");

    const groups = chats.map(({members, _id, groupChat, name})=>({
        _id,
        groupChat,
        name,
        avatar: members.slice(0,3).map(({avatar})=>avatar.url),
    }))

    return res.status(200).json({
        success:true,
        message:"Group Data fetched Successfully!",
        data: groups
    })
    
   } catch (error) {
      return next(error);
   }
}

export const addMembers = async (req,res, next)=>{
   try {

    const { chatId, members } = req.body;

    const chat = await Chat.findById(chatId);

    console.log(chat);
    if(!chat) return next(new Error("Chat not found!"));

    if(!chat.groupChat) return next(new Error("The Chat is not a group chat!"));
     console.log("Creator: ",chat.creator);
    if(chat.creator.toString() !== req.user._id.toString()) return next(new Error("Only admins can add members!"));


    
    const allNewMembersPromise = members.map(i=>User.findById(i,"name"));
    const allMembers = await Promise.all(allNewMembersPromise);

    const uniqueMembers = allMembers.filter(
        (i)=>!chat.members.includes(i._id.toString())
    ).map((i)=>i._id);



    chat.members.push(...uniqueMembers);

    if(chat.members.length > 100) return next(new Error("Group Members limit reached"));
    

    await chat.save();

    const AllUsersName = allMembers.map((i)=> i.name).join(",");

    emitEvent(req,ALERT,chat.members, `${AllUsersName} has been added to ${chat.name} group.`);

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        success:true,
        message:"Members added Successfully!",
    })
   } catch (error) {
      return next(error);
   }
}

export const removeMembers = async (req, res, next)=>{
    try {

        const {userId, chatId} = req.body;

        const [chat,userThatWillBeRemoved] = await Promise.all([
            Chat.findById(chatId), 
            User.findById(userId,"name")
        ]);

        if(!chat) return next(new Error("Chat not found!"));

        if(!chat.groupChat) return next(new Error("The chat is not a group chat!"));

        if(chat.creator.toString() !== req.user._id.toString()) return next(new Error("Only admins can remove members!"));

        if(chat.members.length < 3){
            return next(new Error("The group must have atleast 3 members!"));
        }

        chat.members = chat.members.filter((member)=> member.toString() !== userId.toString());

        await chat.save();

        emitEvent(
            req,
            ALERT,
            chat.members,
            `${userThatWillBeRemoved.name} has been removed from the group`
        )


        emitEvent(
            req,
            REFETCH_CHATS,
            chat.members
        )

        return res.status(200).json({
            success:true,
            message:"Member removed Successfully!",
        })
    } catch (error) {
        return next(error);
    }
}

export const leaveGroup = async (req, res, next)=>{
    try {

        const chatId = req.params.id;

        const chat = await Chat.findById(chatId);
        if(!chat) return next(new Error("Chat Not Found!"));

        if(!chat.groupChat) return next(new Error("This is not a group chat!"));

         const remainingMembers = chat.members.filter((i)=>
                i.toString() != req.user._id.toString()
            )

        if(chat.creator.toString() === req.user._id.toString()){
          
            const luckyMan = Math.floor(Math.random()* remainingMembers.length);
            const newCreator = remainingMembers[luckyMan];
            chat.creator = newCreator;

        }

        chat.members = remainingMembers;

        await chat.save();
        emitEvent(
            req,
            ALERT,
            chat.members,
            `${req.user.name} left the group`
        )

        res.status(200).json({
            success:true,
            message:"The group leaved successfully!"
        })
        
    } catch (error) {
        return next(error);
    }
}

export const sendAttachments = async (req, res, next)=>{
    try {

        const {chatId} = req.body;

        const [chat, me] = await Promise.all([
            Chat.findById(chatId),
            User.findById(req.user._id, "name")
        ])

        
        if(!chat) return next(new Error("Chat not found!"));
        
        const files = req.files || [];

        if(files.length < 1) return next(new Error("Please attach atleast one file!"));
        if(files.length > 5) return next(new Error("Only 5 files can be attached at once!"));


        // Upload files here

        const attachments = await uploadFilesToCloudinary(files);
 
        const messageForDB = {
            content:"", 
            attachments,
            sender:me._id, 
            chat:chatId
        };

        const messageForRealTime = {
            ...messageForDB,
            sender:{
                _id: me._id,
                name: me.name,
            },
        };

        const message = await Message.create(messageForDB);

        emitEvent(
            req,
            NEW_ATTACHMENT,
            chat.members,
            {
                message:messageForRealTime,
                chatId
            }
        )

        emitEvent(
            req,
            NEW_MESSAGE_ALERT,
            chat.members,
            {chatId}
        )

    return res.status(200).json({
        success:true,
        message
    })

    } catch (error) {
        return next(error);
    }
}

export const getChatDetails = async (req, res, next)=>{
    try {
        
        if(req.query.populate === "true"){
            const chat = await Chat.findById(req.params.id).populate("members", "name avatar").lean();
             // .lean() means now the chat is considered as vanilla javascript object if we do changes here it does not reflect there like we change below for avatar.url
            if(!chat) return next(new Error("Chat not found!"));
            
            chat.members = chat.members.map(({_id, name, avatar})=>({
                _id,
                name,
                avatar:avatar.url
            }));

            return res.status(200).json({
                success:true,
                chat,
            })
        }
        else{

            const chat = await Chat.findById(req.params.id);

            if(!chat) return next(new Error("Chat not found!"));

            return res.status(200).json({
                success:true,
                chat
            })

        }

    } catch (error) {
        return next(error);
    }
}

export const renameGroup = async (req, res, next)=>{
    try {

        const chatId = req.params.id;
        const {name} = req.body;

        const chat = await Chat.findById(chatId);
        if(!chat) return next(new Error("Chat not found!"));

        if(!chat.groupChat) return next(new Error("This is not the group chat!"));


        chat.name = name;
        await chat.save();

        emitEvent(req, REFETCH_CHATS,chat.members);

        return res.status(200).json({
            success:true,
            message:"The group name renamed successfully!",
        })
        
    } catch (error) {
        return next(error);
    }
}

export const deleteChat = async (req, res, next)=>{
    try {

        const chatId = req.params.id;
        const chat = await Chat.findById(chatId);
        
        if(!chat) return next(new Error("Chat Not Found!"));

        const members = chat.members;

        if(chat.groupChat && chat.creator.toString() !== req.user._id.toString()){
              return next(new Error("Only admins can delete this chat!"));
        }

        if(!chat.groupChat && !chat.members.includes(req.user_id.toString())){
            return next(new Error("You are not allowed to delete this chat! Bad Request"))
        }

        // Here we have to delete all the messages and attachements or files from cloudinary

        const messagesWithAttachments = await Message.find({
            chat:chatId,
            attachments: { $exists:true, $ne:[] }
        });

        const public_ids = [];

        messagesWithAttachments.forEach(({attachments})=>{
            attachments.forEach(({public_id})=>public_ids.push(public_id))
        })

        await Promise.all([
            // Delete files from cloudinary 
            deleteFilesFromCloudinary(public_ids),
            chat.deleteOne(),
            Message.deleteMany({chat:chatId})
        ])

        emitEvent(req, REFETCH_CHATS, members);

        return res.status(200).json({
            success:true,
            message:"Chat deleted successfully"
        })

        
    } catch (error) {
        return next(error);
    }
}

export const getChatMessages = async (req, res, next)=>{
    try {

        const chatId = req.params.id;
        const {page = 1} = req.query;
        const resultPerPage = 20;

        const skip = (page-1)* resultPerPage;

        const [messages, totalMessagesCount ] = await Promise.all([
            Message.find({chat:chatId})
            .sort({createdAt:-1})
            .skip(skip)
            .limit(resultPerPage)
            .populate("sender", "name")
            .lean(),

            Message.countDocuments({chat:chatId}),

        ])

        const totalPages = Math.ceil(totalMessagesCount / resultPerPage) || 0;


        return res.status(200).json({
            success:true,
            messages: messages.reverse(),
            totalPages
        })

        
    } catch (error) {
        return next(error);
    }
}
