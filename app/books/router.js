import { Router } from "express";
import data from "../../data/index.js";
import _ from "lodash";
export const router = Router()
const users = data.users

router.post('/status', (req, res) => {
    // obtener usuario
    const { userId } = req.body
    // obtener libros
    let user = users.find(user => user.id === userId)
    // obtener array de id de libro y estatus
    const {statusArray} = req.body
    const newBooks = user.books.map(book => {
        // revisar que el id del libro este en el array
        const bookFinded = statusArray.find(([id]) => id === book.id) ?? null
        if (!bookFinded) {
            return book
        }
        // crear cambiar el status
        const [_id, status] = bookFinded
        return {
            ...book,
            status,
        }
    })
    user.books = newBooks
    res.status(200).json(users)
})

router.post('/', (req, res) => {
    const userId = req.body
    const bookInput = req.body.book
    const newBook = {
        ...bookInput,
        id: data.books.length + 1,
        status: 'Por Leer',
        created_at: new Date(),
        reviews: []
    }
    const user = users.find(user => user.id === userId)
    user.books.push(newBook)
})
router.get('/', (req, res) => {
    const bookWithRate = data.books.map(book => ({
        ...book,
        rate: average(book.reviews, book.reviews.length)
    }))
    const books = _.groupBy(bookWithRate, book => {
        return book.genre[0]
    })
    return res.status(200).json(books)
})

const average = (array, len) => {
    const values = array.map( el => el.rate )
    return values.reduce((acum, curr) => acum + curr) / len
}