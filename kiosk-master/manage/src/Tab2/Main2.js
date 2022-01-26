import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Barchart from './Barchart';
import Linechart from './Linechart';
import Timechart from './Timechart';
import axios from 'axios';
import moment, { months } from 'moment';

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
  const [rowData, setRowData] = useState(null);
  const [Menu, setMenu] = useState(null);
  useEffect(async() => {//랜더링후실행
    try{
        const res = await axios.get('http://localhost:7000/api/all');
        var Data=res.data;
        console.log("Data",Data);;
        setRowData(Data);    
    } catch(e) {
        console.error(e.message)
    }
  },[])


 

  useEffect(async() => {
    try{
        const res = await axios.get('http://localhost:7000/api/menu');
        var Data=res.data;
        console.log("메뉴",Data);
        setMenu(Data);
    } catch(e) {
        console.error(e.message)
    }
  },[])
  
  // console.log("정보  "+pureData[7].Time+","+ typeof(pureData[7].Time));
  // console.log("요일:"+ moment(pureData[7].Time).format('GG'))
  //첨에 걍 res.data 가져오고 처넣엇더니만 안됏음
  //console.log("statedata",Data);//이것도 이해안감; 이건아직도안감ㅋ
  



    return (
      <div className={classes.root}>
      {(rowData&&Menu)?<Grid container spacing={3}>
        <Grid item >
          <Paper className={classes.paper}>
            <div>일별 판매량</div>
            <Barchart data={rowData}></Barchart>
            {/* <Barchart data={props.data.day}></Barchart> */}
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <div>월별 주요 판매 제품</div>
            <Linechart data={rowData} menu={Menu}></Linechart>
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
      </Grid>:<p>로딩중.......</p>}
      
    </div>
  );
        
}
export default Tab2;