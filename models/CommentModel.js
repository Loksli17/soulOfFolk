const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    name: {
        firstName: {
            type    : String,
            required: true,
        },
        lastName:{
            type    : String,
            required: true,
        },
    },
    text: {
        required: true,
        type    : String,
    },
    bundle: {
        type    : String,
        required: true,
    },
    img: {
        type    : String,
        required: true,
    },
    type: {
        type    : String,
        required: true,
    },
    isActive: {
        type    : Boolean,
        required: true,
    },
    number: {
        type    : Number,
        required: true,
    }
});

module.exports = mongoose.model('comments', CommentSchema);