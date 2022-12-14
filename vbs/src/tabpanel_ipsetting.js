import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MDButton from "./components/MDButton";
import { makeStyles, Grid,Container ,ButtonGroup,Button, TextField} from '@material-ui/core';
import {Table,Styles,tableColumnConfig} from './Table'
import DefaultLineChart from "./examples/Charts/LineCharts/DefaultLineChart";
import MDBox from "./components/MDBox";
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs_ipsetting(props) {
  console.log(props)
  const { downloadVBSIpSetting,downloadCilentServer,sendMessage,state, ...other } = props;

  const [value, setValue] = React.useState(0);
  const [herfvalue, setHerfvalue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="using USB" {...a11yProps(0)} />
          <Tab label="using BlueTooth" {...a11yProps(1)} />
        
        </Tabs>
      </Box>
      {/* <TabPanel style={{minWidth:'100%',maxWidth:'100%',overflow:"scroll"}} value={value} index={0}> */}
    <TabPanel  value={value} index={0}>
        
     
                      {/* <MDBox mb={3}>
                       
                          {/* <MDButton style={{textTransform: 'none'}}
                              component="a"
                              href="./setIP.html"
                              target="_blank"
                              rel="noreferrer"
                              variant="gradient"
                              color="info"
                             
                            >
                              Browser Trigger and USB( IE only)
                     
                     </MDButton> */}
                     
                     {/* </MDBox> */} 
                     Please follow the guidelines as below:
                     <MDBox mb={1}>
                     First,download
                     <Button  variant="outlined" color="info"  style={{textTransform: 'none'}} onClick={() => downloadCilentServer(state.assignedIP)}>CilentServer</Button> and execute the ClientServer: server.exe
                     </MDBox>
                     
                   
                     <MDBox mb={1}>
                     Then,download
                     <Button  variant="outlined" color="info" style={{textTransform: 'none'}} onClick={() => downloadVBSIpSetting(state.assignedIP)}>VBSIpSetting</Button>
                      tool
                      </MDBox>
                     <MDBox mb={1}>
                     Finally,click 
                     <Button  variant="outlined" color="info" style={{textTransform: 'none'}} onClick={() => sendMessage(state.assignedIP)}>sendIP</Button>
                     to trigger ip setting.
        </MDBox>
        <MDBox mb={3}>
        </MDBox>
      </TabPanel>
      {/* <TabPanel style={{minWidth:'100%',maxWidth:'100%',overflow:"scroll"}}  value={value} index={1}> */}
      <TabPanel   value={value} index={1}>
        BlueTooth
      </TabPanel>
     
    </Box>
  );
}