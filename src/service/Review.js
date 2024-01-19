// El service es una clase que interactua con el modelo y el controlador sirve como una capa media para abstreaer la aprte de la base de datos

class Review {
    books = []
    constructor (books) {
        this.books = books
    }
}

export default Review