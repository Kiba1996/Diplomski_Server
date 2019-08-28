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
module.exports.getTicketPrices = function(req, res)
{
    var ret = [];
    TIcketPrice.find().exec().then(bb => {
        bb.forEach(element => {
            if(element.pricelist._id == req.query.ids){
                ret.push(element);
            }
        })

        var rr = [];
        TT.find().exec().then(bla => {
          bla.forEach(zz => {
            if(zz.name == "Hourly"){
                ret.forEach(mm =>{
                    if(mm.ticketType._id == zz.id){
                        rr.push(mm);
                    }
                })
            }
          })
            
          bla.forEach(zz => {
            if(zz.name == "Daily"){
                ret.forEach(mm =>{
                    if(mm.ticketType._id == zz.id){
                        rr.push(mm);
                    }
                })
            }
          })

          bla.forEach(zz => {
            if(zz.name == "Monthly"){
                ret.forEach(mm =>{
                    if(mm.ticketType._id == zz.id){
                        rr.push(mm);
                    }
                })
            }
          })

          bla.forEach(zz => {
            if(zz.name == "Yearly"){
                ret.forEach(mm =>{
                    if(mm.ticketType._id == zz.id){
                        rr.push(mm);
                    }
                })
            }
          })
          res.send(rr);

            
      })  

    })
};

module.exports.getPricelist = function(req, res)
{
   
    var types = []; 
     Pricelist.find().where().exec().then(type => { 
         var lala = type.reverse();
         var ret = lala.find(checkAdult);
         if(ret != undefined){
            TIcketPrice.find().exec().then(t =>{
                t.forEach( bla=>{
                    if(bla.pricelist._id == ret.id){
                        ret.ticketPricess.push(bla.id);
                    }
                });
                res.send(ret);
             });
          
         }else{
            return res.status(404).json({
                message: 'Currently there is no valid pricelist!'
             });
         }
       
        
    
        
        });
       
    console.log(ret); 
};
function checkAdult(age){
    var today = new Date();
    if(age.startOfValidity.getFullYear() <= today.getFullYear() && age.startOfValidity.getMonth() <= today.getMonth() && age.startOfValidity.getDate() <= today.getDate()){
        if(age.endOfValidity.getFullYear() >= today.getFullYear() && age.endOfValidity.getMonth() >= today.getMonth() && age.endOfValidity.getDate() >= today.getDate()){
            return age;
        }
    }
}

module.exports.addPricelist = function(req, res,err)
{
    if(req.body.Hourly<=0 || req.body.Daily<=0 || req.body.Monthly<=0 || req.body.Yearly <=0 ) {
        return res.status(400).json({
            message: 'Prices cant be 0 or less than 0.'
         });
       
    }
    if(req.body.PriceList.StartOfValidity == "" || req.body.PriceList.EndOfValidity == "" || req.body.PriceList.StartOfValidity == null || req.body.PriceList.EndOfValidity == null){
       
        return res.status(400).json({
            message: 'StartOfValidity and End of validity cant be empty!'
         });
    }
    var today = new Date();
    var dat = new Date(req.body.PriceList.StartOfValidity);
    var end = new Date(req.body.PriceList.EndOfValidity);
    if( dat.getFullYear()< today.getFullYear()){
        // sendJSONresponse(res, 400, {
        //     "message": "You cant make pricelist for past"
        // });
        // res.status(400).json(new Error("greska"));
        // return;
        return res.status(400).json({
            message: 'You cant make pricelist for past!'
         });
    }
    else if(dat.getMonth() < today.getMonth()){
        // sendJSONresponse(res, 400, {
        //     "message": "You cant make pricelist for past"
        // });
        // return;
        return res.status(400).json({
            message: 'You cant make pricelist for past!'
         });
    }else if(dat.getDate() < today.getDate()){
        // sendJSONresponse(res, 400, {
        //     "message": "You cant make pricelist for past",
        //     "error" : "eroooor"
        // }); 
       return res.status(400).json({
            message: 'You cant make pricelist for past!'
         });
       // return;
    }else{
        if( dat.getFullYear() > end.getFullYear()){
            return res.status(400).json({
                message: 'Start of validity is bigger than end of validity!'
             });
            
       }
       else if(dat.getMonth() > end.getMonth()){
        return res.status(400).json({
            message: 'Start of validity is bigger than end of validity!'
         });
       }else if( dat.getDate() > end.getDate()){
        return res.status(400).json({
            message: 'Start of validity is bigger than end of validity!'
         });
       }
    }

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
          return res.status(404).json(err);
         //  return;
        }
    res.status(200).json({
        "message" : "Pricelist successfully added."
    });
});


};