import { Stan } from "node-nats-streaming"
import { Subjects } from "./Subjects"

interface Event {
    subject: Subjects
    data: any
}

abstract class Publisher<T extends Event> {
    abstract subject: T['subject']
    private client: Stan

    constructor(client: Stan) {
        this.client = client
    }

    publish(data: T['data']) {
        return new Promise<void>((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (error) => {
                if(error) return reject(error)
                console.log('====================================');
                console.log(`Publish event ${this.subject}`);
                console.log('====================================');
                return resolve()
        })
        })
    }
}

export default Publisher