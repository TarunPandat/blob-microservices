import mongoose, { Schema } from "mongoose"
import {updateIfCurrentPlugin} from 'mongoose-update-if-current'

const BlogSchema = new Schema({
    title: {
        type: String,
        require: [true, 'Title is required']
    },
    content: {
        type: Schema.Types.String,
        required: [true, 'Content is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        ref: 'User'
    }
}, {
    versionKey: "__v"
})

BlogSchema.plugin(updateIfCurrentPlugin)

const Blog = mongoose.model('Blog', BlogSchema)

export default Blog