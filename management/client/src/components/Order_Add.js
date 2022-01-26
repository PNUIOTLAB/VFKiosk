import React from 'react';
import {post} from 'axios';
import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
//import { withStyles } from '@material-ui/styles';


class Order_Add extends React.Component{

    constructor(props){
        super(props);
        this.state={
            Order_Num:'',
            Take_Out:'',
            Order_List:'',
            Gender:'',
            Age:'',
            Cost:'',
            open: false
        }
    }

    handleFormSubmit = (e) =>{
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            Order_Num:'',
            Take_Out:'',
            Order_List:'',
            Gender:'',
            Age:'',
            Cost:'',
            open: false
        });
        
    } 

    handleValueChange = (e) =>{
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () =>{
        const url = '/api/Order_Tables';
        const formData =  new URLSearchParams();
        //const formData =  new FormData();
        formData.append('Order_Num',this.state.Order_Num);
        formData.append('Take_Out',this.state.Take_Out);
        formData.append('Order_List',this.state.Order_List);
        formData.append('Gender',this.state.Gender);
        formData.append('Age',this.state.Age);
        formData.append('Cost',this.state.Cost);
        console.log(formData);
        return post(url, formData);
    }

    handleClickOpen = () =>{
        this.setState({
            open: true
        });
    }

    handleClose = () =>{
        this.setState({
            Order_Num:'',
            Take_Out:'',
            Order_List:'',
            Gender:'',
            Age:'',
            Cost:'',
            open: false
        });
    }

    render(){
       // const {classes} = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    주문하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>주문 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="주문번호" type="int" name="Order_Num" value={this.state.Order_Num} onChange={this.handleValueChange}/><br/>
                        <TextField label="포장여부" type="bool" name="Take_Out" value={this.state.Take_Out} onChange={this.handleValueChange}/><br/>
                        <TextField label="주문내역" type="text" name="Order_List" value={this.state.Order_List} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" type="text" name="Gender" value={this.state.Gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="나이" type="int" name="Age" value={this.state.Age} onChange={this.handleValueChange}/><br/>
                        <TextField label="금액" type="int" name="Cost" value={this.state.Cost} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default Order_Add;