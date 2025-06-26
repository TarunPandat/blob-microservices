import { Subjects } from "../Subjects"


export interface UserUpdateEvent {
    subject: Subjects.UserUpdate
    data: {
        username: string,
        id: string,
        __v: number
    }
}