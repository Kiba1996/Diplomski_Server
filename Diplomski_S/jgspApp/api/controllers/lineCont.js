var mongoose = require('mongoose');
var Line = mongoose.model('line');

module.exports.removeLine = function(req, res)
{
    
    if(!req.params._id ) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    Line.findOneAndRemove({_id: req.params._id}).then(bla =>{
        res.status(200).json({
            "message" : "Line successfully removed."
    });
});
}


module.exports.changeLine = function(req, res){
   
    if(!req.params._id || !req.body.LineNumber || !req.body.ColorLine || req.body.Stations.length <=1) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    const nest = { lineNumber : req.body.LineNumber, stations : req.body.Stations}
    Line.findOneAndUpdate({_id : req.params._id}, nest).then(bla => {
        res.status(200).json({
            "message" : "Line successfully updated."
        });
    })

}

module.exports.getAllLines = function(req, res)
{
    var types = [];
    
     Line.find().exec().then(type => { res.send(type);});
    console.log(type);
    
    
};


module.exports.addLine = function(req, res)
{
    if(!req.body.LineNumber || !req.body.ColorLine || req.body.Stations.length<=1 ) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    var station = new Line();

    station.lineNumber = req.body.LineNumber;
    station.colorLine = req.body.ColorLine;
    req.body.Stations.forEach(function(element) {
        station.stations.push(element.Id);
      });
    //station.stations = req.body.Stations;
    //station.longitude = req.body.Longitude;
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