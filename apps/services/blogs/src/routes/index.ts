import logger from 'jet-logger'
import { Router } from 'express'
import BlogRoutes from './BlogRoutes'
import NatsStreaming from '@src/services/nats'


const routes = Router()

routes.use('/blog', BlogRoutes)

routes.get('/', async (req, res) => {
    try {
        const stan = NatsStreaming.getInstance().stan
    const data = JSON.stringify({
        name: 'Tarun'
    })
    stan.publish('event:send', data, () => {
        logger.info('Event send published')
    })
    res.send('published')
    } catch (error) {
        logger.err(`Error: ${error}`)
        res.json({error})
    }
})

export default routes