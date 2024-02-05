import { BOOKS } from "../../data/sql/books.json";
import { Entities } from "../schema";
import pc from "picocolors";

export const fillBooks = async () => {
  const booksPromises = BOOKS.map(book => insertOneBook(book))
  await Promise.all(booksPromises)
}
type Book = {
  title: string;
  author: string;
  pages: number;
  summary: string;
  rate: number;
  created_at: string;
}
export const insertOneBook = async (book: Book) => { 
  try {
     // Crear el libro e incluir la asociación de géneros
     const genres = getGenres()
     const newBook = await Entities.Book.create(book) as any
     newBook.setGenres(genres)
  } catch (error: any) {
     console.error(pc.red(`Ocurrió un error al insertar el libro ${book.title}: ${error.message}`));
  }
 };
 const getGenres = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const choiceGenres = choiceFromArray(array, 3)
  return choiceGenres
 }

 function choiceFromArray(array: any, n: any) {
  // Comprobar si n es mayor que la longitud del array
  if (n > array.length) {
     console.error('La cantidad solicitada de elementos excede la longitud del array.');
     return [];
  }
 
  // Ordenar el array aleatoriamente
  const shuffledArray = array.sort(() => Math.random() - 0.5);
 
  // Usar slice para obtener los primeros n elementos
  return shuffledArray.slice(0, n);
 }
 