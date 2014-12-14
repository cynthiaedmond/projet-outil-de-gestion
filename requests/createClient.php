<?php
	$user_name = "root";
	$password = "root";
	$database = "GestionPlanning";
	$server = "localhost";

	$db_handle = mysqli_connect("localhost","root","root");
	$db_found = mysqli_select_db($db_handle,"GestionPlanning");

	if ($db_found)
	 {
	 	if ($_REQUEST["firstname"] && $_REQUEST["lastname"] && $_REQUEST["email"] && $_REQUEST["phone"] && $_REQUEST["type"] && $_REQUEST["num"])

	 		{
	 			$num =$_REQUEST["num"];
		 		$firstname=$_REQUEST["firstname"];
			 	$lastname=$_REQUEST["lastname"];
			 	$email=$_REQUEST["email"];
			 	$phone=$_REQUEST["phone"];
			 	$type = $_REQUEST["type"];
			 	if($type =="insert"){
		 			
		 				$query ="INSERT INTO client VALUES ('$num','$lastname','$firstname','$email','$phone')";
		 				$request = mysqli_query($db_handle,$query);
		 				echo '{"success": "insert"}';
		 			}

		 		else{
		 			$query ="UPDATE client
		 					SET nom='$lastname',prenom='$firstname',mail='$email',num_telephone='$phone'
		 					WHERE num_client = '$num'" ;
		 					$request = mysqli_query($db_handle,$query);
		 				echo '{"success": "update"}';
		 			}
				
			}
		else 
		{
			echo '{"error":"Post variables not found in create client"}';
		}
		mysqli_close($db_handle);
		//echo json_encode($result);
	}
	else {
		print '{"error":"Database NOT Found"}';
		mysqli_close($db_handle);
	
	}
?>