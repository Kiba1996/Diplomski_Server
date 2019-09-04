var mongoose = require('mongoose');
var Vehicle = mongoose.model('vehicle');


module.exports.removeVehicle = function(req, res)
{
    if(!req.params._id ) {
       return  res.status(400).json({
            "message" : "Id required."
        });
    }

    Vehicle.findOneAndDelete({_id: req.params._id}).then(bla => {
       return  res.status(200).json({
            "message" : "Vehicle successfully removed."
        });
    });
}

module.exports.getAllAvailableVehicles = function(req, res)
{
  
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
       return  res.status(400).json({
            "message" : "Id requiered."
        });
    }

    var vehicle = new Vehicle();
    vehicle.vehicleType = req.body.Type;

    vehicle.save(function(err){
        if(err)
        {
            return res.status(404).json({"message":err});
        }

        return res.status(200).json({
            "message" : "Vehicle successfully added."
        });
    });
} 