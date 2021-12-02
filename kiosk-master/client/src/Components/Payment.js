import React, { useState, useEffect,Component } from 'react';
import Template from './Payment-Components/Template';
import Template0 from './Payment-Components/Template0';
import Template1 from './Payment-Components/Template1';
import { createGlobalStyle } from 'styled-components';
import BasicTable from './Payment-Components/table'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios';
import styled from 'styled-components';
import { createTheme,makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import ResultTable from './Payment-Components/ResultTable';
const GlobalStyle = createGlobalStyle`
  body {
    background: #282c34;

  }
`;
const useStyles = makeStyles({
  root: {
    width:'200px',
    height: 100,
    fontWeight:"900",
    color: "black",
    fontSize: "22px",
    ['@media only screen and (max-width: 768px)']: { 
      width: "34vw",  
      fontWeight:"900", 
    }

  },
  bottom:{
    width:"600px",
    height:"50px",
    backgroundColor:"#141a27",
    color:"white",
    fontWeight:"800",    
    ['@media only screen and (max-width: 768px)']: { 
    width: "100%",  
    height:"10vh",
    position:"fixed",
    bottom:"3%",
    },  
  resultTable:{
    width: "600px",
    zIndex: "999",
    position: "absolute",
    left: "50%",
    bottom:"3%",
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.04)",
  }
  }
  
});



function Payment(props) {

  const classes = useStyles();

  const [rows, setRows] = useState(props.location.state.rows);

  
  function addCarts(a){
    setRows( arr => [...arr, a])
  }
  function Addupdate(i){
    var _Carts = Array.from(rows)
    var a;
    for(a = 0; a<_Carts.length; a++){
      if(_Carts[a].id === parseInt(i)){
        _Carts[a].num = _Carts[a].num + 1;
        break;
      }
    };
    setRows(_Carts);
  };
  function Deleteupdate(i){
    var _Carts = Array.from(rows)
    var a;
    for(a = 0; a<_Carts.length; a++){
      if(_Carts[a].id === parseInt(i)){
        _Carts[a].num = _Carts[a].num - 1;
        if(_Carts[a].num===0){
          _Carts.splice(a,1);
        }
        break;
      }
    };
    setRows(_Carts);
  };

  //여기선 백에다 보내는거거
  let temp;
  let last;

  useEffect(async() => {
    try{
        const res = await axios.get('http://localhost:7000/api/last');
        temp=res.data;
        console.log(temp);
        console.log("마지막숫자자"+temp[temp.length-1].Order_Num);
        last=parseInt(temp[temp.length-1].Order_Num);
        console.log("타입"+typeof(last));

    } catch(e) {
        console.error(e.message)
    }
  },[])//연결결

  let Take_Out=1;
  let Gender="Female"; let Age=20; let Cost=0;
  var i = 0 ;
  let list=[];//[{"id": 1, "num": 1}]
  while (i < rows.length){
    var id= `${rows[i].id}`;
    var obj = {};  
    obj["id"] = rows[i].id;
    obj["num"] = rows[i].num
    list.push(obj);
    Cost = Cost + rows[i].price * rows[i].num;
    i=i+1;
  }
  
  let Order_List=JSON.stringify(list);
  //{id:1,name:"아메리카노",price:1500,num:1}
  var addCustomer = () =>{
    const url = 'http://localhost:7000/api/order';
    const formData =  new URLSearchParams();
    //const formData =  new FormData();
    console.log(list);
    formData.append('Order_Num',last+1);
    formData.append('Take_Out',Take_Out);
    formData.append('Order_List',Order_List);
    formData.append('Gender',Gender);
    formData.append('Age',Age);
    formData.append('Cost',Cost);
    console.log(formData);
    return axios.post(url, formData);
  }
  var addStock = (z) => {
    const url = 'http://localhost:7000/api/menu';
    const formData =  new URLSearchParams();
    formData.append('id',z.id);
    formData.append('num',z.num);
    console.log(formData);
    return axios.post(url, formData);
  }

  var addStockandCustomer = () => {
    addCustomer();
    var z = 0;
    while (z<list.length){
      addStock(list[z]);
      z=z+1;
    };
  }

  return (
    <>
      <GlobalStyle />
      <Template>
        <BasicTable carts={rows} class="table" onAddCarts={function(i){Addupdate(i)}} onDeleteCarts={function(i){Deleteupdate(i)}}></BasicTable>
        <ResultTable className={classes.resultTable} carts={rows} class="table"></ResultTable>
      </Template>
      
      <Template0>
        <ButtonGroup color="primary" aria-label="large outlined primary button group">
          <Link to={"/end"}>
            <Button variant='text' style={{backgroundColor:"#fd6257"}} className={classes.root} onClick={addStockandCustomer}>
              <Typography style={{fontWeight:"900",fontSize: "22px"}}>
              <div>신용카드</div>
              <div>결제</div></Typography>
            </Button>
          </Link>
          <Link to={"/end"}><Button variant='text' style={{backgroundColor:"#6ae98a"}} className={classes.root} onClick={addStockandCustomer}>
            현금 결제</Button></Link>
          <Link to={"/end"}><Button variant='text' style={{backgroundColor:"yellow",padding:"0"}} className={classes.root} onClick={addStockandCustomer}>
            <Typography style={{fontWeight:"900",fontSize: "22px",}}><div>카카오페이</div><div>결제</div></Typography>
            </Button></Link>
        </ButtonGroup>
      </Template0>
      <Template1>
        <Link to={"/"}>
          <Button variant="contained" className={classes.bottom}>취소하기</Button>
        </Link>
      </Template1>
    </>
  );
}

export default Payment;