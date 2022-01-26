import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import axios from 'axios';

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



function Tab4(props){
  const classes = useStyles();
  const [Menu, setMenu] = useState(null);

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
      {(Menu)?
      <Grid container spacing={3}>
        <Grid item >
          <Paper className={classes.paper}>
            <div>재고</div>
          </Paper>
        </Grid>
        
      </Grid>:<p>로딩중.......</p>}
      
    </div>
  );
        
}
export default Tab4;