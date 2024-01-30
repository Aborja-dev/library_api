export const verifyUser = ({ credentials }) => {
    const { username, password } = credentials
    const users = data.users
    const userIndex = users.findIndex(user => user.username === username)
    if (userIndex === -1) return false
    const user = users[userIndex]
    const comparePassword = user.password === password
    if (!comparePassword) return false
    return user
}

export const setNewGenres = ({ user, genres }) => {
    user.favoritesGenres = genres
    return user
}

export const findUserById = ({ id }) => {
    const user = users.find(user => user.id === id) ?? false
    return user
}


export const getNews = ({ days = 30, genres, author }) => {
    const books = data.books
    const dayToMiliseconds = 1000*60*60*24
    const filteredBooks = books.filter((libro) => {
        const fechaLimite = Date.now() - (dayToMiliseconds * days)
        const fechaLibro = new Date(libro.created_at).getTime()
        return fechaLibro > fechaLimite
    })
    if (genres) {
        const group = _.groupBy(filteredBooks, (libro) => {
            const matchGenre = genres.find((genre) => libro.genre.includes(genre));
            return matchGenre || "undefined";
        });
        const { undefined, ...list } = group
        return list
    }
    if (author) {
        const group = _.groupBy(filteredBooks, (libro) => {
            return libro.author || "undefined"
        });
        const { undefined, ...list } = group
        return list
    }
}

export const choiceFromArray = (array, count = 3) => {
    // Verificar si el array tiene al menos tres elementos
    if (array.length < count) {
      console.error(`El array debe tener al menos ${count} elementos.`);
      return null;
    }
    // Copiar el array para no modificar el original
    const copiaArray = [...array];
    // Array para almacenar los elementos seleccionados al azar
    const selected = [];
    // Seleccionar tres elementos al azar
    for (let i = 0; i < count; i++) {
      // Obtener un índice al azar
      const randomIndex = Math.floor(Math.random() * copiaArray.length);
      // Extraer el elemento correspondiente al índice y agregarlo al array de elementos seleccionados
      selected.push(copiaArray.splice(randomIndex, 1)[0]);
    }
    return selected;
  }
  
  