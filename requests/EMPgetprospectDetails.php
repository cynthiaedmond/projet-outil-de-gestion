<?php
	$DBServer = "localhost";
	$DBUser = "root";
	$DBPass = "root";
	$DBName = "GestionPlanning";

	$conn = new mysqli($DBServer, $DBUser, $DBPass, $DBName);

	// check connection
	if ($conn->connect_error) {
		echo '{"error":"Database connection failed"}';
	}

	if ($_REQUEST["prospect_number"]) {
		$prospect_number = "'".$conn->real_escape_string($_REQUEST["prospect_number"])."'";

		$SQL = "SELECT * FROM `prospect` WHERE `num_prospect` = $prospect_number";
		$rs=$conn->query($SQL);

		if($rs === false) {
			echo '{"error":"Wrong SQL"}';
		}
		else {
			$arr = $rs->fetch_all(MYSQLI_ASSOC);
			echo json_encode($arr);
		}
	}
	else {
		echo '{"error":"POST variables not found"}';
	}

	$rs->free();
	$conn->close();
?>