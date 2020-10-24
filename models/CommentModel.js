const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    name: {
        firstName: {
            type    : String,
            required: true,
        },
        secondName:{
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
    number: {
        type: Number,
    }
});

module.exports = mongoose.model('comments', CommentSchema);