import express from "express";
import {signUp} from "../services/exportServices";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", ()=>{});
router.post("/logout", ()=>{});
router.post("/acessToken", ()=>{});
router.post("/refreshToken", ()=>{});

export default router;