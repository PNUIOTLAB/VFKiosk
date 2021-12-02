import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
//import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./style.css"
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
  table: {
    fontWeight: "600",
    fontSize:"larger",
    padding:0,
  },
});


/*const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  {name:"d",calories:1,fat:3}
];*/

function BasicTable(props) {
    const classes = useStyles();
    console.log(props.carts)
    const rows = props.carts;
    function getAddId(e){
        props.onAddCarts(e.currentTarget.id)
        console.log(e.currentTarget.id)
    }
    function getDeleteId(e){
        props.onDeleteCarts(e.currentTarget.id)
        console.log(e.currentTarget.id)
    }
    var i = 0 ;
    var list=[];
    while (i < rows.length){
        list.push(
            <TableRow key={i} >
                <TableCell align="left" className={classes.table} component="th">
                    ㅤ{rows[i].name}
                </TableCell>
                <TableCell align="center" className={classes.table} component="th" style={{width: '22%'}}>ㅤ{rows[i].price}원</TableCell>
                <TableCell align="right" className={classes.table} component="th"><IconButton id={rows[i].id} onClick={getAddId}><AddIcon /></IconButton>{rows[i].num}개<IconButton id={rows[i].id} onClick={getDeleteId}><RemoveIcon /></IconButton></TableCell>
            </TableRow>
        );
        i=i+1;
       
    }
    return (
        <TableContainer component={Paper}>

            <Table aria-label="simple table">
                {/*<TableHead>
                    <TableRow>
                        <TableCell>메뉴</TableCell>
                        <TableCell align="right">가격</TableCell>
                        <TableCell align="right">개수&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>*/}
                <TableBody  >
                    {list}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BasicTable;