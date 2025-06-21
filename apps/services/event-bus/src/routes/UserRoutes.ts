import HttpStatusCodes from "@src/common/constants/HttpStatusCodes"
import { apiRequest } from "@src/utils/fetcher"
import { AxiosResponse } from "axios"
import { Router, Request, Response } from "express"


const userRoutes = Router()

userRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const result: AxiosResponse = await apiRequest('users', '/users')

    if(result.status === HttpStatusCodes.OK)
    {
      res.status(HttpStatusCodes.OK).json({
        error: false,
        data: result?.data?.data
      })
    }
    else {
      res.status(HttpStatusCodes.CONFLICT).json({
        error: true,
        ...result?.data
      })
    }
  } catch (error) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      error: true,
      errorData: error
    })
  }
})

userRoutes.post('/user', async (req: Request, res: Response) => {
  try {
    const data = req.body
    const result: AxiosResponse = await apiRequest('users', '/users/user', {method: 'POST', data})

    if(result.status === HttpStatusCodes.CREATED)
    {
      res.status(HttpStatusCodes.CREATED).json({
        error: false,
        data: result?.data?.data
      })
    }
    else {
      res.status(result.status).json({
        error: true,
        ...result?.data?.data
      })
    }
  } catch (error) {
    res.status(error?.response?.status).json({
      error: true,
      ...error?.response?.data
    })
  }
})

userRoutes.post('/login', async (req: Request, res: Response) => {
  try {
    const data = req.body
    const result: AxiosResponse = await apiRequest('users', '/users/login', {method: 'POST', data})


    if(result.status === HttpStatusCodes.OK)
    {
      res.status(HttpStatusCodes.OK).json({
        error: false,
        user: result?.data?.user
      })
    }
    else {
      res.status(result.status).json({
        error: true,
        ...result?.data?.data
      })
    }
  } catch (error) {
    res.status(error?.response?.status).json({
      error: true,
      ...error?.response?.data
    })
  }
})

export default userRoutes