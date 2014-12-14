<?php
	$user_name = "root";
	$password = "root";
	$database = "GestionPlanning";
	$server = "localhost";

	$db_handle = mysql_connect($server, $user_name, $password);
	$db_found = mysql_select_db($database, $db_handle);

	if ($db_found)
	 {
		if ($_REQUEST["username"] && $_REQUEST["password"])
		{
			$username = $_REQUEST["username"];
			$password = $_REQUEST["password"];
			$num_employe;
			$grade;
			$SQL = "SELECT num_employe,grade FROM employe_generique WHERE nom_utilisateur='$username' AND mot_de_passe='$password'";
			$result = mysql_query($SQL);

			if($db_field = mysql_fetch_assoc($result))
			{
				echo json_encode($db_field);
			}
			else
				echo '{"error":"username or password incorrect"}';
			
		}
		else 
		{
			echo '{"error":"Post variables not found"}';
		}
		mysql_close($db_handle);
	}
	else {
		print '{"error":"Database NOT Found"}';
		mysql_close($db_handle);
	}
?>