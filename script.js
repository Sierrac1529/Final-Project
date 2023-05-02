

		const appState = {
			current_model : {
				title : "Intro view"
			},
			current_view : "#intro_view"
		}

		let user = false;
		let state = "intro_view";


document.addEventListener('DOMContentLoaded', () => {

		user = false;


		widget_html = render_view("#loggedin_view");
		document.querySelector("#view_widget").innerHTML = widget_html;

		introNav = `<li onclick="update_view('#register_screen')" id="signup"><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
		<li onclick="update_view('#login_screen')" id="login"><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>`;
		
		document.getElementById("logintxt").innerHTML = `<li onclick="update_view('#upload_screen')" id="upload"><a href="#"><span class="glyphicon glyphicon-facetime-video"></span> Upload Video</a></li>
			    	<li onclick="update_view('#intro_view')" id="logout"><a href="#"><span class="glyphicon glyphicon-log-out"></span> Log Out</a></li>`;



});




//update views
function update_view(current_view){

	const html_element = render_view(current_view);
	document.querySelector("#view_widget").innerHTML = html_element;

		//user == false (no sign in)
	if(current_view == "#intro_view"){
		user = false;
		state = "intro_view";
		intronav = `<li onclick="update_view('#register_screen')" id="signup"><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
		<li onclick="update_view('#login_screen')" id="login"><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>`
		document.getElementById("logintxt").innerHTML = intronav;
		document.getElementById("home").innerHTML = `<li class="active" onclick="update_view('#intro_view')"><a href="#">Home</a></li>`
	}

	if(current_view == "#register_screen"){
		user = false;
		state = "register_screen";
		registernav = `<li onclick="update_view('#login_screen')" id="login"><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>`
		document.getElementById("logintxt").innerHTML = registernav;
		document.getElementById("home").innerHTML = `<li class="active" onclick="update_view('#intro_view')"><a href="#">Home</a></li>`
	}

	if(current_view == "#login_screen"){
		user = false;
		state = "login_screen";
		loginnav = `<li onclick="update_view('#register_screen')" id="signup"><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>`
		document.getElementById("logintxt").innerHTML = loginnav;
		document.getElementById("home").innerHTML = `<li class="active" onclick="update_view('#intro_view')"><a href="#">Home</a></li>`
	}

		//user == true (user signed in)
	if(current_view	== "#loggedin_view"){
		user = true;
		state = "loggedin_view";
		innav = `<li onclick="update_view('#upload_screen')" id="upload"><a href="#"><span class="glyphicon glyphicon-facetime-video"></span> Upload Video</a></li>
			    	<li onclick="update_view('#intro_view')" id="logout"><a href="#"><span class="glyphicon glyphicon-log-out"></span> Log Out</a></li>
		`
		document.getElementById("logintxt").innerHTML = innav;
		document.getElementById("home").innerHTML = `<li class="active" onclick="update_view('#loggedin_view')"><a href="#">Home</a></li>`
	}

	if(current_view	== "#upload_screen"){
		user = true;
		state = "upload_screen";
		uploadnav = `<li onclick="update_view('#intro_view')"><a href="#"><span class="glyphicon glyphicon-log-out"></span> Log Out</a></li>
		`
		document.getElementById("logintxt").innerHTML = uploadnav;
		document.getElementById("home").innerHTML = `<li class="active" onclick="update_view('#loggedin_view')"><a href="#">Home</a></li>`

	}

 }



//render different views
const render_view = (view) => {

	//console.log(model);
	template_source = document.querySelector(view).innerHTML;
	//console.log(template_source);
	var template = Handlebars.compile(template_source);

	//console.log({...model,...appState})
	//var html_widget_element = template ({...model,...appState})
	//return html_widget_element
	return template_source;
 }


function handle_app_widget_event(e){
	console.log("Button Pressed");
 }

 //register submit button
 function register(){
 		if (state == "register_screen") {
		 		let em = document.getElementById("remail").value;
				let pwd = document.getElementById("rpwd").value;


				const app = express();
				const router = express.Router();

				app.use(express.json());


				api = `http://localhost:3000//api_pass/${em}/${pwd}`;

				const data = await fetch(api);
				const model = await data.json();
				

				user = true;
				console.log(em+ pwd);
				update_view("#loggedin_view");
	 	 }		
  }

 //login submit button
  function login(){
 		if (state == "login_screen") {
		 		let lem = document.getElementById("lemail").value;
				let lpwd = document.getElementById('lpwd').value;
				user = true;
				console.log(lem + lpwd);
				update_view("#loggedin_view");
	 	 }		
  }

  //video submit button
  function upload(){
 		if (state == "upload_screen") {
		 		let title = document.getElementById("title").value;
				let link = document.getElementById('link').value;
				console.log(title + link);
				update_view("#loggedin_view");
	 	 }		
  }