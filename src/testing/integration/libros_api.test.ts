import supertest from 'supertest'
import { app } from '../../app'
const baseUrl = '/api/v1'
import * as data from '../../data/data.json'
import { IBook } from '../../service/schema/Books'
// GET BOOKS
describe('get books endpoint', async () => {
    // GET ALL BOOKS
    describe('GET ALL BOOKS', async () => {
        test('200 - OK', async () => {
            await supertest(app)
                .get(`${baseUrl}/books`)
                .expect(200)
                .expect('Content-Type', /json/)
        })
        test('return array of books', async () => {
            const response = await supertest(app)
                .get(`${baseUrl}/books`)
            expect(response.body.result).toHaveLength(data.LIBROS.length)
            const books = response.body.result
            books.forEach((book) => {
                expect(book).toHaveProperty('titulo')
                expect(book).toHaveProperty('id')
            })
        })
    })
    // GET BOOKS BY GENRE
    describe('GET BOOKS BY GENRE', () => {
        test('200 - OK', async () => {
            await supertest(app)
                .get(`${baseUrl}/books`)
                .query({ genre: 'Dystopian' })
                .expect(200)
                .expect('Content-Type', /json/)
        })
        test('return array of books', async () => {
            const response = await supertest(app)
                .get(`${baseUrl}/books`)
                .query({ genre: 'Dystopian' })
            const books = response.body.result
            expect(
                books.every((book: IBook) => book.genero === 'Dystopian')
            ).toBe(true)
        })
    })
    // GET BOOKS BY AUTHOR
    describe('GET BOOKS BY AUTHOR', () => {
        test('200 - OK', async () => {
            await supertest(app)
                .get(`${baseUrl}/books`)
                .query({ author: 'Suzanne' })
                .expect(200)
                .expect('Content-Type', /json/)
        })
        test('return array of books', async () => {
            const response = await supertest(app)
                .get(`${baseUrl}/books`)
                .query({ author: 'Suzanne' })
            const books = response.body.result
            expect(
                books.every((book: IBook) => book.autor.includes('Suzanne'))
            ).toBe(true)
        })
    })

})
// GET BOOK BY ID
describe('get books by id endpoint', () => {
    const bookId = 2
    test('200 - OK', async () => {
        await supertest(app)
            .get(`${baseUrl}/books/${bookId}`)
            .expect(200)
            .expect('Content-Type', /json/)
    })
    test('return a book', async () => {
        const expectedObject = {
            "id": 2,
            "titulo": "Cien años de soledad",
            "autor": "Gabriel García Márquez",
            "genero": "Realismo mágico",
            "descripcion": "Una obra maestra de la literatura latinoamericana"
        }
        const response = await supertest(app)
            .get(`${baseUrl}/books/${bookId}`)
        expect(response.body.result).toMatchObject(expectedObject)
    })
})
