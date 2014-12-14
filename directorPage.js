var employees=[];
var currentday = new Date();
var markup;
//var userid =2;
var editProspectId;
var clientChosen;
var editClientChosen;

function fillClients(requestedData)
{
	var markup="";
	markup ="<tr border-bottom ='1px solid gray'><td class=editRow /><td class=col>Full Name</td><td class =col>E-mail</td><td class=col>Phone number</td></tr>";
	for (var i =0; i <requestedData.length;++i)
		markup+= "<tr id ='clientRow"+requestedData[i].num_client+"'><td class = editRow><input type='button' value='Edit' class ='editClientButton' id='client"+requestedData[i].num_client+
						"'></input></td><td class=col>" + requestedData[i].nom.toUpperCase() + ", " +requestedData[i].prenom.substring(0,1).toUpperCase()+requestedData[i].prenom.substring(1).toLowerCase() +"</td><td class=col>"+
							requestedData[i].mail+"</td><td class= col>"+requestedData[i].num_telephone+"</td></tr>";
	document.getElementById("clientsTable").innerHTML = markup;
	$("#clientsPage").show();
}

function fillEmployees(requestedData)
{
	var fd = getMonday();
	var ld = getSunday();
	markup="";
	for(var i =0; i < requestedData.length ;++i)
	{
		employees[i]=[];
		employees[i][0]=requestedData[i].prenom+" "+requestedData[i].nom;
		employees[i][1]=requestedData[i].num_employe;
	}

	markup="<tr><td class =DIRweekCalendarHeaderCell />"+
		"<td class=DIRweekCalendarHeaderCell>Monday </td>"+
		"<td class=DIRweekCalendarHeaderCell>Tuesday </td>"+
		"<td class=DIRweekCalendarHeaderCell>Wednesday</td>"+
		"<td class=DIRweekCalendarHeaderCell>Thursday</td>"+
		"<td class=DIRweekCalendarHeaderCell>Friday</td>"+
		"<td class=DIRweekCalendarHeaderCell>Saturday</td>"+
		"<td class=DIRweekCalendarHeaderCell>Sunday</td>"+
	"</tr>";

	for(var i = 0; i < employees.length ; ++i)
	{
		markup +="<tr id='DIRweekCalendarRow"+employees[i][1]+"' class='DIRweekCalendarRow'>";

	}
	document.getElementById("timelineTable").innerHTML = markup;

	fillEvents(fd,ld);
}

function fillEvents(fd,ld)
{
	for(var i = 0; i < employees.length;++i)
		{
			document.getElementById("DIRweekCalendarRow"+employees[i][1]).innerHTML = 
			 "<td id='DIRweekCalendarCellemployee"+employees[i][1]+"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellemployee"+employees[i][1]+"' class='DIRWeekCalendarCellName'>"+employees[i][0]+
							"</div>"+
						"</div></td>"+
						"</td class='DIRweekCalendarCell'><td class='DIRweekCalendarCell'/><td class='DIRweekCalendarCell'/>"+
						"<td class='DIRweekCalendarCell'/><td class='DIRweekCalendarCell'/><td class='DIRweekCalendarCell'/>"+
						"<td class='DIRweekCalendarCell'/><td class='DIRweekCalendarCell'/>";
			getEvents(employees[i][1],fd,ld,fillRowForTable,getError);
		}
}

function fillRowForTable(requestedData)
{
	var i;
	var markup = "";
	var jour=[];
	jour[0]=[];
	jour[0].length=7;
	for(var j = 0; j<7;++j)
		jour[0][j]="";

	if(requestedData.length>0)
	{
		i = requestedData[0].num_employe;

		var n;
		for(var j =0;j<employees.length;++j)
			{
				if(employees[j][1] == i)
				{
					n=j;
					break;
				}	
			}
		markup = markup +"<td id='DIRweekCalendarCellemployee"+employees[n][1]+"' class='DIRweekCalendarCell'>"+
						"<div class='DIRweekCalendarCellWrapper'>"+
							"<div id='DIRweekCalendarCellemployee"+employees[n][1]+"' class='DIRWeekCalendarCellName'>"+employees[n][0]+
							"</div>"+
						"</div>"+
						"</td>";

		for(var r =0; r < requestedData.length;r++)
		{
				var d = new Date(requestedData[r].date);
				var j = d.getDay();
				jour[0][j]=requestedData[r].type_reservation;
		}
		var m = 0;
		for(var k = 1; k < 7; k++)
		{
			if(jour[0][k]=="")
			{
				markup +="<td class='DIRweekCalendarCell'></td>";
			}
			else
			{
				switch(requestedData[m].type_reservation)
				{
					case "reserve": {
						var couleur =DIRcertaintyToColor(requestedData[m].certitude);
										markup+="<td id='DIRweekCalendarCellProspect"+requestedData[m].num+"' class='DIRweekCalendarCell'>"+
												"<div class='DIRweekCalendarCellWrapper'>"+
													"<div id='DIRweekCalendarCellProspect"+requestedData[m].num+"' class='DIRweekCalendarCellTitle'>"+
													requestedData[m].titre+
													"</div>"+
													"<div id='DIRweekCalendarCellProspectCertainty"+requestedData[m].num+"' class='DIRweekCalendarCellCertainty'"+
													"style='background-color:"+couleur+"'></div>"+
												"</div>"+
											"</td>";
										break;
									}
					case "prospect": {
						var couleur =DIRcertaintyToColor(requestedData[m].certitude);
										markup+="<td id='DIRweekCalendarCellProspect"+requestedData[m].num+"' class='DIRweekCalendarCell'>"+
												"<div class='DIRweekCalendarCellWrapper'>"+
													"<div id='DIRweekCalendarCellProspect"+requestedData[m].num+"' class='DIRweekCalendarCellTitle'>"+
													requestedData[m].titre+
													"</div>"+
													"<div id='DIRweekCalendarCellProspectCertainty"+requestedData[m].num+"' class='DIRweekCalendarCellCertainty'"+
													"style='background-color:"+couleur+"'></div>"+
												"</div>"+
											"</td>";
										break;
									}
					case "conge" : {
									var couleur =DIRcertaintyToColor(requestedData[m].certitude);
										markup+="<td id='DIRweekCalendarCellConge"+requestedData[m].num+"' class='DIRweekCalendarCell'>"+
												"<div class='DIRweekCalendarCellWrapper'>"+
													"<div id='DIRweekCalendarCellConge"+requestedData[m].num+"' class='DIRweekCalendarCellTitle'>"+
													requestedData[m].titre+
													"</div>"+
													"<div id='DIRweekCalendarCellCongeCertainty"+requestedData[m].num+"' class='DIRweekCalendarCellCertainty'"+
													"style= 'background-color:"+couleur+"'></div>"+
												"</div>"+
											"</td>";
										break;
									}
				}
				++m;
			}
		}
		markup +="<td class='DIRweekCalendarCell'></td>";
		document.getElementById("DIRweekCalendarRow"+i).innerHTML = markup;
	}
	
}
function DIRcertaintyToColor(certainty){
	if (certainty<0 || certainty>100) {
		alert("Database Corruption Found with certainty "+certainty);
		return "black";
	}
	if(certainty=="") return "white";
	if (certainty<20) return "red";//red color
	if (certainty<40) return "orange";//orange color
	if (certainty<60) return "yellow";//yellow color
	if (certainty<80) return "greenyellow";//greenyellow color
	if (certainty<=100) return "green";//green color
}

function getMonday() 
{
	currentday = new Date(currentday.setDate(currentday.getDate() - currentday.getDay() +1 ));
	var day = currentday.getDate();
  	var month = currentday.getMonth() + 1;
  	var year = currentday.getFullYear();
  	document.getElementById("firstday").innerHTML="Monday:"+day+"-"+month+"-"+year;
  	return(year+"-"+month+"-"+day);

}
function getSunday()
{
	var curr = new Date();
	var lastday =new Date(curr.setDate(curr.getDate() - curr.getDay()+7));
	var day = lastday.getDate();
  	var month = lastday.getMonth() + 1;
  	var year = lastday.getFullYear();
  	document.getElementById("lastday").innerHTML="Sunday:"+day+"-"+month+"-"+year; 
  	DIRupdateMonthAndYear(lastday);
  	return(year+"-"+month+"-"+day);
}

function daysOfNextWeek()
{
    currentday = new Date(currentday.getFullYear(), currentday.getMonth(), currentday.getDate()+7);
    var nexweeksunday = new Date(currentday.getFullYear(),currentday.getMonth(),currentday.getDate()+7-1);
    SQLcurrentday = dateToMySQLDate(currentday);
    SQLnexweeksunday = dateToMySQLDate(nexweeksunday);
    document.getElementById("firstday").innerHTML = "Monday: "+SQLcurrentday;
    document.getElementById("lastday").innerHTML ="Sunday : "+SQLnexweeksunday;
    DIRupdateMonthAndYear(nexweeksunday);
    fillEvents(SQLcurrentday,SQLnexweeksunday);
}
function daysOfLastWeek()
{
    currentday = new Date(currentday.getFullYear(), currentday.getMonth(), (currentday.getDate()-7));
    var nexweeksunday = new Date(currentday.getFullYear(),currentday.getMonth(),currentday.getDate()+7-1);
    SQLcurrentday= dateToMySQLDate(currentday);
    SQLnexweeksunday = dateToMySQLDate(nexweeksunday);
    DIRupdateMonthAndYear(nexweeksunday);
    document.getElementById("firstday").innerHTML = "Monday: "+SQLcurrentday;
    document.getElementById("lastday").innerHTML ="Sunday : "+SQLnexweeksunday;

   	fillEvents(SQLcurrentday,SQLnexweeksunday);
}

function editClient(requestedData)
{

	 $("#lastNameField").val(requestedData[0].nom);
	 $("#emailField").val(requestedData[0].mail);
	 $("#phoneNumberField").val(requestedData[0].num_telephone);
	 $("#firstNameField").val(requestedData[0].prenom);
	 editClientChosen = requestedData[0].num_client;
	 $("#editClientContent").show();

}

function editProspect(requestedData)
{
	 $("#titleField").val(requestedData[0].titre);
	 $("#aliasField").val(requestedData[0].alias);
	 $("#startDateField").val(requestedData[0].date_debut);
	 $("#endDateField").val(requestedData[0].date_fin);
	 $("#mySlider").attr({
	 	min:requestedData[0].certitude,
	 	max:100,
	 	value:requestedData[0].certitude
	 });
	 showValue(requestedData[0].certitude);
	 $("#manHoursField").val(requestedData[0].jour_hommes);
	 clientChosen = requestedData[0].num_client;
	 getClients(fillClientsForEditing,getError);	
}


function fillClientsForEditing(requestedData)
{
	markup ="";
	for(var i=0; i < requestedData.length;++i)
		markup+="<option value=clientChoice"+requestedData[i].num_client+">"+requestedData[i].prenom + " " +requestedData[i].nom +"</option>";
	document.getElementById("clientChoices").innerHTML=markup;
	$("#clientChoices").val("clientChoice"+clientChosen).attr('selected','selected');
	 getEmployeesNotDirectors(fillEmployeesForEditing,getError);
}

function fillEmployeesForEditing(requestedData)
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
		getEmployeesWorkingOnProspect(editProspectId,checkTheEmployees,getError);

}

function checkTheEmployees(requestedData)
{
	var i=0;
	for(i=0; i<requestedData.length;++i)
	{
		$("#checkbox"+requestedData[i].num_employe).attr('checked',true);
	}
	document.getElementById("tabBar").innerHTML= "Edit Prospect";
	$("#addClientContent").hide();
	$("#addContainer").hide();
	$("#pipelineTableContainer").hide();
	$("#newProspectContent").show();

	$("#newProspectContentBottomWithoutEditing").hide();
	$("#editProspectContentBottom").show();
	$("#peopleContent").show();
	$("#newProspectContainer").show();

}
function doneEditProspect()
{
	var currentDay = new Date();
	currentDay = dateToMySQLDate(currentDay);
	createPhase(currentDay,editProspectId,slider_value,updatingProspectSucceeded,getError);
}

function updatingProspectSucceeded()
{
	//alert("creating phase done");
	$("#addContainer").show();
	$("#pipelineTableContainer").show();
	$("#newProspectContainer").hide();
	handlerPipeline();

}

function doneClientEdit()
{
	createClient("update",editClientChosen,$("#firstNameField").val(),$("#lastNameField").val(),$("#emailField").val(),$("#phoneNumberField").val(),
		getClientInfoToRefill,getError);
	
}

function getClientInfoToRefill()
{
	getClient(editClientChosen,fillClient,getError);
}

function fillClient(requestedData)
{
	var markup="";
	markup="<td class = editRow><input type='button' value='+Edit' class ='editClientButton' id='client"+requestedData[0].num_client+
						"'></input></td><td class=col>" + requestedData[0].prenom + " " +requestedData[0].nom +"</td><td class=col>"+
							requestedData[0].mail+"</td><td class= col>"+requestedData[0].num_telephone+"</td>";
	document.getElementById("clientRow"+editClientChosen).innerHTML=markup;
	$("#editClientContent").hide();


}
function removeLoader()
{
	//alert("in removeLoader");
}

function DIRupdateMonthAndYear(Date){
	var monthString;
	switch(Date.getMonth()){
		case  0: monthString = "January";   break;
		case  1: monthString = "February";  break;
		case  2: monthString = "March";     break;
		case  3: monthString = "April";     break;
		case  4: monthString = "May";       break;
		case  5: monthString = "June";      break;
		case  6: monthString = "July";      break;
		case  7: monthString = "August";    break;
		case  8: monthString = "September"; break;
		case  9: monthString = "October";   break;
		case 10: monthString = "November";  break;
		case 11: monthString = "December";  break;
	}
	$("#MonthYear").html(monthString+", "+Date.getFullYear());
}

function getError(requestData)
{
	//alert(requestData.error);
}

function handlerPipeline()
{
	$("#pipelinePage").show();
	fmond = getTheFirstMondayDate();
	smond = getMondayDate();
	sund = getSundayDate();
	getProspects(userid,fillProspects,getError);

	$("#nextButtonPipeline").click(function()
    {
        daysOfNextWeekPipeline();
    });

    $("#backButtonPipeline").click(function()
    {
        daysOfLastWeekPipeline();
    });


	$("#addClientButton").click(function(){

	 	$("#clientlastNameField").val("");
	 	$("#clientemailField").val("");
	 	$("#clientphoneNumberField").val("");
		 $("#clientfirstNameField").val("");
		$("#newProspectContent").hide();
		$("#addClientContent").show();
		
	});

	$("#doneClientButton").click(function(){
		createClient("insert","NULL",$("#clientfirstNameField").val(),$("#clientlastNameField").val(),$("#clientemailField").val(),$("#clientphoneNumberField").val(),removeLoader,getError);
		getClients(fillClientsP,getError);
	
		
	});

	$("#donePeopleButton").click(function(){
		createProspect($("#titleField").val(),$("#aliasField").val(),$("#mySlider").val(),$("#startDateField").val(),$("#endDateField").val(),$("#manHoursField").val(),
				userid,$("#clientChoices").val().substring(12),getCheckedEmployees,getError);

	});

	$("#doneEditProspectButton").click(function()
	{
		updateProspect(editProspectId,$("#titleField").val(),$("#aliasField").val(),$("#mySlider").val(),$("#startDateField").val(),$("#endDateField").val(),$("#manHoursField").val(),
				userid,$("#clientChoices").val().substring(12),doneEditProspect,getError);
	});

	$("#cancelPeopleButton").click(function()
	{	
		$("#newProspectContainer").hide();
		$("#pipelineTableContainer").show();
		$("#addContainer").show();

	});

	$("#cancelEditProspectButton").click(function()
	{	
		$("#newProspectContainer").hide();
		$("#pipelineTableContainer").show();
		$("#addContainer").show();

	});

	$("#cancelClientButton").click(function()
	{
		$("#addClientContent").hide();
		$("#newProspectContent").show();

	});


	$("#addButton").click(function()
	{ 

		document.getElementById("tabBar").innerHTML= "Create New Prospect";
		//document.getElementById("titleField").innerHTML = "";

		$("#titleField").val("");
		$("#aliasField").val("");
	 	$("#startDateField").val("");
	 	$("#endDateField").val("");
	 	$("#mySlider").attr({
	 	min:0,
	 	max:100,
	 	value:0
	 	});
	 	showValue(0);
	 	$("#manHoursField").val("");
		getClients(fillClientsP,getError);
	    getEmployeesNotDirectors(fillEmployeesP,getError);

	});

	$("#pipelineTableContent").on("click",".editButton",function()
	{	
		editProspectId =  this.id.substring(8);
		getProspect(this.id.substring(8),editProspect,getError);
	
	});
}

function initializeDirectorPage(){
//$(document).ready(function(){
	getEmployeesNotDirectors(fillEmployees,getError);

	$("#timeline").css({"background-color" : "darkorange"});
	
	$("#clients").click(function(){
		$("#DIRsettingsTab").hide();
		$("#timelinePage").hide();
		$("#pipelinePage").hide();	
		getClients(fillClients,getError);
		$("#clients").css({"background-color" : "darkorange"});
		$("#pipeline").css({"background-color" : "orange"});
		$("#timeline").css({"background-color" : "orange"});
		$("#DIRsettingsIcon").css({"background-color" : "orange"});
	
		});

	$("#pipeline").click(function(){
		$("#DIRsettingsTab").hide();
		$("#clientsPage").hide();
		$("#timelinePage").hide();
		$("#pipelinePage").load("pipeline.html",handlerPipeline);
		$("#clients").css({"background-color" : "orange"});
		$("#pipeline").css({"background-color" : "darkorange"});
		$("#timeline").css({"background-color" : "orange"});
		$("#DIRsettingsIcon").css({"background-color" : "orange"});

		
		});

	$("#timeline").click(function(){
		$("#DIRsettingsTab").hide();
		$("#clientsPage").hide();
		$("#pipelinePage").hide();
		$("#timelinePage").show();
		$("#clients").css({"background-color" : "orange"});
		$("#pipeline").css({"background-color" : "orange"});
		$("#timeline").css({"background-color" : "darkorange"});
		$("#DIRsettingsIcon").css({"background-color" : "orange"});
	});

	$("#forwardButton").click(function()
	{
		daysOfNextWeek();
	});
	$("#backButton").click(function()
	{
		daysOfLastWeek();
	});

	$("#addClientButtonClientsPage").click(function(){
		$("#addClientContent").show();
		
	});

	$("#clientsContent").on("click",".editClientButton",function()
	{
		editClientChosen =this.id.substring(6);
		getClient(this.id.substring(6),editClient,getError);
		
	});

	$("#clientsContent").on("click","#doneEditClientButton",function()
	{
		doneClientEdit();
	});

	$("#cancelEditClientButton").click(function()
	{
		$("#editClientContent").hide();	
	});

	$("#DIRsettingsIcon").click(function(){
		$("#clientsPage").hide();
		$("#pipelinePage").hide();
		$("#timelinePage").hide();
		$("#DIRsettingsTab").show();
		$("#clients").css({"background-color" : "orange"});
		$("#pipeline").css({"background-color" : "orange"});
		$("#timeline").css({"background-color" : "orange"});
		$("#DIRsettingsIcon").css({"background-color" : "darkorange"});
	});
	$("#DIRsettingsTab").load("settingsTab.html",initializeSettingsTab);
	$("#DIRwelcomeTextIcon").html("Welcome, "+lastname.toUpperCase()+"<br />"+firstname.substring(0,1).toUpperCase()+firstname.substring(1).toLowerCase());

	$(".exportButton").click(function(){
		generateExcelReport(userid,$("#startDateReportField").val(),$("#endDateReportField").val(),exportCallBack,getError);
	});
	$("#DIRexportDialogDoneButton").click(function(){
		$("#DIRexportDoneDialog").hide();
		$("#DIRexportDialogDoneButton").hide();
	});

}//);

function exportCallBack(requestedData){
	var markup = "<a href='./requests/"+requestedData.success+"'>Your Report has been generated. Click here to download it!</a>";
	$("#DIRexportDoneDialog").html(markup);
	$("#DIRexportDoneDialog").show();
	$("#DIRexportDialogDoneButton").show();
}