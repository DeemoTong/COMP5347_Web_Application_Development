/* this is the controller for overall analytics
 * input:
 *
 */
var express = require('express');
var Revision = require("../models/revision")

var fs = require('fs');


module.exports.showModifyTimes = function (req, res) {
    if (req.cookies.login){
        var outputData = {};
        var order = parseInt(req.query.top);
        var range = parseInt(req.query.range);
        console.log("controller order: " + order + ", number: " + range);

        Revision.modifyTimes(order, range, function(err, result){
            if (err){
                console.log(err);
                console.log("showModifyTimes Aggregation Error");
                outputData = result;
                res.jsonp({topRevision: outputData});
            }else{
                outputData = result;
                res.jsonp({topRevision: outputData});
            }
        });
    }else {
        res.render('signin.ejs');
        //console.log("overall");
    }
}

module.exports.showUserNum = function (req, res) {
    if (req.cookies.login){
        var outputData = {};
        var userOrder = parseInt(req.query.userOrder);
        console.log("controller userOrder: " + userOrder);

        Revision.userNumber(userOrder, function(err, result){
            if (err){
                console.log(err);
                console.log("showUserNum Aggregation Error");
                outputData = result;
                res.jsonp({userNum: outputData});
            }else{
                outputData = result;
                res.jsonp({userNum: outputData});
            }
        });
    }else {
        res.render('signin.ejs');
        //console.log("overall");
    }
}

module.exports.showHistory = function (req, res) {
    if (req.cookies.login){
        var outputData = {};
        var hisOrder = parseInt(req.query.hisOrder);
        console.log("controller hisOrder: " + hisOrder);

        Revision.history(hisOrder, function(err, result){
            if (err){
                console.log(err);
                console.log("showHistory Aggregation Error");
                outputData = result;
                res.jsonp({history: outputData});
            }else{
                outputData = result;
                res.jsonp({history: outputData});
            }
        });
    }else {
        res.render('signin.ejs');
    }
}

module.exports.overallBar = function (req, res){
    if (req.cookies.login){
        console.log("controller overallBar");
        //bar chart data
        Revision.overallBarChart(function(err, result){
            if (err){
                console.log(err);
                console.log("overallBarChart Aggregation Error");
                console.log(result);
                return result;
            }else{
                //console.log(result);
                res.jsonp(result);
            }
        });
    }else {
        res.render('signin.ejs');
    }
}

module.exports.overallPie = function (req, res){
    if (req.cookies.login){
        console.log("controller overallPie");

        //pie chart data
        Revision.overallPieChart(function(err, result){
            if (err){
                console.log(err);
                console.log("overallPieChart Aggregation Error");
                console.log(result);
                return result;
            }else{
                //console.log(result);
                res.jsonp(result);
            }
        });
    }else {
        res.render('signin.ejs');
    }
}


module.exports.indiBarChartC = function (req, res){
    if (req.cookies.login){
        console.log("controller indiBarChart");
        var title = req.query.title;

        //pie chart data
        Revision.IndiBarChart(title, function(err, result){
            if (err){
                console.log(err);
                console.log("indiBarChart Aggregation Error");
                console.log(result);
                return result;
            }else{
                console.log("indiBarChart");
                console.log(result);
                res.jsonp(result);
            }
        });
    }else {
        res.render('signin.ejs');
    }
}


module.exports.indiPieChartC = function (req, res){
    if (req.cookies.login){
        console.log("controller indiPieChartC");
        var title = req.query.title;

        //pie chart data
        Revision.IndiPieChart(title, function(err, result){
            if (err){
                console.log(err);
                console.log("indiPieChart Aggregation Error");
                console.log(result);
                return result;
            }else{
                console.log("indiPieChart");
                console.log(result);
                res.jsonp(result);
            }
        });
    }else {
        res.render('signin.ejs');
    }
}

module.exports.indiBarChartCNum = function (req, res){
    if (req.cookies.login){
        console.log("controller indiBarChartCNum");
        var title = req.query.title;
        var number = req.query.number;

        //pie chart data
        Revision.getTopUsers(title, number, function(err, result){
            if (err){
                console.log(err);
                console.log("getTopUsers Aggregation Error");
                console.log(result);
                return result;
            }else{
                console.log("getTopUsers");
                console.log(result);

                var userList = [];
                result.forEach(function(element){
                    userList.push(element._id);
                });

                Revision.IndiBarChartNum(title, userList, function (err, result) {
                    if(err){
                        console.log(err);
                        console.log("IndiBarChartNum Aggregation Error");
                        console.log(result);
                        return result;
                    }else{
                        console.log("IndiBarChartNum");
                        console.log(result);
                        res.jsonp(result);
                    }
                });
            }
        });
    }else {
        res.render('signin.ejs');
    }
}


module.exports.getAuthorName=function(req,res){
    Revision.findTotalAuthor(function(err,result){
        if (err){
            console.log("controller findOneTitle" + err);
        }else{
            console.log(result);
            res.jsonp({revision30:result});
        }
    })
}

module.exports.AuthorNameUrl=function(req,res){
    var selectedAuthor = req.query.selectedAuthor;

    Revision.findWholeArticleByAuthor(selectedAuthor,function(err,result){
        if (err){
            console.log("controller findOneTitle" + err);
        }else{
            console.log(result);
            res.jsonp({revision31:result});
        }
    })
}


module.exports.AuthorNameAndTitleUrl=function(req,res){
    var selectedAuthor = req.query.selectedAuthor;
    var selectedTitle = req.query.selectedTitle;

    Revision.findWholeArticleByAuthorAndTitle(selectedAuthor,selectedTitle,function(err,result){
        if (err){
            console.log("controller findOneTitle" + err);
        }else{
            console.log(result);
            res.jsonp({revision32:result});
        }
    })
}