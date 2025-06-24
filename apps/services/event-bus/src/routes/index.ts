import logger from 'jet-logger'
import { Router, Request, Response } from 'express'
import UserRoutes from './UserRoutes'
import blogRoutes from './BlogRoutes'
import EventSendPublisher from '@src/services/nats/Publishers/EventSend.publisher'
import { natsWrapper } from '@src/services/nats/NatsWrapper'


const routes = Router()

routes.use('/users', UserRoutes)
routes.use('/blog', blogRoutes)

routes.get('/', async (req: Request, res: Response) => {
    const data: any = req.query
    const publish = new EventSendPublisher(natsWrapper.client)
    try {
        await publish.publish(data)
        res.send('Published event!')
    } catch (error) {
        logger.err(`Publish even error: ${error}`)
        res.send(`Publish even error: ${error}`)
    }
})

export default routes