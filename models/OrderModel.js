const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: {
        firstName: {
            type    : String,
            required: true,
        },
        lastName:{
            type    : String,
            required: true,
        },
        patronymic: {
            type: String,
        }
    },
    date: {
        type: Date,
    },
    phone: {
        required: true,
        type    : String,
    },
    number: {
        type    : Number,
        required: true,
    },
    bundle: {
        type    : String,
        required: true,
    },
    cost: {
        type: Number,
    },
    viewStatus: {
        type    : Boolean,
        required: true,
    },
});

module.exports = mongoose.model('orders', OrderSchema);