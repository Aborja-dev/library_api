// routes/reviewsRoutes.js
import { Router } from "express";
import * as reviewsController from "./controller.js";

export const router = Router();

router.post("/:user", reviewsController.createReview);
router.get("/books/:bookId", reviewsController.getReviewsByBookId);
router.put("/:id", reviewsController.updateReview);
router.delete("/:id", reviewsController.deleteReview);
