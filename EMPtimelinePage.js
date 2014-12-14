var order = ["1","2","3"];
var EMPoccupancy = ["1","2","3"];
var currentDate = new Date();
currentDate.setDate(1);
//var workOnWeekends = true;
//var workOnHolidays = true;
var EMPselectedCellId = 0;
var EMPselectedDate = "";
//var EMPallowedProspects = [];

function dateToMySQLDate(date){
	return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}

function initializeEMPtimelinePage(){
	var markup;
	var content,row,column;
	for (content=1; content<=3; ++content){
		markup="";
		for (row=1; row<=6; ++row){
			markup+="<tr class='EMPmonthCalendarRow'>";
			for (column=1; column<=7; ++column){
				markup+=
					"<td id='EMPmonthCalendarCell"+content+row+column+"' class='EMPmonthCalendarCell'>"+
						"<div id='EMPmonthCalendarCell"+content+row+column+"Wrapper' class='EMPmonthCalendarCellWrapper'>"+
							"<div id='EMPmonthCalendarCell"+content+row+column+"Date' class='EMPmonthCalendarCellDate'></div>"+
							"<div id='EMPmonthCalendarCell"+content+row+column+"Title' class='EMPmonthCalendarCellTitle'></div>"+
							"<div id='EMPmonthCalendarCell"+content+row+column+"Certainty' class='EMPmonthCalendarCellCertainty'></div>"+
						"</div>"+
					"</td>";
			}
			markup+="</tr>"
		}
		$("#EMPmonthCalendar-"+content).html(markup);
		var d = new Date();
		d.setDate(1);
		d.setMonth(currentDate.getMonth()+content-2);
		d.setFullYear(currentDate.getFullYear());
		var d1 = new Date(d.getTime());
		d1.setMonth(d1.getMonth()+1);
		d1.setDate(d1.getDate()-1);
		EMPgetReservations(userid,dateToMySQLDate(d),dateToMySQLDate(d1),order[content-1],EMPfillDates,displayRequestError);
		//EMPfillDates(order[content-1],d.getMonth(),d.getFullYear());
	}
	EMPupdateMonthAndYear();

	$("#EMPpreviousMonthButton").click(function(){
		$("#EMPmonthCalendarContent-"+order[0]).animate({
			"left" : "0%"
		},600);
		$("#EMPmonthCalendarContent-"+order[1]).animate({
			"left" : "105%"
		},600);
		$("#EMPmonthCalendarContent-"+order[2]).css({
			"left" : "-105%"
		});
		order = [order[2],order[0],order[1]];
		currentDate.setMonth(currentDate.getMonth()-1);
		var d = new Date();
		d.setDate(1);
		d.setFullYear(currentDate.getFullYear());
		d.setMonth(currentDate.getMonth()-1);
		var d1 = new Date(d.getTime());
		d1.setMonth(d1.getMonth()+1);
		d1.setDate(d1.getDate()-1);
		EMPgetReservations(userid,dateToMySQLDate(d),dateToMySQLDate(d1),order[0],EMPfillDates,displayRequestError);
		//EMPfillDates(order[0],d.getMonth(),d.getFullYear());
		EMPupdateMonthAndYear();
	});
	$("#EMPnextMonthButton").click(function(){
		$("#EMPmonthCalendarContent-"+order[2]).animate({
			"left" : "0%"
		},600);
		$("#EMPmonthCalendarContent-"+order[1]).animate({
			"left" : "-105%"
		},600);
		$("#EMPmonthCalendarContent-"+order[0]).css({
			"left" : "105%"
		});
		order = [order[1],order[2],order[0]];
		currentDate.setMonth(currentDate.getMonth()+1);
		var d = new Date();
		d.setDate(1);
		d.setFullYear(currentDate.getFullYear());
		d.setMonth(currentDate.getMonth()+1);
		var d1 = new Date(d.getTime());
		d1.setMonth(d1.getMonth()+1);
		d1.setDate(d1.getDate()-1);
		EMPgetReservations(userid,dateToMySQLDate(d),dateToMySQLDate(d1),order[2],EMPfillDates,displayRequestError);
		//EMPfillDates(order[2],d.getMonth(),d.getFullYear());
		EMPupdateMonthAndYear();
	});

	$(".EMPmonthCalendarCell").click(function(){
		var idNumber = this.id.substring(20);
		var column = idNumber.substring(2,3);
		if ((workOnWeekends === 0 && (column == 1 || column == 7)) || (workOnHolidays === 0 && $("#"+this.id+"Title").html()=="Holiday")){
			//alert("weekend unworkable");
		} else
		if ($("#"+this.id+"Date").html()!=""){
			//alert("it's a date");
			EMPselectedCellId = idNumber;
			EMPeditReservation();
		}
	});

	$("#EMPeditReservationBackground").click(function(){
		$("#EMPeditReservationScreen").hide();
	});

	$("#EMPeditReservationProspectsList").on("click",".EMPeditReservationProspectsListItem",function(){
		//alert("insertORedit : "+this.id.substring(35));
		if ($("#EMPmonthCalendarCell"+EMPselectedCellId+"Title").html()==""){
			EMPinsertReservation(userid,dateToMySQLDate(EMPselectedDate),"prospect",EMPprospects[this.id.substring(35)].num_prospect,"",this.id,EMPinsertSuccess,displayRequestError);
		}
		else {
			EMPupdateReservation(userid,dateToMySQLDate(EMPselectedDate),"prospect",EMPprospects[this.id.substring(35)].num_prospect,"",this.id,EMPupdateSuccess,displayRequestError);
		}
	});
	$("#EMPeditReservationDayoffTypesList").on("click",".EMPeditReservationDayoffTypesListItem",function(){
		//alert("insertORedit : "+this.id);
		if ($("#EMPmonthCalendarCell"+EMPselectedCellId+"Title").html()==""){
			EMPinsertReservation(userid,dateToMySQLDate(EMPselectedDate),"conge",
				"",EMPdayoffTypes[this.id.substring(37)].type_conge,this.id,EMPinsertSuccess,displayRequestError);
		}
		else{
			EMPupdateReservation(userid,dateToMySQLDate(EMPselectedDate),"conge",
				"",EMPdayoffTypes[this.id.substring(37)].type_conge,this.id,EMPupdateSuccess,displayRequestError);
		}
	});
	$("#EMPeditReservationFree").click(function(){
		if ($("#EMPmonthCalendarCell"+EMPselectedCellId+"Title").html()!=""){
			//alert("Must Delete");
			EMPdeleteReservation(userid,dateToMySQLDate(EMPselectedDate),EMPdeleteSuccess,displayRequestError);
		} else {
			$("#EMPeditReservationScreen").hide();
		}
	});
}

function EMPfillDates(content,month,year,requestedData){
	var d = new Date();
	var currentRow = 1;
	d.setMonth(month);
	d.setFullYear(year);
	d.setDate(1);
	var row,column;
	for (row=1; row<=6; ++row){
		for (column=1; column<=7; ++column){
			$("#EMPmonthCalendarCell"+content+row+column+"Date").html("");
			$("#EMPmonthCalendarCell"+content+row+column+"Title").html("");
			$("#EMPmonthCalendarCell"+content+row+column+"Certainty").css({"background-color":"transparent"});
		}
	}
	while (d.getMonth()==month) {
		$("#EMPmonthCalendarCell"+content+currentRow+(d.getDay()+1)+"Date").html(d.getDate());
		//$("#EMPmonthCalendarCell"+content+currentRow+(d.getDay()+1)+"Title").html("Prospect Title...");
		//$("#EMPmonthCalendarCell"+content+currentRow+(d.getDay()+1)+"Certainty").css({"background-color":EMPcertaintyToColor(10)});
		if (d.getDay()==6) ++currentRow;
		d.setDate(d.getDate()+1);
	}
	d.setMonth(d.getMonth()-1);
	for (var i=0; i<requestedData.length; ++i) {
		var reservedDay = requestedData[i].date.substring(8,10);//asserting that the year and month are correct
		d.setDate(1);
		currentRow = 1;
		while (d.getDate()!=reservedDay) {//asserting month is correct and we won't loop infinitely
			if (d.getDay()==6) ++currentRow;
			d.setDate(d.getDate()+1);
		}
		switch (requestedData[i].type_reservation){
			case "conge":
				if (requestedData[i].type_conge=="Holiday") {
					$("#EMPmonthCalendarCell"+content+currentRow+(d.getDay()+1)+"Title").html(requestedData[i].type_conge);//.titre contains Holiday name
					$("#EMPmonthCalendarCell"+content+currentRow+(d.getDay()+1)+"Certainty").css({"background-color":"white"});
				}
				else {
					$("#EMPmonthCalendarCell"+content+currentRow+(d.getDay()+1)+"Title").html(requestedData[i].type_conge);
					$("#EMPmonthCalendarCell"+content+currentRow+(d.getDay()+1)+"Certainty").css({"background-color":"white"});
				}
				break;
			case "prospect":
				$("#EMPmonthCalendarCell"+content+currentRow+(d.getDay()+1)+"Title").html(requestedData[i].titre);
				$("#EMPmonthCalendarCell"+content+currentRow+(d.getDay()+1)+"Certainty").css({"background-color":EMPcertaintyToColor(requestedData[i].certitude)});
				break;
			case "reserve":
				$("#EMPmonthCalendarCell"+content+currentRow+(d.getDay()+1)+"Title").html(requestedData[i].titre);
				$("#EMPmonthCalendarCell"+content+currentRow+(d.getDay()+1)+"Certainty").css({"background-color":EMPcertaintyToColor(requestedData[i].certitude)});
				break;
		}
	}
	EMPupdateOccupancy();
}

function EMPupdateMonthAndYear(){
	var monthString;
	switch(currentDate.getMonth()){
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
	$("#EMPmonthIndicator").html(monthString+", "+currentDate.getFullYear());
}

function EMPupdateOccupancy(){
	var workableDays = 0;
	var reservedDays = 0;
	for (var row=1; row<=6; ++row){
		for (var column=1; column<=7; ++column){
			if ($("#EMPmonthCalendarCell"+order[1]+row+column+"Date").html()=="") continue;
			if ($("#EMPmonthCalendarCell"+order[1]+row+column+"Certainty").css("background-color")=="rgb(255, 255, 255)") continue;
			if ((column==1 || column==7) && $("#EMPmonthCalendarCell"+order[1]+row+column+"Title").html()=="") continue;
			++workableDays;
			if ($("#EMPmonthCalendarCell"+order[1]+row+column+"Title").html()!="")
			++reservedDays;
		}
	}
	EMPoccupancy[1] = Math.round((reservedDays/workableDays)*100);
	$("#EMPoccupancyIndicator").html("Occupancy : "+EMPoccupancy[1]+"%");
}

function EMPtryGetDayoffTypes(){
	EMPgetDayoffTypes(EMPsetDayoffTypes,displayRequestError);
}

function EMPsetDayoffTypes(requestedData){
	EMPdayoffTypes = requestedData;
	var markup = "<ul>";
	for (var i=0; i<EMPdayoffTypes.length; ++i){
		markup += "<li class='EMPeditReservationDayoffTypesListItem' id='EMPeditReservationDayoffTypesListItem"+i+"'>"+EMPdayoffTypes[i].type_conge + "</li>";
	}
	markup += "</ul>";
	$("#EMPeditReservationDayoffTypesList").html(markup);
}

function EMPeditReservation(){
	EMPselectedDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),$("#EMPmonthCalendarCell"+EMPselectedCellId+"Date").html());
	//EMPallowedProspects = [];
	var markup = "<ul>";
	for (var i=0; i<EMPprospects.length; ++i){
		if (mySQLDateToDate(EMPprospects[i].date_debut).getTime()<=EMPselectedDate.getTime() 
		   && mySQLDateToDate(EMPprospects[i].date_fin).getTime()>=EMPselectedDate.getTime()){
			markup += "<li class='EMPeditReservationProspectsListItem' id='EMPeditReservationProspectsListItem"+i+"'>"+EMPprospects[i].titre+"</li>";
			//EMPallowedProspects.push(EMPprospects[i]);
		}
	}
	markup += "</ul>";
	$("#EMPeditReservationProspectsList").html(markup);
	$("#EMPeditReservationScreen").show();
}

function EMPdeleteSuccess(requestedData){
	$("#EMPmonthCalendarCell"+EMPselectedCellId+"Title").html("");
	$("#EMPmonthCalendarCell"+EMPselectedCellId+"Certainty").css({"background-color":"transparent"});
	$("#EMPeditReservationScreen").hide();
	EMPupdateOccupancy();
}

function EMPinsertSuccess(selectedItemId,requestedData){
	switch (selectedItemId.substring(18,19)){
		case "P":
			$("#EMPmonthCalendarCell"+EMPselectedCellId+"Title").html(EMPprospects[selectedItemId.substring(35)].titre);
			$("#EMPmonthCalendarCell"+EMPselectedCellId+"Certainty").css({"background-color":EMPcertaintyToColor(EMPprospects[selectedItemId.substring(35)].certitude)});
			break;
		case "D":
			$("#EMPmonthCalendarCell"+EMPselectedCellId+"Title").html(EMPdayoffTypes[selectedItemId.substring(37)].type_conge);
			$("#EMPmonthCalendarCell"+EMPselectedCellId+"Certainty").css({"background-color":"white"});
			break;
	}
	$("#EMPeditReservationScreen").hide();
	EMPupdateOccupancy();
}

function EMPupdateSuccess(selectedItemId, requestedData){
	EMPinsertSuccess(selectedItemId, requestedData);
}