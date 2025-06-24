import logger from 'jet-logger'

import ENV from '@src/common/constants/ENV'
import server from './server'
import { natsWrapper } from './services/nats/NatsWrapper'


/******************************************************************************
                                Constants
******************************************************************************/

const SERVER_START_MSG = (
  'Express server started on port: ' + ENV.Port.toString()
)

const natsConnection = async (callback: () => void) => {
  try {
    await natsWrapper.connect('blob-app', process.env.NATS_CLIENT_ID || 'event-bus', 'nats://localhost:4222')
    callback()
  } catch (error) {
    logger.err(`Nats not able to connect: ${error}`)
  }
}

natsConnection(() => {
  // Start the server
  server.listen(ENV.Port, (err: any) => {
    if (!!err) {
      logger.err(err.message);
    } else {
      logger.info(SERVER_START_MSG);
    }
  });
})

/******************************************************************************
                                  Run
******************************************************************************/

// // Start the server
// server.listen(ENV.Port, (err: any) => {
//   if (!!err) {
//     logger.err(err.message);
//   } else {
//     logger.info(SERVER_START_MSG);
//   }
// });


// const stan = nats.connect('blob-app', process.env.NATS_CLIENT_ID || 'event-bus', {
//   url: 'nats://localhost:4222'
// })

// stan.on('connect', async () => {
//   logger.info('connected to Nats server')

//   stan.on('close', () => {
//     logger.info('Nats connection is closed!')
//     process.exit()
//   })

  // const eventPublish = new EventSendPublisher(stan)

  // try {
  //   await eventPublish.publish({name: 'Tarun Pandat'})
  // } catch (error) {
  //   logger.err(error)
  // }

  // const options =stan.subscriptionOptions().setManualAckMode(true).setDeliverAllAvailable().setDurableName('durable-test')

  // const subscription = stan.subscribe('event:send', 'test', options)

  // subscription.on('message', (msg: Message) =>{
  //   logger.info(`Listen to event:send - ${msg.getSequence()}  ${msg.getData()}`)
  //   const data = JSON.stringify({name: 'Pandat'})
  //   stan.publish('event:come', data, () => {
  //     logger.info('Send from event bus')
  //   })
  //   setTimeout(() => {
  //     msg.ack() // to acknowledge manually 
  //   }, 3000)
  // })

// })

// process.on('SIGINT', () => natsWrapper.client.close())
// process.on('SIGTERM', () => natsWrapper.client.close())
