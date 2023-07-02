import express from "express";
import verifyAccessToken from "../services/accessTokenVerifyService";
import testLogService from "../services/testLogService";

const testLogRouter = express.Router();

testLogRouter.get("/get/", verifyAccessToken, testLogService.getTestLogs);

export default testLogRouter;