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

	if ($_REQUEST["employee_number"] && $_REQUEST["reservation_type"] && $_REQUEST["date"]){
		$employee_number = "'".$conn->real_escape_string($_REQUEST["employee_number"])."'";
		$date = "'".$conn->real_escape_string($_REQUEST["date"])."'";
		$reservation_type = "'".$conn->real_escape_string($_REQUEST["reservation_type"])."'";

		switch ($reservation_type) {//NOT very good, some POST variables aren't tested
			case "'prospect'":
				$prospect_number = "'".$conn->real_escape_string($_REQUEST["prospect_number"])."'";
				$SQL = "UPDATE `reserve` SET `type_reservation`=$reservation_type,`num_prospect`=$prospect_number,`type_conge`=NULL
										 WHERE `num_employe`=$employee_number AND `date`=$date";
				break;
			
			case "'conge'":
				$dayoff_type = "'".$conn->real_escape_string($_REQUEST["dayoff_type"])."'";
				$SQL = "UPDATE `reserve` SET `type_reservation`=$reservation_type,`num_prospect`=NULL,`type_conge`=$dayoff_type
										 WHERE `num_employe`=$employee_number AND `date`=$date";
				break;
		}

		if($conn->query($SQL) === false) {
			trigger_error('Wrong SQL: ' . $SQL . ' Error: ' . $conn->error, E_USER_ERROR);
		}
		else {
			echo '{"success":"Insert successful"}';
		}
	}
	else {
		echo '{"error":"POST variables NOT FOUND"}';
	}

	$conn->close();
?>