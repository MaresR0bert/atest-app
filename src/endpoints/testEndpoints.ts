import express from "express";
import verifyAccessToken from "../services/accessTokenVerifyService";
import testService from "../services/testService";


const testRouter = express.Router();

testRouter.post("/add", verifyAccessToken, testService.addTest);
testRouter.get("/start/:room", verifyAccessToken, testService.startTest);

export default testRouter;