import { Router, Handler } from "express";
import { Entities } from "../db/schema";

const router = Router();

const create: Handler = async (req, res) => {
    const {name, userId, books} = req.body
    // crear un nueva lista
    const newList= await Entities.List.create({ name, fk_user: userId }) as any
    // insertar libros en lista 
    newList.setBooks(books)
    res.json(newList)
}

router.post("/", create);

export const listRouter = router

