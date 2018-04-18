const redis = require('redis');
const express = require('express');
const router = express.Router();


let client  = redis.createClient();

//Redis Client
client.on('connect',function(){
    console.log("Connected to redis... on users route");
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('some user data');
});
router.get('/addevent',function (req, res, next){
    res.render('addevent');
});

router.get('/goto/:id',function (req, res, next){
    let id = "event"+req.params.id;
    client.hgetall(id,function(err,obj){
        if(!obj){
            res.render('error',{
                error: 'event does not exist',
                title: 'NO!'
            });
        }
        else{
            console.log(obj);
            obj.eventid = req.body.id;
            res.render('events',{
                event:obj
            });
        }
    })
});

/* POST information */
router.post('/search/',function (req, res, next){
    let id = "event"+req.body.id;
    client.hgetall(id,function(err,obj){
        if(!obj){
            res.render('error',{
                error: 'event does not exist',
                title: 'NO!'
            });
        }
        else{
            console.log(obj);
            obj.eventid = req.body.id;
            res.render('events',{
                event:obj
            });
        }
    })
});

router.post('/addevent',function (req, res,next){
    let eventid = 'event'+req.body.id;
    let name = req.body.name;
    let location = req.body.location;
    let time = req.body.time;

    client.hmset(eventid, [
        'name', name,
        'location', location,
        'time', time
    ],function(err,reply){
        if(err){
            console.log(err);
        }
        else{
            console.log(reply);
            res.redirect('/');
        }
    }
    );

});

/* DELETE */
router.delete('/delete/:id',function(req,res,next){
    client.del(req.params.id);
    res.redirect('/')
});

module.exports = router;
