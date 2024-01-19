// El service es una clase que interactua con el modelo y el controlador sirve como una capa media para abstreaer la aprte de la base de datos

export class User {
    users = []
    constructor (users) {
        this.users = users
    }
}