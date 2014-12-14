<?php
	$user_name = "root";
	$password = "root";
	$database = "GestionPlanning";
	$server = "localhost";

	$db_handle = mysqli_connect("localhost","root","root");
	$db_found = mysqli_select_db($db_handle,"GestionPlanning");

	if ($db_found)
	 {
	 	if ($_REQUEST["datephase"] && $_REQUEST["certainty"] && $_REQUEST["numprospect"])

	 		{
		 		$date=$_REQUEST["datephase"];
			 	$certainty=$_REQUEST["certainty"];
			 	$numprospect=$_REQUEST["numprospect"];
			 	$numphase=0;

			 	if($certainty >= 0 && $certainty <20)
			 		$numphase =1;
			 	else if($certainty >= 20 && $certainty <40)
			 		$numphase =2;
			 	else if($certainty >= 40 && $certainty <60)
			 		$numphase =3;
			 	else if($certainty >=60 && $certainty <80)
			 		$numphase =4;
			 	else $numphase =5;

		 		$query ="INSERT INTO debute VALUES ('$numprospect','$numphase','$date')";
		 		$request = mysqli_query($db_handle,$query);
				if($request)
				{
					echo '{"success":"success"}';
					//echo $numprospect;
				}
				else
				{
					//echo $numprospect;
					echo '{"error":"error in creating phase"}';
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