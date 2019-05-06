// var mongoose = require("mongoose");
var mongoose = require('./db')
// mongoose.connect('mongodb://localhost/wikipedia',function () {
// 	console.log('mongodb connected')
// });

var userSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	email: String,
	username: String,
	password: String
});
/*{
			    versionKey: false 
		 });*/

var User = mongoose.model('User', userSchema);
module.exports = User;