import { Entities } from "../schema"
import { fillBooks } from "./books"
import { fillGenres } from "./genres"
import { fillReviews } from "./reviews"
import { fillUsers } from "./user"

const entities = Object.values(Entities)
export const seed = async () => {
    for (let i = 0; i < entities.length; i++) {
        const element = entities[i];
        await element.destroy({where: {}})
    }
    await fillGenres()
    await fillBooks()
    await fillUsers()
    await fillReviews()
}