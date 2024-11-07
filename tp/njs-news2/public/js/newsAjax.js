//************** SPECIF CRUD ********

window.onload=function(){
	(document.getElementById("inputId")).disabled=true; //if auto_incr
	initListeners(); 
}

function objectFromInput(){
	let id = (document.getElementById("inputId")).value;
	if(id=="") id=null;
	
	let title = (document.getElementById("inputTitle")).value;
	let text = (document.getElementById("inputText")).value;
	let timestamp = (document.getElementById("inputTimestamp")).value;
	
	document.getElementById("spanMsg").innerHTML="";
	let obj = { id : id,
				title : title,
	            text : text,
				timestamp : timestamp
	            };
	return obj;
}

function displayObject(obj){
	const idSel = obj.id;
	//console.log("idSel="+idSel);
	(document.getElementById("inputId")).value=idSel;
	(document.getElementById("inputTitle")).value=obj.title;
	(document.getElementById("inputText")).value=obj.text;
	(document.getElementById("inputTimestamp")).value=obj.timestamp;
}

function insertRowCells(row,obj){
	(row.insertCell(0)).innerHTML = obj.id;
	(row.insertCell(1)).innerHTML = obj.title;
	(row.insertCell(2)).innerHTML = obj.text;
	(row.insertCell(3)).innerHTML = obj.timestamp;
}


function blankObject(){
	return {id:"" , title: "" , text :"" , timestamp : (new Date()).toISOString() };	
}

function getWsBaseUrl(){
	return "news-api/news";	
}

//obj = object with values to check
//action = "add" or "update" or ...
function canDoAction(action,obj){
	ok=true; //by default
	if(obj.title==null || obj.title == "")
	  ok=false;
	if(obj.text==null)
	  ok=false;
	return ok;
}
