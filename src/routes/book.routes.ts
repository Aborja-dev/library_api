import { IBook } from './../service/schema/Books.d';
import { Request, Response, Router } from 'express';
import { Book } from '../service/Book';
export const router = Router();

import { LIBROS  } from "../data/data.json";

/// OBTENER UNA LISTA DE LIBROS
// filtrar por autor o genero
const modelBook = new Book(LIBROS)
type failedResponse = {success: false, message: string}
type searchResponse = {success: true, result: IBook[] | IBook} | failedResponse
router.get('/', async (req: Request, res: Response): Promise<Response<searchResponse>> => {
    const books = modelBook.books
    const { author, genre } = req.query
    if (author) {
        const filteredBooks = books.filter((book) => book.autor.includes('Gabriel'))
        const responseJson :searchResponse = { success: true, result: filteredBooks }
        return res.json(responseJson)
    }
    if (genre) {
        const filteredBooks = books.filter((book) => book.genero.includes('Dystopian'))
        const responseJson :searchResponse = { success: true, result: filteredBooks }
        return res.json(responseJson)
    }
        const responseJson :searchResponse = { success: true, result: books }
        return res.json(responseJson)
})
// BUSCAR POR ID

router.get('/:id', async (req: Request, res: Response): Promise<Response<searchResponse>> => {
    const bookId = Number(req.params.id)
    const book = modelBook.books.find((book) => book.id === bookId)
    if (book) {
        const responseJson :searchResponse = { success: true, result: book }
        return res.json(responseJson)
    } else {
        const responseJson :searchResponse = { success: false, message: 'no se encontro el libro' }
        return res.json(responseJson)
    }
})

// CREAR UN LIBRO
router.post('/', async (req: Request, res: Response) => {

    const newBook = modelBook.create(req.body)
    if (newBook) {
        res.json({ newBook })
    } else {
        res.status(400)
    }

})
// ACTUALIZARL LIBRO
router.patch('/:id', async (req, res) => {
    const id  = Number(req.params.id)
    if (id == 1) {
        res.status(404).json({ message: 'No se encontro el libro' })
    } else {
        res.json({
            sucess: true,
            update: {
                "id": 7,
                "titulo": "Los juegos del Hambre",
                "autor": "Suzanne Collins",
                "genero": "Ficción",
                "descripcion": "Una breve descripción del libro."
            }
        })
    }
    res.status(400).end()
})
// BORRAR LIBRO
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (id == 1) {
        res.status(404).json({ message: 'No s eencontro el libro' })
    } else {
        res.status(201).end()
    }
    res.status(400).end()
})

