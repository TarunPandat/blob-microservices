import logger from 'jet-logger';

import './models'
import ENV from '@src/common/constants/ENV';
import server from './server';
import { dbConnection } from './dbConnection'
import { Message } from 'node-nats-streaming'
import { natsWrapper } from './services/nats/NatsWrapper'
import EventSendListener from './services/nats/Listeners/EventSendListener'
import UserUpdateListener from './services/nats/Listeners/UserUpdate.listerner'


/******************************************************************************
                                Constants
******************************************************************************/

const SERVER_START_MSG = (
  'Express server started on port: ' + ENV.Port.toString()
);


/******************************************************************************
                                  Run
******************************************************************************/



// DB Connection
dbConnection()

const natsConnection = async (callback: () => void) => {
  try {
    await natsWrapper.connect('blob-app', process.env.NATS_CLIENT_ID || 'blog-service', 'nats://localhost:4222')
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
  new EventSendListener(natsWrapper.client).listen()
  new UserUpdateListener(natsWrapper.client).listen()
})

