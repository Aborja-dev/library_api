var express = require('express');
const Book = require('../service/Book');
var router = express.Router();
const data = require('../../data/data.json')
/// OBTENER UNA LISTA DE LIBROS
// filtrar por autor o genero
const modelBook = new Book(data.LIBROS)

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
        res.json({ newBook  })
    } else {
        res.status(400)
    }
    
})
// ACTUALIZARL LIBRO
router.patch('/:id', async (req, res) => {
    const {id} = req.params.id
    if(id == 1) {
        res.status(404).json({message: 'No se encontro el libro'})
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
    const {id} = req.params.id
    if(id == 1) {
        res.status(404).json({message: 'No s eencontro el libro'})
    } else {
        res.status(201).end()
    }
    res.status(400).end()
})


module.exports = router
