import express from "express";
import userRoute from "./routes/user.js";
import { connectDb } from "./utils/features.js";
import { configDotenv } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

configDotenv();
const app = express();


const PORT = process.env.PORT || 3000;

connectDb(process.env.DATABASE_URL);

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/user",userRoute);





// Error Middleware
app.use(errorMiddleware);

app.listen(PORT,()=>{
    console.log("The app is listening on the port: ",PORT);
})

