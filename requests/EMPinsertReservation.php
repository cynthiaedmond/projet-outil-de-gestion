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

	if ($_REQUEST["employee_number"] && $_REQUEST["reservation_type"] && $_REQUEST["date"]) {
		$employee_number = "'".$conn->real_escape_string($_REQUEST["employee_number"])."'";
		$reservation_type = "'".$conn->real_escape_string($_REQUEST["reservation_type"])."'";
		$date = "'".$conn->real_escape_string($_REQUEST["date"])."'";
		if ($reservation_type == "'prospect'") {
			if ($_REQUEST["prospect_number"]){
				$prospect_number = "'".$conn->real_escape_string($_REQUEST["prospect_number"])."'";
				
				$SQL = "INSERT INTO `reserve` (`num_employe`,`date`,`type_reservation`,`num_prospect`) VALUES ($employee_number, $date, $reservation_type, $prospect_number)";
				if($conn->query($SQL) === false) {
					trigger_error('Wrong SQL: ' . $SQL . ' Error: ' . $conn->error, E_USER_ERROR);
				}
				else {
					echo '{"success":"Insert successful"}';
				}
			}
			else {
				echo '{"error":"POST variable NOT FOUND"}';
			}
		}
		else {
			if ($reservation_type == "'conge'"){
				if ($_REQUEST["dayoff_type"]){
					$dayoff_type = "'".$conn->real_escape_string($_REQUEST["dayoff_type"])."'";
					
					$SQL = "INSERT INTO `reserve` (`num_employe`,`date`,`type_reservation`,`type_conge`) VALUES ($employee_number, $date, $reservation_type, $dayoff_type)";
					if($conn->query($SQL) === false) {
						trigger_error('Wrong SQL: ' . $SQL . ' Error: ' . $conn->error, E_USER_ERROR);
					} 
					else {
						echo '{"success":"Insert successful"}';
					}
				}
				else {
					echo '{"error":"POST variable NOT FOUND"}';
				}
			}
			else {
				echo '{"error":"reservation_type unavailable"}';
			}
		}
	}
	else {
		echo '{"error":"POST variable NOT FOUND"}';
	}

	$conn->close();
?>
