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

	if ($_REQUEST["employee_number"] && $_REQUEST["from"] && $_REQUEST["till"]) {
		$employee_number = "'".$conn->real_escape_string($_REQUEST["employee_number"])."'";
		$from = "'".$conn->real_escape_string($_REQUEST["from"])."'";
		$till = "'".$conn->real_escape_string($_REQUEST["till"])."'";

		$reservationSQL = "SELECT `date`,`type_reservation`,`titre`,`certitude`,'' AS type_conge FROM `reserve`,`prospect`
		WHERE `prospect`.`num_prospect` = `reserve`.`num_prospect`
		AND `reserve`.`num_employe` = $employee_number
		AND `date` >= $from
		AND `date` <= $till
		AND `type_reservation` = 'prospect'
		UNION
		SELECT `date`,`type_reservation`,'' AS `titre`,'' AS `certitude`,`type_conge` FROM `reserve`
		WHERE `reserve`.`num_employe` = $employee_number
		AND `date` >= $from
		AND `date` <= $till
		AND `type_reservation` = 'conge'";

		$holidaySQL = "SELECT `date`,'conge' AS `type_reservation`, `type_jour` AS `titre`, '' AS `certitude`,'Holiday' AS `type_conge` FROM `jour`
		WHERE `type_jour` <> 'Work'
		AND `date` >= $from
		AND `date` <= $till";
		$rs=$conn->query($holidaySQL);

		if($rs === false) {
			echo '{"error":"Wrong SQL"}';
		}
		else {
			$arr = array();
			while ($row = $rs->fetch_assoc()) {
  				$arr[] = $row;
			}
		}
		$rs=$conn->query($reservationSQL);

		if($rs === false) {
			echo '{"error":"Wrong SQL"}';
		}
		else {
			while ($row = $rs->fetch_assoc()) {
  				$arr[] = $row;
			}
			//$arr = $rs->fetch_all(MYSQLI_ASSOC);
			echo json_encode($arr);
		}
		$rs->free();
	}
	else {
		echo '{"error":"POST variables not found"}';
	}


	$conn->close();
?>