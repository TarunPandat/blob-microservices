import logger from 'jet-logger'
import nats, { Message, Stan } from 'node-nats-streaming'

class NatsStreaming {
    private static instance: NatsStreaming
    public stan!: Stan
    private url = process.env.NATS_URL || 'nats://localhost:4222';
    private clusterID = process.env.NATS_CLUSTER_ID || 'blob-app';
    private clientID = process.env.NATS_CLIENT_ID || `blog-service`;

    private constructor() { }

    public static getInstance(): NatsStreaming {
        if (!NatsStreaming.instance) {
            NatsStreaming.instance = new NatsStreaming()
        }
        return NatsStreaming.instance
    }

    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.stan = nats.connect(this.clusterID, this.clientID, { url: this.url })

            this.stan.on('connect', () => {
                console.log('[NATS] Connected to', this.url)
                const subscription = this.stan.subscribe('event:come', 'test')
                subscription.on('message', (msg: Message) => {
                    logger.info(`Event from eventbus: ${msg.getData()} - ${msg.getSequence()}`)
                })
                resolve()
            })

            this.stan.on('error', (err) => {
                console.error('[NATS] Connection error:', err)
                reject(err)
            })
        })
    }
}

export default NatsStreaming
