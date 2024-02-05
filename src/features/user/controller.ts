import { Handler } from "express"

import { UserSevice } from "./service"
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
        const token = service.createToken({name: user.name, username: user.username})
        if (user?.news ) {
            const books = await service.reccomendations
            return res.status(200).json({
                books
            })    
        }
        res.status(200).json({
            token
        })
        return res.status(200).json({user})
    }
}
