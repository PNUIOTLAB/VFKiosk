var express = require('express');
var router = express.Router();
var connection = require('../modules/mysqldb');  

router.get('/',function(req,res,next){
    connection.query(
        " SELECT Order_Num FROM CUSTOMER;",
        function(err,rows,fields){
          if(err)
              throw err;
          else{
              res.send(rows);
            }
        }
    );
});

module.exports = router;