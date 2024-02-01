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
const insertOneBook = async (book: Book) => { 
  try {
     // Crear el libro e incluir la asociación de géneros
     const newBook = await Entities.Book.create(book) as any
     const genres = await getGenres()
      newBook.setGenres(genres)
     console.log(pc.green(`Libro ${newBook.title} insertado con éxito.`));
  } catch (error: any) {
     console.error(pc.red(`Ocurrió un error al insertar el libro ${book.title}: ${error.message}`));
  }
 };
 const getGenres = async () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const choiceGenres = choiceFromArray(array, 3)
  const genres = choiceGenres.map((genrePk: number) => Entities.Genre.findByPk(genrePk))
  return await Promise.all(genres)
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
 