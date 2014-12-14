<?php
	$DBServer = "localhost";
	$DBUser = "root";
	$DBPass = "root";
	$DBName = "GestionPlanning";

	$conn = new mysqli($DBServer, $DBUser, $DBPass, $DBName);

	// check connection
	if ($conn->connect_error) {
  		echo '{"error":"Database NOT FOUND"}';
  		die();
	}

	if (!$_REQUEST["username"] || !$_REQUEST["password"] || !$_REQUEST["new_password"]){
		echo '{"error":"POST variables NOT FOUND"}';
		die();
	}

	$username = "'".$conn->real_escape_string($_REQUEST["username"])."'";
	$password = "'".$conn->real_escape_string($_REQUEST["password"])."'";
	$new_password = "'".$conn->real_escape_string($_REQUEST["new_password"])."'";

	$AuthenticationSQL = "SELECT `mot_de_passe` AS password FROM `employe_generique` WHERE `nom_utilisateur`=$username";
	$rs=$conn->query($AuthenticationSQL);
	if ($rs===false) {
		echo '{"error":"Authentication SQL error'.$conn->error.'"}';
		$conn->close();
		die();
	}
	if ($row=$rs->fetch_assoc()){
		if ($row["password"]===$conn->real_escape_string($_REQUEST["password"])){
			//ignore and continue
		} else {
			echo '{"error":"Authentication Failed"}';
			$conn->close();
			die();
		}
	} else {
		echo '{"error":"Authentication Failed"}';
		$conn->close();
		die();
	}


	$SQL = "UPDATE `employe_generique` SET `mot_de_passe`=$new_password WHERE `nom_utilisateur`=$username";

	if($conn->query($SQL) === false) {
		echo '{"error":"Error in SQL Syntaxe : '.$conn->error.'"}';
		$conn->close();
		die();
	}
	echo '{"success":"Password changed successfully"}';
	$conn->close();
?>


