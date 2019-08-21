var mongoose = require('mongoose');


var pricelistSchema = new mongoose.Schema({

    startOfValidity: {
        type: Date,
        required: true
    },
    endOfValidity: {
        type: Date,
        required: true
    },
    ticketPricess: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ticektPrices'
    }],
}, {collection: 'pricelist'});

mongoose.model('pricelist', pricelistSchema);