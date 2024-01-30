import data  from '../../data/users.json' with { type: "json" }
import jwt from 'jsonwebtoken'
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
        res.status(200).json({newUser, users: data.USERS})
    },
    login: async (req, res) => {
        const {username, password} = req.body 
        // encontrar usuario
        const credentials = {username, password}
        const verify = verifyUser({credentials})
        if (!verify) {
            return res.status(400).json({message: 'username or password are incorrect'})
        }
        const user = verify
        const { news } = req.body
        const reccomendations = []
        if (news) {
            const now = Date.now()
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
    }
}

const verifyUser = ({credentials}) => {
    const {username, password} = credentials
    const users = data.USERS
    const userIndex = users.findIndex(user => user.username === username)
    if (userIndex === -1) return false
    const user = users[userIndex]
    const comparePassword = user.password === password
    if (!comparePassword) return false
    return user
}