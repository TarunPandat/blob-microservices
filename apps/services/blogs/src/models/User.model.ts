import { model, Schema } from "mongoose"


const UserSchema = new Schema({
    username: String
})

const UserModal = model('User', UserSchema) 

export default UserModal