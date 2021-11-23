import React from 'react';
import Template from './Payment-Components/Template';
import Template0 from './Payment-Components/Template0';
import Template1 from './Payment-Components/Template1';
import { createGlobalStyle } from 'styled-components';
import BasicTable from './Payment-Components/table'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


import styled from 'styled-components';
import { createTheme,makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    background: #282c34;

  }
`;
const useStyles = makeStyles({
  root: {
    width:'200px',
    height: 100,
    fontWeight:"1000",
    color: "black",
    fontSize: "22px"

  },
  
});



function Payment(props) {
  /*const [Carts, setCarts] = useState([]);
  function addCarts(a){
    setCarts( arr => [...arr, a])
  }*/
  const classes = useStyles();
  console.log(props.location.state.rows);
  return (
    <>
      <GlobalStyle />
      <Template>
        <BasicTable carts={props.location.state.rows} class="table"></BasicTable>
      </Template>

      <Template0>
        <ButtonGroup color="primary" aria-label="large outlined primary button group">
          <Link to={"/end"}>
            <Button variant="contained" style={{backgroundColor:"#fd6257"}} className={classes.root}>
            ㅤㅤ신용카드ㅤㅤ 결제
            </Button>
          </Link>
          <Link to={"/end"}><Button variant="contained" style={{backgroundColor:"#6ae98a"}} className={classes.root}>현금 결제</Button></Link>
          <Link to={"/end"}><Button variant="contained" style={{backgroundColor:"yellow"}} className={classes.root}>ㅤ카카오페이 ㅤ결제</Button></Link>
        </ButtonGroup>
      </Template0>
      <Template1>
        <Link to={"/"}>
          <Button variant="contained" style={{width:"600px",height:"50px",backgroundColor:"#141a27",color:"white",fontWeight:"800"  }}>취소하기</Button>
        </Link>
      </Template1>

    </>
  );
}

export default Payment;