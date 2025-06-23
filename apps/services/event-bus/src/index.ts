import logger from 'jet-logger';

import ENV from '@src/common/constants/ENV';
import server from './server';
import nats, { Message } from 'node-nats-streaming'


/******************************************************************************
                                Constants
******************************************************************************/

const SERVER_START_MSG = (
  'Express server started on port: ' + ENV.Port.toString()
);


/******************************************************************************
                                  Run
******************************************************************************/

// Start the server
server.listen(ENV.Port, (err: any) => {
  if (!!err) {
    logger.err(err.message);
  } else {
    logger.info(SERVER_START_MSG);
  }
});

const stan = nats.connect('blob-app', process.env.NATS_CLIENT_ID || 'event-bus', {
  url: 'nats://localhost:4222'
})

stan.on('connect', () => {
  logger.info('Publisher connected to Nats server')

  stan.on('close', () => {
    logger.info('Nats connection is closed!')
    process.exit()
  })

  const options =stan.subscriptionOptions().setManualAckMode(true).setDeliverAllAvailable().setDurableName('durable-test')

  const subscription = stan.subscribe('event:send', 'test', options)

  subscription.on('message', (msg: Message) =>{
    logger.info(`Listen to event:send - ${msg.getSequence()}  ${msg.getData()}`)
    const data = JSON.stringify({name: 'Pandat'})
    stan.publish('event:come', data, () => {
      logger.info('Send from event bus')
    })
    setTimeout(() => {
      msg.ack() // to acknowledge manually 
    }, 3000)
  })
  
})

process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())
