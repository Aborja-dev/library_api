import data from "../../data/index.js";
const lists = data.lists
export const ListController = {
    update: async (req, res) => {
        // obtener la lista
        const listId = Number(req.params.listId)
        let listIndex = lists.findIndex(list => list.id === listId) ?? null
        // si no se encuentra lista retornar error
        if (listIndex === -1) return res.status(400).json({message: 'list not found'})
        // obtienne la lista y el input
        let list = lists[listIndex]
        const {input} = req.body
        // actualiza el estatus de los libros
        const newListBooks = list.books.map((book) => {
            const finded = input.find(([id]) => id == book.id)
            if (finded) {
                return { ...book, status: finded[1]} // remplaza el status
            } else return book
        })
        // crea una nueva lista
        const newList = {
            ...list,
            books: newListBooks
        }
        const response = {
            name: list.name,
            books: newListBooks.map(book => ({title: book.title, status: book.status}))
        }
        lists[listIndex] = newList
        return res.status(200).json(response)
    },
    // Agrega un libro a una lista
    add: async (req, res) => {
        const listId = Number(req.params.listId)
        let list = lists.find(list => list.id === listId) ?? null
        if (!list) return res.status(400).json({message: 'list not found'})
        const {book} = req.body
        const newBook = {
            ...book,
            status: 'Por leer'
        }
        list.books.push(newBook)
        return res.status(200).json(list)
    },
    remove: async (req, res) => {
        const listId = Number(req.params.listId)
        const bookId = Number(req.params.bookId)
        let list = lists.find(list => list.id === listId) ?? null
        if (!list) return res.status(400).json({message: 'list not found'})
        const index = list.books.findIndex((book) => book.id === bookId)
        const newList = list.books.splice(index,1)
        list = newList
        return res.status(200).json(list)
    },
    getAll: async (req, res) => {
        const {userId} = req.body
        const user = data.users.find(user => user.id === userId)
        return res.status(200).json(user.books)
    }
}