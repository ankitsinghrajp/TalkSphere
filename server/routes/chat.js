import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, deleteChat, getChatDetails, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachments } from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";
const router = express.Router();


router.use(isAuthenticated); // instead of using it again and again we can use it like this on the top of the private routes

router.post("/new",newGroupChat);
router.get("/my-chats",getMyChats);

router.get("/my-groups",getMyGroups);
router.put("/addMembers",addMembers);
router.put("/removeMember",removeMembers);
router.delete("/leave/:id",leaveGroup);

// Send Attachments
router.post("/message",attachmentsMulter,sendAttachments);

// Get Messages

// Get Chat details, raname, delete
router.route("/:id",).get(getChatDetails).put(renameGroup).delete(deleteChat);



export default router;