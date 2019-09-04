var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res)
{
    if(!req.payload._id){
       return res.status(401).json({
            "message" : "UnauthorizedError : private profile"
        });
    } else {
        User.findById(req.payload._id).exec(function(err,user) {
         return   res.status(200).json(user);
        });
    }
};

module.exports.resendRequst = function(req,res)
{
    if(req.body.email == "")
    {
       return res.status(400).json({"message": "Missing email"});
    }
    const nesto = {activated: "PENDING"};
    User.findOneAndUpdate({email: req.body.email}, nesto).then(bla => {
      
       return res.status(200).json({"message": "Ok"});
    });
}