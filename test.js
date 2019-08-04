  var mongojs = require('mongojs');
  var db = mongojs('mongodb://127.0.0.1:27017/blogdb',['newsdetails','sidhu_users','sidhu_otp']);
   var sidhu_news = db.newsdetails;
   console.log("connected");
   db.sidhu_news.find({},function(err,details){
   	if(err){
   		console.log(err);
   	}else{
   		console.log(details.length);
   		if(details.length>0){
   			for(var i=0;i<details.length;i++){
   				var picture=[];
   				var newsPicture=details[i].Newspicture;
   				console.log(newsPicture);
   				picture.push(newsPicture);
   				console.log("---->"+JSON.stringify(picture))
   			}
   		}
   	}
   })