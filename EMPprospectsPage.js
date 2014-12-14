function EMPfillProspectDetails(selectedProspectCellId){
	var number = parseInt(selectedProspectCellId.substring(16));
	$("#EMPprospectDetailsTitle").html(EMPprospects[number-1].titre);
	$("#EMPprospectDetailsClient").html(EMPprospects[number-1].nom_client.toUpperCase()+", "+
										  EMPprospects[number-1].prenom_client.substring(0,1).toUpperCase()+
										  EMPprospects[number-1].prenom_client.substring(1).toLowerCase());
	$("#EMPprospectDetailsDirector").html(EMPprospects[number-1].nom_directeur.toUpperCase()+", "+
										EMPprospects[number-1].prenom_directeur.substring(0,1).toUpperCase()+
										EMPprospects[number-1].prenom_directeur.substring(1).toLowerCase());
	$("#EMPprospectDetailsCertainty").html(EMPprospects[number-1].certitude+"%");
	$("#EMPprospectDetailsStartDate").html(EMPprospects[number-1].date_debut);
	$("#EMPprospectDetailsDeadline").html(EMPprospects[number-1].date_fin);
}

function EMPtryGetProspects(){
	EMPgetProspectsList(userid,EMPsetProspects,displayRequestError);
}

function EMPsetProspects(requestedData){
	EMPprospects = requestedData;
	var markup = "";
	var i = 1;
	while (i<=EMPprospects.length) {
		markup +=
			"<div id='EMPprospectsCell"+i+"' class='EMPprospectsCell'>"+
				"<div id='EMPprospectsCellTitle"+i+"' class='EMPprospectsCellTitle'>"+EMPprospects[i-1].titre+"</div>"+
				"<div id='EMPprospectsCellDirector"+i+"' class='EMPprospectsCellDirector'>"+EMPprospects[i-1].nom_directeur.toUpperCase()+", "+
																							EMPprospects[i-1].prenom_directeur.substring(0,1).toUpperCase()+
																							EMPprospects[i-1].prenom_directeur.substring(1).toLowerCase()+"</div>"+
				"<div id='EMPprospectsCellCertainty"+i+"' class='EMPprospectsCellCertainty'></div>"+
			"</div>";
		++i;
	}
	$("#EMPprospectsList").html(markup);
	i=1;
	while (i<=EMPprospects.length) {
		$("#EMPprospectsCellCertainty"+i).css({"background-color":EMPcertaintyToColor(EMPprospects[i-1].certitude)});
		++i;
	}
	if ($("#EMPprospectsList").html()!="")
		EMPfillProspectDetails("EMPprospectsCell1");
}

function initializeEMPprospectsPage(){
	$("#EMPprospectsList").on("click",".EMPprospectsCell",function(){
		EMPfillProspectDetails(this.id);
	});
}