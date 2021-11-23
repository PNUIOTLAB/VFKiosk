const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const cnof = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: cnof.host,
    user: cnof.user,
    password: cnof.password,
    port: cnof.port,
    database: cnof.database
});
connection.connect();

app.get('http://172.30.1.1:5000/api/Order_Tables', (req,res)=> {
    connection.query(
        "SELECT * FROM CUSTOMER WHERE Complete = 0",
        (err,rows,fields) => {
            //console.log(rows);
            res.send(rows);
        }
    );
});

app.get('http://172.30.1.1:5000/api/menu',(req,res)=>{
    connection.query(
        "SELECT * FROM MENU",
        (err,rows,fields) =>{
            res.send(rows);
        }
    );
});

app.post('http://172.30.1.1:5000/api/Order_Tables', (req,res) => {
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

app.delete('http://172.30.1.1:5000/api/Order_Tables/:Order_Num', (req,res) => {
    let sql = 'UPDATE CUSTOMER SET Complete = 1 WHERE Order_Num = ?';
    let params = [req.params.Order_Num];
    connection.query(sql,params,
        (err,rows,fields) => {
            res.send(rows);
        }
    )
});

app.listen(port);