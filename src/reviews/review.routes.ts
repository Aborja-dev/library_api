import { Router, Handler } from "express";
import { Entities } from "../db/schema";
const router = Router()
class ReviewService {
    public static createOne = async (input: any) => {
        const {book, user, rate, comment, created_at, uuid} = input
        const review = await Entities.Review.create({
            fk_book: book,
            fk_user: user,
            rate,
            comment,
            created_at,
            uuid
        })
        return review
    }
}

class ControllerReview {
    create: Handler = async (req, res) => {
        const {book, user, rate, comment, created_at, uuid} = req.body
        const review = await ReviewService.createOne({book, user, rate, comment, created_at, uuid})
        return res.status(200).json({review})
    }
}

const controller = new ControllerReview()

router.post('/', controller.create)


export const reviewRouter = router