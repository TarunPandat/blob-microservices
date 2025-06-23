import { Message } from "node-nats-streaming"
import Listener from "../Listener"


class EventSendListener extends Listener {
    subject: string = 'event:send'
    queueGroupName: string = 'event-queue'

    //@ts-ignore
    onMessage(data: any, msg: Message) {
        console.log('====================================');
        console.log('Message ', data);
        console.log('====================================');
        msg.ack()
    }
}

export default EventSendListener