import HttpStatusCodes from '@src/common/constants/HttpStatusCodes'
import { Blog, User } from '@src/models'
import {Request, Response} from 'express'

export const createBlog = async (req: Request, res: Response) => {
    const {title, content, userId, username} = req.body

    try {
        const userFind = await User.findById(userId)
        const user = userFind || await User.create({_id: userId, username})
        if(!user) return res.status(HttpStatusCodes.BAD_REQUEST).json({error: true, msg: 'Not able create user data'})
        const blog = await Blog.create({title, content, user: user?._id})

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

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const {id}: any = req.params
        const {title, content} = req.body
        const blog: any = await Blog.findById(id)
        blog.title = title
        blog.content = content
        await blog.save()

         res.status(200).json({error: false, blog})
    } catch (error) {
        res.json({error})
    }
}