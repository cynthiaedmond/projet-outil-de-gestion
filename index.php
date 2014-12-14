<!DOCTYPE HTML>

<html>
	<head>
		<title>Planning</title>

		<!--<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.10.2.min.js"></script>-->
		<script src="jQuery/jQuery Color Animations v2.1.2.js"></script>
		<script src="jQuery/jquery-1.11.1.js"></script>
		<script src="requests/requests.js"></script>

		<script src="signInPage.js"></script>

		<script src="employeePage.js"></script>
			<script src="EMPtimelinePage.js"></script>
			<script src="EMPprospectsPage.js"></script>

		<script src="settingsTab.js"></script>

		<script src="directorPage.js"></script>
		<script src="pipeline.js"></script>
		<script src="addNewProspect.js"></script>
		

		<link rel="stylesheet" type="text/css" href="index.css">
		<link rel="stylesheet" type="text/css" href="signInPage.css">

		<link rel="stylesheet" type="text/css" href="employeePage.css">
			<link rel="stylesheet" type="text/css" href="EMPtimelinePage.css">
			<link rel="stylesheet" type="text/css" href="EMPprospectsPage.css">

		<link rel="stylesheet" type="text/css" href="settingsTab.css">

		<link rel="stylesheet" type="text/css" href="clients.css">		
		<link rel="stylesheet" type="text/css" href="directorPage.css">
		<link rel="stylesheet" type="text/css" href="addNewProspect.css">

	</head>
	<body>
		<div id="window">
			<div id="signInPage">
				<div id="signInTabBar" class="tabBar">
					<div id="signInIcon" class="tabBarIcon">
						Sign in
					</div>
				</div>
				<div id="welcomeImage">
					<!--img src="images/planning.png" height="100%" width="100%" /-->
				</div>
				<div id="signInContainer" >
					<div id="signInBackground"></div>
					<div id="signInContent">
						<span id="signInLabelLarge">Sign-in</span>
						<div id="signInContentLeft">
							<span id="usernameLabel" class="signInLabel">Username</span>
							<br />
							<span id="passwordLabel" class="signInLabel">Password</span>
						</div>
						<div id="signInContentRight">
							<input type="text" id="usernameField" class="signInField"></input>
							<br />
							<input type="password" id="passwordField" class="signInField"></input>
						</div>
						<input type="button" value="Sign in" id="signInButton"></input>
					</div>
				</div>
				<span id="ourProjectNameLabel">Plan-it</span>
				<span id="ourProjectDescriptionLabel">Time Management Platform</span>
				<span id="ourNamesLabel">Created by : Jacques Nabhan - Cynthia Nahas</span>
				<span id="profNameLabel">Supervised by : Mr.Georges Fadel</span>
			</div>


			<div id="directorPage">
			</div>


			<div id="employeePage">
			</div>
		</div>
	</body>
</html>
