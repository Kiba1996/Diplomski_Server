var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var PT = mongoose.model('passengerType');
var fs = require('fs');
var sendJSONresponse = function(res, status, content)
{
    res.status(status);
    res.json(content);
}

module.exports.register = function(req, res)
{
    if(!req.body.name || !req.body.email || !req.body.password || !req.body.surname || !req.body.address  || !req.body.birthday || !req.body.role) {
        return res.status(400).json({"message": "All fields required!"});
    }

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.surname = req.body.surname;
    user.address = req.body.address;
    user.birthday = req.body.birthday;
    if(req.files != null){
        user.image.data = req.files.file.data; 
        user.image.contentType = 'image/png';
    }else{
        user.image.data = null;
        user.image.contentType = 'image/png';
    }
  
    user.activated = req.body.activated;
    user.role = req.body.role;
if(user.role == "AppUser"){

    PT.findOne({name: req.body.passengerType}).then(bla => {
        user.passengerType = bla.id;

        user.setPassword(req.body.password);

    user.save(function(err){
        if(!err)
            {
                User.find({}).populate('passengerType');
                var token;
                token = user.generateJwt();
                res.status(200);
                res.json({"token" : token});
            }else{
                return res.status(400).json({"message": "User with that email address already exist."});
            }

    });
    });

}else {
    user.setPassword(req.body.password);

    user.save(function(err){
        if(!err)
        {
            User.find({}).populate('passengerType');
        
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        }else{
            return res.status(400).json({"message": "User with that email address already exist."});
        }
    });
}
};

module.exports.login = function(req, res){
    if(!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    passport.authenticate('local', function(err, user, info){
        var token;
        if(err)
        {
            res.status(404).json(err);
            return;
        }

        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        } else {
            res.status(401).json(info);
        }
    })(req,res);
};


module.exports.edit = function(req, res)
{
    User.findById(req.body.Id).then(us => {
        if(us.email != req.body.email)
        {
            User.findOne({email : req.body.email}).then(dupl => {
                if(dupl)
                {
                    return res.status(400).json({"message" : "User with that email address already exist!"});
                }else {
                    if(req.files !=null)
                    {
                        var bal = {data : req.files.file.data, contentType: "image/png"}
                      const  nesto1= {email: req.body.email,surname: req.body.surname, name: req.body.name, address: req.body.address, birthday : new Date(req.body.birthday), image:bal, activated: "PENDING"}

                        User.findOneAndUpdate({_id : req.body.Id}, nesto1).then(bla => {
                            return res.status(200).json({
                                 "message" : "Successfully edited"
                             });
                         })
                    }else {

                        const nesto= {email: req.body.email,surname: req.body.surname, name: req.body.name, address: req.body.address, birthday : new Date(req.body.birthday)}
                        User.findOneAndUpdate({_id : req.body.Id}, nesto).then(bla => {

                                return res.status(200).json({ "message" : "Successfully edited" });
                         })

                    }
                }
            })
        }else{
            if(req.files !=null)
            {
                var bal = {data : req.files.file.data, contentType: "image/png"}
              const  nesto1= {email: req.body.email,surname: req.body.surname, name: req.body.name, address: req.body.address, birthday : new Date(req.body.birthday), image:bal, activated: "PENDING"}

                User.findOneAndUpdate({_id : req.body.Id}, nesto1).then(bla => {
                    return res.status(200).json({
                         "message" : "Successfully edited"
                     });
                 })
            }else {

                const nesto= {email: req.body.email,surname: req.body.surname, name: req.body.name, address: req.body.address, birthday : new Date(req.body.birthday)}
                User.findOneAndUpdate({_id : req.body.Id}, nesto).then(bla => {

                        return res.status(200).json({ "message" : "Successfully edited" });
                 })

            }
        }
    })
};
module.exports.editPassword = function(req, res)
{
    if(!req.body.Id || !req.body.oldPassword  || !req.body.newPassword || !req.body.confirmPassword   ) {
        return res.status(400).json({"message": "All fields requiered!"});
    }

    if(req.body.newPassword != req.body.confirmPassword)
    {
        return res.status(400).json({"message": "Passwords don't match!"});
    }else {
            User.findById(req.body.Id).then(u=>{
                if(u.validPassword(req.body.oldPassword)){
                    if(req.body.newPassword == req.body.confirmPassword){
                        u.setPassword(req.body.newPassword);
                        const nesto = {hash: u.hash, salt:u.salt}
                        User.findOneAndUpdate({_id: req.body.Id},nesto).then(k=>{
                            return res.status(200).json({
                                "message" : "Timetable successfully removed."
                        });
                        })
                    }
                    else{
                        return res.status(400).json({"message" : "New Password does not match the Confirm Password"});
                    }
                
                }
                else{
                    return res.status(400).json({"message":"Password does not match the old password"});
                    
                
                }
            })

        }

  
    };
   
