var express = require('express')
var mongoose=require('mongoose');
var User = require('../models/mongoose.revisions')
var errorInfo;

// module.exports.regist = function (req, res) {  //注册请求
// 	res.render('index.ejs', {
// 		errorInfo:'Please input your information'
// 	})
// }

module.exports.signin = function(req, res) {  //判断是否已经登陆
	console.log("signin "+req.session.logged_in);
	if (!req.session.logged_in) {
	    console.log("not login");
		Notlogin(req, res)
	} else {
		loggedIn(req, res)
	}
}

module.exports.logout = function(req, res) {  //登出重新返回登陆页面
	req.session.logged_in = 0;
	res.render('signin.ejs', {
		errorInfo:'Please input your username and password:'
	})
}

module.exports.checkinfo = function (req, res) {  //注册URL解析器 ,登陆处理
	console.log("check password");
	console.log(req.body.username);
	console.log(req.body.password);
	var testuser = {
		username:req.body.username,
		password:req.body.password,
	}
	//console.log(testuser);
			
	User.find(testuser, function (err, detail) {   //从数据库中查找是否有该username和对应的密码，有则存入detail数组
		//console.log(detail);
		//console.log(detail.length);
		if (detail.length) {
			signinCheckSuccess(detail, req, res)
		} else {
			console.log("wrong!");
			errorInfo = "Wrong username or wrong password!";
			res.render('signin.ejs',{
				errorInfo:errorInfo
			})
		}
	})
}

module.exports.registProcess = function(req, res) {  //注册处理
	console.log("Data from submit form");
	var user = new User({
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		username:req.body.username,
		password:req.body.password,
		email:req.body.email
	})
	console.log(user);
	var rule = {one:1,two:1,three:1,four:1};
	errorInfo = "";
	dealWithDataSubmited(user, rule, req, res);  
}


function dealWithDataSubmited (user, rule, req, res) {  //验证注册提交的表单，没问题则存入数据库
	if (!(rule.one&&rule.two&&rule.three&&rule.four)) {
		repreload(res);
	} else {
		req.session.username = user.username;
		req.session.logged_in = 1;
		user.save(function(err) {               //存入数据库
			if (err) {
				console.log(err);
                res.render('signin.ejs', {errorInfo: "please try again"})
			}
			console.log('save successfully');
            console.log(user.username + " has been added");
            res.render('signin.ejs', {errorInfo: "please login"})
		})
	}
}



function Notlogin(req, res) {                //如果没有登陆则跳到登陆界面，如果req中有正确的username（？username=...），则直接登陆
	if (req.body.username == undefined) {
		console.log("Not login :initial page");
		res.render('signin.ejs', {
			errorInfo:'Please input your username and password:'
		})
	} else {
		var username = req.body.username.toString();
		if(req.body.password == undefined){
			errorInfo = "Wrong username or wrong password!";
			res.render('signin.ejs',{
				errorInfo:errorInfo
			})
		}else{
		var password = req.body.password.toString();
		var testuser = {
				username:username,
				password:password,
			}
		console.log(testuser);
		User.find(testuser, function (err, detail) {   //从数据库中查找是否有该username和对应的密码，有则存入detail数组
			if (detail.length) {
				console.log("find user: " +  username);
				//showInfo(detail[0], res);
				req.session.logged_in = 1;
				req.session.username = detail[0].username;

				// set res of login here!

                res.cookie('login', username, {maxAge: 5*60*1000});
                res.render('main.ejs', {username: username});
			} else {
				console.log("wrong!");
				errorInfo = "Wrong username or wrong password!";
				res.render('signin.ejs',{
					errorInfo:errorInfo
				})
			}
		})
		
	  }
	}
}


function loggedIn(req, res) {             //如果已经登陆，或req中有已登陆的username，则显示登录后页面；req中有非登陆用户的username，则提示不能显示其他用户的信息
	console.log("loggen in");
	if (req.body.username == undefined) {
		findJson(req.session.username, res);
	} else {
		var username = req.body.username.toString();
		console.log( username);
		if (username != req.session.username) {
			var testUsername = {username:req.session.username};
            res.render('signin.ejs',{errorInfo:"you can'e check others' info"})
		} else {
			var testUsername = {username:req.session.username};
			res.cookie('login', testUsername, {maxAge: 5*60*1000});
            res.render('main.ejs', {username: testUsername});
		}
	}
}

function findJson(name, res) {// user的find方法：将传进去的名字转化为json格式之后，访问数据库,逻辑处理,渲染页面
	console.log("find json")
	var testUsername = {username:name};
	User.find(testUsername,function (err, userDetail) {
		if (userDetail.length == 0) {
			console.log(userDetail);
			res.render('index.ejs', {
				errorInfo:'Please input your information:'
			});

		} else {
			console.log(userDetail);
			console.log("Load user: " + name);
			console.log(userDetail[0]);
			//showInfo(userDetail[0], res);
            res.cookie('login', name, {maxAge: 5*60*1000});
            res.render('main.ejs', {username: name});
		}
	})
}

function signinCheckSuccess(detail, req, res) {  //登陆成功后的操作，提取数据库中用户的具体数据
	var userInDatabase = {
		username:detail[0].username,
		firstname:detail[0].firstname,
		lastname:detail[0].lastname,
		email:detail[0].email
	}
	console.log("user in database :");
	console.log(userInDatabase);
	req.session.logged_in = 1;
	req.session.username = req.body.username;
	//showInfo(userInDatabase, res);              //提取数据后显示数据
    res.cookie('login', req.body.username, {maxAge: 5*60*1000});
    res.render('main.ejs', {username: req.body.username});
}


// function infoPage(res, userDetail, errorInfoDetail) {  //显示信息页面
// 	res.render('info.ejs', {
// 		username:userDetail[0].username,
// 		firstname:userDetail[0].firstname,
// 		lastname:userDetail[0].lastname,
// 		email:userDetail[0].email,
// 		errorInfo:errorInfoDetail
// 	})
// }
//
// function showInfo(user, res) {  //show the detail information
// 	res.render('info.ejs', {
// 		username:user.username,
// 		firstname:user.firstname,
// 		lastname:user.lastname,
// 		email:user.email,
// 		errorInfo:'User detail：'
// 	});
// }


function repreload(res) {   //return to the sign in page
	res.render('index.ejs',{
		errorInfo:errorInfo
	})
}