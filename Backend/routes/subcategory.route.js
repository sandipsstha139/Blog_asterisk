import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategoryID,
  updateSubCategory,
  getAllSubCategory,
} from "../controllers/subcategory.controller.js";

const router = express.Router();

router.route("/").get(getAllSubCategory).post(createSubCategory);
router
  .route("/:id")
  .get(getSubCategoryID)
  .put(updateSubCategory)
  .delete(deleteSubCategory);

export default router;
