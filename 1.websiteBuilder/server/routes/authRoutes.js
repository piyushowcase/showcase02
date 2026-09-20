import express from "express";
import {googleauth, logout } from '../controller/authController.js'     
const authRouter= express.Router();
// authRouter.post("/register",register)
authRouter.post("/google",googleauth)
authRouter.get("/logout",logout)
export default authRouter;
