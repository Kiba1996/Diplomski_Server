var mongoose = require('mongoose');
var PassengerType = mongoose.model('passengerType');


module.exports.findAllPassengerType = function(req, res)
{
     PassengerType.find().exec().then(type => { res.send(type);});
    console.log(type);  
};


