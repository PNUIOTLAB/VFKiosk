
import React, {Component} from 'react';
import Order_Table from './Order_Table';
import { Paper } from '@material-ui/core';
import { Table } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import Order_Add from './Order_Add';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { alpha } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme=> ({
  root:{
    width: '100%',
    minWidth: 1080
  },
  menu:{
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper:{
    marginLeft: 18,
    marginRight: 18
  },
  progress:{
    margin: theme.spacing(2)
  },
  TableHead:{
    fontSize: '1.0rem'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
});

class Main1 extends Component {

 constructor(props){
   super(props);
   this.state = {
     Order_Tables: '',
     completed: 0
   }
 }

 stateRefresh = () =>{
   this.setState({
      Order_Tables:'',
      completed: 0
   });
   this.callApi()
    .then(res => this.setState({Order_Tables: res}))
    .catch(err => console.log(err));
  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 100);
    this.callApi()
      .then(res => this.setState({Order_Tables: res}))
      .catch(err => console.log(err))
  }

  callApi = async () =>{
    const response = await fetch('/api/order');
    const body = await response.json();
    return body;
  }

  progress = () =>{
    const {completed} = this.state;
    this.setState({completed: completed >= 102 ? -10 : completed + 2});
  }

  render() {
    const {classes} = this.props;
    const cellList = ["주문번호","포장여부","주문내역","성별","나이대","금액","시간","설정"]
    return( 
      <div className={classes.root}>
       
        <div className={classes.menu}>
          <Order_Add stateRefresh={this.stateRefresh}/>
        </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.TableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.Order_Tables ? this.state.Order_Tables.map(c=>{
                  return(
                  <Order_Table stateRefresh = {this.stateRefresh}
                    key={c.Order_Num}
                    Order_Num={c.Order_Num}
                    Take_Out={c.Take_Out}
                    Order_List={c.Order_List}
                    Gender={c.Gender}
                    Age={c.Age}
                    Cost={c.Cost}
                    Time={c.Time}
                  />);
                }) : 
                <TableRow>
                  <TableCell colSpan="8" align="center">
                    <CircularProgress className={classes.progress} variant = "determinate" value={this.state.completed}/>
                  </TableCell>
                </TableRow>
              } 
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  } 
}

export default withStyles(styles)(Main1);
