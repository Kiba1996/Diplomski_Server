var mongoose = require('mongoose');
var DayType = mongoose.model('dayType');


module.exports.findAllDayType = function(req, res)
{
   DayType.find().exec().then(type => { res.send(type);});
   console.log(type);
};

module.exports.dayTypeOne = function(name)
{
   DayType.findOne({ name: name});
};




