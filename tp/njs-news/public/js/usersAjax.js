//************** SPECIF CRUD ********

window.onload=function(){
	(document.getElementById("inputId")).disabled=true; //if auto_incr
	initListeners(); 
}

function objectFromInput(){
	let id = (document.getElementById("inputId")).value;
	if(!isNaN(id)) id = Number(id);
	if(id=="")id=null;
	
	let username = (document.getElementById("inputUsername")).value;
	let firstName = (document.getElementById("inputFirstName")).value;
	let lastName = (document.getElementById("inputLastName")).value;
	let email = (document.getElementById("inputEmail")).value;
	let newPassword = (document.getElementById("inputNewPassword")).value;
	let mainGroup = (document.getElementById("inputMainGroup")).value;

	document.getElementById("spanMsg").innerHTML="";
	let obj = { id : id,
		        username: username,
				firstName: firstName,
	            lastName :lastName,
				email:email,
				newPassword:newPassword,
				mainGroup: mainGroup
	            };
	console.log("objectFromInput:"+JSON.stringify(obj));
	return obj;
}

function displayObject(obj){
	console.log("displayObject:"+JSON.stringify(obj));
	(document.getElementById("inputId")).value=obj.id;
	(document.getElementById("inputUsername")).value=obj.username;
	(document.getElementById("inputFirstName")).value=obj.firstName;
	(document.getElementById("inputLastName")).value=obj.lastName;
	(document.getElementById("inputEmail")).value=obj.email;
	(document.getElementById("inputNewPassword")).value=obj.newPassword;
	(document.getElementById("inputMainGroup")).value=obj.mainGroup;
}

function insertRowCells(row,obj){
	(row.insertCell(0)).innerHTML = obj.id;
	(row.insertCell(1)).innerHTML = obj.username;
	(row.insertCell(2)).innerHTML = obj.firstName;
	(row.insertCell(3)).innerHTML = obj.lastName;
	(row.insertCell(4)).innerHTML = obj.email;
	(row.insertCell(5)).innerHTML = obj.newPassword;
	(row.insertCell(6)).innerHTML = obj.mainGroup;
}


function blankObject(){
	return {id:"" , username: "myUsername" ,firstName: "myfirstName" ,
		 lastName :"myLastName",email:"aaa.bbb@xyz.com" ,
		newPassword :"pwd",mainGroup:"user_of_sandboxrealm"
	 };	
}

function getWsBaseUrl(){
	return "news-api/users";	
}

//obj = object with values to check
//action = "add" or "update" or ...
function canDoAction(action,obj){
	ok=true; //by default

	if(obj.username==null || obj.username == "")
	  ok=false;
	
	return ok;
}
