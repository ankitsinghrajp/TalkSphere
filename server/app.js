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
import { NEW_MESSAGE, NEW_MESSAGE_ALERT, START_TYPING, STOP_TYPING } from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { socketAuthenticator } from "./middlewares/auth.js";

configDotenv();
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});


app.set("io",io);

const PORT = process.env.PORT || 3000;

export const userSocketIDs = new Map();

connectDb(process.env.DATABASE_URL);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
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

// Socket.io middleware

io.use((socket,next)=>{
  cookieParser()(socket.request,socket.request.response, async (err)=>{
      await socketAuthenticator(err,socket,next);
  })
})

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const user =  socket.user;

  userSocketIDs.set(user?._id.toString(), socket.id);

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

  socket.on(START_TYPING, ({members, chatId})=>{
        const membersSocket = getSockets(members);
        socket.to(membersSocket).emit(START_TYPING,{chatId});
  })

  socket.on(STOP_TYPING, ({members, chatId})=>{
    const membersSocket = getSockets(members);
    socket.to(membersSocket).emit(STOP_TYPING,{chatId});
    
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    userSocketIDs.delete(user._id.toString());
  });
});

// Error middleware
app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
