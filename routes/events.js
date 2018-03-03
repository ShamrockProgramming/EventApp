const express = require('express');
const redis = require('redis');
const router = express.Router();

let client  = redis.createClient();

//Redis Client
client.on('connect',function(){
    console.log("Connected to redis...on events route");
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('events',{name: 'Secret', location: 'somewhere'});
});

router.get('/all',function(req, res, next){

    //TODO make a call to the database to retreive all events.

    /*res.render('allevents', {title: 'All Events Ever!',
                                para: 'This is a short ',
                                btn1:'Go to bottom',
                                btn2:'Go to top'});

    */
    client.keys('event*', function(err, data){
        if(err){
            console.log(err);
        }
        else if(1==0){
            //test idea
            let eventJSON = {events:[]};

            for(let d=0; d<data.length;d++){
                client.hgetall(data[d],function(err,obj){
                    eventJSON.events.push({event:obj});
                });
            }
            res.render('allevents',eventJSON);
            console.log(eventJSON);
        }
        else{
            let eventlist = {};

            for(let d=0; d<data.length; d++){
                let item = "eventlist"+d;
                eventlist[item] = data[d];
            }
            res.render('allevents', eventlist);
            console.log(data);
            console.log(eventlist);
        }
    });
});



module.exports = router;
