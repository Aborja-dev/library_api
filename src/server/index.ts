import Express from "express";
import cors from "cors"
import morgan from "morgan";
import { AppConfig } from "../types/app";
import { userRouter } from "../user/user.routes";
import { reviewRouter } from "../reviews/review.routes";

export const app = Express()
app.use(cors())
app.use(morgan('tiny'))
app.use(Express.json())
// 404 not found
app.use('/user', userRouter)
app.use('/review', reviewRouter)
app.use('/', (req, res) => {
    return res.status(404).send('<h1>Page not found</h1>')
})


export const runApp = async ({port = 3000}: AppConfig) => {
    app.listen(3000, () => {
        console.log('servidor corriendo en puerto', port);
    })
}