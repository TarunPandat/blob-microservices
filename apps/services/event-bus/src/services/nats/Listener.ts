import { Message, Stan } from "node-nats-streaming"


abstract class Listener {
    abstract subject: string
    abstract queueGroupName: string
    abstract onMessage: (data: any, msg: Message) => void
    private client: Stan
    protected ackWait: number = 5 * 1000

    constructor(client: Stan) {
        this.client = client
    }

    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDeliverAllAvailable()
            .setDurableName(this.queueGroupName)
    }

    listen() {
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions())
        subscription.on('message', (msg: Message) => {
            console.log('====================================');
            console.log(`Message received - Subject: ${this.subject} / ${this.queueGroupName}`);
            console.log('====================================');

            const data = this.parseMsg(msg)
            this.onMessage(data, msg)
        })
    }

    parseMsg(msg: Message) {
        const data = msg.getData()
        return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'))
    }

}

export default Listener