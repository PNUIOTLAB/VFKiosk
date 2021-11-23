import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Barchart from './Barchart';
import Linechart from './Linechart';
import Timechart from './Timechart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function Tab2(props){
  const classes = useStyles();
    return (
      <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item >
          <Paper className={classes.paper}>
            <div>일별 판매량</div>
            <Barchart data={props.data.day}></Barchart>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <div>월별 주요 판매 제품</div>
            <Linechart data={props.data.month}></Linechart>
            
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <div>일간 시간대별 혼잡도</div>
            <Timechart data={props.data.time}></Timechart>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <div>전주대비 증가도</div>
            <div>20%증가!</div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
        
}
export default Tab2;