var mongoose = require('mongoose');
var Ticket = mongoose.model('ticket');
var DayType = mongoose.model('dayType');
var TicketType = mongoose.model('ticketType');
var User = mongoose.model('User');
var PassType = mongoose.model('passengerType');
var PayPal = mongoose.model('payPal');
var TicketPrice = mongoose.model('ticketPrices');

var nodemailer = require('nodemailer');

sendMail = function(mailOptions){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pusgs2019app@gmail.com',
          pass: '12345Aa.'
        }
      });
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


module.exports.getAllTicketTypes = function(req, res)
{
    var types = [];
    
     TicketType.find().exec().then(type => { 
         res.send(type);
        });
    console.log(type);

};

module.exports.getTicketPrice = function(req, res){

    User.findById(req.query.user).then(u=>{
      
            PassType.findById(u.passengerType).then(tt=>{
                TicketPrice.findById(req.query.ticketPrice).then(tp=>{
                    let price = tp.price - (tp.price*tt.coefficient);
                    res.send(price.toString());
                })
            })
        
    })



}

module.exports.getTicket =function(req, res){
    Ticket.findById(req.params.id).then(t=>{
        res.send(t);
    })
}

module.exports.validateTicketNoUser = function(req,res){
   
   var pr = (new Date(req.body.purchaseTime));
   pr.setHours(pr.getHours() -1);
  var today = new Date(Date.now());
    if (pr < today)
    {
         return res.status(400).json({
            "message" : "Ticket is not valid. Time is up!"
        });
     
    }
    else{
        return res.status(200).json({
            "message" : "Ticket is valid."
        });
    }
}

module.exports.validateTicket = function(req,res){
  var pr;
    if(req.params.email != "" || req.body != null){
       
        User.findById(req.body.user).then(u=>{
            if(u.email == req.params.email){
                var pr = (new Date(req.body.purchaseTime));
                pr.setHours(pr.getHours() -1);
                var today = new Date(Date.now());

                TicketType.findById(req.body.ticketType).then(tt=>{
                    if(tt.name == "Hourly"){
                        if (pr < today)
                        {
                             return res.status(400).json({
                                "message" : "Ticket is not valid. Time is up!"
                            });
                         
                        }
                        else{
                            return res.status(200).json({
                                "message" : "Ticket is valid."
                            });
                        }
                    }
                    if(tt.name == "Daily"){
                        if (pr.getFullYear() < today.getFullYear())
                        {
                            return res.status(400).json({
                                "message" : "Ticket is not valid. Time is up!"
                            });
                        
                        }
                        else if(pr.getFullYear() == today.getFullYear()){
                           
                            if(pr.getMonth() < today.getMonth()){

                                return res.status(400).json({
                                    "message" : "Ticket is not valid. Time is up!"
                                });

                            }else if(pr.getMonth() == today.getMonth()){
                                if(pr.getDate() == today.getDate()){
                                    return res.status(200).json({
                                        "message" : "Ticket is valid."
                                    });
                                }
                                else{
                                    return res.status(400).json({
                                        "message" : "Ticket is not valid. Time is up!"
                                    });
                                }
                            }
                        }
                    }
                    if(tt.name == "Monthly"){
                        if (pr.getFullYear() < today.getFullYear())
                        {
                            return res.status(400).json({
                                "message" : "Ticket is not valid. Time is up!"
                            });
                        
                        }
                        else if(pr.getFullYear() == today.getFullYear()){
                           
                            if(pr.getMonth() == today.getMonth()){
                               
                                    return res.status(200).json({
                                        "message" : "Ticket is valid."
                                    });
                            }
                            else{
                                 return res.status(400).json({
                                        "message" : "Ticket is not valid. Time is up!"
                                    });
                                
                            }
                        }
                    }
                    if(tt.name == "Yearly"){
                        if (pr.getFullYear() == today.getFullYear())
                        {
                            return res.status(200).json({
                                "message" : "Ticket is valid."
                            });
                        }else{
                            return res.status(400).json({
                                "message" : "Ticket is not valid. Time is up!"
                            });
                        
                        }
                    }
                })


            }else{
                return res.status(400).json({
                    "message" : "User with email: "+ req.params.email + " did not buy ticket with Id: " + req.body._id
                });
             
            }
        })
   }
  
     
 }

module.exports.checkValidity = function(req,res){
   if(req.body.email == null || req.body.email=="" || req.body.email =="null"){
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
   
    var payp = new PayPal();
    payp.payementId = req.body.payementId;
    payp.createTime = new Date(req.body.createTime);
    payp.payerEmail = req.body.payerEmail;
    payp.payerName = req.body.payerName;
    payp.payerSurname = req.body.payerSurname;
    payp.currencyCode = req.body.currencyCode;
    payp.value  = req.body.value;
    var price;
    var ticketType;
    TicketPrice.findById(req.body.ticketPrices).then(tp=>{
        TicketType.findById(req.body.ticketType).then(tt=>{
            payp.save(function(err){
                var ticket = new Ticket();
        
                ticket.payPal = payp._id;
                if(req.body.user != undefined){
                    ticket.user = req.body.user;
                    ticket.name = "karta";
                }else{
                    ticket.user = null;
                    ticket.name = req.body.name;
                }
                ticket.ticketPrice = req.body.ticketPrices;
                ticket.purchaseTime = new Date(req.body.purchaseTime);
                ticket.ticketType = req.body.ticketType;
                    ticket.save(function(err){
                        if(err)
                        {
                           return res.status(404).json({"message":err});
                            
                        }else{
                            
                           if(req.body.name != undefined){
                               var mess = "Dear "+ req.body.name + ",\r\n Your purchase is successfull.\r\n Ticket price: " + tp.price+ "\r\n Ticket type: "+tt.name+"\r\nTime of purchase: "+req.body.purchaseTime+"\r\nTicket is valid for the next hour.\r\n Thank you.";
                            var mailOptions = {
                                from: 'pusgs2019app@gmail.com',
                                to: req.body.name,
                                subject: 'Ticket purchase',
                                text: mess
                              };
                              sendMail(mailOptions);
                           }
                            return res.status(200).json({"message" : "All good"});
                        }
                    });
                });
                
        })
    })
    

 };
 
 module.exports.getAllTicketsForOneUser = function(req, res)
{
    Ticket.find().exec().then(listOfTickets => {
        
        User.findOne({email: req.params.email}).then(aa => {
            var userTickets = [];
        var brojac = 0;
            listOfTickets.forEach(element => {
            brojac++;
            if(element.user != undefined){
                if(element.user.equals(aa._id))
                {
                    userTickets.push(element);
                }
            }
               
                if(brojac == listOfTickets.length)
                {
                   

                    res.send(userTickets);
                   
                
                   
                }
            })
           

            })

        });
}
