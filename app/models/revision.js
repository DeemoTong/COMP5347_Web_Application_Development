/**
 * Revision schema and model
 *
 */

var mongoose = require('./db');
var fs = require('fs');

var admin = fs.readFileSync(__dirname + '/../../public/Admin.txt').toString().split("\n");
var bot = fs.readFileSync(__dirname + '/../../public/Bot.txt').toString().split("\n");
var adminAndBot = admin.concat(bot);

var RevisionSchema = new mongoose.Schema({
    title: String,
    timestamp: String,
    anon: String,
    revid: String,
    user: String,
    type: String
}, {
    versionKey: false
});

// overall: find highest and lowest records
RevisionSchema.statics.modifyTimes = function (order, number, callback) {
    console.log("in revision.js, order: " + order + ", number: " + number);

    return this.aggregate([{
            $group: {
                _id: "$title",
                numOfRevisions: {
                    $sum: 1
                }
            }
        }, //order=-1 descending
        {
            $sort: {
                numOfRevisions: order
            }
        },
        {
            $limit: number
        } //output number
    ]).exec(callback);
};

// overall: find the article with largest and smallest user number
RevisionSchema.statics.userNumber = function (userOrder, callback) {
    console.log("in revision.js, userOrder: " + userOrder)

    return this.aggregate([{
            $match: {
                'anon': {
                    $exists: false
                },
                'user': {
                    '$nin': adminAndBot
                }
            }
        },
        {
            $group: {
                _id: {
                    title: "$title",
                    user: "$user"
                }
            }
        },
        {
            $group: {
                _id: "$_id.title",
                numOfUser: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                numOfUser: userOrder
            }
        },
        {
            $limit: 1
        }
    ]).exec(callback);
};

// overall: find the article with largest and shortest history
RevisionSchema.statics.history = function (hisOrder, callback) {
    console.log("in revision.js, hisOrder: " + hisOrder)

    return this.aggregate([{
            $group: {
                _id: "$title",
                timestamp: {
                    "$min": "$timestamp"
                }
            }
        },
        {
            $sort: {
                timestamp: hisOrder
            }
        },
        {
            $limit: 1
        }
    ]).exec(callback);
};

//get data for drawing overall bar chart
RevisionSchema.statics.overallBarChart = function (callback) {
    return this.aggregate([{
            $project: {
                year: {
                    $substr: ["$timestamp", 0, 4]
                },
                type: "$type"
            }
        },
        {
            $group: {
                _id: {
                    year: "$year",
                    type: "$type"
                },
                number: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                year: "$_id.year",
                type: "$_id.type",
                number: "$number"
            }
        },
        {
            $sort: {
                "year": 1
            }
        },
    ]).exec(callback)
}


//get data for drawing overall pie chart
RevisionSchema.statics.overallPieChart = function (callback) {
    return this.aggregate([{
            $group: {
                _id: "$type",
                number: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                type: "$_id",
                number: "$number"
            }
        },
    ]).exec(callback)
}

RevisionSchema.statics.findTopFewUser = function (selectTitleName, userNumber, callback) {

    return this.aggregate([{
            $match: {
                'title': selectTitleName,
                timestamp: {
                    $gt: "2016-01-01T00:00:00Z",
                    $lt: "2017-01-01T00:00:00Z"
                }
            }
        },
        {
            $group: {
                _id: "$user",
                total: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                total: -1
            }
        },
        {
            $limit: Number(userNumber)
        }
    ]).exec(callback)
}

RevisionSchema.statics.findTopUserFromTitle = function (selectedTitle, callback) {

    return this.aggregate([{
            $match: {
                title: selectedTitle
            }
        },
        {
            $group: {
                _id: "$user",
                total: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                total: -1
            }
        },
        {
            $limit: Number(5)
        }
    ]).exec(callback)
}

RevisionSchema.statics.findTotalTitle = function (callback) {

    return this.aggregate([{
            $group: {
                _id: "$title",
                total: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                total: -1
            }
        }
    ]).exec(callback)
}

RevisionSchema.statics.IndiBarChart = function (title, callback) {
    return this.aggregate([{
            $match: {
                "title": title
            }
        },
        {
            $project: {
                year: {
                    $substr: ["$timestamp", 0, 4]
                },
                type: "$type"
            }
        },
        {
            $group: {
                _id: {
                    year: "$year",
                    type: "$type"
                },
                number: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                year: "$_id.year",
                type: "$_id.type",
                number: "$number"
            }
        },
        {
            $sort: {
                "year": 1
            }
        },
    ]).exec(callback)
}

RevisionSchema.statics.IndiPieChart = function (title, callback) {
    return this.aggregate([{
            $match: {
                "title": title
            }
        },
        {
            $group: {
                _id: "$type",
                number: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                type: "$_id",
                number: "$number"
            }
        },
    ]).exec(callback)
}

RevisionSchema.statics.getTopUsers = function (title, num, callback) {
    return this.aggregate([{
            $match: {
                "title": title
            }
        },
        {
            $group: {
                _id: "$user",
                numOfRevisions: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                numOfRevisions: -1
            }
        },
        {
            $limit: Number(num)
        }
    ]).exec(callback)
}

RevisionSchema.statics.IndiBarChartNum = function (title, userlist, callback) {
    return this.aggregate([{
            $match: {
                "title": title,
                "user": {
                    '$in': userlist
                }
            }
        },
        {
            $project: {
                year: {
                    $substr: ["$timestamp", 0, 4]
                },
            }
        },
        {
            $group: {
                _id: "$year",
                number: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                "_id": 1
            }
        },
    ]).exec(callback)
}

RevisionSchema.statics.findTotalAuthor = function (callback) {
    return this.distinct("user").exec(callback)
}

RevisionSchema.statics.findWholeArticleByAuthor = function (selectedAuthor, callback) {
    return this.aggregate([{
            $match: {
                user: selectedAuthor
            }
        },
        {
            $group: {
                _id: "$title",
                total: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                total: -1
            }
        }
    ]).exec(callback)
}

RevisionSchema.statics.findWholeArticleByAuthorAndTitle = function (selectedAuthor, selectedTitle, callback) {
    return this.find({
        user: selectedAuthor,
        title: selectedTitle
    }, {
        "timestamp": 1,
        "revid": 1
    }).sort({
        "timestamp": -1
    }).exec(callback)

}


var Revision = mongoose.model('Revision', RevisionSchema, 'revisions')

module.exports = Revision