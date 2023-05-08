import express  from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {indexRouter} from "./endpoints/exportEndpoints";
import cookieParser from "cookie-parser";

dotenv.config()
const app = express();
const corsOptions = {
    origin: process.env.FE_SERVER,
    credentials: true
};
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json());
app.use('/api', indexRouter)

const mongoUri:string = process.env.MONGO_URI!;
const port:Number = +process.env.PORT!;

mongoose.connect(mongoUri);
mongoose.connection.once("open", ()=>{
    console.log("Mongoose connected successfully");
});

app.listen(port,()=>{
    console.log("app is running");
})
