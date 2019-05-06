google.charts.load('current', { 'packages': ['corechart', 'bar'] });
google.charts.load('current', { 'packages': ['bar'] });
google.charts.load('current', { 'packages': ['table'] });

// document.ready
$(document).ready(function () {
    //this is for overall analysis - article
    $("#searchButton").on('click', function (e) {
        var parameter = {
            "top": $('#top').val(),
            "range": $('#range').val()
        };
        var jqxhr = $.get('/modifytimes', parameter);

        jqxhr.done(function (result) {
            //$('#ModifyTimeResult').html(result.name + " " + result.top + " " + result.range);

            var output = "";
            for(let i=0; i<$('#range').val(); i++){
                j = i + 1;
                output = output + j + ". " + result.topRevision[i]._id + "<br>";
            }

            $('#ModifyTimeResult').html('the result of query is:\n' + '<br>' +
                output
            );
        });
        jqxhr.fail(function (result) {
            $('#ModifyTimeResult').html("res status: " + jqxhr.status);
            //console.log(result);
        });
    });

    //this is for overall analysis - user range
    $("#userRange").on('click', function (e) {
        var parameter = {
            "userOrder": $('#userOrder').val()
        };
        var jqxhr = $.get('/usernum', parameter);

        jqxhr.done(function (result) {
            var output = "";
            output = output + result.userNum[0]._id;
            // console.log(output);
            $('#UserNumResult').html('the result of query is: ' +
                output
            );
        });
        jqxhr.fail(function (result) {
            $('#ModifyTimeResult').html("res status: " + jqxhr.status);
            //console.log(result);
        });
    });

    //this is for overall analysis - history
    $("#hisOrderButton").on('click', function (e) {
        var parameter = {
            "hisOrder": $('#hisOrder').val()
        };
        var jqxhr = $.get('/history', parameter);

        jqxhr.done(function (result) {
            var output = "";
            output = output + result.history[0]._id;
            // console.log(output);
            $('#HistoryResult').html('the result of query is: ' +
                output
            );
        });
        jqxhr.fail(function (result) {
            $('#HistoryResult').html("res status: " + jqxhr.status);
            //console.log(result);
        });
    });

    //this is for drawing bar chart
    $("#YearUserBarChart").on('click', function (e) {
        var jqxhr = $.get('/YearUserBarChartData');

        jqxhr.done(function (result) {
           //result is query output
            var rawData = {};
            result.forEach(function (element) {
                if (!rawData[element.year]) {
                    rawData[element.year] = {};
                }
                rawData[element.year][element.type] = element.number;
            });

            var chartData = [['Year', 'admin', 'anon', 'bot', 'regular']];
            for (var row in rawData) {
                var chartRow = [row];
                chartRow.push(rawData[row].admin);
                chartRow.push(rawData[row].anon);
                chartRow.push(rawData[row].bot);
                chartRow.push(rawData[row].regular);
                chartData.push(chartRow);
            }

            var data = google.visualization.arrayToDataTable(chartData);
            console.log(data);
            var options = {
                'width': 900,
                'height': 300,
                'title': 'bar chart showing overall yearly revision number distribution',
                hAxis: {
                    title: 'years'
                }
            };
            var chart = new google.visualization.ColumnChart(document.getElementById('overallBarChart'));
            chart.draw(data, options);
        });

        jqxhr.fail(function (result) {
            $('#ModifyTimeResult').html("res status: " + jqxhr.status);
        });
    });

    // this is for drawing pie chart
    $("#UserPieChart").on('click', function (e) {
        var jqxhr = $.get('/UserRangePieChart');

        jqxhr.done(function (result) {
            //result is query output
            var dataArray = [['user type', 'revision number']];
            result.forEach(function (element) {
                if (element.type == "no") {
                    return;
                }
                var data = [element.type, element.number];
                dataArray.push(data);
            });

            var data = google.visualization.arrayToDataTable(dataArray);
            var options = {
                title: 'Revision distribution and by user type',
                'width': 900,
                'height': 400
            };

            var chart = new google.visualization.PieChart(document.getElementById('overallBarChart'));
            chart.draw(data, options);
        });

        jqxhr.fail(function (result) {
            $('#ModifyTimeResult').html("res status: " + jqxhr.status);
        });
    });

    //get all titles and put into DataList
    $("#individualTrigger").on('click', function (e) { //tagName is the navigation tag
        var jqxhr = $.get('/getIndividual');

        jqxhr.done(function (result) {
            var local = "";
            var testData = "";


            for (var i = 0; i<result.revision21.length;i++){
                local = local + "<option value=\"" + result.revision21[i]._id + "," + "No: " + result.revision21[i].total + "\"/>"
                    + result.revision21[i]._id + "," + "No:" + result.revision21[i].total + "</option>"
            }
            testData = local;
            $('#browsers1').html(testData);
        });
        jqxhr.fail(function (result) {
            $('#browsers1').html("res status: " + jqxhr.status);
        });
    });

    // Ajax send title and get top 5
    $("#selectTitle").on('click', function (e) {
        var titleNumber = $('#browserValue').val();
        console.log(titleNumber);
        var k = titleNumber.split(',');
        console.log(k[0]);

        var parameter = {
            "selectedTitle": k[0]
        };
        var jqxhr = $.get('/IndividualTitleInfo', parameter);

        jqxhr.done(function (result) {
            var local = "  <tr>\n" +
                " <th>Top</th>   <th>User Name</th>\n" +
                "    <th>Revision number</th>\n" +
                "  </tr>";
            var output = "";

            //loop
            for (var i = 0; i<result.revision22.length;i++){
                local = local + "<tr><td>T"+(i+1)+"</td><td>"+result.revision22[i]._id+"</td><td>"+result.revision22[i].total+"</td></tr>";
            }
            output = local;
            $('#title').html(k[0]);
            $('#totalNum').html(k[1]);
            $('#authorTable').html(output);
        });
        jqxhr.fail(function (result) {
            $('#errorCheck').html("res status: " + jqxhr.status);
        });
    });

    //for drawing individual bar chart
    $("#selectBarChartTypeByTitle").on('click', function (e) {
        var parameter = {
            "title": $('#title').html()
        };

        var jqxhr = $.get('/getIndividualBarChartData', parameter);

        jqxhr.done(function (result) {
            //result is query output
            var rawData = {};
            result.forEach(function (element) {
                if (!rawData[element.year]) {
                    rawData[element.year] = {};
                }
                rawData[element.year][element.type] = element.number;
            });

            var chartData = [['Year', 'admin', 'anon', 'bot', 'regular']];
            for (var row in rawData) {
                var chartRow = [row];
                chartRow.push(rawData[row].admin);
                chartRow.push(rawData[row].anon);
                chartRow.push(rawData[row].bot);
                chartRow.push(rawData[row].regular);
                chartData.push(chartRow);
            }
            var data = google.visualization.arrayToDataTable(chartData);

            var options = {
                'width': 900,
                'height': 300,
                'title': 'bar chart showing yearly revision number distribution',
                hAxis: {
                    title: 'years'
                }
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('BarChartTypeByTitleResult'));
            chart.draw(data, options);
        });

        jqxhr.fail(function (result) {
            $('#ModifyTimeResult').html("res status: " + jqxhr.status);
        });
    });

    //for drawing individual pie chart
    $("#selectPieChartTypeByTitle").on('click', function (e) {
        var parameter = {
            "title": $('#title').html()
        };

        var jqxhr = $.get('/getIndividualPieChartData', parameter);

        jqxhr.done(function (result) {
            //result is query output
            var dataArray = [['user type', 'revision number']];

            result.forEach(function (element) {
                if (element.type == "no") {
                    return;
                }
                var data = [element.type, element.number];
                dataArray.push(data);
            });

            var data = google.visualization.arrayToDataTable(dataArray);
            var options = {
                title: 'Pie chart showing user type distribution',
                'width': 900,
                'height': 300
            };
            var chart = new google.visualization.PieChart(document.getElementById('PieChartTypeByTitleResult'));
            chart.draw(data, options);
        });

        jqxhr.fail(function (result) {
            $('#ModifyTimeResult').html("res status: " + jqxhr.status);
        });
    });

    //for drawing bar chart for selected number users
    $("#selectChartTypeByTopUserAndTitle").on('click', function (e) {
        var parameter = {
            "title": $('#title').html(),
            "number": $('#TopUserNumber').val()
        };

        var jqxhr = $.get('/getIndividualBarChartDataWithNum', parameter);

        jqxhr.done(function (result) {
            //result is query output
            var dataArray = [['Year', 'Number of revisions']];
            result.forEach(function (element) {
                var data = [element._id, element.number];
                dataArray.push(data);
            });
            var data = google.visualization.arrayToDataTable(dataArray);

            var options = {
                'width': 900,
                'height': 300,
                'title': 'specific number of users yearly revision distribution',
                hAxis: {
                    title: 'year'
                }
            };
            var chart = new google.visualization.ColumnChart(document.getElementById('singleUserBarChartResult'));
            chart.draw(data, options);
        });

        jqxhr.fail(function (result) {
            $('#ModifyTimeResult').html("res status: " + jqxhr.status);
        });
    });

    //get total author name
    $("#authorTrigger").on('click', function (e) {
        var jqxhr = $.get('/getAuthorName');

        jqxhr.done(function (result) {
            var local = "";

            for (var i = 0; i<result.revision30.length;i++){
                local = local + "<option value=\"" + result.revision30[i] + "\"/>"
                    + result.revision30[i] +"</option>"
            }
            $('#browsers3').html(local);
        });

        jqxhr.fail(function (result) {
            $('#browsers3').html("res status: " + jqxhr.status);
        });
    });

    // Ajax send title and get top 5
    $("#AuthorNameButton").on('click', function (e) {
        var tmpAuthorName = $('#AuthorNameInput').val();

        var parameter = {
            "selectedAuthor": tmpAuthorName
        };
        var jqxhr = $.get('/AuthorNameUrl', parameter);//here!!!!!!!!!!!!!!!

        jqxhr.done(function (result) {
            var local = "  <tr>\n" +
                " <th>Top</th>   <th>Article Title</th>\n" +
                "    <th>TotalRevisionNumber</th><th>Selected--</th>\n" +
                "  </tr>";

            //loop
            for (var i = 0; i<result.revision31.length;i++){
                local = local + "<tr><td>T"+(i+1)+"</td><td>"+result.revision31[i]._id+"</td><td>"+result.revision31[i].total+
                    "</td><td>"+
                    "<input type=\"radio\" name=\"chooseUserRadio\" id=\"chooseUserRadio\"value=\""+result.revision31[i]._id+"\" />"+
                    "</td></tr>";
            }

            $('#authorTableByName').html(local);
        });
        jqxhr.fail(function (result) {
            $('#authorTableByName').html("res status: " + jqxhr.status);
        });
    });

    // click the detail button, send user name, get all revision he/she did
    $("#searchMoreInfoButton").on('click', function (e) {
        var tmpAuthorName = $('#AuthorNameInput').val();
        var tmpTitleName = $('#chooseUserRadio:checked').val();

        console.log(tmpAuthorName);
        console.log(tmpTitleName);
        var parameter = {
            "selectedAuthor": tmpAuthorName,
            "selectedTitle": tmpTitleName
        };
        var jqxhr = $.get('/AuthorNameAndTitleUrl', parameter);

        jqxhr.done(function (result) {
            var local = "<select>";
            var output;
            //loop
            for (var i = 0; i<result.revision32.length;i++){
                local = local + "<option>No"+(i+1)+" ||  Revid: "+result.revision32[i].revid+" ||  Time: "+result.revision32[i].timestamp+"</option>";
            }
            output = local+"</select>";
            $('#SelectedArticleTitle').html("Time Info of: "+tmpTitleName);
            $('#divByNameAndTitle').html(output);
        });
        jqxhr.fail(function (result) {
            $('#divByNameAndTitle').html("res status: " + jqxhr.status);
        });
    });
});