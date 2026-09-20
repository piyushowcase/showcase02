import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { changes, deploy, generateWebsite, getAll, getWesiteById } from "../controller/websiteController.js";
const websiteRouter= express.Router();
websiteRouter.post("/generate",isAuth,generateWebsite)
websiteRouter.get("/get-by-id/:id",isAuth,getWesiteById)

websiteRouter.post("/update/:id",isAuth,changes)
websiteRouter.get("/get-all",isAuth,getAll)
websiteRouter.get("/deploy",isAuth,deploy)

export default websiteRouter