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

			$username = stripslashes($username);
 			$password = stripslashes($password);
 			$username = mysql_real_escape_string($username);
 			$password = mysql_real_escape_string($password);

			$SQL = "SELECT num_employe,nom,prenom,grade,mot_de_passe FROM employe_generique WHERE nom_utilisateur='$username'";
			$result = mysql_query($SQL);

			if($db_field = mysql_fetch_assoc($result))
			{
				if($db_field['mot_de_passe'] == $password)
					echo '{"num_employe":"'.$db_field['num_employe'].'","grade":"'.$db_field['grade'].'","nom":"'.$db_field['nom'].'","prenom":"'.$db_field['prenom'].'"}';
				else
					echo '{"error":"Username or password incorrect"}';
			}
			else
				echo '{"error":"Username or password incorrect"}';
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