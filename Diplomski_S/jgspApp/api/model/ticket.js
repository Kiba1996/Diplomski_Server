var mongoose = require('mongoose');


var ticketSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    purchaseTime: {
        type: Date,
        required: true
    },
    
    ticketType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ticketType'
    },
    ticketPrice:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ticketPrice'
    },
    payPal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payPal'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {collection: 'ticket'});

mongoose.model('ticket', ticketSchema);