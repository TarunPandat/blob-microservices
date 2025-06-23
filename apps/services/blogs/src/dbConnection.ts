import logger from "jet-logger"
import mongoose from "mongoose"

export const dbConnection = () => {
    const DB_USER = process.env.DB_USER
    const DB_PASS = process.env.DB_PASS
    const DB_HOST = process.env.DB_HOST
    const DB_PORT = process.env.DB_PORT
    const DB_NAME = process.env.DB_NAME
    try {
        mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`, {

        }).then(() => {
            logger.info('DB Connected!')
        }).catch(e => {
            logger.err('DB Error: '+ e)
        })
    } catch (error) {
        logger.err('DB Error: ' + error)
    }
}