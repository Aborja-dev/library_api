// El service es una clase que interactua con el modelo y el controlador sirve como una capa media para abstreaer la aprte de la base de datos

import { IBook, ID, createBook, searchParams } from "./schema/Books"

export class Book {
    books: IBook[]  = []
    constructor(books: IBook[]) {
        this.books = books
    }
    search ({autor, genero}: searchParams): IBook[] {
    const results = []
    if( !autor && !genero) {
        return this.books
    }
    if (autor) {
        const filteredByAutor = this.books.filter((book) => book.autor.includes(autor))
        results.push(filteredByAutor)
    }
    if (genero) {
        const filteredByGenero = this.books.filter((book) => book.autor.includes(genero))
        results.push(filteredByGenero)
    }
    const uniqueValues = new Set(results)
    return Array.from(uniqueValues)[0]    
}
    findById (bookId: ID): IBook | undefined {
        return this.books.find((book) => book.id === bookId)
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