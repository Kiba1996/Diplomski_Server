var mongoose = require('mongoose');
var Vehicle = mongoose.model('vehicle');


module.exports.removeVehicle = function(req, res)
{
    if(!req.params._id ) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    Vehicle.findOneAndDelete({_id: req.params._id}).then(bla => {
        res.status(200).json({
            "message" : "Vehicle successfully removed."
        });
    });
}

module.exports.getAllAvailableVehicles = function(req, res)
{
   // Vehicle.find({timetables: []}).exec().then(type => {res.send(type);});
    
    Vehicle.find().exec().then(vehicles =>{
        var lista = [];
        vehicles.forEach(v =>{
            if(v.timetables.length == 0){
                lista.push(v);
            }
        })
        res.send(lista);
    })
  
}

module.exports.getAllVehicles = function(req, res)
{
    Vehicles.find().exec().then(type => { res.send(type);});
}

module.exports.addVehicle = function(req, res)
{
    if(!req.body.Type) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    var vehicle = new Vehicle();
    vehicle.vehicleType = req.body.Type;

    vehicle.save(function(err){
        if(err)
        {
            res.status(404).json(err);
            return;
        }

        res.status(200).json({
            "message" : "Vehicle successfully added."
        });
    });
} 