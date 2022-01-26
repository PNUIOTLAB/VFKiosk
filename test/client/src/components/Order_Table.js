import React from 'react';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import Complete from './Complete';
class Order_Table extends React.Component{
    render(){
        return(
            <TableRow>
                <TableCell>{this.props.Order_Num}</TableCell>
                <TableCell>{this.props.Take_Out}</TableCell>
                <TableCell>{this.props.Order_List}</TableCell>
                <TableCell>{this.props.Gender}</TableCell>
                <TableCell>{this.props.Age}</TableCell>
                <TableCell>{this.props.Cost}</TableCell>
                <TableCell>{this.props.Time}</TableCell>
                <TableCell><Complete stateRefresh={this.props.stateRefresh} Order_Num={this.props.Order_Num}/></TableCell>
            </TableRow>
        );
    }
}

export default Order_Table;