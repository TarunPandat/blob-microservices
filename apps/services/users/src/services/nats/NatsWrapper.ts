import logger from 'jet-logger'
import nats, { Stan } from "node-nats-streaming"

class NatsWrapper {
    private _client?: Stan

    get client() {
        if (!this._client) {
            logger.err(`Cannot access NATS client before connecting`)
            throw new Error(`Cannot access NATS client before connecting`)
        }
        return this._client
    }

    connect(clusterId: string, clientId: string, url: string): Promise<void> {
        this._client = nats.connect(clusterId, clientId, { url })

        return new Promise((resolve, reject) => {
            this._client!.on('connect', () => {
                logger.imp(`Connected to NATS!`)
                
                this._client!.on('close', () => {
                    logger.warn('NATS connection closed!')
                    process.exit()
                })

                process.on('SIGINT', () => this._client!.close())
                process.on('SIGTERM', () => this._client!.close())

                resolve()
            })

            this._client!.on('error', (err) => {
                logger.err(`NATS connection error: ${err}`)
                reject(err)
            })
        })
    }
}

export const natsWrapper = new NatsWrapper()
