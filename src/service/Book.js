// El service es una clase que interactua con el modelo y el controlador sirve como una capa media para abstreaer la aprte de la base de datos

class Book {
    books = []
    constructor (books) {
        this.books = books
    }
    create (input) {
        if (input.hasOwnProperty('titulo')) {
            return {
                id: this.books.length +1 ,
                ...input
            }
        } else {
            return null
        }
    }
}

module.exports = Book