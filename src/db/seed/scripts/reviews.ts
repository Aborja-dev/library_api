import { REVIEWS } from "../data/reviews.json";
import { Entities } from "../../schema/index";
import pc from "picocolors";

export const fillReviews = async () => {
    try {
        await Entities.Review.bulkCreate(REVIEWS)
    } catch (error) {
        console.error(pc.red('ocurrio un error al insertar reseñas'))
    }
}