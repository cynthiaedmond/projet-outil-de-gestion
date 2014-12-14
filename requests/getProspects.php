<?php
	$user_name = "root";
	$password = "root";
	$database = "GestionPlanning";
	$server = "localhost";

	$db_handle = mysqli_connect("localhost","root","root");
	$db_found = mysqli_select_db($db_handle,"GestionPlanning");

	if ($db_found)
	 {
	 	if($_REQUEST["numdirecteur"])
	 	{
	 		$num_directeur=$_REQUEST["numdirecteur"];
		 	$query ="SELECT * FROM prospect WHERE num_employe = '$num_directeur'";
		 	$request = mysqli_query($db_handle,$query);
			$result = array();

			while ($row = mysqli_fetch_assoc($request))
			{
				$result[] = $row;
			}
			echo json_encode($result);
		}
		else
		{

			print '{"error":"post variables NOT Found"}';
			mysqli_close($db_handle);
		}

	}
	else {
		print '{"error":"Database NOT Found"}';
		mysqli_close($db_handle);
	
	}
?>