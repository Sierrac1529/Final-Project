//routes.js

//create variables & references
var dir = "https://github.com/Sierrac1529/Final-Project"
var express = require("express");
var app = express();
const router = express.Router();
db_conn =  dir + "/resources/demodb.json";
const fs = require('fs')
let rawdata = fs.readFileSync(dir + '/resources/demodb.json');
let user = JSON.parse(rawdata);


db_schema = {
  results : []
}


global.db = require(dir + "/resources/fsdb")(db_conn,db_schema);

//define routes
router.get ('/', function(req,res){
	res.send("Server running");
	});


//api
router.get('/api', (req,res) =>{
	let outputJSON = {
			results : user["results"]
		}
	res.send(outputJSON);

 });



//search by username
router.get('/api/by_username/:username', (req,res) =>{
	let query = req.params['username']
	filtered_users = user["results"].filter(q => q.username.includes(query))
	let outputJSON = {
		users : filtered_users
	 }
	res.json(outputJSON);
 });

//search by username and password
router.get('/api_pass/:username/:password', (req, res) => {
	let em = req.params['username']
	let pwd = req.params['password']
	filtered_users = user["results"].filter(
			q => {
				if (q.username.includes(em) && q.Password.includes(pwd)){
					console.log("user exists");
					return true;
				 }
				else{
					console.log("no user exists");
					return false;}
			 }

		)


	let outputJSON = {
		users : filtered_users
	 }
	res.json(outputJSON);



 });

//Register form

router.get('/register', (req,res)=>{
  model_view = {
    action_url : '/register',
  }
  res.render('register.pug',);
})


//register new user
router.get('/register/:username/:password', (req,res) => {
    // another way, to get the URL params.
    // you can use req.params['bookid'] and req.params['booktitle'] instead
    const { username, password } = req.params;

    new_user = {
        Username : username,
        Password : password
    }
    db.model.results.push(new_user)  // update in-memory dictonary
    db.update(); // store on file stytem.
    res.send("New user has been added to the database");
 });

// Retrieve data from the database.
router.get('/users', (req,res) => {
  users = db.model.results;
  res.json(users);
 });

module.exports = router;
