<?php
	$user_name = "root";
	$password = "root";
	$database = "GestionPlanning";
	$server = "localhost";

	$db_handle = mysqli_connect("localhost","root","root");
	$db_found = mysqli_select_db($db_handle,"GestionPlanning");

	if ($db_found)
	 {

	 	if($_REQUEST["numprospect"])
	 	{
	 		$num_prospect=$_REQUEST["numprospect"];
	 		$query ="SELECT * FROM travaille
	 				 WHERE  num_prospect ='$num_prospect'";
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