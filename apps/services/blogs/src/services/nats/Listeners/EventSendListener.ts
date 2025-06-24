import { Message } from "node-nats-streaming"
import Listener from "../Listener"
import { Subjects } from "../Subjects"
import { EventSendEvent } from "../events/eventSend.events"


class EventSendListener extends Listener<EventSendEvent> {
    readonly subject: Subjects.EventSend = Subjects.EventSend
    queueGroupName: string = 'event-queue'

    //@ts-ignore
    onMessage(data: EventSendEvent['data'], msg: Message) {
        console.log('====================================');
        console.log(`Listen to ${this.subject} / ${this.queueGroupName} : ${msg.getSequence()} : `, data);
        console.log('====================================');
        msg.ack()
    }
}

export default EventSendListener