import { createBlog, getBlogs } from "@src/controllers/blogs.controller"
import { Router } from "express"

const blogRoutes = Router()

blogRoutes.post('/', createBlog)

blogRoutes.get('/', getBlogs)


export default blogRoutes