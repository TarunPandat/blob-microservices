import logger from 'jet-logger';

import './models'
import ENV from '@src/common/constants/ENV';
import server from './server';
import { dbConnection } from './dbConnection'


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

// DB Connection
dbConnection()