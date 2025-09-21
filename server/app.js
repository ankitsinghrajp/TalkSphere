import express from "express";
import userRoute from "./routes/user.js";
import { connectDb } from "./utils/features.js";
import { configDotenv } from "dotenv";

configDotenv();
const app = express();


const PORT = process.env.PORT || 3000;

connectDb(process.env.DATABASE_URL);

//Middlewares
app.use(express.json());

app.use("/user",userRoute);



app.listen(PORT,()=>{
    console.log("The app is listening on the port: ",PORT);
})

