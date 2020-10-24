const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    name: {
        firstName: {
            type    : String,
            required: true,
        },
        secondName:{
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
    }
});

module.exports = mongoose.model('orders', OrderSchema);