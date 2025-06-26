import { UserUpdateEvent } from "../events/userUpdate.events"
import Publisher from "../Publisher"
import { Subjects } from "../Subjects"


class UserUpdatePublisher extends Publisher<UserUpdateEvent> {
    subject: Subjects.UserUpdate = Subjects.UserUpdate
}

export default UserUpdatePublisher