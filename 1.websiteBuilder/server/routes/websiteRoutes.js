import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { changes, deploy, generateWebsite, getAll, getWebsiteBySlug, getWesiteById } from "../controller/websiteController.js";
const websiteRouter= express.Router();
websiteRouter.post("/generate",isAuth,generateWebsite)
websiteRouter.get("/get-by-id/:id",isAuth,getWesiteById)

websiteRouter.post("/update/:id",isAuth,changes)
websiteRouter.get("/get-all",isAuth,getAll)
websiteRouter.get("/deploy/:id",isAuth,deploy)
websiteRouter.get("/get-by-slug/:slug",isAuth,getWebsiteBySlug)
export default websiteRouter