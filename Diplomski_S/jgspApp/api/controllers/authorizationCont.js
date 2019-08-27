var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports.declineController = function(req,res)
{
    if(req.body.id == "")
    {
        res.status(400).json({"message": "Missing id"});
    }
    const nesto = {activated: "DECLINED"};
    User.findOneAndUpdate({_id: req.body.id}, nesto).then(bla => {
        //slanje mejla
        res.status(200).json({"message": "Ok"});
    });
}

module.exports.authorizeController = function(req,res)
{
    if(req.body.id == "")
    {
        res.status(400).json({"message": "Missing id"});
    }
    const nesto = {activated: "ACTIVATED"};
    User.findOneAndUpdate({_id: req.body.id}, nesto).then(bla => {
        //slanje mejla
        res.status(200).json({"message": "Ok"});
    });
}


module.exports.declineAdmin = function(req,res)
{
    if(req.body.id == "")
    {
        res.status(400).json({"message": "Missing id"});
    }
    const nesto = {activated: "DECLINED"};
    User.findOneAndUpdate({_id: req.body.id}, nesto).then(bla => {
        //slanje mejla
        res.status(200).json({"message": "Ok"});
    });
}

module.exports.authorizeAdmin = function(req,res)
{
    if(req.body.id == "")
    {
        res.status(400).json({"message": "Missing id"});
    }
    const nesto = {activated: "ACTIVATED"};
    User.findOneAndUpdate({_id: req.body.id}, nesto).then(bla => {
        //slanje mejla
        res.status(200).json({"message": "Ok"});
    });
}

module.exports.getAwaitingAdmins = function(req, res)
{
    User.find().exec().then(allUs => {
        var ret = [];
        allUs.forEach(el => {
            if(el.role == "Admin" && el.activated == "PENDING"){
                ret.push(el);
            }
        });
        res.send(ret);
    })
}


module.exports.getAwaitingControllers = function(req, res)
{
    User.find().exec().then(allUs => {
        var ret = [];
        allUs.forEach(el => {
            if(el.role == "Controller" && el.activated == "PENDING"){
                ret.push(el);
            }
        });
        res.send(ret);
    })
}

module.exports.getAwaitingClients = function(req, res)
{
    User.find().exec().then(allUs => {
        var ret = [];
        allUs.forEach(el => {
            if(el.role == "AppUser" && el.activated == "PENDING"){
                ret.push(el);
            }
        });
        res.send(ret);
    })
} 

module.exports.declineUser = function(req,res)
{
    if(req.body.id == "")
    {
        res.status(400).json({"message": "Missing id"});
    }
    const nesto = {activated: "DECLINED", image: null};
    User.findOneAndUpdate({_id: req.body.id}, nesto).then(bla => {
        //slanje mejla
        res.status(200).json({"message": "Ok"});
    });
}

module.exports.authorizeUser = function(req,res)
{
    if(req.body.id == "")
    {
        res.status(400).json({"message": "Missing id"});
    }
    const nesto = {activated: "ACTIVATED"};
    User.findOneAndUpdate({_id: req.body.id}, nesto).then(bla => {
        //slanje mejla
        res.status(200).json({"message": "Ok"});
    });
}
