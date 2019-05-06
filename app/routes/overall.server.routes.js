/* this is the router for overall analytics
 *
 * input: urls
 *
 * output: direct to appropriate controller
 *
 * @author Mengyu LYU, 11st, MAY, 2018
 */

var express = require('express');
var controller = require('../controllers/overall.server.controller');
var login = require('../controllers/user.server.controller');
var individualController = require('../controllers/revision.server.controller')
var router = express.Router();


//kylin
router.get('/', login.signin);
router.post('/login', login.checkinfo);
router.post('/register', login.registProcess);


//stone
router.get('/modifytimes', controller.showModifyTimes);
router.get('/usernum', controller.showUserNum);
router.get('/history', controller.showHistory);
router.get('/YearUserBarChartData', controller.overallBar);
router.get('/UserRangePieChart', controller.overallPie);

//kyle
router.get('/',individualController.showTitleForm)
router.get('/getIndividual',individualController.getIndividual)
router.get('/IndividualTitleInfo',individualController.IndividualTitleInfo)
router.get('/TopFewUser',individualController.TopFewUser)
router.get('/getIndividualBarChartData', controller.indiBarChartC)
router.get('/getIndividualPieChartData', controller.indiPieChartC)
router.get('/getIndividualBarChartDataWithNum', controller.indiBarChartCNum)
router.get('/getAuthorName', controller.getAuthorName)
router.get('/AuthorNameUrl', controller.AuthorNameUrl)
router.get('/AuthorNameAndTitleUrl', controller.AuthorNameAndTitleUrl)


module.exports = router;