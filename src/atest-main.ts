import express  from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config()
const mongoUri:string = process.env.MONGO_URI!;
const port:Number = +process.env.PORT!;

mongoose.connect(mongoUri);
mongoose.connection.once("open", ()=>{
    console.log("Mongoose connected successfully");
});

app.listen(port,()=>{
    console.log("app is running");
})
