import express from "express";
import { connectDb } from "./utils/features.js";
import { configDotenv } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { v4 as uuid } from "uuid";
// import {
//   createGroupChats,
//   createMessagesInAChat,
//   createSingleChats,
// } from "./seeders/chatSeeder.js";

import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
import cors from "cors";
import {v2 as cloudinary} from "cloudinary";

configDotenv();
const app = express();
const server = createServer(app);
const io = new Server(server, {});

const PORT = process.env.PORT || 3000;

export const userSocketIDs = new Map();

connectDb(process.env.DATABASE_URL);
// createSingleChats(40);
// createGroupChats(40);
// createMessagesInAChat("68d4ba6dfc60714f98acfa17",50);

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




//Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);

io.use((socket, next) => {});

// socket.io connection
io.on("connection", (socket) => {
  console.log("User is connected!", socket.id);

  const user = {
    _id: "dkdghggdkdkghddk",
    name: "Raghunath Malviya",
  };

  userSocketIDs.set(user._id.toString(), socket.id);

  console.log(userSocketIDs);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
        chat: chatId,
        createdAt: new Date().toISOString(),
      },
    };
    console.log("New Message", messageForRealTime);

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);

    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });

    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, {
      chatId,
    });

    await Message.create(messageForDB);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected!");
    userSocketIDs.delete(user._id.toString());
  });
});

// Error Middleware
app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log("The app is listening on the port: ", PORT);
});
