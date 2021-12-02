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




/*const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  {name:"d",calories:1,fat:3}
];*/
const useStyles = makeStyles({
    table: {
      fontWeight: "600",
      fontSize:"larger",
      padding:0,
    },
  });

function ResultTable(props) {
    var i = 0 ;
    console.log("배열"+props.carts);
      
    const classes = useStyles();
    const rows = props.carts;
    console.log(rows.length);
    var totalprice = 0;
    while (i < rows.length){
        console.log("개수"+rows[i].num);
        totalprice=totalprice+rows[i].num*rows[i].price;
        i=i+1;
    }
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableBody  >
                    <TableRow key="Result" >
                        <TableCell align="right" className={classes.table} component="th">ㅤ{totalprice}원</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ResultTable;