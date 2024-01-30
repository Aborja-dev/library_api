import data from "../../data/index.js";
const lists = data.lists
export const ListController = {
    update: async (req, res) => {
        const listId = Number(req.params.listId)
        let list = lists.find(list => list.id === listId) ?? null
        let listIndex = lists.findIndex(list => list.id === listId) ?? null
        if (!list) return res.status(400).json({message: 'list not found'})
        const {input} = req.body
        const newListBooks = list.books.map((book) => {
            const finded = input.find(([id]) => id == book.id)
            if (finded) {
                return { ...book, status: finded[1]}
            } else return book
        })
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
    add: async (req, res) => {
        const listId = Number(req.params.listId)
        let list = lists.find(list => list.id === listId) ?? null
        if (!list) return res.status(400).json({message: 'list not found'})
        const {book} = req.body
        
        list.books.push({book})
        return res.status(200).json(list)
    }

}