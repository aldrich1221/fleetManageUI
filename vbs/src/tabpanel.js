import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles, Grid,Container ,ButtonGroup,Button, TextField} from '@material-ui/core';
import {Table,Styles,tableColumnConfig} from './Table'
import DefaultLineChart from "./examples/Charts/LineCharts/DefaultLineChart";
import DataTable from "./examples/Tables/DataTable";
// import data from "./layouts/dashboard/components/Projects/data";
import { Line } from 'react-chartjs-2';
import {Chart} from './chart.js'
import MDButton from "./components/MDButton";
import CircularProgress from '@mui/material/CircularProgress';
import Map, {Marker} from 'react-map-gl';
// import { Chart } from 'react-charts'
// import { Chart, registerables } from 'chart.js';

// import 'chart.js/auto'; // ADD THIS
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

// const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         label: 'First dataset',
//         data: [33, 53, 85, 41, 44, 65],
//         fill: true,
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)'
//       },
//       {
//         label: 'Second dataset',
//         data: [33, 25, 35, 51, 54, 76],
//         fill: false,
//         borderColor: '#742774',
//       },
//     ],
//   };
// const labels = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//   ];
//   const data = {
//     labels: labels,
//     datasets: [{
//       label: 'My First dataset',
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgb(255, 99, 132)',
//       data: [0, 10, 5, 2, 20, 30, 45],
//     }]
//   };
// const config = {
//     type: 'line',
//     data,
//     options: {}
//   };
// var  chartdatalist=[12, 19, 3, 5, 2, 3]
//   const ctx = document.getElementById('myChart');
//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       datasets: [{
//         label: '# of Votes',
//         data: chartdatalist,
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });

// function MyChart(props) {
//     const { data3, ...other } = props;

//     const data = React.useMemo(
//       () => [
//         {
//           label: 'Series 1',
//           data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
//         },
//         {
//           label: 'Series 2',
//           data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
//         }
//       ],
//       []
//     )
   
//     const axes = React.useMemo(
//       () => [
//         { primary: true, type: 'linear', position: 'bottom' },
//         { type: 'linear', position: 'left' }
//       ],
//       []
//     )
   
//     const lineChart = (
//       // A react-chart hyper-responsively and continuously fills the available
//       // space of its parent element automatically
//       <div
//         style={{
//           width: '400px',
//           height: '300px'
//         }}
//       >
//         <Chart data={data3} axes={axes} />
//       </div>
//     )
//   }
export default function BasicTabs(props) {
    // Chart.register(...registerables);
  console.log(props)
  const { checkUserTable,checkInstanceTablebyUser,checkInstanceStatus,latencyResult,checkCostUsage,state,columns, data, tableSelctedItem,getInstanceCallback,checkInstanceDetailTableStatus, ...other } = props;
  const {  chartdata,chartlabel} = props;
  const {deleteSelectedEC2,buttonclick_statusmanage}=props;
  
  const{costTableData,latencyTableData,instanceBasicTableData,instanceDetailTableData}=props;
  console.log("==== 4 Tables:",costTableData,latencyTableData,instanceBasicTableData,instanceDetailTableData,"===========")
  console.log(columns)
  console.log(data)
  const [value, setValue] = React.useState(0);
  const [selectedInstance, setSelectedInstance] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const column_latency=tableColumnConfig['latencyTable']
  const column_instanceDetail=tableColumnConfig['instanceDetailTable']
  const column_instanceBasic=tableColumnConfig['instanceTable']
  const column_cost=tableColumnConfig['costTable']

  const newrows=  data
  // selectInstance = (e) => {
  //   let idx = e.target.selectedIndex;
  //   let dataset = e.target.options[idx].dataset;

  //   setSelectedInstance(e.target.options[idx].value);
  //   // console.log('Choose zone : ',idx,e.target.options[idx].value);
  //   // this.setState({selected:e.target.options[idx].value, selectedServerIP:e.target.options[idx].serverIP})
  //   // this.setState({selected:e.target.options[idx].value, selectedServerIP:e.target.options[idx].serverIP})
   
  // }
// //   const ctx = document.getElementById('myChart');
// //   new Chart(ctx, {
// //     type: 'bar',
// //     data: {
// //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
// //       datasets: [{
// //         label: '# of Votes',
// //         data: [12, 19, 3, 5, 2, 3],
// //         borderWidth: 1
// //       }]
// //     },
// //     options: {
// //       scales: {
// //         y: {
// //           beginAtZero: true
// //         }
// //       }
// //     }
// //   });

//     const data = React.useMemo(
//     () => [
//       {
//         label: 'Series 1',
//         data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
//       },
//       {
//         label: 'Series 2',
//         data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
//       }
//     ],
//     []
//   )
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Basic Table" {...a11yProps(0)} />
          <Tab label="Detail Table" {...a11yProps(1)} />
          <Tab label="Latency Table" {...a11yProps(2)} />
          <Tab label="Cost Table" {...a11yProps(3)} />
          <Tab label="Chart" {...a11yProps(4)} />
          <Tab label="Content Dashboard" {...a11yProps(5)} />
          <Tab label="Remote Desktop" {...a11yProps(6)} />
         
        </Tabs>
      </Box>
      {/* <TabPanel style={{minWidth:'100%',maxWidth:'100%',maxHeight:'100%',overflow:"scroll"}} value={value} index={0}> */}
      <TabPanel value={value} index={0}> 
          {/* <ButtonGroup > */}
                            {/* <Button label="UserTable" onClick={() =>checkUserTable(state)} style={{color:'black','backgroundColor':'#aafab1'}}>UserTable</Button> */}
                            {buttonclick_statusmanage==true?<div><CircularProgress size="1rem"  color="secondary" />   processing...</div>:<div></div>}
                    
                            <Button label="InstanceTable" onClick={() =>checkInstanceTablebyUser(state.userinfo.id)}>InstanceTable-Basic</Button>
                         
                            {/* <Button label="Launch the executable" onClick={() => this.LaunchApp("Result")} style={{color:'black','backgroundColor':'#aafab1'}}>Launch the executable</Button> */}
      
                      {/* </ButtonGroup> */}
                <MDButton  variant="gradient" color="info" onClick={() => deleteSelectedEC2(state,"delete")}>Delete EC2 Instance</MDButton>
                <MDButton  variant="gradient" color="info" onClick={() => deleteSelectedEC2(state,"stop")}>Stop EC2 Instance</MDButton>
                <MDButton  variant="gradient" color="info" onClick={() => deleteSelectedEC2(state,"start")}>Start EC2 Instance</MDButton>
            
          <Styles>
          <div style={{minWidth:'100%',maxWidth:'100%',maxHeight:'100%',"overflowX":"scroll","overflowY":"auto"}}>
            <Table columns={column_instanceBasic} data={instanceBasicTableData} tableSelctedItem={tableSelctedItem} getInstanceCallback={getInstanceCallback} />
            </div>
          </Styles>
          </TabPanel>



      <TabPanel value={value} index={1} >
      {/* <MDButton  variant="gradient" color="info" onClick={() => deleteSelectedEC2(state,"start")}>Start EC2 Instance</MDButton> */}
          <Button label="InstanceTable-UpdateStatus" onClick={() =>checkInstanceDetailTableStatus(state,state.userinfo.id)} style={{color:'black','backgroundColor':'#aafab1'}}>InstanceTable-Detail</Button>
          {/* <MDButton label="InstanceTable-UpdateStatus" onClick={() =>checkInstanceDetailTableStatus(state,state.userinfo.id)} variant="gradient" color="info" >InstanceTable-Detail</MDButton> */}
          
          <Styles>
          <div style={{minWidth:'100%',maxWidth:'100%',maxHeight:'100%',"overflowX":"scroll","overflowY":"auto"}}>
            <Table columns={column_instanceDetail} data={instanceDetailTableData} tableSelctedItem={tableSelctedItem} getInstanceCallback={getInstanceCallback} />
          </div>
          </Styles>
                   
          </TabPanel>



<TabPanel value={value} index={2} style={{minWidth:'100%',maxWidth:'100%',maxHeight:'100%',overflow:"scroll"}} >
                            <Button label="LatencyTable" onClick={() => latencyResult(state)} style={{color:'black','backgroundColor':'#aafab1'}}>LatencyTable</Button>
                           
          <Styles>
          <div style={{minWidth:'100%',maxWidth:'100%',maxHeight:'100%',"overflowX":"scroll","overflowY":"auto"}}>
            <Table columns={column_latency} data={latencyTableData} tableSelctedItem={tableSelctedItem} getInstanceCallback={getInstanceCallback} />
          </div>
          </Styles>
          </TabPanel>



      <TabPanel value={value} index={3} style={{minWidth:'100%',maxWidth:'100%',maxHeight:'100%',overflow:"scroll"}} >
          <Button label="CostTable" onClick={() =>  checkCostUsage(state)} style={{color:'black','backgroundColor':'#aafab1'}}>CostTable</Button>
          <Styles>
          <div style={{minWidth:'100%',maxWidth:'100%',maxHeight:'100%',"overflowX":"scroll","overflowY":"auto"}}>
            <Table columns={column_cost} data={costTableData} tableSelctedItem={tableSelctedItem} getInstanceCallback={getInstanceCallback} />
          </div>
          </Styles>
      </TabPanel>



      <TabPanel value={value} index={4}>
      <Styles> <Button label="LatencyTable" onClick={() => latencyResult(state)} style={{color:'black','backgroundColor':'#aafab1'}}>LatencyTable</Button>
                           
                <Chart datas={chartdata} labels={chartlabel}></Chart>
              
                </Styles>
      </TabPanel>
      <TabPanel value={value} index={5} >
      <Styles> <Button label="LatencyTable" onClick={() => latencyResult(state)} style={{color:'black','backgroundColor':'#aafab1'}}>LatencyTable</Button>
              </Styles>
      </TabPanel>
      <TabPanel value={value} index={6} style={{minWidth:'100%',maxWidth:'100%',maxHeight:'100%',overflow:"scroll"}} >
      <Styles> <Button label="LatencyTable" onClick={() => latencyResult(state)} style={{color:'black','backgroundColor':'#aafab1'}}>LatencyTable</Button>
              
        Item Three
        </Styles>
      </TabPanel>
    </Box>
  );
}