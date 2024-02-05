import { Router, Handler } from "express";
import { Entities } from "../db/schema";
import { randomUUID } from "node:crypto";
const router = Router()
class ReviewService {
    public static createOne = async (input: any) => {
        const {book, user, rate, comment, } = input
        const review = await Entities.Review.create({
            fk_book: book,
            fk_user: user,
            rate,
            comment,
            created_at: new Date().toDateString(),
            uuid: randomUUID()
        })
        return review
    }
}

class ControllerReview {
    static create: Handler = async (req, res) => {
        const {book, user, rate, comment} = req.body
        const review = await ReviewService.createOne({book, user, rate, comment})
        return res.status(200).json({review})
    }
    static getAll: Handler = async (req, res) => {
        const bookId = Number(req.params.bookId)
        const reviews = await Entities.Review.findAll({
            attributes: ['rate', 'comment'],
            where: {
                'fk_book': bookId
            }
        })
        return res.status(200).json({reviews})
    }
    static updateOne: Handler = async (req, res) => {
        const reviewId = Number(req.params.id)
        const {rate, comment} = req.body
        const result = await Entities.Review.update({ rate, comment},{
            where: {
                'id': reviewId
            }
        })
        const review = await Entities.Review.findByPk(reviewId, { attributes: ['rate', 'comment']})
        return res.status(200).json({review})
    }
    static destroyOne: Handler = async (req, res) => {
        const reviewId = Number(req.params.id)
        await Entities.Review.destroy({
            where: {
                id: reviewId
            }
        })
        const review = await Entities.Review.findByPk(reviewId)
        return res.status(204).end()
    }
}

router.post('/', ControllerReview.create)
router.get('/:bookId', ControllerReview.getAll)
router.patch('/:id', ControllerReview.updateOne)
router.delete('/:id', ControllerReview.destroyOne)

export const reviewRouter = router