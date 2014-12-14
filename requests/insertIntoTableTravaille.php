<?php
	$user_name = "root";
	$password = "root";
	$database = "GestionPlanning";
	$server = "localhost";

	$db_handle = mysqli_connect("localhost","root","root");
	$db_found = mysqli_select_db($db_handle,"GestionPlanning");

	if ($db_found)
	{
	 	if($_REQUEST["equipe"] && $_REQUEST["numprospect"])
	 	{
	 		$equipe=array();
	 		$equipe = $_REQUEST["equipe"];
	 		$numprospect =$_REQUEST["numprospect"];

	 		for($i=0; $i < count($equipe) ;$i++)
	 		{
	 			$query ="INSERT INTO travaille VALUES('$equipe[$i]','$numprospect')";
	 			$request = mysqli_query($db_handle,$query);
	 		
	 		}
	 		if($request)
	 			echo '{"success" :"success"}';
	 		else
	 			echo '{"error" :"insert failed"}';
	 	}
		else
	 		{
	 			echo '{"error":"post variables not found"}';
	 		}

		 mysqli_close($db_handle);	
	}	
	else {
		print '{"error":"Database NOT Found"}';
		mysql_close($db_handle);
	
	}
?>