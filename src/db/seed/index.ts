import { Entities } from "../schema"
import { fillBooks } from "./scripts/books"
import { fillGenres } from "./scripts/genres"
import { fillReviews } from "./scripts/reviews"
import { fillUsers } from "./scripts/user"
import pc from "picocolors";
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
    console.log(pc.green('los datos han sido cargados con exito'))
}