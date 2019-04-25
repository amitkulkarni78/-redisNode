const mysql = require('mysql2');
const MysqlCache = require('mysql-cache');
 
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'SampleDatabase',
  password: '',
  port:3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const mysqlCache = new MysqlCache({
  host: 'localhost',
  user: 'root',
  database: 'SampleDatabase',
  password: '',
  port:3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  cacheProvider: 'redis',
  caching: true,
  serverLocation: '127.0.0.1:6379',
});




/* mysqlCache.getPool((err,conn)=>{
  if(err){
    console.log(error);
  }else{
    var sql = "SELECT * FROM MST_USERS";
    conn.query(sql,(err,result,cache)=>{
      mysqlCache.
      if(err){
        console.log(err);
      }else{
        console.log(cache.isCache);
        console.log(cache.hash + "this is a cache hash");
        console.log(result);
        if(result && result != 0){
          console.log(result);
          console.log("got the result");
        }else{
          console.log("cannot get the result");
        }
      }
    })    
  }
}); */

pool.on('query',sql => {
  console.log("this is query fired to add the user",sql);
});



var sql = "SELECT * FROM MST_USERS";


mysqlCache.event.on('getPool', connection => {
  console.log('Pool connection aqquired!')
  // connection = mysql2 module variable
});



mysqlCache.event.on('hit', (query, hash, result) => {
  // query  = the sql code that was used
  // hash   = the hash that was generated for the cache key
  // result = the result that was found in the cache
  console.log('mysqlCache-cache hit a cache object!', query, hash, result)
})

mysqlCache.event.on('query', sql => {
  console.log('mysqlCache-cache is going to run a query, it might be cached or not we dont know yet: ' + sql)
})

mysqlCache.event.on('dbQuery', obj => {
  console.log("query hits on database");
})

mysqlCache.event.on('create', (hash, val, ttl) => {
  console.log('Creating cache object: ', hash, ttl)
})

mysqlCache.event.on('get', hash => {
  console.log('Retrieving cache object: ', hash)
})

module.exports = {
  dbObject : pool,
  cacheObject : mysqlCache
};