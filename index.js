const redis = require('redis');
const redisClient = redis.createClient();

var port = 6379;
var host = '127.0.0.1';
var client = redis.createClient(port,host,);

client.on('connect',(err)=>{
    if(err){
        console.log(err);
    }
    console.log('connected');
});

/* client.set('framework', 'AngularJS', function(err, reply) {
    console.log(reply);
  });

  client.get('framework', function(err, reply) {
    console.log(reply);
}); */
var array = [{'name':'Amit'},{'name':'Yash'}] ;
client.hmset('frameworks', {
    'javascript': 'AngularJS',
    'css': 'Bootstrap',
    'node': 'Express',
    'items': array
}, (err,reply) =>{
    console.log(reply);
});

client.hgetall('frameworks', function(err, object) {
    console.log(object);
});