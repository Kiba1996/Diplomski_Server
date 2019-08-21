var mongoose = require('mongoose');

var dayTypeSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true
    }
}, {collection: 'dayType'});

mongoose.model('dayType', dayTypeSchema);