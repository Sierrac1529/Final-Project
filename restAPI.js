//restAPI.js

//npm install express: terminal
var express = require("express");
var app = express();
const router = express.Router();

const fs = require('fs')
let rawdata = fs.readFileSync('userdata.json');
let user = JSON.parse(rawdata);


//define routes


router.get ('/', function(req,res){
	res.send("Server running");
})


//api
app.get('/api', (req,res) =>{
	let outputJSON = {
		users : user["data"]
	}
res.json(outputJSON)

});

//email
app.get('/api/by_email/:email', (req,res) =>{
	let query = req.params['email']
	filtered_users = user["data"].filter(q => q.email.includes(query))
	let outputJSON = {
		users : filtered_users
	}
	res.json(outputJSON);
});

//email and password
app.get('/api_pass/:email/:password', (req, res) => {
	let em = req.params['email']
	let pwd = req.params['password']
	filtered_users = user["data"].filter(
			q => {
				if (q.email.includes(em) && q.password.includes(pwd)){
					return true;
				}
				console.log("no user exists");
				return false;
			}

		)


	let outputJSON = {
		users : filtered_users
	}
	res.json(outputJSON);
});


app.use('/demo', express.static('Project'));
//Start the server.

app.listen(3000, function(){
	console.log("Server is running");
	//console.log(user);
})