//routes server

var dir = "C:/Users/clarkes/Desktop/Project"
var express = require('express');
path = require('path');

//var v_script = require(dir+'/resources/vids.js');

//user database
user_conn =  "C:/Users/clarkes/Desktop/Project/resources/demodb.json";

user_schema = {
  results : []
}

global.u_db = require(dir+"/resources/fsdb")(user_conn,user_schema);



//videos database
vid_conn="C:/Users/clarkes/Desktop/Project/resources/videodb.json";

vid_schema = {
	results : []
}


global.v_db = require(dir+"/resources/fsdb")(vid_conn,vid_schema);



// Require the module we created above and that includes the two notification routes. 
var r = require(dir+'/resources/routes/routes');
const session = require('express-session');


// Define an applicatiosn.
var app = express()


// Specify what template engine to use.  PUG in our case
// PUG templates shoudl be stored in the subfolder called 'pages' in this exmaple.
app.set('views','./pages');
app.set('view engine','pug');


// Register Middleware to process header information and form data.
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Use the session middleware
app.use(session({
  secret: 'SomeSecretCode##LoadFromEnviromentVariable',
  saveUninitialized:true,
  resave:false,
  cookie: { maxAge: 60000 }})
)


app.get('/pages/pagescripts/viewchanger.js', (req,res)=>{
	res.sendFile(path.join(dir + "/pages/page scripts/viewchanger.js"));

})
//


//register.pug
app.get('/register', (req,res)=>{
  model_view = {
    action_url : '/register',
  }
  res.render('register.pug',);
})


app.post('/register',(req,res)=>{
	const { username, password} = req.body; 
	new_user = {
        Username : username,
        Password : password
    }

    u_db.model.results.push(new_user);
    u_db.update();
    res.redirect('/login');
});



//login.pug
app.get('/login', (req,res)=>{
  model_view = {
    action_url : '/login',
  }
  res.render('login.pug',);
})



// User need to authenticate.
// Typically user credentials should be passed through a secure POST request 

app.post('/login', (req,res) => {
  const { username, password} = req.body; 
	let users = u_db.model.results;
	
	users = users.filter(q => q.Username == username);
	if (users[0] == null){res.send("wrong username");}

	let obj = users.find((o, i) => {
    	if (o.Username === username) {
    		if (o.Password === password){
    			req.session.userID = username;
    			req.session.isAuthenticated = true;
    			res.redirect('/home*');
    		}
    		else{res.send("wrong password");}

    		;}
    	else{res.send("wrong username");}
     });
	
});



//intro.pug
app.get('/home', (req,res)=>{
  model_view = {
    action_url : '/home',
  }
  req.session.destroy((err) => {
    if (err){
        console.log(err);
        res.send(err)
     }
  	else{res.render('intro.pug',);}
  });
  
})


//loggedin.pug
app.get('/home*', (req, res) => {

  if (!req.session.isAuthenticated) {
    res.redirect('/login');
    return;
  }

  let vids = v_db.model.results;

  const fs = require('fs');
  const data = fs.readFileSync(vid_conn);
  const base = JSON.parse(data);
  const database = base.results;
 

  model_view = {
    action_url: '/home*',
  };
  
  res.render('loggedin', { database: database });
});




//upload.pug
app.get('/upload', (req,res)=>{

if (!req.session.isAuthenticated) {
      res.redirect('/login');
      return;
    }

  model_view = {
    action_url : '/upload',
  }
  res.render('upload.pug',);
})

app.post('/upload', (req,res) =>{
	const { title, link} = req.body; 
	new_v = {
        Title : title,
        Link : link
    }

    v_db.model.results.push(new_v);
    v_db.update();

    res.redirect('/home*');

})




// Start a server
app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});