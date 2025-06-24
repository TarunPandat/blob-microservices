import { Subjects } from "../Subjects"


export interface EventSendEvent {
    subject: Subjects.EventSend
    data: {
        name: string
    }
}