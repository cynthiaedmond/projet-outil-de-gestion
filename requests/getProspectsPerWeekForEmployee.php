<?php

	function joinArrays($arr1,$arr2){//arr1 is more prioritary
		if (count($arr1)==0) return $arr2;
		if (count($arr2)==0) return $arr1;
		$j=0;
		$arr = array();
		for ($i=0; $i<count($arr1); ++$i){
			while ($j<count($arr2) && strtotime($arr2[$j]["date"])<=strtotime($arr1[$i]["date"])){
				if (strtotime($arr2[$j]["date"])!=strtotime($arr1[$i]["date"]))
					$arr[]=$arr2[$j];
				$j++;
			}
			$arr[]=$arr1[$i];
		}
		return $arr;
	}
	$user_name = "root";
	$password = "root";
	$database = "GestionPlanning";
	$server = "localhost";

	$db_handle = mysqli_connect("localhost","root","root");
	$db_found = mysqli_select_db($db_handle,"GestionPlanning");

	if ($db_found)
	 {
		if ($_REQUEST["firstday"] && $_REQUEST["lastday"] && $_REQUEST["numemp"])
		{
			$startDate=$_REQUEST["firstday"];
			$endDate=$_REQUEST["lastday"];
			$numemp = $_REQUEST["numemp"];
			//$startDate = "2014-04-28";
			//$endDate = "2014-05-04";
			//echo $startDate;

			/*$query1="SELECT `reserve`.`num_employe`,`type_reservation`,,`conge`.`num_conge` AS num,`conge`.`type_conge` AS titre,`date`FROM reserve,conge where `reserve`.`num_conge`= `conge`.`num_conge` and num_employe='$numemp' 
								AND `date` >= '$startDate' AND `date` <='$endDate' ";
			$query2="SELECT `reserve`.`num_employe`,type_reservation,`reserve`.`num_prospect` AS num,`titre`,`date`, FROM reserve,prospect WHERE `reserve`.`num_prospect` = `prospect`.`num_prospect` and `reserve`.`num_employe`='$numemp'
				AND `date` >= '$startDate' and `date`<= '$endDate'";*/
			$holidayQuery = "SELECT '$numemp' AS `num_employe`,'conge' AS `type_reservation`, '' AS `num_prospect`, `type_jour` AS `titre`, `date`,'' AS `certitude`
							FROM jour WHERE `type_jour`<>'Work' AND `date` >= '$startDate' AND `date` <='$endDate' ORDER BY `date`";
			$rq = mysqli_query($db_handle,$holidayQuery);
			$rs = array();

			while ($row = mysqli_fetch_assoc($rq)){
				$rs[] = $row;
			}
			$i=0;

			$query="SELECT `reserve`.`num_employe`,`type_reservation`,'' AS num,`type_conge` as titre,`date`,'' as `certitude`
					FROM reserve
				 	WHERE  num_employe='$numemp' AND `type_reservation`='conge'
					AND `date` >= '$startDate' 
					AND `date` <='$endDate' 
					UNION 
					SELECT `reserve`.`num_employe`,`type_reservation`,`reserve`.`num_prospect` as num,`titre` as titre,`date`,`prospect`.`certitude` 
					FROM reserve,prospect
					WHERE `reserve`.`num_prospect` = `prospect`.`num_prospect` AND (`type_reservation` ='reserve' OR `type_reservation` = 'prospect')
					AND `reserve`.`num_employe`='$numemp'
					AND `date` >= '$startDate' and `date`<= '$endDate'
					ORDER BY `date`";
			//echo $query;
			$request = mysqli_query($db_handle,$query);
			$rs2 = array();

			while ($row = mysqli_fetch_assoc($request))
			{
				$rs2[] = $row;
			}
			echo json_encode(joinArrays($rs2,$rs));
		}
	else 
		{
			echo '{"error":"Post variables not found"}';
		}
		mysqli_close($db_handle);
	}
	else {
		print '{"error":"Database NOT Found"}';
		mysqli_close($db_handle);
	}
?>

