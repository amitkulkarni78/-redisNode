const errorHandler = require('../Helpers/errorHandler');
const dbconfig = require('../config/dbconfig');


module.exports = {

    addUser: (req, res, next) => {
        console.log("add user");

        console.log(req.body);

        var data = {
            name: req.body.name || '',
            address: req.body.address || '',
            email: req.body.email || '',
            password: req.body.password || 'samplePassword'
        };

        addUser(data).then((result) => {
            console.log(result);
            if (result && result != 0) {
                res.status(errorHandler.getSuccessMessage(201).StatusCode);
                res.send({
                    data: result,
                    message: errorHandler.getSuccessMessage(201).Message
                });
            } else {
                res.status(errorHandler.getErrorMessage(101).StatusCode);
                res.send({
                    error: err,
                    message: errorHandler.getErrorMessage(101).Message
                });
            }
        }).catch((err) => {
            res.status(errorHandler.getErrorMessage(101).StatusCode);
            res.send({
                error: err,
                message: errorHandler.getErrorMessage(101).Message
            });
        });
    },

    getAllUser: (req, res, next) => {
        console.log("get all users");
        getAllUser().then((result) => {
            if (result && result != 0) {
                res.status(200);
                res.send({
                    status: true,
                    data: result,
                    message: errorHandler.getSuccessMessage(102).Message
                });
            } else {
                res.status(errorHandler.getErrorMessage(202).StatusCode);
                res.send({
                    status: false,
                    error: 'error',
                    message: errorHandler.getErrorMessage(202).Message
                });
            }
        }).catch((error) => {
            console.log(error);
            res.status(errorHandler.getErrorMessage(202).StatusCode);
            res.send({
                status: false,
                error: error,
                message: errorHandler.getErrorMessage(202).Message
            });
        })
    },

    deleteUser: (req, res, next) => {
        console.log("delete user");
        var data = {
            userId : req.params.id,
        };

        deleteUser(data).then((result) => {
            if (result) {
                res.status(errorHandler.getSuccessMessage(203).StatusCode);
                res.send({
                    data: result,
                    message: errorHandler.getSuccessMessage(203).Message
                });
            }
        }).catch((err) => {
            res.status(errorHandler.getErrorMessage(103).StatusCode);
            res.send({
                error: err,
                message: errorHandler.getErrorMessage(103).Message
            });
        });
    },

    getUserDetail: async (req, res, next) => {
        var data = {
            userId : parseInt(req.params.id)
        };

        await getUserDetail(data).then((result) => {
            if (result && result != 0) {
                var user = {
                    id: Number,
                    name: String,
                    address: String,
                    email: String
                };

                result.forEach((element) => {
                   
                    user.id = element.USR_ID;
                    user.name = element.USR_NAME;
                    user.address = element.USR_ADDRESS;
                    user.email = element.USR_EMAIL;
                });

                res.status(errorHandler.getSuccessMessage(201).StatusCode);
                res.send({
                    data: user,
                    message: errorHandler.getSuccessMessage(201).Message
                });
            }
        }).catch((err) => {
            res.status(errorHandler.getErrorMessage(101).StatusCode);
            res.send({
                error: err,
                message: errorHandler.getErrorMessage(101).Message
            });
        });
    },

    editUser: (req, res, next) => {

        editUser().then((result) => {
            if (result) {
                res.status(errorHandler.getSuccessMessage(201).StatusCode);
                res.send({
                    data: result,
                    message: errorHandler.getSuccessMessage(201).Message
                });
            }
        }).catch((err) => {
            res.status(errorHandler.getErrorMessage(101).StatusCode);
            res.send({
                error: err,
                message: errorHandler.getErrorMessage(101).Message
            });
        });
    }
}


function addUser(data) {

    return new Promise((resolve, reject) => {
        console.log("add user function called");

        var sql = 'INSERT INTO MST_USERS (USR_NAME,USR_ADDRESS,USR_EMAIL,USR_PASSWORD) VALUES (?,?,?,?)'
        dbconfig.dbObject.getConnection((err, conn) => {
            conn.query(sql, [data.name, data.address, data.email, data.password], (err, result, fields) => {
                dbconfig.dbObject.releaseConnection(conn);
                if (err) {
                    console.log(err);
                } else {
                    if (result && result != 0) {
                        resolve(result);
                    } else {
                        reject(result);
                    }
                }
            });
        })

    });

}

function getAllUser(data) {
    return new Promise((resolve, reject) => {
        console.log('get all users');
        var Users = [];
        var sql = "SELECT * FROM MST_USERS";
        /*  dbconfig.dbObject.getConnection((err, conn) => {
             conn.query(sql, (err, result, fields) => {
                 if (err) {
                     console.log(err);
                     reject(err);
                 } else {
                     if (result && result != 0) {
                         result.forEach(element => {

                             var user = {
                                 id: Number,
                                 name: String,
                                 address: String,
                                 email: String
                             };
                             user.id = element.USR_ID;
                             user.name = element.USR_NAME;
                             user.address = element.USR_ADDRESS;
                             user.email = element.USR_EMAIL;

                             Users.push(user);
                         });
                         resolve(Users);
                     } else {
                         reject(result);
                     }
                 }
             })
         }) */
        dbconfig.cacheObject.connect(err => {
            if (err) {
                throw err;
            }
            console.log('redis mysql cache connected');
        })

        dbconfig.cacheObject.query(sql, (err, res, cache) => {
            if (err) {
                console.log('Error', err);
            } else {
                if (cache.isCache) {
                    console.log(cache.sql);
                    console.log('cache key', cache.hash);
                    console.log('is cached', cache.isCache);
                    console.log('result from cache db', res);
                    console.log('cache ', cache);


                } else {
                    console.log('result from db', res);
                }

                if (res && res != 0) {
                    res.forEach(element => {

                        var user = {
                            id: Number,
                            name: String,
                            address: String,
                            email: String
                        };
                        user.id = element.USR_ID;
                        user.name = element.USR_NAME;
                        user.address = element.USR_ADDRESS;
                        user.email = element.USR_EMAIL;

                        Users.push(user);
                    });
                    resolve(Users);
                } else {
                    reject(res);
                }
            }
        });

        
    })
}

function deleteUser(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
        var sql = "DELETE FROM MST_USERS WHERE USR_ID = ?";


        dbconfig.cacheObject.connect((err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("connected");
            }
        })


         dbconfig.cacheObject.query(sql,[data.userId],(err,res,cache)=>{
            if(err){
                reject(err);
            }else{
                if(cache){
                    console.log(cache);
                    console.log(res);
                    resolve(res);
                }else{
                    resolve(res);
                }
            }
        }) 
    })
}

function getUserDetail(data) {

    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM MST_USERS WHERE USR_ID = ?";


        dbconfig.cacheObject.connect((err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("connected");
            }
        })


         dbconfig.cacheObject.query(sql,[data.userId],(err,res,cache)=>{
            if(err){
                reject(err);
            }else{
                if(cache){
                    console.log(cache);
                    console.log(res);
                    resolve(res);
                }else{
                    resolve(res);
                }
            }
        }) 
    })
}

function editUser(data) {

    return new Promise((resolve, reject) => {
        console.log("search user function called");
        var data = "got user from db";
        resolve(data);
    })
}