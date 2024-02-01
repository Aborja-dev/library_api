import { REVIEWS } from "../../data/sql/reviews.json";
import { Entities } from "../schema";
import pc from "picocolors";

export const fillReviews = async () => {
    try {
        await Entities.Review.bulkCreate(REVIEWS)
    } catch (error) {
        console.error(pc.red('ocurrio un error al insertar reseñas'))
    }
}