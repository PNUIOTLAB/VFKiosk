var express = require('express');
var router = express.Router();
var connection = require('../modules/mysqldb');

/*
  connection.connect(function(err){ 
    if(err){ // 커넥트 하는 과정에서 콜백함수에서의 에러 처리 
      console.error('error connecting:' + err.stack);
      return;
    }
  });//connect callback*/
  //connect를 중복하게 되어서 handshaking 문제가 발생

  router.get('/',function(req,res,next){
      connection.query(
          "SELECT * FROM CUSTOMER WHERE Complete = 0",
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
    let sql = 'INSERT INTO CUSTOMER VALUES(?,?,?,?,?,?,NOW(),0)';
    let Order_Num = req.body.Order_Num;
    let Take_Out = req.body.Take_Out;
    let Order_List = req.body.Order_List;
    let Gender = req.body.Gender;
    let Age = req.body.Age;
    let Cost = req.body.Cost;
    console.log('##########################################################');
    console.log(Order_Num);
    console.log(Take_Out);
    console.log(Order_List);
    console.log(Gender);
    console.log(Age);
    console.log(Cost);
    console.log('##########################################################');
    console.log('\n');
    let params = [Order_Num,Take_Out,Order_List,Gender,Age,Cost];
    connection.query(sql,params,
        (err,rows,fields) => {
            console.log(err);
            res.send(rows);
        }
    );
});

router.delete('/:Order_Num', (req,res) => {
    let sql = 'UPDATE CUSTOMER SET Complete = 1 WHERE Order_Num = ?';
    let params = [req.params.Order_Num];
    connection.query(sql,params,
        (err,rows,fields) => {
            res.send(rows);
        }
    )
});

module.exports = router;