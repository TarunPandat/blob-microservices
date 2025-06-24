import { EventSendEvent } from "../events/eventSend.events"
import Publisher from "../Publisher"
import { Subjects } from "../Subjects"


class EventSendPublisher extends Publisher<EventSendEvent> {
    subject: Subjects.EventSend = Subjects.EventSend

}

export default EventSendPublisher