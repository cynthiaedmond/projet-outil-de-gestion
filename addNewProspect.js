var markup;
var nbemployees;
var equipe=[];
var slider_value;
function showValue(newValue)
{
	slider_value = newValue;
	document.getElementById("range").innerHTML=newValue+"%";

}

function fillEmployeesP(requestedData)
{
	markup="";
	markup+="<tr>";
	nbemployees=requestedData.length;

	for(var i= 0; i< requestedData.length ;++i)
		{
			markup +="<td class='title'></td><td class='title'>"+requestedData[i].prenom+" "+requestedData[i].nom +"</td>";
			markup+="<td class='title'><input type='checkbox' name='checkbox' value='"+requestedData[i].num_employe+"' id='checkbox"+
			requestedData[i].num_employe+"'>"+"</input></td></tr>";
		}
	document.getElementById("peopleTable").innerHTML =markup;
		$("#newProspectContainer").show();
		$("#peopleContent").show();
		$("#pipelineTableContainer").hide();
		$("#addContainer").hide();
	
}

function getCheckedEmployees(requestedData)
{
	var j=0;
	for(var i=0; i<nbemployees;++i)
	{
		if(document.getElementById("checkbox"+employees[i][1]).checked)
			{
				equipe[j]=document.getElementById("checkbox"+employees[i][1]).value;
				j++;
			}
	}
	insertIntoTableTravaille(equipe,requestedData.num_prospect,insertPhase,getError);
}

function insertPhase(numprospect)
{
		var currentDay = new Date();
		currentDay = dateToMySQLDate(currentDay);
		createPhase(currentDay,numprospect,slider_value,creatingProspectSucceeded,getError);
}

function dateToMySQLDate(date){
	return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}

function creatingProspectSucceeded()
{	
		$("#newProspectContainer").hide();
		$("#addContainer").show();
		getProspects(userid,fillProspects,getError);
}

function fillClientsP(requestedData)
{
	markup ="";
	for(var i=0; i < requestedData.length;++i)
		markup+="<option value=clientChoice"+requestedData[i].num_client+">"+requestedData[i].prenom + " " +requestedData[i].nom +"</option>";
	document.getElementById("clientChoices").innerHTML=markup;
		$("#addClientContent").hide();
		$("#newProspectContent").show();
}


function getError(requestData)
{
	alert(requestData.error);
}

