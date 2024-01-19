
### Historias de Usuario:
## user
1. **Obtener lista de libros:**
   - **Endpoint:** `/libros`
   - **Método:** `GET`
   - **Parámetros de consulta opcionales:** 
     - `autor`: Filtrar por autor
     - `genero`: Filtrar por género
   - **Respuesta exitosa:**
     ```json
     {
       "libros": [
         {"id": 1, "titulo": "Libro 1", "autor": "Autor 1", "genero": "Ficción"},
         {"id": 2, "titulo": "Libro 2", "autor": "Autor 2", "genero": "No ficción"}
         // ...
       ]
     }
     ```
   - **Respuesta de error:**
     ```json
     {
       "error": "No se pudo obtener la lista de libros"
     }
     ```

2. **Obtener detalles de un libro específico:**
   - **Endpoint:** `/libros/{id}`
   - **Método:** `GET`
   - **Respuesta exitosa:**
     ```json
     {
       "id": 1,
       "titulo": "Libro 1",
       "autor": "Autor 1",
       "genero": "Ficción",
       "descripcion": "Una breve descripción del libro."
     }
     ```
   - **Respuesta de error:**
     ```json
     {
       "error": "No se encontró el libro con el ID proporcionado"
     }
     ```
3. **Crear una reseña:**
   - **Endpoint:** `/reviews`
   - **Método:** `POST`
   - **Respuesta exitosa:**
     ```json
     {
       "id": 3,
       "libro_id": 3,
       "usuario_id": 5,
       "puntuacion": 8.5,
       "comentario": "The Hobbit es un viaje épico que nunca olvidaré."
     }
     ```
   - **Respuesta de error:**
     ```json
     {
       "error": "No se encontró el libro con el ID proporcionado"
     }
     ```
4. **Eliminar una reseña:**
   - **Endpoint:** `/reviews/{id}`
   - **Método:** `GET`
   - **Respuesta exitosa:**
     ```json
     {
       "success": "La reseña se ha borrado con exito"
     }
     ```
   - **Respuesta de error:**
     ```json
     {
       "error": "No se encontró el libro con el ID proporcionado"
     }
     ```

## Vendedor

1. **Crear libros:**
   - **Endpoint:** `/libros`
   - **Método:** `POST`
   - **Cuerpo de la peticion:** 
     ```json
     {
     "titulo": "1984",
            "autor": "George Orwell",
            "genero": "Dystopian",
            "descripcion": "A chilling vision of a totalitarian future"
            }
     ```
   - **Respuesta exitosa:**
     ```json
     {
            "id": 5,
            "titulo": "1984",
            "autor": "George Orwell",
            "genero": "Dystopian",
            "descripcion": "A chilling vision of a totalitarian future"
        }
     ```
   - **Respuesta de error:**
     ```json
     {
       "error": "No se pudo obtener la lista de libros"
     }
     ```

2. **Actualizar Descripcion de un libro:**
   - **Endpoint:** `/libros/{id}`
   - **Método:** `PATCH`
   - **Cuerpo de la peticion**
   ```json
   {
      "genero": "Ficción",
       "descripcion": "Una breve descripción del libro."
   }
   ```
   - **Parametros de actualizacion**
   `descripcion, genero`
   - **Respuesta exitosa:**
     ```json
     {
       "id": 1,
       "titulo": "Libro 1",
       "autor": "Autor 1",
       "genero": "Ficción",
       "descripcion": "Una breve descripción del libro."
     }
     ```
   - **Respuesta de error:**
     ```json
     {
       "error": "No se encontró el libro con el ID proporcionado"
     }
     ```
3. **Eliminar un libro**
   - **Endpoint:** `/book`
   - **Método:** `DELETE`
   - **Respuesta exitosa:**
     ```json
     {
       "id": 3,
       "libro_id": 3,
       "usuario_id": 5,
       "puntuacion": 8.5,
       "comentario": "The Hobbit es un viaje épico que nunca olvidaré."
     }
     ```
   - **Respuesta de error:**
     ```json
     {
       "error": "No se encontró el libro con el ID proporcionado"
     }
     ```