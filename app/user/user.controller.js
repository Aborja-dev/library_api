import data from "../../data/index.js";
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { verifyUser, findUserById, getNews, setNewGenres } from "../utils/helpers.js";
export const UserController = {
    register: async (req, res) => {
        // TODO el username debe de ser unico
        // TODO los generos se deben asociar a una tabla genero
        // TODO el password debe de ser hasheado
        const { username, password, name, genres, news } = req.body
        const newUser = {
            id: data.USERS.length + 1,
            username,
            password,
            name,
            favoritesGenres: genres,
            books: [],
            news: news || false
        }
        data.USERS.push(newUser)
        res.status(200).json({ newUser, users: data.USERS })
    },
    login: async (req, res) => {
        const { username, password } = req.body
        // encontrar usuario
        const credentials = { username, password }
        const verify = verifyUser({ credentials })
        if (!verify) {
            return res.status(400).json({ message: 'username or password are incorrect' })
        }
        const user = verify
        const { news } = user
        let reccomendations = []
        if (news) {
            reccomendations = getNews({ days:30, genres: user.favoritesGenres })
        }
        // generar token
        const tokenPayload = {
            username: user.username,
            name: user.name
        }
        const token = jwt.sign(tokenPayload, 'SECRET')
        res.status(200).json({
            token,
            reccomendations
        })
    },
    update: async (req, res) => {
        const id = req.params.userid
        const newGenres = req.body.genres
        let user = findUserById({ id })
        user = setNewGenres({ user, genres: newGenres })
        const { news } = req.body
        user.news = news
        return res.status(200).json(user)
    }
}

