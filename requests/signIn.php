<?php
	$DBServer = "localhost";
	$DBUser = "root";
	$DBPass = "root";
	$DBName = "GestionPlanning";

	$conn = new mysqli($DBServer, $DBUser, $DBPass, $DBName);

	// check connection
	if ($conn->connect_error) {
		echo '{"error":"Database connection failed"}';
	}
	
	if ($_REQUEST["username"] && $_REQUEST["password"])
	{
		$username = "'".$conn->real_escape_string($_REQUEST["username"])."'";
		$password = $_REQUEST["password"];


		$SQL = "SELECT `num_employe`,`nom`,`prenom`,`grade`,`mot_de_passe` FROM `employe_generique` WHERE `nom_utilisateur`=$username";
		$rs=$conn->query($SQL);

		$parametersSQL = "SELECT * FROM `parameters`";
		$rs1=$conn->query($parametersSQL);

		if($rs === false) {
			echo '{"error":"Wrong SQL"}';
		}
		else {
			$rs->data_seek(0);
			if($row = $rs->fetch_assoc()){
				if($row['mot_de_passe'] == $password){
					$echoString = '{"num_employe":"'.$row['num_employe'].'","grade":"'.$row['grade'].'","nom":"'.$row['nom'].'","prenom":"'.$row['prenom'].'"';//}';
					while ($row = $rs1->fetch_assoc()) {
						$echoString = $echoString.',"'.$row["parameter"].'":"'.$row["value"].'"';
					}
					$echoString = $echoString.'}';
					echo $echoString;
				}
				else
					echo '{"error":"Username or password incorrect"}';
			}
			else {
				echo '{"error":"Username or password incorrect"}';
			}
		}
	}
	else
		echo '{"error":"POST variables not found"}';

	$rs->free();
	$conn->close();
	//http://www.pontikis.net/blog/how-to-use-php-improved-mysqli-extension-and-why-you-should
?>

