import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles, Grid,Container ,ButtonGroup,Button, TextField} from '@material-ui/core';
import {Table,Styles,tableColumnConfig} from './Table'
import DefaultLineChart from "./examples/Charts/LineCharts/DefaultLineChart";
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

export default function BasicTabs(props) {
  console.log(props)
  const { checkUserTable,checkInstanceTablebyUser,checkInstanceStatus,latencyResult,checkCostUsage,state,columns, data, tableSelctedItem,getInstanceCallback, ...other } = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Table" {...a11yProps(0)} />
          <Tab label="Chart" {...a11yProps(1)} />
          <Tab label="Content Dashboard" {...a11yProps(2)} />
          <Tab label="Remote Desktop" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel style={{minWidth:'100%',maxWidth:'100%',maxHeight:'100%',overflow:"scroll"}} value={value} index={0}>
          {/* <ButtonGroup > */}
                            {/* <Button label="UserTable" onClick={() =>checkUserTable(state)} style={{color:'black','backgroundColor':'#aafab1'}}>UserTable</Button> */}
                            <Button label="InstanceTable" onClick={() =>checkInstanceTablebyUser(state)} style={{color:'black','backgroundColor':'#aafab1'}}>InstanceTable</Button>
                            <Button label="InstanceTable-UpdateStatus" onClick={() =>checkInstanceStatus(state)} style={{color:'black','backgroundColor':'#aafab1'}}>InstanceTable-UpdateStatus</Button>
                            <Button label="LatencyTable" onClick={() => latencyResult(state)} style={{color:'black','backgroundColor':'#aafab1'}}>LatencyTable</Button>
                            <Button label="CostTable" onClick={() =>  checkCostUsage(state)} style={{color:'black','backgroundColor':'#aafab1'}}>CostTable</Button>
                            {/* <Button label="Launch the executable" onClick={() => this.LaunchApp("Result")} style={{color:'black','backgroundColor':'#aafab1'}}>Launch the executable</Button> */}
      
                      {/* </ButtonGroup> */}
            
          <Styles>
            <Table columns={columns} data={data} tableSelctedItem={tableSelctedItem} getInstanceCallback={getInstanceCallback} />
          </Styles>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <DefaultLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={{"labels":["A","B","C"],"datasets":{ label: "Mobile apps", data: [50, 40, 300] }}}
                  
                /> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>
    </Box>
  );
}