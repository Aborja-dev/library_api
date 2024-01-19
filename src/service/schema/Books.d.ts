export interface IBook {
    id:          number;
    titulo:      string;
    autor:       string;
    genero:      string;
    descripcion?: string;
}

export type createBook = Omit<IBook, 'id'>
export type searchParams = {
    autor?: IBook['autor'],
    genero?: IBook['genero']
}
export interface Resena {
    id:         number;
    libro_id:   number;
    usuario_id: number;
    puntuacion: number;
    comentario: string;
}

export interface User {
    id:    number;
    name:  string;
    email: string;
    age:   number;
}