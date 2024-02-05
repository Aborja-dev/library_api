import { Entities } from "../db/schema/index";
import { User } from "../db/schema/models/User.schema";
import { LoginInput, TokenPayload } from "./types";
import { toDateTime, toTimestamp, milisecondsToDay } from "../utils/helpers";
import { Op } from "sequelize";
import { UserModel } from "../db/types/types";
import jwt from "jsonwebtoken"
import _ from "lodash";
import { sequelize } from "../db/config";

export class UserSevice {
    private id: number
    private _user!: User | any
    constructor({ id }: { id: number }) {
        this.id = id
    }
    public static login = async ({ password, username }: LoginInput): Promise<UserModel | null> => {
        const hasUser = await this.validateLogin({ password, username })
        return hasUser ?? null
    }
    get reccomendations () {
            return this.user
            .then((user: User) => {
                const { frequency} = user
                const now = Date.now() // tomamos la fecha de hoy
                    // la convertimos a timestamp para restar los dias
                const datetime = toTimestamp(now) - (milisecondsToDay * frequency)
                const rangeDate = toDateTime(datetime)
                const result = Entities.User.findAll({
                    where: {id: this.id },
                    attributes: [],
                    include: [{
                        model: Entities.Genre,
                        through: { attributes: [] },
                        required: true,
                        attributes: ['name'],
                        include: [{
                            model: Entities.Book,
                            through: { attributes: [] },
                            required: true,
                            attributes: ['title', 'author', 'summary', 'pages'],
                            where: {'created_at': {[Op.gt]: rangeDate}}
                        }]
                    }]
                })
                return result
            })
            .then(res => res[0].Genres)
        } 
    get user() {
        if (this._user) {
            return this._user
        } else {
            return this.findUser()
        }
    }
    public setGenres = async ({ genres }: { genres: number[] }) => {
        const user = await this.user
        if (!user) return 'No se encontro el usuario'
        const _genres = genres.map((genrePk) => {
            return Entities.Genre.findByPk(genrePk)
        })
        const genresResolved = await Promise.all(_genres)
        return this._user.addGenre(genresResolved) as any

    }
    private findUser = async () => {
        const resultPromise = Entities.User.findByPk(this.id)
        this._user = await resultPromise as User
        // console.log('se hizo una peticion a la base de datos')
        return resultPromise
    }
    private static validateLogin = async ({ password, username }: LoginInput): Promise<UserModel | null> => {
        const user = await Entities.User.findOne({
            where: {
                username: username
            }
        })
        if (!user) return null
        const validatePassword = user.password === password
        if (!validatePassword) null
        return user
    }
    public createToken = async (tokenPayload: TokenPayload) => {
        return jwt.sign(tokenPayload, 'SECRET')
    }
}