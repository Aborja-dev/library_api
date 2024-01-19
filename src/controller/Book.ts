import { Request, Response } from 'express';
import { IBook } from './../service/schema/Books.d';
import { Book } from '../service/Book';
import { LIBROS  } from "../data/data.json";

const modelBook = new Book(LIBROS)
type failedResponse = {success: false, message: string}
type searchResponse = {success: true, result: IBook[] | IBook} | failedResponse

export const BookController = {
    searchByQuery: async (req: Request, res: Response): Promise<Response<searchResponse>> => {
        const { author, genre } = req.query
        if (author) {
            const filteredBooks = modelBook.search({ autor: author as string })
            const responseJson :searchResponse = { success: true, result: filteredBooks }
            return res.json(responseJson)
        }
        if (genre) {
            const filteredBooks = modelBook.search({ genero: genre as string })
            const responseJson :searchResponse = { success: true, result: filteredBooks }
            return res.json(responseJson)
        }
        const filteredBooks = modelBook.search({  })
            const responseJson :searchResponse = { success: true, result: filteredBooks }
            return res.json(responseJson)
    },

    getById: async (req: Request, res: Response): Promise<Response<searchResponse>> => {
        const bookId = Number(req.params.id)
        const book = modelBook.findById(bookId)
        if (book) {
            const responseJson :searchResponse = { success: true, result: book }
            return res.json(responseJson)
        } else {
            const responseJson :searchResponse = { success: false, message: 'no se encontro el libro' }
            return res.json(responseJson)
        }
    }
}
