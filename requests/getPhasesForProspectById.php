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

	if ($_REQUEST["employee_number"]) {
		$employee_number = "'".$conn->real_escape_string($_REQUEST["employee_number"])."'";
		$SQL = "SELECT `prospect`.`num_prospect`,`phase`.`num_phase`,`date`,`pourcentage` FROM `prospect`,`debute`,`phase`
				WHERE `prospect`.`num_prospect`=`debute`.`num_prospect`
				AND `debute`.`num_phase`=`phase`.`num_phase`
				AND `prospect`.`num_employe`=$employee_number
				ORDER BY `num_prospect`,`num_phase`";
		$rs=$conn->query($SQL);
		if($rs === false) {
			echo '{"error":"Wrong SQL1"}';
		}
		else {
			$arr = array();
			while ($row = $rs->fetch_assoc()) {
				$arr[] = $row;
			}
			//$arr = $rs->fetch_all(MYSQLI_ASSOC);
			//echo json_encode($arr);
			$requestedData = array();
			for ($i=0;$i<count($arr);$i++){
				$requestedData["prospect".$arr[$i]["num_prospect"]]["phase".$arr[$i]["num_phase"]]=$arr[$i]["date"];
			}
		}
		$rs->free();
		$SQL = "SELECT `num_prospect`,`date_debut`,`date_fin` FROM `prospect`
				WHERE `prospect`.`num_employe`=$employee_number";
		$rs=$conn->query($SQL);
		if($rs === false) {
			echo '{"error":"Wrong SQL2"}';
		}
		else {
			$arr = array();
			while ($row = $rs->fetch_assoc()) {
				$arr[] = $row;
			}
			//$arr = $rs->fetch_all(MYSQLI_ASSOC);
			//echo json_encode($arr);
			for ($i=0;$i<count($arr);$i++){
				$requestedData["prospect".$arr[$i]["num_prospect"]]["date_debut"]=$arr[$i]["date_debut"];
				$requestedData["prospect".$arr[$i]["num_prospect"]]["date_fin"]=$arr[$i]["date_fin"];
			}
			echo json_encode($requestedData);
		}
		$rs->free();
	}
	else {
		echo '{"error":"POST variables NOT FOUND"}';
	}
	$conn->close();
?>