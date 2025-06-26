import { createBlog, getBlogs, updateBlog } from "@src/controllers/blogs.controller"
import { Router } from "express"

//@ts-nocheck

const blogRoutes = Router()

//@ts-ignore
blogRoutes.post('/', createBlog)

blogRoutes.put('/:id', updateBlog)

blogRoutes.get('/', getBlogs)


export default blogRoutes