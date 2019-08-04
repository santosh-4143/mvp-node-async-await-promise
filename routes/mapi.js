var express = require('express');
var router = express.Router();
var config = require('../config.js');
var dateFormat = require('dateformat');
var in_array = require('in_array');
var uuid = require('uuid');
console.log("MAPI ROUTER");




router.post('/kioskLogin', function(req, res, next) {
    if (req.body.authToken === undefined || req.body.password === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {
        
        config.dbname.mvp_endpoints.find({"authToken":req.body.authToken,"password": req.body.password}, {"_id": 1, "name": 1,"organizationId":1,"remember_login":1}, function (err, docs) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else { 
                if(docs.length > 0){
                    config.dbname.mvp_organizations.find({"_id":config.mongojs.ObjectId(docs[0]['organizationId'])}, {"_id": 1,"name":1,"industry":1,"APIKey":1}, function (err, organization) {
                        if (err) {
                            res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
                        } else {            
                            if(organization.length > 0){
                                res.json({'error': 0, 'errorCode': 0, 'errorMessage': 'None', 'response': organization});
                            }else{
                                res.json({'error': 1, 'errorCode': 1002, 'errorMessage': 'Organization not exist!'});
                            }
                        }
                    })                    
                  
                }else{
                   res.json({'error': 1, 'errorCode': 1001, 'errorMessage': 'AuthToken and password not match!'}); 
                }           
                
            }
        })

    }
});

router.post('/signIn', function (req, res) {
    if (req.body.email === undefined || req.body.password === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {        
            config.dbname.mvp_users.find({"email": req.body.email,"password":req.body.password,"isDelete":"0"}, {"_id": 1, "organizationId": 1,"username":1,"email":1,"rights":1,"created_at":1}, function (err, docs) {
                if (err) {
                    res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
                } else {  
                    if (docs.length > 0) {
                        var organizationId = docs[0]['organizationId'];
                        config.dbname.mvp_organizations.find({"_id": config.mongojs.ObjectId(organizationId),"isDelete": "0"}, {"_id": 1, "name": 1,"industry":1,"APIKey":1}, function (err, org) {
                            if (err) {
                                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
                            } else { 
                                if(org.length > 0){
                                    docs[0]['organization_details'] = org[0];
                                    res.json({'error': 0, 'errorCode': 0, 'errorMessage': 'None', 'response': docs[0]});
                                }else{
                                    res.json({'error': 1, 'errorCode': 1002, 'errorMessage': 'Your organization does not exist!'});
                                }           
                                
                            }
                        })                        
                     
                    }else{
                      res.json({'error': 1, 'errorCode': 1001, 'errorMessage': 'User does not exist!'});  
                    }          
                    
                }
            })

    }
});


router.post('/getFirstPublishedSurvey', function (req, res) {
  console.log("/getFirstPublishedSurvey")
    if (req.body.organizationId === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {
        var currentDate = dateFormat(new Date().toLocaleString(config.lan, {timeZone: config.timezone}), config.timeformat);        
        config.dbname.mvp_publishSurvey.find({"organizationId": req.body.organizationId }, {"_id": 0, "surveyId": 1}, function (err, docs) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {                        
                if(docs.length > 0){
                        console.log("surveyId :"+docs[0]['surveyId']);
                        config.dbname.mvp_survey.find({"_id": config.mongojs.ObjectId(docs[0]['surveyId']), "state":"Published" }, {"_id": 1, "title": 1,"display_logo":1,"question_timeout":1,"final_screen_timeout":1,"screen_orientation":1,"welcome_screen_media":1,"welcome_screen_message":1,"final_screen_message":1,"state":1,"image_list":1,"video_url":1,"feedback_count":1,"number_of_questions":1,"created_at":1,"created_by":1,"version":1}).limit(1, function (err, surveyDetails) {
                            if (err) {
                                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
                            } else {   
                               if(surveyDetails.length > 0){
                                    config.dbname.mvp_question.find({"surveyId":surveyDetails[0]['_id'].toString()}, {"_id": 1, "state": 1,"question_text":1,"compulsory":1,"answer_type":1,"kpiId":1}, async function (err, question) {
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
                               }else{
                                    res.json({'error': 1, 'errorCode': 1001, 'errorMessage': 'You have no published survey yet!'});
                               }              

                            }
                        })
                }else{
                    res.json({'error': 1, 'errorCode': 1001, 'errorMessage': 'You have no published survey yet or period end.'});
                }           
            }
        });      


    }
});


router.post('/getPublishedSurveyVersion', function (req, res) {
  console.log("/getPublishedSurveyVersion");
    if (req.body.organizationId === undefined || req.body.surveyId === undefined ) {
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {

                        config.dbname.mvp_survey.find({"_id": config.mongojs.ObjectId(req.body.surveyId),"organizationId":req.body.organizationId }, {"_id": 1, "version":1,"state":1}, function (err, surveyDetails) {
                            if (err) {
                                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
                            } else {   
                               if(surveyDetails.length > 0){
                                    res.json({'error': 0, 'errorCode': 0, 'errorMessage': 'None', 'response':surveyDetails}); 
                               }else{
                                    res.json({'error': 1, 'errorCode': 1001, 'errorMessage': 'You have no published survey yet!'});
                               }              

                            }
                        })
                     
     


    }
});


async function processArray(single) {

    var tempData = {
        '_id':single['_id'],
        'state':single['state'],
        'question_text':single['question_text'],
        'compulsory':single['compulsory'],
        'answer_type':single['answer_type'],
        'kpiId':single['kpiId'],
        'answers':[]

    };                      
    if(single['answer_type']!='text'){                      
        var questionId = single['_id'].toString();   
        console.log("questionId :"+questionId);                   
        var allans = await getAllans(questionId);                      
        console.log("allans :"+allans);
        tempData['answers']=allans;


        return new Promise(function (resolve, reject) {
            if (tempData)
                resolve(tempData);
            else
                reject();
        });

    }else{                         
        return new Promise(function (resolve, reject) {
            if (tempData)
                resolve(tempData);
            else
                reject();
        });                            
    }

}


async function getAllans(questionId){                     

 return new Promise(function (resolve, reject) {
    config.dbname.mvp_answer.find({"questionId":questionId}, {"_id": 1, "lable": 1,"value":1,"sequence":1},  function (err, answer) {
        if (err) {
            res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
        } else {                                       


            if (answer){

                resolve(answer);
            }else
            reject();                                    
        }
    }) ;                                            

});                            

}


router.post('/addOpinionFeed', function (req, res) {
    if (req.body.organizationId === undefined || req.body.surveyId === undefined || req.body.questionId === undefined || req.body.question_text === undefined || req.body.answerId === undefined  || req.body.answer_label === undefined || req.body.answer_value === undefined || req.body.answer_type === undefined ) { 
        res.json({'error': 1, 'errorCode': 1000, "errorMessage": ' All feilds are requered'});
    } else {
        var data = {"organizationId":req.body.organizationId,"surveyId":req.body.surveyId,"questionId":req.body.questionId,"question_text":req.body.question_text,"answerId":req.body.answerId,"answer_label":req.body.answer_label,"answer_value":req.body.answer_value,"answer_type":req.body.answer_type,"isDelete":"0"};
        config.dbname.mvp_opinionfeed.insert(data, function (err, success) {
            if (err) {
                res.json({'error': 1, 'errorCode': 1000, 'errorMessage': 'Something went wrong'});
            } else {

                res.json({"error": 0, "errorCode": 0, "successMessage": "successfully added opinionfeed"});
            }
        });

    }
});

module.exports = router;
