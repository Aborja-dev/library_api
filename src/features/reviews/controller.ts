import { Handler } from "express"
import { ReviewService } from "./service"

export class ControllerReview {
    static create: Handler = async (req, res) => {
        const {book, user, rate, comment} = req.body
        const review = await ReviewService.createOne({book, user, rate, comment})
        return res.status(200).json({review})
    }
    static getAll: Handler = async (req, res) => {
        const bookId = Number(req.params.bookId)
        const reviews = await ReviewService.getAll(bookId)
        return res.status(200).json({reviews})
    }
    static updateOne: Handler = async (req, res) => {
        const reviewId = Number(req.params.id)
        const {rate, comment} = req.body
        const result = await ReviewService.updateOne({id: reviewId, input: {rate, comment}})
        return res.status(200).json({result})
    }
    static destroyOne: Handler = async (req, res) => {
        const reviewId = Number(req.params.id)
        await ReviewService.deleteOne({ id: reviewId})
        return res.status(204).end()
    }
}