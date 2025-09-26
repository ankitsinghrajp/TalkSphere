import express from "express";
import { connectDb } from "./utils/features.js";
import { configDotenv } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import { createGroupChats, createMessagesInAChat, createSingleChats } from "./seeders/chatSeeder.js";


configDotenv();
const app = express();

const PORT = process.env.PORT || 3000;

connectDb(process.env.DATABASE_URL);
// createSingleChats(40);
// createGroupChats(40);
// createMessagesInAChat("68d4ba6dfc60714f98acfa17",50);
//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/user",userRoute);
app.use("/chat",chatRoute);
app.use("/admin",adminRoute);





// Error Middleware
app.use(errorMiddleware);

app.listen(PORT,()=>{
    console.log("The app is listening on the port: ",PORT);
})

