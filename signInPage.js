var userid;
var grade;
var firstname;
var lastname;
var workOnWeekends;
var workOnHolidays;

function setCredentials(requestedData)
{
	userid = requestedData.num_employe;
	grade = requestedData.grade;
	firstname = requestedData.prenom;
	lastname = requestedData.nom;
	workOnHolidays = parseInt(requestedData.workOnHolidays);
	workOnWeekends = parseInt(requestedData.workOnWeekends);
	//alert("{"+userid+", "+grade+"}");
	goTo();
}

function signInError(requestedData){
	alert(requestedData.error);
}

function goTo(){
	switch(grade) {
		case "employe":
			$("#window").load("employeePage.html",initializeEmployeePage);
			//$("#signInPage").hide();
			//$("#employeePage").show();
			break;
		case "directeur":
			//$("#signInPage").hide();
			//$("#directorPage").show();
			$("#window").load("directorPage.html",initializeDirectorPage);
			break;
		default: alert("grade undefined");
	}
}

function trySignIn(){
	if ($("#usernameField").val()=="" || $("#passwordField").val()=="") {
		alert("Please provide both Username and Password");
	}
	else {
		signIn($("#usernameField").val(),$("#passwordField").val(),setCredentials,signInError);
	}
}

$(document).ready(function(){
	$("#signInIcon").click(function(){
		$("#signInContainer").show();
		$("#signInContainer").animate({
			"top" : "200px"
		},600);
		setTimeout(function(){
			$("#window").css({"overflow-y" : "scroll"});
		},600);
	});

	$("#signInButton").click(function(){
		trySignIn();
	});
	$("#passwordField").keypress(function(e) {
    if(e.which == 13) {
    	trySignIn();
    };
});

});