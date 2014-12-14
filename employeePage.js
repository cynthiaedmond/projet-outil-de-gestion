var EMPprospects = [];
var EMPdayoffTypes = [];

function initializeEmployeePage(){
	$("#EMPtimelineIcon").css({"background-color" : "darkorange"});
	$("#EMPprospectsIcon").click(function(){
		$("#EMPtimelineTab").hide();
		$("#EMPsettingsTab").hide();
		$("#window").css({"overflow-y" : "hidden"});
		$("#EMPprospectsTab").show();
		$("#EMPprospectsIcon").css({"background-color" : "darkorange"});
		$("#EMPtimelineIcon").css({"background-color" : "orange"});
		$("#EMPsettingsIcon").css({"background-color" : "orange"});
	});
	$("#EMPtimelineIcon").click(function(){
		$("#EMPprospectsTab").hide();
		$("#EMPsettingsTab").hide();
		$("#window").css({"overflow-y" : "scroll"});
		$("#EMPtimelineTab").show();
		$("#EMPprospectsIcon").css({"background-color" : "orange"});
		$("#EMPtimelineIcon").css({"background-color" : "darkorange"});
		$("#EMPsettingsIcon").css({"background-color" : "orange"});
	});
	$("#EMPsettingsIcon").click(function(){
		$("#EMPprospectsTab").hide();
		$("#EMPtimelineTab").hide();
		$("#EMPsettingsTab").show();
		$("#EMPprospectsIcon").css({"background-color" : "orange"});
		$("#EMPtimelineIcon").css({"background-color" : "orange"});
		$("#EMPsettingsIcon").css({"background-color" : "darkorange"});
	});
	initializeEMPtimelinePage();
	initializeEMPprospectsPage();
	$("#EMPsettingsTab").load("settingsTab.html",initializeSettingsTab);
	EMPtryGetProspects();
	EMPtryGetDayoffTypes();
	$("#EMPwelcomeTextIcon").html("Welcome, "+lastname.toUpperCase()+"<br />"+firstname.substring(0,1).toUpperCase()+firstname.substring(1).toLowerCase());
}

function EMPcertaintyToColor(certainty){
	if (certainty<0 || certainty>100) {
		alert("Database Corruption Found with certainty "+certainty);
		return "black";
	}
	if (certainty<20) return "red";//red color
	if (certainty<40) return "orange";//orange color
	if (certainty<60) return "yellow";//yellow color
	if (certainty<80) return "greenyellow";//greenyellow color
	if (certainty<=100) return "green";//green color
}

function dateToMySQLDate(date){
	return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}

function mySQLDateToDate(mySQLDate){
	return new Date(mySQLDate.substring(0,4),parseInt(mySQLDate.substring(5,7))-1,mySQLDate.substring(8,10));
}

function displayRequestError(requestedData){
	alert(requestedData.error);
}

function displayRequestSuccess(requestedData){
	alert(requestedData.success);
}