var mongoose = require('mongoose');
var Timetable = mongoose.model('timetable');
var Line = mongoose.model('line');
var DayType = mongoose.model('dayType');
var Vehicle = mongoose.model('vehicle');

module.exports.removeTimetable = function(req, res)
{
    
    if(!req.params._id ) {
        return res.status(400).json({
            message: 'Id is required.'
         });
    }
    Timetable.findOneAndRemove({_id: req.params._id}).then(bla =>{
        Vehicle.find().exec().then(vehicles =>{
            vehicles.forEach(v =>{
                v.timetables.forEach(t=>{
                    if(t == req.params._id){
                        v.timetables.remove(t);
                        Vehicle.findOneAndUpdate({_id: v._id},{timetables: v.timetables}).then(k=>{

                        })
                    }
                })
            })
            return res.status(200).json({
                "message" : "Timetable successfully removed."
        });
        })
       
});
    // Station.findOneAndRemove({_id: req.params._id}).then(bla =>{
    //     Line.find().then( aa=>{
    //         aa.forEach(bb =>{
    //             bb.stations.forEach(cc =>{
    //                 if(cc == req.params._id){
    //                     bb.stations.remove(cc);
    //                     Line.findOneAndUpdate({_id: bb._id }, {stations: bb.stations}).then(bla => {

    //                     });
    //                 }
    //             });
    //         });
    //     });
    //     res.status(200).json({
    //         "message" : "Station successfully removed."
    // });
//});
}


module.exports.changeTimetable = function(req, res){
    if(req.body.Departures == "" || req.body.Id == "") {
        return res.status(400).json({
            message: 'All fields are required.'
         });
    }
    const nest = { departures : req.body.Departures}
    Timetable.findOneAndUpdate({_id : req.body.Id}, nest).then(bla => {
        res.status(200).json({
            "message" : "Timetable successfully updated."
        });
    })

}

module.exports.getAllTimetables = function(req, res)
{
    var types = [];
    
     Timetable.find().exec().then(type => { 
         res.send(type);
        });
    console.log(type);
    
    
};
// module.exports.getAllDayTypes = function(req, res)
// {
//     var types = [];
    
//      DayType.find().exec().then(type => { 
//          res.send(type);
//         });
//     console.log(type);
    
    
// };


module.exports.addTimetable = function(req, res)
{
    if(req.body.Departures == "" || req.body.LineId == "" || req.body.DayTypeId == "" || !req.body.Vehicles[0] ) {
        return res.status(400).json({
            message: 'All fields are required.'
         });
    }

    var timetable = new Timetable();
    timetable.departures = req.body.Departures;
    Line.findById(req.body.LineId).exec().then(l =>{
        timetable.line = l._id;
       Vehicle.findById(req.body.Vehicles[0].Id).exec().then(v =>{
           timetable.vehicle = v._id;
           DayType.findById(req.body.DayTypeId).exec().then(d =>{
               timetable.dayType = d._id;


               timetable.save(function(err){
                if(err)
                {
                    res.status(404).json(err);
                    return;
                }
                var list = v.timetables;
                list.push(timetable._id)
                const nest = { timetables : list}
                Vehicle.findOneAndUpdate({_id : v._id}, nest).then(bla => {
                    res.status(200).json({
                        "message" : "Timetable successfully updated."
                    });
                })
               
            });
        
           });
       })

    })


};

module.exports.findVehicleId = function(req, res)
{

     Timetable.find().exec().then(type => { 
       
        var s = type.find(el => el.line == req.query.ids);
        var ret = "-1";
        if(s){
           ret = s.vehicle;
        }
        res.send(ret);
        });
    console.log(type);
    
    
};