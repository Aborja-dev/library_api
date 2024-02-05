import { Entities } from "../schema"
import { USERS } from "../../data/sql/users.json";
import pc from "picocolors";
  export const fillUsers = async () => {
    try {
      for (let i = 0; i < USERS.length; i++) {
        const element = USERS[i];
        await insertOneUser(element)
      }
      
  } catch (error: any) {
      console.error('ocurrio un error al insertar usuarios', error.message)
  }
  }
  type User = {
    id: string;
    username: string;
    password: string;
    name: string;
    news: boolean;
    frequency: number;
  }

  const insertOneUser = async (user: User) => { 
    try {
       // Crear el usuario e incluir la asociación de géneros
       const _user = await Entities.User.create(user) as any
       const genres = getGenres()
       _user.setGenres(genres)
       // console.log(pc.green(`Usuario ${user.name} insertado con éxito.`));
    } catch (error: any) {
       console.error(pc.red(`Ocurrió un error al insertar el usuar ${user.name}: ${error.message}`));
    }
   };
   const getGenres = () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const choiceGenres = choiceFromArray(array, 2)
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

