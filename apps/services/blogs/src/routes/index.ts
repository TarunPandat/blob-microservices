import { Router } from 'express'
import BlogRoutes from './BlogRoutes'


const routes = Router()

routes.use('/blog', BlogRoutes)

export default routes