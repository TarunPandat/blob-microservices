import { Message } from "node-nats-streaming"
import { UserUpdateEvent } from "../events/userUpdate.events"
import Listener from "../Listener"
import { Subjects } from "../Subjects"
import { User } from "@src/models"


class UserUpdateListener extends Listener<UserUpdateEvent> {
    readonly subject: Subjects.UserUpdate = Subjects.UserUpdate
    queueGroupName: string = 'user-update'

    //@ts-ignore
   async onMessage(data: UserUpdateEvent['data'], msg: Message) {
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        const userFound = await User.findOne({_id: data.id, __v: {$in: [data.__v, 0]}})
        console.log('====================================');
        console.log('user', userFound);
        console.log('====================================');
        if(userFound) {
            userFound.username = data.username
            await userFound.save()
            msg.ack()
        }   
        msg.ack()
        // else {
        //     const user = await User.create({_id: data.id, username: data.username})
        //     if(user) {
        //         msg.ack()
        //     }
        // }
    }
}   

export default UserUpdateListener