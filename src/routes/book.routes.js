import { Router } from 'express';
import { Book } from '../service/Book.js';
export const router = Router();
const LIBROS = [
    {
        "id": 2,
        "titulo": "Cien años de soledad",
        "autor": "Gabriel García Márquez",
        "genero": "Realismo mágico",
        "descripcion": "Una obra maestra de la literatura latinoamericana"
    },
    {
        "id": 3,
        "titulo": "The Hobbit",
        "autor": "J.R.R. Tolkien",
        "genero": "Fantasy",
        "descripcion": "A classic tale of adventure in Middle-earth"
    },
    {
        "id": 4,
        "titulo": "To Kill a Mockingbird",
        "autor": "Harper Lee",
        "genero": "Fiction",
        "descripcion": "A powerful exploration of justice and morality in the American South"
    },
    {
        "id": 5,
        "titulo": "1984",
        "autor": "George Orwell",
        "genero": "Dystopian",
        "descripcion": "A chilling vision of a totalitarian future"
    },
    {
        "id": 7,
        "titulo": "Los juegos del Hambre",
        "autor": "Suzanne Collins",
        "genero": "Dystopian",
        "descripcion": "A powerful exploration of justice and morality in the American South"
    },
    {
        "id": 6,
        "titulo": "The Great Gatsby",
        "autor": "F. Scott Fitzgerald",
        "genero": "Classic",
        "descripcion": "A tale of wealth, love, and the American Dream"
    }
]
console.log()
/// OBTENER UNA LISTA DE LIBROS
// filtrar por autor o genero
const modelBook = new Book(LIBROS)

router.get('/', async (req, res) => {
    const books = modelBook.books
    const { author, genre } = req.query
    if (author) {
        const response = books.filter((book) => book.autor.includes('Gabriel'))
        return res.json({ libros: response })
    }
    if (genre) {
        const response = books.filter((book) => book.genero.includes('Dystopian'))
        return res.json({ libros: response })
    }
    res.json({ libros: books })
})
// BUSCAR POR ID

router.get('/:id', async (req, res) => {
    const bookId = Number(req.params.id)
    const book = modelBook.books.find((book) => book.id === bookId)
    if (book) {
        res.json({ libro: book })
    } else {
        res.json({ message: 'no se encontro el libro' })
    }
})

// CREAR UN LIBRO
router.post('/', async (req, res) => {

    const newBook = modelBook.create(req.body)
    if (newBook) {
        res.json({ newBook })
    } else {
        res.status(400)
    }

})
// ACTUALIZARL LIBRO
router.patch('/:id', async (req, res) => {
    const { id } = req.params.id
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
    const { id } = req.params.id
    if (id == 1) {
        res.status(404).json({ message: 'No s eencontro el libro' })
    } else {
        res.status(201).end()
    }
    res.status(400).end()
})

