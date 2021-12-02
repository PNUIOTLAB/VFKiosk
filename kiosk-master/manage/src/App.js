
import './App.css';
import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TodayIcon from '@material-ui/icons/Today';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Data from './Data.json'
import Main1 from './Tab1/Main1'
import Main2 from './Tab2/Main2'
import Main3 from './Tab3/Main3'


/*const getPosts = async () => {
  const response = await axios.get('http://localhost:4000/posts');
  return response.data;
};*/



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs  value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab style={{fontWeight:"530",fontSize:"23px"}} icon = {<FormatListNumberedIcon />} label="주문 목록" {...a11yProps(0)} />
          <Tab style={{fontWeight:"500",fontSize:"23px"}} icon = {<TodayIcon />} label="기간별 통계" {...a11yProps(1)} />
          <Tab style={{fontWeight:"500",fontSize:"23px"}} icon = {<PermIdentityIcon />} label="계층별 통계" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}> {/* Tab 첫칸 부분 */}
        <Main1/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Main2 data={Data}/>
      </TabPanel>
      <TabPanel value={value} index={2}>  
        <Main3 data={Data}/>
      </TabPanel>
    </div>

    
  );
}

export default App;
