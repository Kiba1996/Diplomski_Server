var mongoose = require('mongoose');
var Line = mongoose.model('line');

module.exports.removeLine = function(req, res)
{
    
    if(!req.params._id ) {
        return res.status(400).json( {"message": "You have to select a line you want to remove"});
    }

    Line.findById(req.params._id).then(line => {
        if(line == null || line == undefined)
        {
            return res.status(404).json({"message" : "Line that you are trying to remove either do not exist or was previously deleted by another user."});
        }else{
            Line.findOneAndRemove({_id: req.params._id}).then(line => {

                    return res.status(200).json({"message" : "Line successfully removed."});

            });
        }
    })
}


module.exports.changeLine = function(req, res){
   
    if(!req.params._id || !req.body.LineNumber || !req.body.ColorLine || req.body.Stations.length <=1) {
        return res.status(404).json({"message": "All fields are required"});
    }
    if(req.body.Stations == null || req.body.Stations.length < 2)
    {
        return res.status(400).json({"message": "You must add at least two stations per line"});
    }
    Line.findById(req.params._id).then(line => {
        if( line == null || line == undefined)
        {
            return res.status(400).json({"message": "Line that you are trying to edit either do not exist or was previously deleted by another user."});
        }else {
            if(line.__v != req.body.Version)
            {
                return res.status(409).json({"message" : "CONFLICT You are trying to edit a Line that has been changed recently. Try again. "})
            }else {
                const updata = { lineNumber : req.body.LineNumber, stations : req.body.Stations}
                Line.findOneAndUpdate({_id : req.params._id}, update).then(line => {
                    return   res.status(200).json({ "message" : "Line successfully updated." });

                })

             }
        }

    })
}

module.exports.getAllLines = function(req, res)
{
     Line.find().exec().then(type => { res.send(type);});
     console.log(type);
};


module.exports.addLine = function(req, res)
{
    if(!req.body.LineNumber || !req.body.ColorLine || req.body.Stations.length<=1 ) {
        return res.status(404).json({"message": "All fields are required"});
    
    }

    var line = new Line();

    line.lineNumber = req.body.LineNumber;
    line.colorLine = req.body.ColorLine;
    req.body.Stations.forEach(function(element) {
        line.stations.push(element.Id);
      });
    

    line.save(function(err){
        if(err)
        {
           return res.status(404).json({"message":err});
        }

        return res.status(200).json({
            "message" : "Station successfully added."
        });
    });

};