import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { billing } from "../controller/billing.Controller.js";
const billingRouter= express.Router();
billingRouter.post("/",isAuth,billing)

export default billingRouter;