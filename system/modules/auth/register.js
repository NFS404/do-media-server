let mongoose = require('mongoose');
let User = mongoose.model("User");
let bcrypt = require("bcrypt-nodejs");

module.exports = function(req, res) {
    
    let newEntry, statusCode, returnData;
    if(!req.body.password || !req.body.userid)
    {
        resp = {
            'statusCode': 400,
            'error': "Username & Password are required"
        };
        res
        .status(400)
        .json(resp);
        return;
    }
	if(req.body.userid.includes('@'))
    {
        resp = {
            'statusCode': 400,
            'error': "User ID cannot include special characters."
        };
        res
        .status(400)
        .json(resp);
        return;
    }
    let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    console.log("New User registration")
    newEntry = {
        'userid' : req.body.userid,
        'name' : req.body.name,
        'email' : req.body.email,
        'phone' : req.body.phone,
        'password' : password,
        'imageUri': req.body.imageUri
    };
    User.create(newEntry, function(err, resp){
        if(err) {
            console.log("Error registering User record : " + err)
            statusCode = 400;
            returnData = err;
        }
        else {
            statusCode = 201;
            returnData = resp;
        }
        res
        .status(statusCode)
        .json(returnData);
    });
}