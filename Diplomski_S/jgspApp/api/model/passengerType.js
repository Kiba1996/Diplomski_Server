var mongoose = require('mongoose');


var passengerTypeSchema = new mongoose.Schema({
//    _id: {
//        type: mongoose.Schema.Types.ObjectId
//    },
    name: {
        type: String,
        unique: true
    },
    coefficient: {
        type: Number
    }
}, {collection: 'passengerType'});

mongoose.model('passengerType', passengerTypeSchema);

