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

    client.keys('event*', function(err, data){
        if(err){
            console.log(err);
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
