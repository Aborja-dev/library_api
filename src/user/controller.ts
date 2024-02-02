import { Handler } from "express"
import jwt from "jsonwebtoken"
import { UserSevice } from "./service"
import _ from "lodash";
export class controller {
    static setGenres: Handler = async (req, res) => {
        const id = Number(req.params.userId)
        const service = new UserSevice({ id })
        const {genres} = req.body
        const result = await service.setGenres({genres})
        return res.status(200).json(result)
    }

    static login: Handler = async (req, res) => {
        const {username, password} = req.body
        const user = await UserSevice.login({username, password}) as any
        const service = new UserSevice({ id: user.id })
        // generar token
        const tokenPayload = {
            username: user.username,
            name: user.name
        }
        const token = jwt.sign(tokenPayload, 'SECRET')
        if (user?.news ) {
            const books = await service.reccomendations
/*             const group = _.groupBy(books, (libro) => {
                const matchGenre = genres.find((genre) => libro.genre.includes(genre));
                return matchGenre || "undefined";
            });
            const { undefined, ...list } = group
            return list */
            return res.status(200).json({
                token,
                reccomendations: books
            })    
        }
        res.status(200).json({
            token
        })
        return res.status(200).json({user})
    }
}
