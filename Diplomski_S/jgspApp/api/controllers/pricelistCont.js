var mongoose = require('mongoose');
var Pricelist = mongoose.model('pricelist');
var TIcketPrice = mongoose.model('ticketPrices');
var TT = mongoose.model('ticketType');
// module.exports.removeLine = function(req, res)
// {
    
//     if(!req.params._id ) {
//         sendJSONresponse(res, 400, {
//             "message": "All fields required"
//         });
//         return;
//     }

//     Line.findOneAndRemove({_id: req.params._id}).then(bla =>{
//         res.status(200).json({
//             "message" : "Line successfully removed."
//     });
// });
// }


// module.exports.changeLine = function(req, res){
   
//     if(!req.params._id || !req.body.LineNumber || !req.body.ColorLine || req.body.Stations.length <=1) {
//         sendJSONresponse(res, 400, {
//             "message": "All fields required"
//         });
//         return;
//     }
//     const nest = { lineNumber : req.body.LineNumber, stations : req.body.Stations}
//     Line.findOneAndUpdate({_id : req.params._id}, nest).then(bla => {
//         res.status(200).json({
//             "message" : "Line successfully updated."
//         });
//     })

// }

// module.exports.getAllLines = function(req, res)
// {
//     var types = [];
    
//      Line.find().exec().then(type => { res.send(type);});
//     console.log(type);
    
    
// };


module.exports.addPricelist = function(req, res)
{
    // if(req.body.Hourly<=0 || req.body.Daily<=0 || req.body.Monthly<=0 || req.Body.Yearly <=0 ) {
    //     sendJSONresponse(res, 400, {
    //         "message": "Prices can't be 0 or less than 0."
    //     });
    //     return;
    // }
    // if(req.body.PriceList.StartOfValidity == "" || req.body.PriceList.EndOfValidity == "" || req.body.PriceList.StartOfValidity == null || req.body.PriceList.EndOfValidity == null){
    //     sendJSONresponse(res, 400, {
    //         "message": "StartOfValidity and End of validity can't be empty."
    //     });
    //     return;
    // }
    // if(req.body.PriceList.StartOfValidity.Value.Date < Date.now.Date ){
    //     sendJSONresponse(res, 400, {
    //         "message": "You cant make pricelist for past"
    //     });
    //     return;
    // }
    // if(req.body.PriceList.StartOfValidity.Value.Date > req.body.PriceList.EndOfValidity ){
    //     sendJSONresponse(res, 400, {
    //         "message": "Start of validity is bigger than end of validity!"
    //     });
    //     return;
   // }
    var station = new Pricelist();

    station.startOfValidity = new Date(req.body.PriceList.StartOfValidity);
    station.endOfValidity = new Date(req.body.PriceList.EndOfValidity);
    station.ticketPrices = [];
    station.save(function(err){
     

    var h = new TIcketPrice();
    TT.findOne({name: 'Hourly'}).then(bla => {
        h.ticketType = bla._id;
        h.price = req.body.Hourly;
        h.pricelist = station._id;
        h.save();
    });
    
    var d = new TIcketPrice();
   
    TT.findOne({name: 'Daily'}).then(bla => {
        d.ticketType = bla._id;
        d.price = req.body.Daily;
        d.pricelist = station._id;
        d.save();
    });
    
    var m = new TIcketPrice();
   
    TT.findOne({name: 'Monthly'}).then(bla => {
        m.ticketType = bla._id;
        m.price = req.body.Monthly;
        m.pricelist = station._id;
        m.save();
    });
    
    var y = new TIcketPrice();
    
    TT.findOne({name: 'Yearly'}).then(bla => {
        y.ticketType = bla._id;
        y.price = req.body.Yearly;
        y.pricelist = station._id;
        y.save();
    });
    
      if(err)
        {
           res.status(404).json(err);
           return;
        }
    res.status(200).json({
        "message" : "Pricelist successfully added."
    });
});


};