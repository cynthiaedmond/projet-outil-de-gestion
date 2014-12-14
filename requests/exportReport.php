<?php

	$number_of_days=0;

	function formatName($firstName, $lastName){
		return strtoupper($lastName).', '.strtoupper(substr($firstName,0,1)).(strtolower(substr($firstName,1)));
	}

	function certaintyToColor($certainty){
		if ($certainty<0 || $certainty>100) {
			echo '{"error":"Database Corruption FOUND : Invalid Certainty"}';
			die();
		}
		if ($certainty<20) return 'FFFF0000';
		if ($certainty<40) return 'FFFFA500';
		if ($certainty<60) return 'FFFFFF00';
		if ($certainty<80) return 'FFADFF2F';
		else return 'FF00FF00';
	}
	/** Error reporting */
	error_reporting(E_ALL);

	date_default_timezone_set('Israel');

	/** Include PHPExcel */
	require_once dirname(__FILE__) . '/../Classes/PHPExcel.php';

	$styleThinBlackBorderOutline = array(
		'borders' => array(
			'outline' => array(
				'style' => PHPExcel_Style_Border::BORDER_THIN,
				'color' => array('argb' => 'FF000000'),
			),
		),
	);

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

	if ($_REQUEST["employee_number"] && $_REQUEST["from"] && $_REQUEST["till"]) {
		$employee_number = "'".$conn->real_escape_string($_REQUEST["employee_number"])."'";
		$from = $conn->real_escape_string($_REQUEST["from"]);
		$till = $conn->real_escape_string($_REQUEST["till"]);

//------GET INFO ABOUT THE DIRECTOR REQUESTING THE REPORT

		$getDirectorInfoSQL = "SELECT `nom`,`prenom` FROM `employe_generique` WHERE `num_employe`=$employee_number";
		$rs=$conn->query($getDirectorInfoSQL);
		if($rs === false) {
			echo '{"error":"Error in getDirectorInfoSQL syntaxe"}';
			die();
		} else {
			if ($row = $rs->fetch_assoc()) {
				$directorFullName = formatName($row["prenom"],$row["nom"]);
			} else {
				echo '{"error":"Director NOT FOUND"}';
				die();
			}
		}

//------CREATE AND INITIALIZE THE PHP EXCEL OBJECT

		// Create new PHPExcel object
		$objPHPExcel = new PHPExcel();

		// Set document properties
		$objPHPExcel->getProperties()->setCreator($directorFullName)
									 ->setLastModifiedBy($directorFullName)
									 ->setTitle($directorFullName, date("l jS \of F Y h:i:s A"))
									 ->setSubject($directorFullName, date("l jS \of F Y h:i:s A"))
									 ->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
									 ->setKeywords("office 2007 openxml php")
									 ->setCategory("Test result file");

		$objPHPExcel->setActiveSheetIndex(0);
		$objPHPExcel->getActiveSheet()->setTitle('Timeline');
		$objPHPExcel->getActiveSheet()->setCellValue('A1', 'Requesting Director');
		$objPHPExcel->getActiveSheet()->getStyle('A1')->getFont()->setBold(true);

		$objPHPExcel->getActiveSheet()->setCellValue('B1', $directorFullName);

		$objPHPExcel->getActiveSheet()->setCellValue('A2', 'Date of Issue');
		$objPHPExcel->getActiveSheet()->getStyle('A2')->getFont()->setBold(true);

		$objPHPExcel->getActiveSheet()->setCellValue('B2', date("l jS \of F Y h:i:s A"));

		$objPHPExcel->getActiveSheet()->setCellValue('A3', 'Prospect Aliases');
		$objPHPExcel->getActiveSheet()->getStyle('A3')->getFont()->setBold(true);

		$objPHPExcel->getActiveSheet()->setCellValue('B3', 'Definitions are on sheet 2');
		$objPHPExcel->getActiveSheet()->getstyle('A3:B3')->getFont()->getColor()->setRGB("FF0000");

		$objPHPExcel->getActiveSheet()->setCellValue('A5', 'Employee');
		$objPHPExcel->getActiveSheet()->getStyle('A5')->getFont()->setBold(true);
		$objPHPExcel->getActiveSheet()->getStyle('A5')->applyFromArray($styleThinBlackBorderOutline);

		$objPHPExcel->getActiveSheet()->setCellValue('B5', 'Workload %');
		$objPHPExcel->getActiveSheet()->getStyle('B5')->getFont()->setBold(true);
		$objPHPExcel->getActiveSheet()->getStyle('B5')->applyFromArray($styleThinBlackBorderOutline);

		$objPHPExcel->getActiveSheet()->getColumnDimension("A")->setAutoSize(true);
		$objPHPExcel->getActiveSheet()->getColumnDimension("B")->setWidth(90/7);

//------GET THE LIST OF EMPLOYEES

		$getEmployeesSQL = "SELECT `num_employe`,`nom`,`prenom` FROM `employe_generique` WHERE `grade`='employe'";
		$rs=$conn->query($getEmployeesSQL);
		if($rs === false) {
			echo '{"error":"Error in getEmployeesSQL syntaxe"}';
			die();
		} 
		$i=6;
		while ($row = $rs->fetch_assoc()) {
			$employees[] = array("employee_number"=>$row["num_employe"],
								"employee_full_name"=>formatName($row["prenom"],$row["nom"]));
			$objPHPExcel->getActiveSheet()->setCellValue('A'.$i, $employees[$i-6]["employee_full_name"]);
			$objPHPExcel->getActiveSheet()->getStyle('A'.$i)->getFont()->setBold(true);
			$objPHPExcel->getActiveSheet()->getStyle('A'.$i)->applyFromArray($styleThinBlackBorderOutline);
			++$i;
		}

//------GET DATES AND WEEKENDS TO INITIALIZE COLUMNS

		$fromObj = date_create_from_format("Y-m-d",$from);
		$i = 2;
		while (strtotime(date_format($fromObj,"Y-m-d"))<=strtotime($till)){
			//echo date_format($fromObj, "l jS \of F Y h:i:s A")."<BR />";
			++$number_of_days;
			if (date_format($fromObj,"w") === "0" || date_format($fromObj,"w") === "6"){
				for ($j=0; $j<count($employees); ++$j){
					$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i).($j+6))->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
					$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i).($j+6))->getFill()->getStartColor()->setARGB('FFAAAAAA');
				}
			}
			else {
				for ($j=0; $j<count($employees); ++$j){
					$objPHPExcel->getActiveSheet()->setCellValue(PHPExcel_Cell::stringFromColumnIndex($i).($j+6),'Available');
				}
			}
			$objPHPExcel->getActiveSheet()->setCellValue(PHPExcel_Cell::stringFromColumnIndex($i)."5",date_format($fromObj,"d-m-Y"));
			$objPHPExcel->getActiveSheet()->getColumnDimension(PHPExcel_Cell::stringFromColumnIndex($i))->setWidth(90/7);
			$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i)."5")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
			$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i)."5")->getFont()->setBold(true);
			$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i)."5")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
			$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i)."5")->getFill()->getStartColor()->setARGB('FFFFDDDD');
			$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i)."5")->applyFromArray($styleThinBlackBorderOutline);
			date_add($fromObj,date_interval_create_from_date_string("1 day"));
			++$i;
		}
		$last_day_index = $i-1;

//------GET HOLIDAYS

		$getHolidaysSQL = "SELECT `date`,`type_jour` FROM `jour` WHERE `type_jour` <> 'WORK' AND `date` >= '$from' AND `date` <= '$till' ORDER BY `date`";
		$rs=$conn->query($getHolidaysSQL);
		if($rs === false) {
			echo '{"error":"Error in getHolidaysSQL syntaxe"}';
			die();
		}
		$fromObj = date_create_from_format("Y-m-d",$from);
		$i = 2;
		$holidays = array();
		while ($row = $rs->fetch_assoc()) {
			while (strtotime(date_format($fromObj,"Y-m-d"))<strtotime($row["date"])){
				date_add($fromObj,date_interval_create_from_date_string("1 day"));
				++$i;
			}
			for ($j=0; $j<count($employees); ++$j){
				$objPHPExcel->getActiveSheet()->setCellValue(PHPExcel_Cell::stringFromColumnIndex($i).($j+6),"Holiday");//$row["type_jour"]);
				$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i).($j+6))->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
				$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i).($j+6))->getFill()->getStartColor()->setARGB('FFAAAAAA');
			}
			//$holidays[] = $row;
		}
		//echo json_encode($holidays);

//------GET RESERVATIONS AND FILL THEM

		for ($j=0; $j<count($employees); ++$j) {
			$employee=$employees[$j]["employee_number"];
			$getReservationsForEmployeeSQL = "SELECT * FROM (
			SELECT `date`,`type_reservation`,`titre`,`certitude`,'' AS type_conge,`alias` FROM `reserve`,`prospect`
			WHERE `prospect`.`num_prospect` = `reserve`.`num_prospect`
			AND `reserve`.`num_employe` = '$employee'
			AND `date` >= '$from'
			AND `date` <= '$till'
			AND (`type_reservation` = 'prospect'
			OR `type_reservation` = 'reserve')
			UNION
			SELECT `date`,`type_reservation`,'' AS `titre`,'' AS `certitude`,`type_conge`,'' AS `alias` FROM `reserve`
			WHERE `reserve`.`num_employe` = '$employee'
			AND `date` >= '$from'
			AND `date` <= '$till'
			AND `type_reservation` = 'conge'
			) AS `ALL` ORDER BY `ALL`.`date`";
			$rs=$conn->query($getReservationsForEmployeeSQL);
			if($rs === false) {
				echo '{"error":"Error in getReservationsForEmployeeSQL syntaxe"}';
				die();
			}
			$fromObj = date_create_from_format("Y-m-d",$from);
			$i = 2;
			$holidays = array();
			while ($row = $rs->fetch_assoc()) {
				while (strtotime(date_format($fromObj,"Y-m-d"))<strtotime($row["date"])){
					date_add($fromObj,date_interval_create_from_date_string("1 day"));
					++$i;
				}
				switch($row["type_reservation"]){
					case "prospect":
						$objPHPExcel->getActiveSheet()->setCellValue(PHPExcel_Cell::stringFromColumnIndex($i).($j+6),$row["alias"]);
						$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i).($j+6))->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
						$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i).($j+6))->getFill()->getStartColor()->setARGB(certaintyToColor($row["certitude"]));
						break;
					case "reserve":
						$objPHPExcel->getActiveSheet()->setCellValue(PHPExcel_Cell::stringFromColumnIndex($i).($j+6),$row["alias"]);
						$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i).($j+6))->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
						$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i).($j+6))->getFill()->getStartColor()->setARGB(certaintyToColor($row["certitude"]));
						break;
					case "conge":
						$objPHPExcel->getActiveSheet()->setCellValue(PHPExcel_Cell::stringFromColumnIndex($i).($j+6),$row["type_conge"]);
						$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i).($j+6))->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
						$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i).($j+6))->getFill()->getStartColor()->setARGB('FF00FF00');
						break;
					default:
						echo '{"error":"Database Corruption detected: Invalid reservation type"}';
						die();
				}
			}
		}

//------SET BORDERS

		for ($i=1; $i<=$last_day_index; ++$i){
			for ($j=0; $j<count($employees); ++$j){
				$objPHPExcel->getActiveSheet()->getStyle(PHPExcel_Cell::stringFromColumnIndex($i).strval($j+1+5))->applyFromArray($styleThinBlackBorderOutline);
			}
		}

//------SET EQUATIONS FOR WORKLOAD

		for ($i=0; $i<count($employees); ++$i){
			$currentRow = $i+6;
			$objPHPExcel->getActiveSheet()->setCellValue('B'.$currentRow,'=(((((('.$number_of_days.'-COUNTBLANK(C'.$currentRow.':'.PHPExcel_Cell::stringFromColumnIndex($last_day_index).$currentRow.'))-COUNTIF(C'.$currentRow.':'.PHPExcel_Cell::stringFromColumnIndex($last_day_index).$currentRow.',"Available"))-COUNTIF(C'.$currentRow.':'.PHPExcel_Cell::stringFromColumnIndex($last_day_index).$currentRow.',"Day Off"))-COUNTIF(C'.$currentRow.':'.PHPExcel_Cell::stringFromColumnIndex($last_day_index).$currentRow.',"Holiday"))-COUNTIF(C'.$currentRow.':'.PHPExcel_Cell::stringFromColumnIndex($last_day_index).$currentRow.',"Sick Day"))-COUNTIF(C'.$currentRow.':'.PHPExcel_Cell::stringFromColumnIndex($last_day_index).$currentRow.',"Emergency"))/((((('.$number_of_days.'-COUNTBLANK(C'.$currentRow.':'.PHPExcel_Cell::stringFromColumnIndex($last_day_index).$currentRow.'))-COUNTIF(C'.$currentRow.':'.PHPExcel_Cell::stringFromColumnIndex($last_day_index).$currentRow.',"Holiday"))-COUNTIF(C'.$currentRow.':'.PHPExcel_Cell::stringFromColumnIndex($last_day_index).$currentRow.',"Sick Day"))-COUNTIF(C'.$currentRow.':'.PHPExcel_Cell::stringFromColumnIndex($last_day_index).$currentRow.',"Day Off"))-COUNTIF(C'.$currentRow.':'.PHPExcel_Cell::stringFromColumnIndex($last_day_index).$currentRow.',"Emergency"))');
			$objPHPExcel->getActiveSheet()->getStyle('B'.$currentRow)->getNumberFormat()->applyFromArray(array('code' => PHPExcel_Style_NumberFormat::FORMAT_PERCENTAGE));
		}

//------WRITE LEGEND SHEET

		$objPHPExcel->createSheet();
		$objPHPExcel->setActiveSheetIndex(1);
		$objPHPExcel->getActiveSheet()->setTitle('Alias Definitions');
		$objPHPExcel->getActiveSheet()->setCellValue('A1', 'Alias TO Prospect conversions');
		$getProspectAliasesSQL = "SELECT `num_prospect`,`titre`,`alias` FROM `prospect`";
		$rs=$conn->query($getProspectAliasesSQL);
		if($rs === false) {
			echo '{"error":"Error in getProspectAliasesSQL syntaxe"}';
			die();
		}
		$i=1;
		while ($row = $rs->fetch_assoc()) {
			$objPHPExcel->getActiveSheet()->setCellValue("A".$i,$row["num_prospect"]);
			$objPHPExcel->getActiveSheet()->setCellValue("B".$i,$row["titre"]);
			$objPHPExcel->getActiveSheet()->setCellValue("c".$i,$row["alias"]);
			++$i;
		}

		$objPHPExcel->getActiveSheet()->getColumnDimension("A")->setAutoSize(true);
		$objPHPExcel->getActiveSheet()->getColumnDimension("B")->setAutoSize(true);
		$objPHPExcel->getActiveSheet()->getColumnDimension("C")->setAutoSize(true);

//------WRITE THE PHP OBJECT TO A FILE

		$objPHPExcel->setActiveSheetIndex(0);

		// Redirect output to a client’s web browser (Excel2007)
		/*header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header('Content-Disposition: attachment;filename="Timeline '.$from.' _ '.$till.'.xlsx"');
		header('Cache-Control: max-age=0');
		// If you're serving to IE 9, then the following may be needed
		header('Cache-Control: max-age=1');

		// If you're serving to IE over SSL, then the following may be needed
		header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
		header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
		header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
		header ('Pragma: public'); // HTTP/1.0

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		$objWriter->save('php://output');
		exit;*/
		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');//
		$objWriter->save("Timeline ".$from." _ ".$till.".xlsx");
		echo '{"success":"Timeline '.$from.' _ '.$till.'.xlsx"}';


	} else {
		echo '{"error":"POST variables NOT FOUND"}';
		die();
	}

?>