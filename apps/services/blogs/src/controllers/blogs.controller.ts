import HttpStatusCodes from '@src/common/constants/HttpStatusCodes'
import { Blog } from '@src/models'
import {Request, Response} from 'express'

export const createBlog = async (req: Request, res: Response) => {
    const {title, content, userId} = req.body

    try {
        const blog = await Blog.create({title, content, user: userId})

    if(!title && !content && !userId) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            msg: 'Title, content, userId is required'
        })
    }

    if(blog) {
        res.status(HttpStatusCodes.CREATED).json({
            error: false,
            data: blog
        })
    }
    else {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            msg: 'Unable to create blog'
        })
    }
    } catch (error) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            errorData: error
        })
    }

}

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find()
        res.status(HttpStatusCodes.OK).json({
            error: false,
            data: blogs
        })
    } catch (error) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            errorData: error
        })
    }
}