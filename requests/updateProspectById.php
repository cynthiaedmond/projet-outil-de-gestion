<?php
	$user_name = "root";
	$password = "root";
	$database = "GestionPlanning";
	$server = "localhost";

	$db_handle = mysqli_connect("localhost","root","root");
	$db_found = mysqli_select_db($db_handle,"GestionPlanning");

	if ($db_found)
	 {
	 	if ($_REQUEST["title"] && $_REQUEST["certainty"] && $_REQUEST["startDate"] && $_REQUEST["endDate"] && $_REQUEST["manHours"] 
	 		&& $_REQUEST["numdirector"] && $_REQUEST["numclient"] && $_REQUEST["numprospect"] && $_REQUEST["alias"])

	 		{
		 		$title=$_REQUEST["title"];
			 	$certainty=$_REQUEST["certainty"];
			 	$startDate=$_REQUEST["startDate"];
			 	$endDate=$_REQUEST["endDate"];
			 	$manHours=$_REQUEST["manHours"];
			 	$numdirector=$_REQUEST["numdirector"];
			 	$numclient=$_REQUEST["numclient"];
			 	$numprospect = $_REQUEST["numprospect"];
			 	$alias=$_REQUEST["alias"];

		 		$query ="UPDATE prospect SET titre='$title',certitude='$certainty',date_debut='$startDate',date_fin='$endDate',
		 		jour_hommes='$manHours',num_employe='$numdirector',num_client='$numclient', alias='$alias'
		 		WHERE num_prospect ='$numprospect'";
		 		$request = mysqli_query($db_handle,$query);
				if($request)
				{
					echo '{"success":"success"}';
				}
				else
				{
					echo '{"error":"failed in update prospect"}';
				}
			}
		else 
		{
			echo '{"error":"Post variables not found"}';
		}
		mysqli_close($db_handle);
	}
	else {
		print '{"error":"Database NOT Found"}';
		mysql_close($db_handle);
	
	}
?>