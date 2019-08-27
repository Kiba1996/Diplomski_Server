var mongoose = require('mongoose');
var Ticket = mongoose.model('ticket');
var DayType = mongoose.model('dayType');
var TicketType = mongoose.model('ticketType');
var User = mongoose.model('User');
var PassType = mongoose.model('passengerType');
var PayPal = mongoose.model('payPal');

module.exports.getAllTicketTypes = function(req, res)
{
    var types = [];
    
     TicketType.find().exec().then(type => { 
         res.send(type);
        });
    console.log(type);

};




module.exports.checkValidity = function(req,res){
   if(req.body.email == null || req.body.email==""){
    if(req.body.ticketType == "1"){
        res.send(true);
    }else{
        res.send(false);
    }
   }else{

   }
    User.findOne({email:req.body.email}).exec().then(u =>{
       if(u != null){
        if(u.activated == "ACTIVATED"){
            res.send(true);
        }else{
            res.send(false);
        }
       }else{
        res.send(false);
       }
       
    })
}

module.exports.getTypeUser = function(req,res){
   
   if(req.params.email == ""|| req.params.email == "null"){
    return res.status(404).json({
        "message" : "Missing an email."
    });
   }
    User.findOne({email: req.params.email}).exec().then(u =>{
        PassType.findById(u.passengerType).exec().then(p=>{
            res.send(p);
        })
    });
};

module.exports.addPayPal = function(req,res){
   
    // if(req.params.email == ""){
    //  return res.status(404).json({
    //      "message" : "Missing an email."
    //  });
    // }
    var payp = new PayPal();
    payp.payementId = req.body.payementId;
    payp.createTime = new Date(req.body.createTime);
    payp.payerEmail = req.body.payerEmail;
    payp.payerName = req.body.payerName;
    payp.payerSurname = req.body.payerSurname;
    payp.currencyCode = req.body.currencyCode;
    payp.value  = req.body.value;

    payp.save(function(err){
        var ticket = new Ticket();

        ticket.payPal = payp._id;
        ticket.user = req.body.user;
        ticket.name = "karta";
        ticket.ticketPrice = req.body.ticketPrices;
        ticket.purchaseTime = new Date(req.body.purchaseTime);
        ticket.ticketType = req.body.ticketType;
            ticket.save(function(err){
                if(err)
                {
                    res.status(404).json(err);
                    return;
                }else{
                    return res.status(200).json({"message" : "All good"});
                }
            });
        });
        

 };
 
