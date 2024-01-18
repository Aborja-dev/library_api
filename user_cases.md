
### Historias de Usuario:

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

