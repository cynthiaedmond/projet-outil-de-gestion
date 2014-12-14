var thisFolder = "requests/";

function signIn(username,password,callBack,errorCallback){
    $.ajax({
        url : thisFolder+"signIn.php",
        data: {
            username:username,
            password:password
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("There has been an error while signing in");
        }
    });
}

function EMPgetProspectsList(employee_number,callBack,errorCallback){
    $.ajax({
        url : thisFolder+"EMPgetProspectsList.php",
        data: {
            employee_number:employee_number
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("There has been an error while getting the employee prospect list");
        }
    });
}

function EMPgetDayoffTypes(callBack,errorCallback){
    $.ajax({
        url : thisFolder+"EMPgetDayoffTypes.php",
        data: {},
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("There has been an error while getting the employee dayoff types");
        }
    });
}

function EMPgetReservations(employee_number,from,till,content,callBack,errorCallback){
    $.ajax({
        url : thisFolder+"EMPselectReservations.php",
        data: {
            employee_number:employee_number,
            from:from,
            till:till
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(content,parseInt(from.substring(5,7))-1,from.substring(0,4),requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("There has been an error while getting the employee reservations");
        }
    });
}

function EMPdeleteReservation(employee_number,date,callBack,errorCallback){
    $.ajax({
        url : thisFolder+"EMPdeleteReservation.php",
        data: {
            employee_number:employee_number,
            date:date
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            if (requestedData.success) {
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("There has been an error while deleting an employee reservation");
        }
    });
}

function EMPinsertReservation(employee_number,date,reservation_type,prospect_number,dayoff_type,selectedItemId,callBack,errorCallback){
    $.ajax({
        url : thisFolder+"EMPinsertReservation.php",
        data: {
            employee_number:employee_number,
            date:date,
            reservation_type:reservation_type,
            prospect_number:prospect_number,
            dayoff_type:dayoff_type
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(selectedItemId,requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("There has been an error while inserting an employee reservation");
        }
    });
}

function EMPupdateReservation(employee_number,date,reservation_type,prospect_number,dayoff_type,selectedItemId,callBack,errorCallback){
    $.ajax({
        url : thisFolder+"EMPupdateReservation.php",
        data: {
            employee_number:employee_number,
            date:date,
            reservation_type:reservation_type,
            prospect_number:prospect_number,
            dayoff_type:dayoff_type
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(selectedItemId,requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("There has been an error while updating an employee reservation");
        }
    });
}

function changeUsername(username,password,new_username,callBack,errorCallback){
    $.ajax({
        url : thisFolder+"changeUsername.php",
        data: {
            username:username,
            password:password,
            new_username:new_username
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("There has been an error while changing the Username");
        }
    });
}

function changePassword(username,password,new_password,callBack,errorCallback){
    $.ajax({
        url : thisFolder+"changePassword.php",
        data: {
            username:username,
            password:password,
            new_password:new_password
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("There has been an error while changing the Password");
        }
    });
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function getEmployees(callBack,errorCallback)
{
    $.ajax({
        url : thisFolder+"getEmployees.php",
        data: {
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
          //  alert(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("There has been an error while signing in getEmployees");
        }
    });
}
function getEmployeesNotDirectors(callBack,errorCallback)
{
    $.ajax({
        url : thisFolder+"getEmployeesNotDirectors.php",
        data: {
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
           // alert(data);
            //alert(requestedData);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("There has been an error while signing in getEmployees");
        }
    });
}
function getEvents(numemp,firstday,lastday,callBack,errorCallback)
{
    $.ajax({
        url : thisFolder+"getProspectsPerWeekForEmployee.php",
        data: {
            numemp:numemp,
            firstday:firstday,
            lastday:lastday

        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
        //    alert(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert(errorThrown);
            alert("There has been an error while signing in getEvents");
        }
    });
}


function getClients(callBack,errorCallback)
{
   $.ajax({
        url : thisFolder+"getClients.php",
        data: {
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert(errorThrown);
            alert("There has been an error while signing in getClients");
        }
    });
}

function createProspect(title,alias,certainty,startDate,endDate,manHours,numdirector,numclient,callBack,errorCallback)
{
   $.ajax({
        url : thisFolder+"createProspect.php",
        data: {
                title:title,
                alias:alias,
                certainty:certainty,
                startDate:startDate,
                endDate:endDate,
                manHours:manHours,
                numdirector:numdirector,
                numclient:numclient
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
           // alert(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else { callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert(errorThrown);
            alert("There has been an error while signing in createProspect");
        }
    });
}
function updateProspect(numprospect,title,alias,certainty,startDate,endDate,manHours,numdirector,numclient,callBack,errorCallback)
{
   $.ajax({
        url : thisFolder+"updateProspectById.php",
        data: {
                title:title,
                alias:alias,
                certainty:certainty,
                startDate:startDate,
                endDate:endDate,
                manHours:manHours,
                numdirector:numdirector,
                numclient:numclient,
                numprospect:numprospect
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else { callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert(errorThrown);
            alert("There has been an error while signing in createProspect");
        }
    });
}


function insertIntoTableTravaille(equipe,numprospect,callBack,errorCallback)
{
   $.ajax({
        url : thisFolder+"insertIntoTableTravaille.php",
        data: {
            equipe:equipe,
            numprospect:numprospect
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //alert(requestedData);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else { 
                callBack(numprospect);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert(errorThrown);
            alert("There has been an error while signing in insertIntoTableTravaille");
        }
    });
}

function createClient(type,num,firstname,lastname,email,phone,callBack,errorCallback)
{
   $.ajax({
        url : thisFolder+"createClient.php",
        data: {
            type:type,
            num:num,
            firstname:firstname,
            lastname:lastname,
            email:email,
            phone:phone
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
           // alert(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else { 
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert(errorThrown);
            alert("There has been an error while signing in createClient");
        }
    });
}
function createPhase(datephase,numprospect,certainty,callBack,errorCallback)
{
   $.ajax({
        url : thisFolder+"createPhase.php",
        data: {
            datephase:datephase,
            numprospect:numprospect,
            certainty:certainty
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
           // alert(data);
            requestedData = JSON.parse(data);
            //alert(data);
            //call the function that displays the data
            if (requestedData.error) {
                //errorCallback(requestedData);
            }
            else { 
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert(errorThrown);
            alert("There has been an error while signing in createPhase");
        }
    });
}

function getProspects(numdirecteur,callBack,errorCallback)
{
    $.ajax({
        url : thisFolder+"getProspects.php",
        data: {
            numdirecteur:numdirecteur
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
           // alert(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("There has been an error while signing in getProspects");
        }
    });
}

function getClient(numclient,callBack,errorCallback)
{
   $.ajax({
        url : thisFolder+"getClientById.php",
        data: {
            numclient:numclient
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert(errorThrown);
            alert("There has been an error while signing in getClients");
        }
    });
}

function getProspect(numprospect,callBack,errorCallback)
{
   $.ajax({
        url : thisFolder+"getProspectById.php",
        data: {
            numprospect:numprospect
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert(errorThrown);
            alert("There has been an error while signing in getProspectById");
        }
    });
}


function getEmployeesWorkingOnProspect(numprospect,callBack,errorCallback)
{
   $.ajax({
        url : thisFolder+"getEmployeesWorkingOnProspect.php",
        data: {
            numprospect:numprospect
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert(errorThrown);
            alert("There has been an error while signing in getEmployeesWorkingOnProspect");
        }
    });
}

function getPhasesForProspectById(employee_number,callBack,errorCallback)
{
    $.ajax({
        url : thisFolder+"getPhasesForProspectById.php",
        data: {
            employee_number:employee_number
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //alert(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
                callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert(errorThrown);
            alert("There has been an error while signing in getting phases");
        }
    });
}

function generateExcelReport(employee_number,from,till,callBack,errorCallback)
{
    $.ajax({
        url : thisFolder+"exportReport.php",
        data: {
            employee_number:employee_number,
            from:from,
            till:till
        },
        type: "POST",
        success: function(data, textStatus, jqXHR)
        {
            requestedData = JSON.parse(data);
            //alert(data);
            //call the function that displays the data
            if (requestedData.error) {
                errorCallback(requestedData);
            }
            else {
               callBack(requestedData);
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("There has been an error while generatingExcelReport");
        }
    });
}