import express from "express";
import {authService} from "../services/exportServices";

const router = express.Router();

router.post("/signup", authService.signUp);
router.post("/login", authService.logIn);
router.post("/logout", ()=>{});
router.post("/acessToken", ()=>{});
router.post("/refreshToken", authService.newRefreshToken);

export default router;