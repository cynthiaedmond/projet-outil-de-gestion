function initializeSettingsTab(){
	clearSettingsFields();
	$("#settingsNewPasswordContainer").hide();

	$("#changeUsernameButton").click(function(){
		$("#settingsNewPasswordContainer").hide();
		$("#settingsNewUsernameContainer").show();
	});
	$("#changePasswordButton").click(function(){
		$("#settingsNewUsernameContainer").hide();
		$("#settingsNewPasswordContainer").show();
	});
	$("#signOutButton").click(function(){
		location.reload();
	});
	$("#changeUsernameSubmitButton").click(function(){
		var username = $("#settingsUsernameField").val();
		var password = $("#settingsPasswordField").val();
		var newUsername = $("#newUsernameField").val();
		if (username=="" || password=="" || newUsername==""){
			//ignore
		} else {
			changeUsername(username,password,newUsername,changeUsernameSuccess,displayRequestError);
		}
	});
	$("#changeUsernameCancelButton").click(function(){
		//alert("Change Username Cancel");
		clearSettingsFields();
	});
	$("#changePasswordSubmitButton").click(function(){
		var username = $("#settingsUsernameField").val();
		var password = $("#settingsPasswordField").val();
		var newPassword = $("#newPasswordField").val();
		var newPasswordVerify = $("#newPasswordVerifyField").val();
		if (username=="" || password=="" || newPassword=="" || newPasswordVerify==""){
			//ignore
		} else {
			if (newPassword!=newPasswordVerify) {
				alert("New Password Mismatch");
				$("#newPasswordField").val("");
				$("#newPasswordVerifyField").val("");
			} else {
				changePassword(username,password,newPassword,changePasswordSuccess,displayRequestError);
			}
		}
	});
	$("#changePasswordCancelButton").click(function(){
		//alert("Change Password Cancel");
		clearSettingsFields();
	});
}
function clearSettingsFields(){
	$("#settingsUsernameField").val("");
	$("#settingsPasswordField").val("");

	$("#newUsernameField").val("");

	$("#newPasswordField").val("");
	$("#newPasswordVerifyField").val("");
}

function changeUsernameSuccess(requestedData){
	clearSettingsFields();
}

function changePasswordSuccess(requestedData){
	clearSettingsFields();
}