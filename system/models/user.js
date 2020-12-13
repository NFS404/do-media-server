let mongoose = require('mongoose');


let userSchema = new mongoose.Schema({
    userid : {
    	type : String,
    	required : true,
    	unique: true
	},
	imageUri : {
		type : String,
		required : true,
		unique : true
	},
	name : {
    	type : String,
    	required : true
  	},
  	email : {
    	type : String,
    	required : true,
    	unique: true
  	},
  	phone : {
    	type : String,
    	required : true,
    	unique: true
  	},
  	date : {
   		 type : Date,
   		 "default" : Date.now
  	},
  	password : {
    	type : String,
    	required : true
    },
	token : {
    	type : String
  	}
});

mongoose.model("User", userSchema, "users");