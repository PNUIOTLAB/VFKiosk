import React from 'react';
import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

class Complete extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open:false
        }
    }

    handleClickOpen = () =>{
        this.setState({
            open: true
        });
    }

    handleClose = () =>{
        this.setState({
            open: false
        });
    }

    Ordercomplete(Order_Num){
        const url = '/api/order/' + Order_Num;
        fetch(url,{
            method:'DELETE'
        });
        this.props.stateRefresh();
    }
    render(){
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>주문완료</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle onClose={this.handleClose}>
                    완료 확인
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        주문을 완료합니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e)=>{this.Ordercomplete(this.props.Order_Num)}}>완료</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default Complete