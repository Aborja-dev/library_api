import { Router } from "express";
const router = Router()
import { controller } from "./controller";

router.post('/info/:userId', controller.setGenres)
router.post('/login', controller.login)


export const userRouter = router