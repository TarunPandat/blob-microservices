//@ts-nocheck

import HttpStatusCodes from "@src/common/constants/HttpStatusCodes"
import { createUser, getUserById, loginUser, updateUser } from "@src/controllers/users.controller"
import { Router, Request, Response } from "express"


const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(HttpStatusCodes.OK).json({
    data: []
  })
})

router.post('/user', createUser)

router.post('/login', loginUser)

router.get('/:id', getUserById)

router.patch('/:id', updateUser)

export default router