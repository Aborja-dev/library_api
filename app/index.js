import Express from "express";
import { router } from "./user/user.router.js";
import cors from "cors"
import morgan from "morgan";
export const app = Express()
app.use(cors())
app.use(morgan('tiny'))
app.use(Express.json())

app.use('/user', router)
app.use('/', (req, res) => {
    return res.send('<h1>Hola express</h1>')
})
app.listen(3000, () => {
    console.log('servidor corriendo en puerto', 3000);
})