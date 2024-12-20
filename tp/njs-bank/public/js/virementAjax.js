
window.onload=function(){
	(document.getElementById("btnRefreshAll"))
	   .addEventListener("click",refreshAll);
	   
	(document.getElementById("btnVirement"))
	   .addEventListener("click",doVirement); 
}

function basicErrorCallback(err){
	console.log("err="+err);
	if(err && err.length>256){
		err = err.substring(0,256)
	}
	document.getElementById("spanMsg").innerHTML=err;
	document.getElementById("spanMsg").style.color="red";
}

function initSelectOptions(selectId,comptes){
	let selectCpt = document.getElementById(selectId);
	selectCpt.innerHTML="";
	for(let cpt of comptes){
			let option=document.createElement("option");
			option.innerHTML=JSON.stringify(cpt)
			option.value=cpt.num;
			selectCpt.appendChild(option);
		}
}

function refreshAll(){	
	let customerId = document.getElementById("inputCustomerId").value;
	let wsUrl =  "./bank-api/accounts?ownerId=" + customerId;
	makeAjaxGetRequest(wsUrl,function(responseJson){
		let objectListJs = JSON.parse(responseJson);
		console.log("objectListJs="+objectListJs);
		initSelectOptions("selectCptDeb",objectListJs);
		initSelectOptions("selectCptCred",objectListJs);
		let bodyElt = document.getElementById("table_body");
		bodyElt.innerHTML="";//vider le tableau avant de le re-remplir
		for(let obj of objectListJs){
			let row = bodyElt.insertRow(-1);
			(row.insertCell(0)).innerHTML = obj.num;
			(row.insertCell(1)).innerHTML = obj.label;
			(row.insertCell(2)).innerHTML = obj.balance;
			//(row.insertCell(3)).innerHTML = obj.customerId;
		}
	},basicErrorCallback);
	
}

function virementFromInput(){
	let montant = (document.getElementById("inputMontant")).value;
	
	let numCptDeb = (document.getElementById("selectCptDeb")).value;
	console.log("numCptDeb="+numCptDeb);
	let numCptCred = (document.getElementById("selectCptCred")).value;
	console.log("numCptCred="+numCptCred);
	if(numCptDeb == numCptCred){
	    basicErrorCallback("numCompteDebit doit etre different de numCompteCredit");
	    return null;
	    }
	if(montant <= 0){
	    basicErrorCallback("le montant doit etre strictement positif");
	    return null;
	    }
	
	document.getElementById("spanMsg").innerHTML="";
	let virement = { amount : montant,
					debitAccountNumber : numCptDeb,
					creditAccountNumber : numCptCred
	            };
	return virement;
}

function doVirement(){	
	let virementJs = virementFromInput();
	if(virementJs==null) return;
	let objectJson = JSON.stringify(virementJs) ;  
	let wsUrl = "./bank-api/transfers";   
	makeAjaxPostRequest(wsUrl,objectJson,function (responseJson){
		console.log("responseJson="+responseJson);
		let virementResponseJs = JSON.parse(responseJson);
		let contextMsg = ` [amount=${virementResponseJs.amount} debitAccountNumber=${virementResponseJs.debitAccountNumber} creditAccountNumber=${virementResponseJs.creditAccountNumber}]`
		document.getElementById("spanMsg").innerHTML=virementResponseJs.message + contextMsg;
	    document.getElementById("spanMsg").style.color="blue";
	    (document.getElementById("inputMontant")).value=0;
		refreshAll(); //pour rafraîchir le tableau avec objet ajouté
	},basicErrorCallback);         
}



