import { Router } from "express";
import { UserController } from "./user.controller.js";
export const router  = Router()

router.patch('/lists/:listId')
router.post('/login', UserController.login)
router.patch('/:userid/config', UserController.update)