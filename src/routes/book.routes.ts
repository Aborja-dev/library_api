import { Request, Response, Router } from 'express';
import { BookController } from '../controller/Book';
export const router = Router();



/// OBTENER UNA LISTA DE LIBROS
// filtrar por autor o genero

router.get('/', BookController.searchByQuery)
// BUSCAR POR ID

router.get('/:id', BookController.getById)

// CREAR UN LIBRO
router.post('/', async (req: Request, res: Response) => {

    /* const newBook = modelBook.create(req.body)
    if (newBook) {
        res.json({ newBook })
    } else {
        res.status(400)
    } */

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

