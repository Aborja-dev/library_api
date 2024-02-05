import { randomUUID } from "crypto"
import { Entities } from "../db/schema"

export class ReviewService {
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
    public static getAll = async (id: any) => {
        return await Entities.Review.findAll({
            attributes: ['rate', 'comment'],
            where: {
                'fk_book': id
            }
        })
    }
    public static updateOne = async ({id, input}: any) => {
        const {rate, comment} = input
        await Entities.Review.update({ rate, comment},{
            where: {
                'id': id
            }
        })
        return await Entities.Review.findByPk(id, { attributes: ['rate', 'comment']})
    }
    public static deleteOne = async ({ id }: any) => {
        await Entities.Review.destroy({
            where: {
                id: id
            }
        })
    }
    
}