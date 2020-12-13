const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const jwtkey = process.env.JWT_KEY;

module.exports = function(req, res) {
    let userid = req.body.userid;
    let password = req.body.password;
    if(userid !== null && password !== null) {
        // User login
        console.log("User login " + userid);
        User
        .findOne({
            $or: [
				{userid: userid},
				{email: userid}
			]
        })
        .exec(function(err, user){
            if(err) {
                console.log(err);
                res.status(500).json({"error": "Something's wrong."});
            }
            else if(!user) {
                console.log("Login failed: User does not exist")
                res.status(404).json({"error" : "User does not exist"})
            }
            else {
                if(bcrypt.compareSync(password, user.password)) {
                    let payload = {
                        userid : user.userid,
                        username : user.name,
                        level: user.level
                    };
                    let token = jwt.sign(payload, jwtkey)
                    res.status(200).json({
                        'success' : true,
                        'token' : token
                    });
                }
                else
                {
                    console.log('Authentication failed');
                    res.status(401).json({'error' : 'Authentication failed: Invalid Password'});
                }
            }
        });
    }
}