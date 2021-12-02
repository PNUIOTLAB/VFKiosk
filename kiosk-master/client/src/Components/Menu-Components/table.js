import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
//import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./style.css";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton } from "@material-ui/core";


  
/*const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  {name:"d",calories:1,fat:3}
];*/

function BasicTable(props) {
    function getAddId(e){
        props.onAddCarts(e.currentTarget.id)
        console.log(e.currentTarget.id)
    }
    function getDeleteId(e){
        props.onDeleteCarts(e.currentTarget.id)
        console.log(e.currentTarget.id)
    }
    const rows = props.carts;
    const youngStyle={
        fontWeight:'600',
        fontSize:"4vmin",
        paddingRight:0,
        paddingLeft:0,
    };
    const oldStyle={
        fontWeight:'700',
        fontSize:"30px",
        paddingRight:0,
        paddingLeft:0,
    };
    const youngbuttonStyle={
        fontWeight:'600',
        fontSize:"4vmin",
    };
    const oldbuttonStyle={
        fontWeight:'700',
        fontSize:"30px",
    };
    var changeAge=()=>{
        props.setUserdata({age:"old"})
    }

    var i = 0 ;
    var list=[];
    while (i < rows.length){
        if(props.Userdata.age ==="old"){
            list.push(
                <TableRow key={i}>
                    <TableCell style={oldStyle} align="center" component="th">
                        {rows[i].name}
                    </TableCell>
                    <TableCell style={oldStyle} align="center" component="th">{rows[i].price}원</TableCell>
                    <TableCell style={oldStyle} align="center" component="th"><IconButton id={rows[i].id} onClick={getAddId}><AddIcon /></IconButton>{rows[i].num}개<IconButton id={rows[i].id} onClick={getDeleteId}><RemoveIcon /></IconButton></TableCell>
                </TableRow>
            );
            i=i+1;
        }else {
            list.push(
                <TableRow key={i}>
                    <TableCell style={youngStyle} align="center" component="th">
                        {rows[i].name}
                    </TableCell>
                    <TableCell style={youngStyle} align="center" component="th">{rows[i].price}원</TableCell>
                    <TableCell style={youngStyle} align="center" component="th"><IconButton id={rows[i].id} onClick={getAddId}><AddIcon /></IconButton>{rows[i].num}개<IconButton id={rows[i].id} onClick={getDeleteId}><RemoveIcon /></IconButton></TableCell>
                </TableRow>
            );
            i=i+1;
        }
        
       
    }
    function Pay(){
        var payButton;
        if (i !== 0){
            if(props.age ==="old"){
                payButton = 
                <TableRow key="pay">
                    <TableCell  align="left">
                        <Link to={"/"}>
                            <Button style={oldbuttonStyle} variant="contained" color="primary">
                                취소하기
                            </Button>
                        </Link>
                    </TableCell> 
                    <TableCell  align="right" colSpan={3}>
                        <Link to={{
                            pathname:"/payment/",
                            state:{rows}
                            }}>
                            <Button style={oldbuttonStyle} variant="contained" color="primary">
                                결제하기
                            </Button>
                        </Link>
                    </TableCell> 
                </TableRow>
            }else {
                payButton = 
                <TableRow key="pay">
                    <TableCell  align="left">
                        <Link to={"/"}>
                            <Button style={youngbuttonStyle} variant="contained" color="primary">
                                취소하기
                            </Button>
                        </Link>
                    </TableCell>
                    <TableCell align="center">
                        <Button style={youngbuttonStyle} variant="contained" onClick={changeAge}>
                            {/* 온클릭시 old 모드로 바뀌게 할 것 임. */}
                            저시력자 모드
                        </Button>
                    </TableCell>  
                    <TableCell align="right" colSpan={3}>
                        <Link to={{
                            pathname:"/payment/",
                            state:{rows}
                            }}>
                            <Button style={youngbuttonStyle} variant="contained" color="primary">
                                결제하기
                            </Button>
                        </Link>
                    </TableCell> 
                </TableRow>
            }
            
        
        return payButton;
        }

    }
    return (
        <TableContainer component={Paper}>

            <Table  aria-label="simple table">
                {/*<TableHead>
                    <TableRow>
                        <TableCell>메뉴</TableCell>
                        <TableCell align="right">가격</TableCell>
                        <TableCell align="right">개수&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>*/}
                <TableBody>
                    {list}
                    {Pay()}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BasicTable;