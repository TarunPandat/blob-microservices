import logger from 'jet-logger'
import { Router } from 'express'
import BlogRoutes from './BlogRoutes'
import EventSendListener from '@src/services/nats/Listeners/EventSendListener'
import { natsWrapper } from '@src/services/nats/NatsWrapper'


const routes = Router()

routes.use('/blog', BlogRoutes)

routes.get('/', async (req, res) => {
    try {
    const data = JSON.stringify({
        name: 'Tarun'
    })
    // const publish = new 
    // stan.publish('event:send', data, () => {
    //     logger.info('Event send published')
    // })
    // res.send('published')
    } catch (error) {
        logger.err(`Error: ${error}`)
        res.json({error})
    }
})

// new EventSendListener(natsWrapper.client).listen()

export default routes