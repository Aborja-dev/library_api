import { Router } from "express";
import { ControllerReview } from "./controller";
const router = Router()


router.post('/', ControllerReview.create)
router.get('/:bookId', ControllerReview.getAll)
router.patch('/:id', ControllerReview.updateOne)
router.delete('/:id', ControllerReview.destroyOne)

export const reviewRouter = router