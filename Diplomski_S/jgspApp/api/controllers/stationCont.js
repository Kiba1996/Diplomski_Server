var mongoose = require('mongoose');
var Station = mongoose.model('station');
var Line = mongoose.model('line');
module.exports.removeStation = function(req, res)
{
    
    if(!req.params._id ) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    
    Station.findOneAndRemove({_id: req.params._id}).then(bla =>{
        Line.find().then( aa=>{
            aa.forEach(bb =>{
                bb.stations.forEach(cc =>{
                    if(cc == req.params._id){
                        bb.stations.remove(cc);
                        Line.findOneAndUpdate({_id: bb._id }, {stations: bb.stations}).then(bla => {

                        });
                    }
                });
            });
        });
        res.status(200).json({
            "message" : "Station successfully removed."
    });
});
}


module.exports.changeStation = function(req, res){
    if(!req.body.Name || !req.body.Address || !req.body.Latitude || !req.body.Longitude ) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    const nest = { address : req.body.Address, name : req.body.Name, latitude : req.body.Latitude, longitude: req.body.Longitude}
    Station.findOneAndUpdate({_id : req.body.Id}, nest).then(bla => {
        res.status(200).json({
            "message" : "Station successfully updated."
        });
    })

}

module.exports.getAllStations = function(req, res)
{
    var types = [];
    
     Station.find().exec().then(type => { res.send(type);});
    console.log(type);
    
    
};


module.exports.addStation = function(req, res)
{
    if(!req.body.Name || !req.body.Address || !req.body.Latitude || !req.body.Longitude ) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    var station = new Station();

    station.name = req.body.Name;
    station.address = req.body.Address;
    station.latitude = req.body.Latitude;
    station.longitude = req.body.Longitude;
    //user.image = req.body.image;
    //user.activated = req.body.activated;
    

    station.save(function(err){
        if(err)
        {
            res.status(404).json(err);
            return;
        }

        res.status(200).json({
            "message" : "Station successfully added."
        });
    });



};