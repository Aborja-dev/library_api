import { Router, Handler } from "express";
import { Entities } from "../../db/schema";
import { sequelize } from "../../db/config";
import { Op } from "sequelize";

const router = Router();

const create: Handler = async (req, res) => {
    const {name, userId, books} = req.body
    // crear un nueva lista
    const newList= await Entities.List.create({ name, fk_user: userId }) as any
    // insertar libros en lista 
    newList.setBooks(books)
    res.json(newList)
}

const updateOneBook: Handler = async (req, res) => {
    const bookId  = Number(req.params.bookId)     
    const { status } = req.body
    await Entities.BookList.update({ status  }, { 
        where: {
            BookId: bookId
        }
     })
     const promiseResult = sequelize.query(`
     select b.title, b.author, b.summary, bl.status from book b join book_list bl on bl.BookId = b.id
    WHERE b.id = ?
     ` , {
        replacements: [bookId]
     }).then(res => res[0][0])
     const book = await promiseResult
     res.json(book)

}

const getListByStatus: Handler = async (req, res) => {
    const {status} = req.query
    const resultPromise = Entities.List.findAll({
        attributes: ['name'],
        include: {
            model: Entities.Book,
            through: {
                attributes: ['status'],
                where: {
                    status
                }
            },
            attributes: ['title', 'author', 'summary'],
        },
    })
    .then((res: any) => res[0].Books.map(b => {
        return {
            title: b.title,
            author: b.author,
            summary: b.summary,
            status: b.BookList.status
        }
    }))
    const result = await resultPromise
    res.json(result)
}

const deleteOneBookFromList: Handler = async (req, res) => {
    const {listId, bookId} = req.params
    await Entities.BookList.destroy({
        where: {
            [Op.and]: {
                BookId: bookId,
                ListId: listId
            }
        }
    })
    res.json({listId, bookId})
}


router.post("/", create);
router.patch("/book/:bookId", updateOneBook);
router.get("/", getListByStatus);
router.delete("/:listId/:bookId", deleteOneBookFromList);

export const listRouter = router

