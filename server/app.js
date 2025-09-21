import express from "express";
import userRoute from "./routes/user.js";
const app = express();


const PORT = 3000;

app.use("/user",userRoute);

app.listen(PORT,()=>{
    console.log("The app is listening on the port: ",PORT);
})