var rule = {       //judge the format of input
	one:0,         //username
	two:0,		   //firstname
	three:0,	   //lastname
	four:0,		   //e-mail
	five:0,		   //password
	six:0,         //confirmed password
	errorcode:""   //error info
}
$().ready(function () {
	$("#username").change(checkusername);
	$("#username").click(usernameFormat);
	$("#usernamer").change(checkusernameR);
	$("#usernamer").click(usernameFormatR);
	$("#firstname").change(checkfirstname);
	$("#firstname").click(nameFormatR);
	$("#lastname").change(checklastname);
	$("#lastname").click(nameFormatR);
	$("#password").click(passwordFormat);
	$("#password").change(checkPasswordForm);
	$("#passwordr").click(passwordFormatR);
	$("#passwordr").change(checkPasswordFormR);
	$("#passwordCheckr").click(checkPasswordFormatR);
	$("#passwordCheckr").change(CheckpasswordSameR);
	$("#email").change(checkemail);
	$("#email").click(emailFormat);
	$("#reset").click(reset)
	$("#submit").click(subFunc)
})

function reset() {
	$.each($("input[type = 'text']"), function () {
		$(this).val("");
		$(this).attr("class", "form-control");
	})
	$.each($("input[type = 'password']"), function () {
		$(this).val("");
		$(this).attr("class", "form-control");
	})
}
function subFunc() {
	if (!rule.one) rule.errorcode += "The format of username is not correct.\n";
	if (!rule.two) rule.errorcode += "The format of firstname is not correct.\n";
	if (!rule.three) rule.errorcode += "The format of lastname is not correct.\n";
	if (!rule.four) rule.errorcode += "The format of e-mail is not correct.\n";
	if (!(rule.one&&rule.two&&rule.three&&rule.four&&rule.five&&rule.six)) {
		alert(rule.errorcode);
		rule.errorcode = "";
		return false;
	}
	else{
		alert("Regist successfully!");
		
	}
}
function usernameFormat() {
	$("#errorInfo").attr("class","err");
	$("#errorInfo").text("letters, numbers or underscores but cannot begin with understore(3~12 characters)");
}
function usernameFormatR() {
	$("#errorInfoR").attr("class","err");
	$("#errorInfoR").text("letters, numbers or underscores but cannot begin with understore(3~12 characters)");
}
function nameFormatR() {
	$("#errorInfoR").attr("class","err");
	$("#errorInfoR").text("Your name should be all letters")
}

function emailFormat() {
	$("#errorInfoR").attr("class","err");
	$("#errorInfoR").text("Please enter the correct email address")
}
function passwordFormat() {
	$("#errorInfo").attr("class", "err");
	$("#errorInfo").text("numbers, letters or underscores(6~12 characters)")
}
function passwordFormatR() {
	$("#errorInfoR").attr("class", "err");
	$("#errorInfoR").text("numbers, letters or underscores(6~12 characters)")
}
function checkPasswordFormat() {
	$("#errorInfo").attr("class", "err");
	$("#errorInfo").text("Please confirm your password")
}
function checkPasswordFormatR() {
	$("#errorInfoR").attr("class", "err");
	$("#errorInfoR").text("Please confirm your password")
}
function checkusername() {  //check the fomat of username
	var patten = new RegExp(/^\w+$/);
	var username = $(this).val();
	if (!patten.test(username)||username.length > 12||
		username.length < 3||username[0] == '_') {
		$(this).attr("class", "red")
		rule.one = 0;
	} else {
		$("#errorInfo").text("Please input your information");
		$("#errorInfo").attr("class","correct");
		$(this).attr("class", "green")
		rule.one = 1;
	}
}
function checkusernameR() {  //check the fomat of username
	var patten = new RegExp(/^\w+$/);
	var username = $(this).val();
	if (!patten.test(username)||username.length > 12||
		username.length < 3||username[0] == '_') {
		$(this).attr("class", "red")
		rule.one = 0;
	} else {
		$("#errorInfoR").text("Please input your information");
		$("#errorInfoR").attr("class","correct");
		$(this).attr("class", "green")
		rule.one = 1;
	}
}

function checkfirstname() {  //check the fomat of firstname
	var patten = new RegExp(/^[a-zA-Z]+$/);
	var firstname = $(this).val();
	if (!patten.test(firstname)||firstname.length < 1) {
		$(this).attr("class", "red")
		rule.two = 0;
	} else {
		$("#errorInfoR").text("Please input your information");
		$("#errorInfoR").attr("class","correct");
		$(this).attr("class", "green");
		rule.two = 1;
	}
}

function checklastname() {  ////check the fomat of lastrname
	var patten = new RegExp(/^[a-zA-Z]+$/);
	var lastname = $(this).val();
	if (!patten.test(lastname)||lastname.length < 1) {
		$(this).attr("class", "red")
		rule.three = 0;
	} else {
		$("#errorInfoR").text("Please input your information");
		$("#errorInfoR").attr("class","correct");
		$(this).attr("class", "green");
		rule.three = 1;
	}
}

function checkemail() {  //check the fomat of e-mail
	var name = $(this).val();
	var patten = new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
	if (patten.test(name)) {
		$("#errorInfoR").text("Please input your information");
		$("#errorInfoR").attr("class","correct");
		$(this).attr("class", "green");
		rule.four = 1;
	} else {
		$(this).attr("class", "red")
		rule.four = 0;
	}
}

function checkPasswordForm() {  //check the fomat of password
	var patten = new RegExp(/^[a-zA-Z0-9_-]{6,12}$/);
	var name = $(this).val();
	if (!patten.test(name)) {
		$(this).attr("class", "red")
		rule.five = 0;
	} else {
		$("#errorInfo").text("Please input your information");
		$("#errorInfo").attr("class","correct");
		$(this).attr("class", "green")
		rule.five = 1;
	}
}
function checkPasswordFormR() {  //check the fomat of password
	var patten = new RegExp(/^[a-zA-Z0-9_-]{6,12}$/);
	var name = $(this).val();
	if (!patten.test(name)) {
		$(this).attr("class", "red")
		rule.five = 0;
	} else {
		$("#errorInfoR").text("Please input your information");
		$("#errorInfoR").attr("class","correct");
		$(this).attr("class", "green")
		rule.five = 1;
	}
}

function CheckpasswordSame() {  //check the password is not the same
	var password = $("#password").val();
	var check = $(this).val();
	if (password != check) {
		$(this).attr("class", "red");
		$("#errorInfo").text("Your password and the confirmed one do not match.");
		rule.six= 0;
	} else {
		$("#errorInfo").text("Please input your information");
		$("#errorInfo").attr("class","correct");
		$(this).attr("class", "green")
		rule.six = 1;
	}
}
function CheckpasswordSameR() {  //check the password is not the same
	var password = $("#passwordr").val();
	var check = $(this).val();
	if (password != check) {
		$(this).attr("class", "red");
		$("#errorInfoR").text("Your password and the confirmed one do not match.");
		rule.six= 0;
	} else {
		$("#errorInfoR").text("Please input your information");
		$("#errorInfoR").attr("class","correct");
		$(this).attr("class", "green")
		rule.six = 1;
	}
}


