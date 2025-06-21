import HttpStatusCodes from "@src/common/constants/HttpStatusCodes"
import { apiRequest } from "@src/utils/fetcher"
import { AxiosResponse } from "axios"
import { Router } from "express"

const blogRoutes = Router()

blogRoutes.post('/', async (req, res) => {
    try {
    const data = req.body
    const result: AxiosResponse = await apiRequest('blogs', '/blog', {method: 'POST', data})

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

blogRoutes.get('/', async (req, res) => {
    const result: AxiosResponse = await apiRequest('blogs', '/blog')
    if(result.status === HttpStatusCodes.OK)
    {

        const blogs = await Promise.all(result?.data?.data?.map(async (b: any) => {
            const user: AxiosResponse = await apiRequest('users', '/users/'+b?.user) 
            return {...b, user: user?.data?.user}
        }))


      res.status(HttpStatusCodes.OK).json({
        error: false,
        data: blogs
      })
    }
    else {
      res.status(result.status).json({
        error: true,
        ...result?.data?.data
      })
    }
})

export default blogRoutes