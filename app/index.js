import Express from "express";

export const app = Express()

app.use('/', (req, res) => {
    return res.send('<h1>Hola express</h1>')
})

app.listen(3000, () => {
    console.log('servidor corriendo en puerto', 3000);
})