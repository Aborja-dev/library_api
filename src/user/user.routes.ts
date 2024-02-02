import { Router, Handler } from "express";
import { Entities } from "../db/schema/index";
import { User } from "src/db/schema/models/User.schema";
import { LoginInput } from "./types";
import { toDateTime, toTimestamp, milisecondsToDay } from "../utils/helpers";
import { Op } from "sequelize";
import { UserModel } from "src/db/types/types";
import jwt from "jsonwebtoken";
const router = Router()

class UserSevice {
    private id: number
    private _user!: User | any
    constructor({id}: {id: number}) {
        this.id = id
    }
    public setGenres = async ({genres}: {genres: number[]}) => {
        const user = await this.user
        if (!user) return 'No se encontro el usuario'
        const _genres = genres.map((genrePk) => {
            return Entities.Genre.findByPk(genrePk)
        })
        const genresResolved = await Promise.all(_genres)
        return this._user.addGenre(genresResolved) as any

    }
    get user() {
        if (this._user) {
            return this._user
        } else {
            return this.findUser()
        }
    }
    private findUser = async () => {
        const resultPromise = Entities.User.findByPk(this.id)
        this._user = await resultPromise as User
        console.log('se hizo una peticion a la base de datos')
        return resultPromise
    }
    static login = async ({password, username}: LoginInput): Promise<UserModel | null> => {
        const hasUser = await this.validateLogin({password, username})
        return hasUser ?? null
    }
    private static  validateLogin = async ({password, username}: LoginInput): Promise<UserModel | null> => {
        const user = await Entities.User.findOne( { where: {
            username: username
        } } )
        if (!user) return null
        const validatePassword = user.password === password
        if (!validatePassword) null
        return user
    }
    get reccomendations () {
        return this.user
            .then((user: User) => user.frequency)
            .then((frequency: number) => {
                const now = Date.now() // tomamos la fecha de hoy
                // la convertimos a timestamp para restar los dias
                const datetime = toTimestamp(now) - (milisecondsToDay * frequency)
                const rangeDate = toDateTime(datetime)
                // buscamos los libros que esten en ese rango de fecha
                return Entities.Book.findAll({
                    where: {
                        "created_at": {
                            [Op.gt]: rangeDate
                        }
                    },
                    attributes: [ 'title', 'author',]
                })
            })      
    }

}


class controller {
    static setGenres: Handler = async (req, res) => {
        const id = Number(req.params.userId)
        const service = new UserSevice({ id })
        const {genres} = req.body
        const result = await service.setGenres({genres})
        res.status(200).json(result)
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


router.post('/info/:userId', controller.setGenres)
router.post('/login', controller.login)


export const userRouter = router