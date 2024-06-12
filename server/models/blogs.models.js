const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.models')

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true})

const Blogs = mongoose.model('Blogs', blogSchema);
module.exports = Blogs;