var express = require('express');
var router = express.Router();
var connection = require('../modules/mysqldb');  

router.get('/',function(req,res,next){
    connection.query(
        "SELECT * FROM MENU",
        function(err,rows,fields){
          if(err)
              throw err;
          else{
              res.send(rows);
            }
        }
    );
});

router.post('/', (req,res) => {
    let sql2 = 'update MENU set Type=Type+? where Id = ?';
    let id = req.body.id;
    let num = req.body.num;
    console.log('##########################################################');
    console.log(id);
    console.log(num);
    console.log('##########################################################');
    let params = [num,id]
    connection.query(sql2,params,
        (err,rows,fields) => {
            console.log(err);
            res.send(rows);
    });
})// 개수추가하는 ㅇㅇㅇ

module.exports = router;