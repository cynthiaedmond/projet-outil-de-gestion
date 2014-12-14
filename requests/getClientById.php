<?php
	$user_name = "root";
	$password = "root";
	$database = "GestionPlanning";
	$server = "localhost";

	$db_handle = mysqli_connect("localhost","root","root");
	$db_found = mysqli_select_db($db_handle,"GestionPlanning");

	if ($db_found)
	 {

	 	if($_REQUEST["numclient"])
	 	{
	 		$num_client=$_REQUEST["numclient"];
	 		$query ="SELECT * FROM client WHERE  num_client ='$num_client'";
		 	$request = mysqli_query($db_handle,$query);
			$result = array();

			while ($row = mysqli_fetch_assoc($request))
			{
				$result[] = $row;
			}
			echo json_encode($result);
		}
		else{
			print '{"error":"post variables NOT Found"}';
			mysqli_close($db_handle);
		}
	

	}
	else {
		print '{"error":"Database NOT Found"}';
		mysqli_close($db_handle);
	
	}
?>