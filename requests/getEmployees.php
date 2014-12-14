<?php
	$user_name = "root";
	$password = "root";
	$database = "GestionPlanning";
	$server = "localhost";

	$db_handle = mysqli_connect("localhost","root","root");
	$db_found = mysqli_select_db($db_handle,"GestionPlanning");

	if ($db_found)
	 {
	 	$query ="SELECT * FROM employe_generique ORDER BY num_employe";
	 	$request = mysqli_query($db_handle,$query);
		$result = array();

		while ($row = mysqli_fetch_assoc($request))
		{
			$result[] = $row;
		}
		echo json_encode($result);
	}
	else {
		print '{"error":"Database NOT Found"}';
		mysql_close($db_handle);
	
	}
?>