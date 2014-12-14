<?php
	$user_name = "root";
	$password = "root";
	$database = "GestionPlanning";
	$server = "localhost";

	$db_handle = mysqli_connect("localhost","root","root");
	$db_found = mysqli_select_db($db_handle,"GestionPlanning");

	if ($db_found)
	 {
	 	$prospect_number = $_REQUEST["numprospect"];
		$SQL = "SELECT `prospect`.`num_prospect`,`phase`.`num_phase`,`date`,`pourcentage` FROM `prospect`,`debute`,`phase`
				WHERE `prospect`.`num_prospect`=`debute`.`num_prospect`
				AND `debute`.`num_phase`=`phase`.`num_phase`
				AND `prospect`.`num_prospect`=$prospect_number
				ORDER BY `num_prospect`,`num_phase`";
	 	$request = mysqli_query($db_handle,$SQL);
		$result = array();

		while ($row = mysqli_fetch_assoc($request))
		{
			$result[] = $row;
		}
		echo json_encode($result);
	}
	else {
		print '{"error":"Database NOT Found"}';
		mysqli_close($db_handle);
	
	}
?>