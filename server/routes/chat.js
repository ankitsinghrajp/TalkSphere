import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, deleteChat, getChatDetails, getChatMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachments } from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { addMemberValidator, chatIdValidator, newGroupChatValidator, removeMemberValidator, sendAttachementsValidator, validateHandler } from "../lib/validators.js";
const router = express.Router();


router.use(isAuthenticated); // instead of using it again and again we can use it like this on the top of the private routes

router.post("/new",newGroupChatValidator(),validateHandler,newGroupChat);
router.get("/my-chats",getMyChats);

router.get("/my-groups",getMyGroups);
router.put("/removemembers",removeMemberValidator(),validateHandler,removeMembers);
router.put("/addmembers",addMemberValidator(),validateHandler,addMembers);
router.delete("/leave/:id",chatIdValidator(),validateHandler,leaveGroup);

// Send Attachments
router.post("/message",attachmentsMulter,sendAttachementsValidator(),validateHandler,sendAttachments);

// Get Messages
router.get("/message/:id",chatIdValidator(),validateHandler,getChatMessages);

// Get Chat details, raname, delete
router.route("/:id",).get(chatIdValidator(),validateHandler,getChatDetails).put(renameGroup).delete(deleteChat);



export default router;