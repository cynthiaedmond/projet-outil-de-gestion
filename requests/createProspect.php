<?php
	$user_name = "root";
	$password = "root";
	$database = "GestionPlanning";
	$server = "localhost";

	$db_handle = mysqli_connect("localhost","root","root");
	$db_found = mysqli_select_db($db_handle,"GestionPlanning");

	if ($db_found)
	 {
	 	if ($_REQUEST["title"] && $_REQUEST["certainty"] && $_REQUEST["startDate"] && $_REQUEST["endDate"] && $_REQUEST["manHours"] && $_REQUEST["numdirector"] && $_REQUEST["numclient"] && $_REQUEST["alias"])

	 		{
		 		$title=$_REQUEST["title"];
			 	$certainty=$_REQUEST["certainty"];
			 	$startDate=$_REQUEST["startDate"];
			 	$endDate=$_REQUEST["endDate"];
			 	$manHours=$_REQUEST["manHours"];
			 	$numdirector=$_REQUEST["numdirector"];
			 	$numclient=$_REQUEST["numclient"];
			 	$alias=$_REQUEST["alias"];

		 		$query ="INSERT INTO prospect VALUES (NULL,'$title','$certainty','$startDate','$endDate','$manHours',NULL,'$numdirector','$numclient','$alias')";
		 		$request = mysqli_query($db_handle,$query);
				if($request)
				{
					$query ="SELECT num_prospect FROM prospect WHERE titre ='$title'";
					$request = mysqli_query($db_handle,$query);
					$row = mysqli_fetch_assoc($request);
					echo json_encode($row);
				}
				else
				{
					echo '{"error":"failed in create prospect"}';
				}
			}
		else 
		{
			echo '{"error":"Post variables not found"}';
		}
		mysqli_close($db_handle);
		//echo json_encode($result);
	}
	else {
		print '{"error":"Database NOT Found"}';
		mysql_close($db_handle);
	
	}
?>