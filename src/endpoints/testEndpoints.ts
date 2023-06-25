import express from "express";
import verifyAccessToken from "../services/accessTokenVerifyService";
import testService from "../services/testService";


const testRouter = express.Router();

testRouter.post("/add", verifyAccessToken, testService.addTest);

export default testRouter;