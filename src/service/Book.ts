// El service es una clase que interactua con el modelo y el controlador sirve como una capa media para abstreaer la aprte de la base de datos

import { IBook, createBook, searchParams } from "./schema/Books"

export class Book {
    books: IBook[]  = []
    constructor(books: IBook[]) {
        this.books = books
    }
    search ({autor, genero}: searchParams) {
    if (autor) {
        const filteredByAutor = this.books.filter((book) => book.autor.includes('Gabriel'))
    }
    if (genero) {
        const filteredByGenero = books.filter((book) => book.genero.includes('Dystopian'))
        const responseJson :searchResponse = { success: true, result: filteredBooks }
        return res.json(responseJson)
    }
        const responseJson :searchResponse = { success: true, result: books }
        return res.json(responseJson)
    }
    create(input: createBook): IBook | null {
        if (input.hasOwnProperty('titulo')) {
            return {
                id: this.books.length + 1,
                ...input
            }
        } else {
            return null
        }
    }
}