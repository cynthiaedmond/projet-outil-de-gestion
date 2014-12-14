var markup ="";

function fillClients(requestedData)
{
	markup ="<tr border-bottom ='1px solid gray'><td>Full Name</td><td>E-mail</td><td>Phone number</td><td/></tr>";
	for (var i =0; i <requestedData.length;++i)
		markup+= "<tr><td>" + requestedData[i].nom.toUpperCase() + ", " +
							requestedData[i].prenom.substring(0,1).toUpperCase()+requestedData[i].prenom.substring(1).toLowerCase() +
							"</td><td>"+requestedData[i].mail+"</td><td>"+requestedData[i].num_telephone+
							"</td><td><input type='button' value='+Edit' id='client"+requestedData[i].num_client+"'></input></td></tr>";
	document.getElementById("clientsTable").innerHTML = markup;

}

function getError(requestedData)
{
	alert(requestedData.error);
}

