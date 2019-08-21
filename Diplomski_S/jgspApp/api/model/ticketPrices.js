var mongoose = require('mongoose');


var ticketPricesSchema = new mongoose.Schema({

    price: {
        type: Number,
        required: true
    },
    
    
    ticketType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ticketType'
    },
    pricelist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pricelist'
    }
}, {collection: 'ticketPrices'});

mongoose.model('ticketPrices', ticketPricesSchema);