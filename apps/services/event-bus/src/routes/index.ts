import { Router } from 'express'
import UserRoutes from './UserRoutes'
import blogRoutes from './BlogRoutes'


const routes = Router()

routes.use('/users', UserRoutes)
routes.use('/blog', blogRoutes)

export default routes