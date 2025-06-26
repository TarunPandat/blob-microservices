import mongoose from "mongoose"
import { Subjects } from "../Subjects"


export interface UserUpdateEvent {
    subject: Subjects.UserUpdate
    data: {
        username: string
        id: mongoose.Schema.Types.ObjectId | string
        __v: number
    }
}