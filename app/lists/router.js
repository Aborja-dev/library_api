import { Router } from "express";

import { ListController } from "./controller.js";
export const router  = Router()

router.patch('/:listId', ListController.update)
router.post('/:listId', ListController.add)
