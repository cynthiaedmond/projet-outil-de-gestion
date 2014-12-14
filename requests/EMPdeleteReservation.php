<?php
	$DBServer = "localhost";
	$DBUser = "root";
	$DBPass = "root";
	$DBName = "GestionPlanning";

	$conn = new mysqli($DBServer, $DBUser, $DBPass, $DBName);

	// check connection
	if ($conn->connect_error) {
  		trigger_error('Database connection failed: '  . $conn->connect_error, E_USER_ERROR);
	}

	if ($_REQUEST["employee_number"] && $_REQUEST["date"]) {
		$employee_number = "'".$conn->real_escape_string($_REQUEST["employee_number"])."'";
		$date = "'".$conn->real_escape_string($_REQUEST["date"])."'";

		$SQL = "DELETE FROM `reserve` WHERE `num_employe` = $employee_number AND `date` = $date";
	
		if($conn->query($SQL) === false) {
			trigger_error('Wrong SQL: ' . $SQL . ' Error: ' . $conn->error, E_USER_ERROR);
		} else {
			echo '{"success":"Delete successful"}';
		}
	}
	else {
		echo '{"error":"POST variable NOT FOUND"}';
	}

	$conn->close();
?>