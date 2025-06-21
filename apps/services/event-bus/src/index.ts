import logger from 'jet-logger';

import ENV from '@src/common/constants/ENV';
import server from './server';
import nats from 'node-nats-streaming'


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

const stan = nats.connect('blob-app', 'event-bus', {
  url: 'nats://localhost:4222'
})

stan.on('connect', () => {
  logger.info('Publisher connected to Nats server')
})
