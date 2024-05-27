import express from "express";
import { createBlog, testController } from '../controllers/blog.controller.js';

const router = express.Router();

router.route("/").post(createBlog);
router.route("/:id").post(testController);

export default router;
