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

	$SQL = "SELECT `type_conge` FROM `conge`";
	
	$rs=$conn->query($SQL);

	if($rs === false) {
		echo '{"error":"Wrong SQL"}';
	}
	else {
		$arr = array();
		while ($row = $rs->fetch_assoc()) {
  			$arr[] = $row;
		}
		//$arr = $rs->fetch_all(MYSQLI_ASSOC);
		echo json_encode($arr);
	}

	$rs->free();
	$conn->close();
?>