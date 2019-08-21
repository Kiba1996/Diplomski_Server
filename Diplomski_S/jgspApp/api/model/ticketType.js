var mongoose = require('mongoose');


var ticketTypeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    
    
}, {collection: 'ticketType'});

mongoose.model('ticketType', ticketTypeSchema);