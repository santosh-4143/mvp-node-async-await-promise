var express = require('express');
var router = express.Router();
var config = require('../config.js');
var dateFormat = require('dateformat');
var in_array = require('in_array');
var uuid = require('uuid');
console.log("WEB ROUTER");



router.post('/addLocations', function (req, res) {
    console.log("/addLocations");
    if (req.body.organizationId === undefined || req.body.name === undefined || req.body.city === undefined || req.body.postcode === undefined) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {
        var data = {"organizationId":req.body.organizationId,"name":req.body.name,"city":req.body.city,"postcode":req.body.postcode,"isDelete":"0"};
        config.dbname.mvp_locations.insert(data, function (err, success) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1001, 'errorMessage': 'Something went wrong'});
            } else {

                res.json({"error": 0, "errorCode": 0, "successMessage": "successfully added Locations"});
            }
        });

    }
});


router.post('/addOrganizations', function (req, res) {
    if (req.body.name === undefined || req.body.industry === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {
        var auth = uuid.v1()
        var currentTime = dateFormat(new Date().toLocaleString(config.lan, {timeZone: config.timezone}), config.timeformat);
        var data = {"name":req.body.name,"industry":req.body.industry,"APIKey":auth,"created_at":currentTime,"isDelete":"0"};
        config.dbname.mvp_organizations.insert(data, function (err, success) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {

                res.json({"error": 0, "errorCode": 0, "successMessage": "successfully added Organizations"});
            }
        });

    }
});


router.post('/addUsers', function (req, res) {
    if (req.body.organizationId === undefined || req.body.username === undefined || req.body.password === undefined || req.body.email === undefined || req.body.rights === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {
        var auth = uuid.v1()
        var currentTime = dateFormat(new Date().toLocaleString(config.lan, {timeZone: config.timezone}), config.timeformat);
        var data = {"organizationId":req.body.organizationId,"username":req.body.username,"password":req.body.password,"email":req.body.email,"rights":req.body.rights,"created_at":currentTime,"isDelete":"0"};
        config.dbname.mvp_users.insert(data, function (err, success) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {

                res.json({"error": 0, "errorCode": 0, "successMessage": "successfully added user"});
            }
        });

    }
});



router.post('/addKpi', function (req, res) {
    if (req.body.organizationId === undefined || req.body.name === undefined || req.body.state === undefined || req.body.chart_type === undefined || req.body.aggregation === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {
        var data = {"organizationId":req.body.organizationId,"name":req.body.name,"state":req.body.state,"chart_type":req.body.chart_type,"aggregation":req.body.aggregation,"isDelete":"0"};
        config.dbname.mvp_kpi.insert(data, function (err, success) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {

                res.json({"error": 0, "errorCode": 0, "successMessage": "successfully added KPI"});
            }
        });

    }
});


router.post('/getKpi', function (req, res) {
    if (req.body.organizationId === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {

        config.dbname.mvp_kpi.find({"isDelete": "0","organizationId":req.body.organizationId}, {"_id": 0, "name": 1,"state":1,"chart_type":1,"aggregation":1}, function (err, docs) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {            
                res.json({'error': 0, 'errorCode': 0, 'errorMessage': 'None', 'response': docs});
            }
        })

    }
});


router.post('/addKpiValue', function (req, res) {
    if (req.body.kpiid === undefined || req.body.lable === undefined || req.body.value === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {
        var data = {"kpiid":req.body.kpiid,"lable":req.body.lable,"value":req.body.value,"isDelete":"0"};
        config.dbname.mvp_kpivalue.insert(data, function (err, success) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {

                res.json({"error": 0, "errorCode": 0, "successMessage": "successfully added KPIVALUE"});
            }
        });

    }
});



router.post('/getKpiValue', function (req, res) {
    if (req.body.kpiid === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {

        config.dbname.mvp_kpivalue.find({"isDelete": "0","kpiid":req.body.kpiid}, {"_id": 0, "kpiid": 1,"lable":1,"value":1}, function (err, docs) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {            
                res.json({'error': 0, 'errorCode': 0, 'errorMessage': 'None', 'response': docs});
            }
        })

    }
});

router.post('/addChannelGroup', function (req, res) {
    if (req.body.organizationId === undefined || req.body.name === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {
        var data = {"organizationId":req.body.organizationId,"name":req.body.name,"isDelete":"0"};
        config.dbname.mvp_channelGroup.insert(data, function (err, success) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {

                res.json({"error": 0, "errorCode": 0, "successMessage": "successfully added Channel Group"});
            }
        });

    }
});

router.post('/addChannel', function (req, res) {
    if (req.body.organizationId === undefined || req.body.channelGroupId === undefined || req.body.name === undefined || req.body.type === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {
        var data = {"organizationId":req.body.organizationId,"name":req.body.name,"channelGroupId":req.body.channelGroupId,"type":req.body.type,"isDelete":"0"};
        config.dbname.mvp_channel.insert(data, function (err, success) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {

                res.json({"error": 0, "errorCode": 0, "successMessage": "successfully added Channel"});
            }
        });

    }
});


router.post('/addSurvey', function (req, res) { 
    if (req.body.organizationId === undefined || req.body.title === undefined 
        || req.body.display_logo === undefined || req.body.question_timeout === undefined
        || req.body.final_screen_timeout === undefined || req.body.screen_orientation === undefined
        || req.body.welcome_screen_media === undefined || req.body.welcome_screen_message === undefined 
        || req.body.final_screen_message === undefined 
        || req.body.image_list === undefined 
        || req.body.video_url === undefined  || req.body.created_by === undefined ) {   
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
} else {
   var currentTime = dateFormat(new Date().toLocaleString(config.lan, {timeZone: config.timezone}), config.timeformat);
   var data = {
     "organizationId":req.body.organizationId,"title":req.body.title,
     "display_logo":req.body.display_logo,"question_timeout":req.body.question_timeout,
     "final_screen_timeout":req.body.final_screen_timeout,"screen_orientation":req.body.screen_orientation,
     "welcome_screen_media":req.body.welcome_screen_media,"welcome_screen_message":req.body.welcome_screen_message,
     "final_screen_message":req.body.final_screen_message,"state":"New",
     "feedback_count":"0","number_of_questions":"0",
     "image_list":req.body.image_list,"video_url":req.body.video_url,
     "created_at": currentTime ,"created_by":req.body.created_by,
 };
 config.dbname.mvp_survey.insert(data, function (err, success) {
    if (err) {
        res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
    } else {

        res.json({"error": 0, "errorCode": 0, "successMessage": "successfully added Survey"});
    }
});

}
});


router.post('/addQuestionsAnswer', function (req, res) {
    if (req.body.surveyId === undefined || req.body.state === undefined || req.body.question_text === undefined || req.body.compulsory === undefined || req.body.answer_type === undefined || req.body.kpiId === undefined   ) { 
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    }else {
        var data = {"surveyId":req.body.surveyId,"state":req.body.state,"question_text":req.body.question_text,"compulsory":req.body.compulsory,"answer_type":req.body.answer_type,"kpiId":req.body.kpiId};
        config.dbname.mvp_question.insert(data, function (err, success) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {                
                var questionId = data._id.toString();
                if(req.body.answer_type=='text'){
                    res.json({"error": 0, "errorCode": 0, "successMessage": "successfully added Question"});
                }else{              
                    config.dbname.mvp_kpivalue.find({"isDelete": "0","kpiid":req.body.kpiId}, {"_id": 0,"lable":1,"value":1}, function (err, docs) {
                        if (err) {
                            res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
                        } else { 


                           for (var i = 0; i < docs.length; i++) {                                  
                               (function (value) {
                                   var label = value['lable'];
                                   if (typeof label !== 'undefined' && label !== null && label.length > 0) {
                                       var templable = label.toString();
                                       value['lable'] = templable;
                                   }
                                   var labelvalue = value['value'];
                                   if (typeof labelvalue !== 'undefined' && labelvalue !== null && labelvalue.length > 0) {
                                       var templabelvalue = labelvalue.toString();
                                       value['value'] = templabelvalue;
                                   }
                                   value['sequence'] = i;
                                   value['questionId'] = questionId;
                                   config.dbname.mvp_answer.insert(value);                                      
                               })(docs[i]);                             
                           }                          
                           res.json({"error": 0, "errorCode": 0, "successMessage": "successfully added Survey"});

                       }
                   })                   

                }
                
            }
        });

    }
});








router.post('/getSurveyDetails', function (req, res) {
    if (req.body.surveyId === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {

        config.dbname.mvp_survey.find({"_id":config.mongojs.ObjectId(req.body.surveyId)}, {"_id": 0, "title": 1,"display_logo":1,"question_timeout":1,"final_screen_timeout":1,"screen_orientation":1,"welcome_screen_media":1,"welcome_screen_message":1,"final_screen_message":1,"state":1,"image_list":1,"video_url":1,"feedback_count":1,"number_of_questions":1,"created_at":1,"created_by":1,"version":1}, function (err, surveyDetails) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {   

                config.dbname.mvp_question.find({"surveyId":req.body.surveyId}, {"_id": 1, "state": 1,"question_text":1,"compulsory":1,"answer_type":1,"kpiId":1}, async function (err, question) {
                    if (err) {
                        res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
                    } else { 
                        var finalArray = [];  
                        for(var i=0; i<question.length;i++){                     
                            var tempArray = await processArray(question[i]);                       
                            finalArray.push(tempArray);

                        }  

                        res.json({'error': 0, 'errorCode': 0, 'errorMessage': 'None', 'response': {"surveyDetails":surveyDetails[0]},"questions":finalArray});
                    }
                })                 

            }
        })

    }
});




router.post('/addEndPoints', function (req, res) {
    if (req.body.organizationId === undefined ||req.body.channelId === undefined || req.body.name === undefined || req.body.state === undefined || req.body.locationId === undefined || req.body.password === undefined  || req.body.remember_login === undefined ) { 
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {
        var authToken = makeauth(8);
        console.log("authToken :"+authToken);
        var data = {"organizationId":req.body.organizationId,"channelId":req.body.channelId,"name":req.body.name,"state":req.body.state,"locationId":req.body.locationId,"password":req.body.password,"remember_login":req.body.remember_login,"authToken":authToken};
        config.dbname.mvp_endpoints.insert(data, function (err, success) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {

                res.json({"error": 0, "errorCode": 0, "successMessage": "successfully added endpoints"});
            }
        });

    }
});

router.post('/getAllSurvey', function (req, res) {
    if (req.body.organizationId === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {

        config.dbname.mvp_survey.find({"organizationId":req.body.organizationId}, {"_id": 0, "title": 1,"display_logo":1,"feedback_count":1,"number_of_questions":1,"state":1,"created_at":1,"created_by":1}, function (err, docs) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {                        
                res.json({'error': 0, 'errorCode': 0, 'errorMessage': 'None', 'response': docs});           
            }
        })

    }
});


router.post('/getChannelGroup', function (req, res) {
    if (req.body.organizationId === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {

        config.dbname.mvp_channelGroup.find({"organizationId":req.body.organizationId,"isDelete": "0"}, {"_id": 1, "name": 1}, function (err, docs) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {                        
                res.json({'error': 0, 'errorCode': 0, 'errorMessage': 'None', 'response': docs});           
            }
        })

    }
});


router.post('/getChannelByOrg', function (req, res) {
    if (req.body.organizationId === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {

        config.dbname.mvp_channel.find({"organizationId":req.body.organizationId,"isDelete": "0"}, {"_id": 1, "name": 1,"channelGroupId":1,"type":1}, function (err, docs) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {                        
                res.json({'error': 0, 'errorCode': 0, 'errorMessage': 'None', 'response': docs});           
            }
        })

    }
});


router.post('/getChannelByGroup', function (req, res) {
    if (req.body.channelGroupId === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {

        config.dbname.mvp_channel.find({"channelGroupId":req.body.channelGroupId,"isDelete": "0"}, {"_id": 1, "name": 1,"channelGroupId":1,"type":1}, function (err, docs) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {                        
                res.json({'error': 0, 'errorCode': 0, 'errorMessage': 'None', 'response': docs});           
            }
        })

    }
});




router.get('/getIndustries', function (req, res) {
    config.dbname.mvp_industries.find({"isDelete": "0"}, {"_id": 0, "name": 1}, function (err, docs) {
        if (err) {
            res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
        } else {            
            res.json({'error': 0, 'errorCode': 0, 'errorMessage': 'None', 'response': docs});
        }
    })
});


router.get('/getOrganizations', function (req, res) {
    config.dbname.mvp_organizations.find({"isDelete": "0"}, {"_id": 0, "name": 1,"industry":1,"APIKey":1}, function (err, docs) {
        if (err) {
            res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
        } else {            
            res.json({'error': 0, 'errorCode': 0, 'errorMessage': 'None', 'response': docs});
        }
    })
});

router.get('/getCompanySize', function (req, res) {
    config.dbname.mvp_companySize.find({"isDelete": "0"}, {"_id": 0, "size": 1}, function (err, docs) {
        if (err) {
            res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
        } else {
            res.json({'error': 0, 'errorCode': 0, 'errorMessage': 'None', 'response': docs});
        }
    })
});


router.get('/getProblems', function (req, res) {
    config.dbname.mvp_problems.find({"isDelete": "0"}, {"_id": 0, "problem": 1}, function (err, docs) {
        if (err) {
            res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
        } else {
            res.json({'error': 0, 'errorCode': 0, 'errorMessage': 'None', 'response': docs});
        }
    })
});


router.get('/getCities', function (req, res) {
    config.dbname.mvp_cities.find({"isDelete": "0"}, {"_id": 0, "city": 1}, function (err, docs) {
        if (err) {
            res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
        } else {
            res.json({'error': 0, 'errorCode': 0, 'errorMessage': 'None', 'response': docs});
        }
    })
});




function makeauth(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}





module.exports = router;
