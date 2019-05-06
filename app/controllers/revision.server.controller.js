var Revision = require("../models/revision")

module.exports.showTitleForm=function(req,res){
	res.render("individualPart.ejs")
}

module.exports.getIndividual=function(req,res){

	Revision.findTotalTitle(function(err,result){
		if (err){
			console.log("controller findTotalTitle" + err);
		}else{
            console.log(result);
			revision21 = result;
            res.jsonp({revision21:revision21});
		}	
	})
}


module.exports.IndividualTitleInfo=function(req,res){
    var selectedTitle = req.query.selectedTitle;
	var revision22;

    Revision.findTopUserFromTitle(selectedTitle,function(err,result){
        if (err){
            console.log("controller findOneTitle" + err);
        }else{
            console.log(result);
            revision22 = result;
            res.jsonp({revision22:revision22});
        }
    })
}


module.exports.TopFewUser=function(req,res){
    var userNumber = req.query.selectChartTypeByTopUserAndTitle;

    var selectTitleName = req.query.selectTitleName;

    var revision33;
    var result;//json
    Revision.findTopFewUser(selectTitleName,userNumber,function(err,result){
        if (err){
            console.log("controller findFewUserByTitle" + err);
        }else{
            console.log(result);
            revision33 = result;
            res.jsonp({revision33:revision33});
        }
    })
}