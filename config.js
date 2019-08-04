var mongojs = require('mongojs');
var db = mongojs('mongodb://127.0.0.1:27017/mvpdb');
var dbname = {
   "mvp_industries":db.industries,
   "mvp_companySize":db.companysize,
   "mvp_problems":db.problems,
   "mvp_cities":db.cities,
   "mvp_locations":db.locations,
   "mvp_organizations":db.organizations,
   "mvp_users":db.users,
   "mvp_kpi":db.kpi,
   "mvp_kpivalue":db.kpivalue,
   "mvp_survey":db.survey,
   "mvp_question":db.question,
   "mvp_answer":db.answer,
   "mvp_opinionfeed":db.opinionfeed,
   "mvp_channelGroup":db.channelGroup,
   "mvp_channel":db.channel,
   "mvp_endpoints":db.endpoints,
   "mvp_publishSurvey":db.publishSurvey
};

var PORT = 8443;
var uploadPath = '/var/www/html/mvpuploads/';
var imageUrl = 'http://localhost/mvpuploads/';

var timezone = 'Asia/Kolkata';
var timeformat = "yyyy-mm-dd HH:MM:ss";
var dateformat = "yyyy-mm-dd";
var lan = 'en-US';
module.exports.dbname = dbname;
module.exports.db = db;
module.exports.timezone = timezone;
module.exports.timeformat = timeformat;
module.exports.dateformat = dateformat;
module.exports.lan = lan;
module.exports.uploadPath = uploadPath;
module.exports.imageUrl = imageUrl;
module.exports.mongojs = mongojs;
module.exports.PORT = PORT;