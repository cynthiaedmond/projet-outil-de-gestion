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

	if ($_REQUEST["employee_number"]) {
		$employee_number = "'".$conn->real_escape_string($_REQUEST["employee_number"])."'";

		$SQL = "SELECT `prospect`.`num_prospect` AS `num_prospect`,`titre`,`certitude`,`date_debut`,`date_fin`,
		`employe_generique`.`nom` AS `nom_directeur`,`employe_generique`.`prenom` AS `prenom_directeur`,
		`client`.`nom` AS `nom_client`,`client`.`prenom` AS `prenom_client`
		 FROM `prospect`,`travaille`,`employe_generique`,`client` 
		 WHERE `prospect`.`num_prospect` = `travaille`.`num_prospect` 
		 AND `prospect`.`num_employe` = `employe_generique`.`num_employe`
		 AND `prospect`.`num_client` = `client`.`num_client`
		 AND `travaille`.`num_employe` = $employee_number";
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
	}
	else {
		echo '{"error":"POST variables not found"}';
	}

	$rs->free();
	$conn->close();
?>