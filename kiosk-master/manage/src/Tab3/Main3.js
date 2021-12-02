import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Piechart from './Piechart';
import BarchartW from './BarchartW';
import BarchartM from './BarchartM';

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


function Tab3(props){
  const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item>
                    <Paper className={classes.paper}>
                        <h3>성별</h3>
                        <Grid  container spacing={3}>
                            <Grid container direction="column" spacing={2}>
                                    
                                <Grid item>
                                    <div>여성</div>
                                    <Piechart data={props.data.genderWoman} ></Piechart>
                                </Grid>
                                <Grid item>
                                    <div>남성</div>
                                    <Piechart data={props.data.genderMan}></Piechart>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <h2>나이대별 선호 매뉴ㅤㅤㅤ</h2>
                        <Grid container spacing={3}>
                            <Grid container direction="row" spacing={0}>    
                                <Grid item>
                                    <BarchartW data={props.data.genderageWoman} ></BarchartW>
                                </Grid>
                                
                                <Grid item>
                                    <BarchartM data={props.data.genderageMan} ></BarchartM>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                

            </Grid>
            
      
    </div>
  );
        
}
export default Tab3;