import express from "express";
import verifyAccessToken from "../services/accessTokenVerifyService";
import questionService from "../services/questionService";

const questionRouter = express.Router();

questionRouter.post('/add', verifyAccessToken, questionService.addQuestion);
questionRouter.get('/get', verifyAccessToken, questionService.getQuestions);

export default questionRouter;