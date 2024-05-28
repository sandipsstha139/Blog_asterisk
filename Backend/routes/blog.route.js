import express from "express";
import { createBlog, testController } from '../controllers/blog.controller.js';
import upload from "../middlewares/uploadFile.js"

const router = express.Router();

router.route("/").post(upload.array("images",5), createBlog);
router.route("/:id").post(testController);

export default router;
