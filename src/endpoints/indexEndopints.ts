import express from "express";
import authRouter from "./authEndpoints"

const router: express.Router = express.Router()
router.use('/auth', authRouter);

export default router;