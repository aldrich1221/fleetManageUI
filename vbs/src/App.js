"use strict";

import logo from './logo.svg';
import './App.css';
import React, {Component,useState, useEffect,useMemo } from 'react';
import { makeStyles, Grid,Box,Container ,ButtonGroup,Button, TextField} from '@material-ui/core';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { flexbox } from '@material-ui/system';
import styled from 'styled-components'
import uuid from 'react-uuid';
import {Table,Styles,tableColumnConfig} from './Table'
import { useTable,usePagination, useRowSelect } from 'react-table'
import { timer } from 'timer';
import { InputGroup, FormControl, Input } from "react-bootstrap";
import Plot from 'react-plotly.js';
import { sizing } from '@material-ui/system/';
import GoogleMap from "google-maps-react-markers"

import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Checkboxes from './appidcheckbox.js'

// import Map, {Marker} from 'react-map-gl';
// const [inputTitle, setInputTitle] = useState('');
// import CommandLine from 'react-command-line';
// // import React, { Component } from "react";
// const { Box ,Text} = require("ink");
// const TextInput = require("ink-text-input").default;
// import blessed from "blessed";
// import { render } from "react-blessed";
// import figlet from 'figlet'
// import path from 'path';
// import ncp from 'ncp';
// import List from 'listr'
// import { promisify } from 'util';
////////////////////////////////////////////////
import Progressbar from './Progress_bar';
import CircularProgressWithLabel from './CircularProgressWithLabel.js'
import Card from "@mui/material/Card";
import BasicTabs from './tabpanel';
import BasicTabs_ipsetting from './tabpanel_ipsetting';
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./assets/theme";
import { ThemeProvider } from "@mui/material/styles";
import MDBox from "./components/MDBox";
import MDTypography from "./components/MDTypography";
// import Button from "./components/Button";
// Material Dashboard 2 React example components
import DashboardLayout from "./examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "./examples/Navbars/DashboardNavbar";
import Footer from "./examples/Footer";
import ReportsBarChart from "./examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "./examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "./examples/Cards/StatisticsCards/ComplexStatisticsCard";
// import routes from "./routes";
// import DashboardNavbar from "./examples/Navbars/DashboardNavbar";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AWS from 'aws-sdk';
import { touchRippleClasses } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet'
import {Chart} from './chart.js'

// import {Map} from './googlemap.ts';
// import fsreact from 'fs-react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const axios = require('axios');
const APIs={
  'CreateEC2':'https://i5b137gkg6.execute-api.us-east-1.amazonaws.com/prod/v1',
  'DeleteEC2':'https://jgw43jh500.execute-api.us-east-1.amazonaws.com/prod/v1',
  'QueryDB':' https://w8mk0bw6t9.execute-api.us-east-1.amazonaws.com/prod/v1',
  'AnalysisIP':'https://b0diuhkc9f.execute-api.us-east-1.amazonaws.com/prod/v1',
  'CostUsage':'https://vgwh8al5v1.execute-api.us-east-1.amazonaws.com/prod/v1',
  'Metrics':'https://fzghypjvb1.execute-api.us-east-1.amazonaws.com/prod/v1',
  // 'LatencyTest':'https://9prtgwbcnf.execute-api.us-east-1.amazonaws.com/prod/v1',
  'LatencyTest':'https://us1ubzsdg8.execute-api.us-east-1.amazonaws.com/prod/v1',
  'Test': 'https://9prtgwbcnf.execute-api.us-east-1.amazonaws.com/prod/v1',
  
  'SendCommand':'https://sf43cgtn5g.execute-api.us-east-1.amazonaws.com/prod/v1',
  'UpdateDB':'https://hjkjl682ci.execute-api.us-east-1.amazonaws.com/prod/v1',
  'EC2Rescue':"https://r9e89v6dml.execute-api.us-east-1.amazonaws.com/prod/v1",
  'Network':"https://uhsyifylcd.execute-api.us-east-1.amazonaws.com/prod/v1"
  
}

const pako = require('pako');


var pingTimeGlobal=9999
// var ws = new WebSocket("ws://localhost:5500/");
const useStyles = makeStyles((theme) => ({
  container: {
    minHeight:400,
    display:'flex',
      border: '3px solid purple',
      padding: '10px',
      [theme.breakpoints.down('md')]: {
          textAlign: 'center',
      },
  },
  item: {
      minHeight:400,
      border: '1px solid lightblue',
   
  },
}));
// Fixed number of columns
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)"
};

// Variable number of columns
const gridContainer2 = {
  display: "grid",
  gridAutoColumns: "1fr",
  gridAutoFlow: "column"
};

const gridItem = {
  margin: "8px",
  border: "1px solid red"
};
const section1 = {
  minHeight:70,
  height: "100%",
  paddingTop: 5,
  backgroundColor: "#f9c81e",
  　color:'black',
  　'fontWeight':'bold',
 
};
const section2 = {
  minHeight:600,
  height: "100%",
  paddingTop: 5,
  backgroundColor:'#fffab1',
  　color:'black',
  　'fontWeight':'bold',
 
};
const section2_1 = {
  minHeight:300,
  height: "100%",
  paddingTop: 5,
  backgroundColor:'#fffab1',
  　color:'black',
  　'fontWeight':'bold',
  border:'solid'
};
const section2_2 = {
  
  minHeight:300,
  height: "100%",
  paddingTop: 5,
  backgroundColor:'#fffab1',
  　color:'black',
  　'fontWeight':'bold',
  border:'solid'
 
};
const section3 = {
  minHeight:600,
  height: "100%",
  paddingTop: 5,
  backgroundColor:'#f2fac3',
  　color:'black',
  　'fontWeight':'bold',
  border:'solid'
};

const section_result = {
  minHeight:350,
  height: "100%",
  paddingTop: 5,
  // backgroundColor:'black',
  // 　color:'yellow',
  // 　'fontWeight':'bold',
  maxHeight:350,
  overflow:'scroll'
  
  
};
const section4 = {
  minHeight:350,
  height: "100%",
  paddingTop: 5,
  backgroundColor:'black',
  　color:'yellow',
  　'fontWeight':'bold',
  maxHeight:350,
  overflow:'scroll'
  
  
};

class ChildComponent extends Component {
  
  componentDidUpdate(){
    const {websocket,socketParamter,sendFlag,socketSend} = this.props;
    console.log(sendFlag)
    if (sendFlag==true & this.prev){
      this.sendMessage()
      socketSend(false)
    }

  }
  // sendMessage=()=>{
  //     const {websocket,socketParamter} = this.props // websocket instance passed as props to the child component.
  //     var data=socketParamter   
  //     try {
  //         websocket.send(data) //send data to the server
  //     } catch (error) {
  //         console.log(error) // catch error
  //     }
  // }
  render() {
      return (
          <div>
             This Socket
          </div>
      );
  }
}


class App extends Component {
  
  constructor() {
    super();
    
    this.state = {
      ws:null,
      sendFlag:false,
      socketParamter:{'action':'assign','instanceip':'123456'},
      commandtext: "",
      command:"",
      defaultCommandValue:"",

      tableColumnState:'instanceTable',
      tableDataState:[{'firstName':'None'}],
      tableSelctedItem:[],

      userinfo: {ip:null,city:null,id:null,name:null,type:null,other:{'WeeklyCostSum':'','DailyCostList':[],'instanceQuota':'','useremail':'','userAMI':''}},
      suitableZones:[],
      assignedIP:'',
      countries: [],
      analysisMethods:[],
      selectedZone:"Default",
      selectedServerIP:"",
      selectedInstanceType:"g4dn.xlarge",
      selectedInstanceId:'No',
      createdInstanceInfo:{'data':'Nothing'},
      selectedAnalysisMethod: 'Latency_Global_byInstance',
      selectedRescueAction:'EC2Rescue-collect-eventlog',
      userHelpString:"Helper: Please click 'Analyze Regions' button",
      latencyTable:[{'latencyTest':[{id: "zone",Ave_bits_per_second:"Average of bits per second",Ave_lost_percent:"Average of lost percent",Ave_jitter_ms: "Average of jitter_ms", ip:"instance IP",ec2id:"instance ID",instanceCity:"instanceCity",instanceCountry:"instanceCountry",result:"Latency",status:"Status"}]}],
      instanceTable:{},
      displayTable:[],
      latencyResult:[{}],
      latencyTestStatus:'NoIPs',
      pingTimeState:0,
      checkedSpotInstanceConfig:false,

      instanceBasicTableDataState:[],
      instanceDetailTableDataState:[],
      latencyTableDataState:[],
      costTableDataState:[],

      // tableColumnState:'basic',
      tableDataState:[],
      tableSelctedItem:[],
      selectedinstanceIdString:'No instance',
      ButtonGroupLabel:'Result',
      resultDisplayString:'',
      urlString:'',
      latencyTestInstanceIds2:[],
      latencyTestInstanceIds:[],
      
      appidlist:[],

      chartdata:[],
      chartlabel:[],

      buttonclick_createEC2:false,
      buttonclick_findbestregion:false,
      buttonclick_statusmanage:false,
      selectedAMI:"withsteam",
      processbarStatus:'0',
      instanceType: [
        {id: 'g4dn.2xlarge', name: 'g4dn.2xlarge'},
        {id: 'g4dn.xlarge', name: 'g4dn.xlarge'},
        {id: 't3.medium', name: 't3.medium'},
        
      ],
      analysisMethods: [
        // {id: 'Geolocation_Global', name: 'Geolocation_Global'},
        {id: 'Latency_Global_byInstance', name: 'Latency_Global_byInstance '},
        // {id: 'Latency_Global_byAWSDefaultRegion', name: 'Latency_Global_byAWSDefaultRegion'},
      ],
      rescueActions: [
        {id: 'EC2Rescue-collect-all', name: 'EC2Rescue-collect-all'},
        {id: 'EC2Rescue-collect-eventlog', name: 'EC2Rescue-collect-eventlog'},
        {id: 'EC2Rescue-collect-sysprep', name: 'EC2Rescue-collect-sysprep'},
        {id: 'EC2Rescue-collect-egpu', name: 'EC2Rescue-collect-egpu'},
        {id: 'EC2Rescue-collect-driver-setup', name: 'EC2Rescue-collect-driver-setup'},
        {id: 'EC2Rescue-rescue-network', name: 'EC2Rescue-rescue-network'},

      ],
      
    };
    this.manageEC2=this.manageEC2.bind(this)
    this.getTest=this.getTest.bind(this);
    this.postTest=this.postTest.bind(this);
    this.putTest=this.putTest.bind(this);
    
    this.createEC2_v2=this.createEC2_v2.bind(this);
    this.onKeyUp=this.onKeyUp.bind(this);
    this.deleteLatencyTestInstance=this.deleteLatencyTestInstance.bind(this);
    this.handleClickPing=this.handleClickPing.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.selectAMI=this.selectAMI.bind(this)
    this.selectAnalysisMethod = this.selectAnalysisMethod.bind(this);
    this.selectRescueAction=this.selectRescueAction.bind(this);
    this.latencyResult=this.latencyResult.bind(this);
    this.myPingFunc4=this.myPingFunc4.bind(this);
    this.checkPing=this.checkPing.bind(this);
    this.checkCostUsage=this.checkCostUsage.bind(this);
    this.checkInstanceStatus=this.checkInstanceStatus.bind(this);
    this.checkInstanceDetailTableStatus=this.checkInstanceDetailTableStatus.bind(this)
    this.reactTableInstance=this.reactTableInstance.bind(this);
    this.deleteSelectedEC2=this.deleteSelectedEC2.bind(this);
    this.findBestRegion=this.findBestRegion.bind(this);
    this.generateUUID=this.generateUUID.bind(this);
    this.createLatencyTestInstance=this.createLatencyTestInstance.bind(this);
    this.sendCommand=this.sendCommand.bind(this);
    this.ButtonGroupClick=this.ButtonGroupClick.bind(this);
    this.checkInstanceRouteAnalysis=this.checkInstanceRouteAnalysis.bind(this);
    this.issuehandle=this.issuehandle.bind(this);
    this.handleUrlChange=this. handleUrlChange.bind(this);
    this.addLatencyDB=this.addLatencyDB.bind(this);
    this.resultClear=this.resultClear.bind(this);
    this.rdpConnect=this.rdpConnect.bind(this);
    this.socketSend=this.socketSend.bind(this);
    this.sendMessage=this.sendMessage.bind(this);
    this.downloadVBSIpSetting=this.downloadVBSIpSetting.bind(this);
    this.downloadCilentServer=this.downloadCilentServer.bind(this);
    this.downloadFlowLogs=this.downloadFlowLogs.bind(this);
    this.getUserInfo=this.getUserInfo.bind(this);
    this.checkInstanceTablebyUser=this.checkInstanceTablebyUser.bind(this);
    this.checkLatencyTablebyCity=this.checkLatencyTablebyCity.bind(this);
    this.handleChangeSwithSpotInstanceConfig=this.handleChangeSwithSpotInstanceConfig.bind(this);
  }

  handleChangeAPPSelectList=(item,action)=>{
    console.log(item,action)
    var templist=this.state.appidlist
    if (action=='add'){
      templist.push(item['appid'])
    }
    else{
      
    for( var i = 0; i < templist.length; i++){ 
    
      if ( templist[i] === item['appid']) { 
  
        templist.splice(i, 1); 
      }
  
  }
      // templist.remove(item['appid'])

    }
    this.setState({appidlist:templist})
    console.log("checkbox:",this.state.appidlist,templist)
    
  }

  handleChangeSwithSpotInstanceConfig=()=>{
    if (this.state.checkedSpotInstanceConfig){
      this.setState({checkedSpotInstanceConfig:false})
    }else{
      this.setState({checkedSpotInstanceConfig:true})
    }
   
   
  }
  sendMessage=(ip)=>{
    var url="http://localhost:9090/setip2"
    fetch(url)
    .then(response => response.json())
    .then(data => {

      console.log("=========local server=========== ")
      console.log(data)

    })

    
}
  socketSend(flag) {
    this.setState({
      sendFlag:flag
    })
  }

//   componentDidMount() {
//     ws = new WebSocket("ws://localhost:5500/");
//     ws.onopen = () => {
//     // on connecting, do nothing but log it to the console
//     console.log('connected')
//     }

//     ws.onmessage = evt => {
//     // listen to data sent from the websocket server
//     const message = JSON.parse(evt.data)
//     this.setState({dataFromServer: message})
//     console.log(message)
//     }

//     ws.onclose = () => {
//     console.log('disconnected')
//     // automatically try to reconnect on connection loss

//     }

// }

  createFlowLogs=async (e)=>{

  
    var datalist=e.tableDataState
    var userid=e.userinfo.id
    console.log("=========call  checkInstanceStatus=========== ")
    var ec2ids=[]
    var regions=[]
    for (let i = 0; i < datalist.length; i++) {  
      ec2ids.push(datalist[i].instanceId)
      regions.push(datalist[i].region)
    }
    
    
    var url=APIs['Network']+'/user/'+userid+'/ec2/*'
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization':'allow',
        'authorizationtoken':'allow',
       },
      body: JSON.stringify({ 
        "ec2ids": ec2ids,
        "regions":regions,
        "action":'create_flow_logs'
    })
    };
    console.log("=========call  requestOptions=========== ")
    console.log(requestOptions)
    
    var newDataList=[]
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {

          console.log("=========create_flow_logs=========== ")
          console.log(data)

        })
    


}
resultClear=async ()=>{
  this.setState({
    resultDisplayString:''
  })
}
addLatencyDB=async (data) =>{
  var url=APIs['UpdateDB']
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      "TableName": "VBS_Latency_Test",
      "action":"add",
      "data":data
  })
  };
  console.log("=========call  requestOptions=========== ")
  console.log(requestOptions)
  console.log(url)
  var newDataList=[]
  fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("=========call  requestOptions=========== ")
        console.log(data)

      })

}
myPingFunc4 =async (fqdn,availableFlag) =>{

  var NB_ITERATIONS = 1; // number of loop iterations
  var MAX_ITERATIONS = 2; // beware: the number of simultaneous XMLHttpRequest is limited by the browser!
  var TIME_PERIOD = 1000; // 1000 ms between each ping
  var i = 0;
  var over_flag = 0;
  var time_cumul = 0;
  var REQUEST_TIMEOUT = 15000;
  var TIMEOUT_ERROR = 0;
  // var availableFlag=false;
  var AVELatency=null
  // document.getElementById('result').innerHTML = "HTTP ping for " + fqdn + "</br>";
  console.log(" myPingFunc2 Click")
  // var ping_loop = setInterval(function(pingTimeGlobal) {
  while(i<6){
          await timer(1000)
          // let's change non-existent URL each time to avoid possible side effect with web proxy-cache software on the line
          // var url = "http://" + fqdn + "/a30Fkezt_77" + Math.random().toString(36).substring(7);
          var url=fqdn
          // var url = "http://" + fqdn
          if (i < MAX_ITERATIONS) {
              var ping = new XMLHttpRequest();
                  
              
              ping.seq = i;
              over_flag++;
              ping.timeout = REQUEST_TIMEOUT; // it could happen that the request takes a very long time
              ping.date1 = Date.now();
              ping.onreadystatechange = function() { // the request has returned something, let's log it (starting after the first one)
                
                  if (ping.readyState == 4 && TIMEOUT_ERROR == 0) {
                      if (ping.seq > 1) {
                          var delta_time = Date.now() - ping.date1;
                          time_cumul += delta_time;
                          console.log("http_seq=" + (ping.seq-1) + " time=" + delta_time + " ms")
                          // document.getElementById('result').innerHTML += "</br>http_seq=" + (ping.seq-1) + " time=" + delta_time + " ms</br>";
                          console.log("----------------",delta_time,(delta_time<1000),availableFlag,"-----------");
                          if (delta_time<1000){
                            availableFlag=true
                            console.log("----------------",availableFlag,"-----------");

                          }
                      
                        }
                      over_flag--;
                  }
              }
  

              ping.ontimeout = function() {
                  TIMEOUT_ERROR = 1;
              }

              ping.open("GET", url, true);
              // ping.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
              
              ping.onload = () => {
                if (ping.readyState === ping.DONE) {
                  if (ping.status === 200) {
                    console.log(ping.response);
                    console.log(ping.responseText);
                    availableFlag=true
                  }
                }
              };
              ping.send();
              
            
  
          }
  
          // if ((i > NB_ITERATIONS) && (over_flag < 1)) { // all requests are passed and have returned
          if (i > NB_ITERATIONS) {
              // clearInterval(ping_loop);
              var avg_time = Math.round(time_cumul / (i - 1));
             
              console.log("avg_time",avg_time)
              pingTimeGlobal=avg_time
              break
              // document.getElementById('result').innerHTML += "</br> Average ping latency on " + (i-1) + " iterations: " + avg_time + "ms </br>";
              // return AVELatency
          }
  
          // if (TIMEOUT_ERROR == 1) { // timeout: data cannot be accurate
  
          //     clearInterval(ping_loop);
          //     // document.getElementById('result').innerHTML += "<br/> THERE WAS A TIMEOUT ERROR <br/>";
          //     return;
  
          // }
  
      // }, TIME_PERIOD);
      i++;
        }

      console.log("AVELatency",avg_time,AVELatency,pingTimeGlobal)
      console.log("Check latencytest instance available",availableFlag)
      // this.setState({pingTimeState:avg_time})
      // return avg_time,availableFlag
      return availableFlag
}


checkPing=async (fqdn,availableFlag) =>{

        var NB_ITERATIONS = 1; // number of loop iterations
        var MAX_ITERATIONS = 2; // beware: the number of simultaneous XMLHttpRequest is limited by the browser!
        var TIME_PERIOD = 1000; // 1000 ms between each ping
        var i = 0;
        var over_flag = 0;
        var time_cumul = 0;
        var REQUEST_TIMEOUT = 15000;
        var TIMEOUT_ERROR = 0;
        var delta_time=0
        var times=[]
        // var availableFlag=false;
        var AVELatency=null
        // document.getElementById('result').innerHTML = "HTTP ping for " + fqdn + "</br>";
        console.log(" myPingFunc2 Click")
        // var ping_loop = setInterval(function(pingTimeGlobal) {
          var whileFlag=true
          while(whileFlag){
              await timer(700)
                  // let's change non-existent URL each time to avoid possible side effect with web proxy-cache software on the line
                  var url =fqdn 
                  console.log("--------- Ping----",url);        
                  // var url = "http://" + fqdn
                  if (i < MAX_ITERATIONS) {
                      var ping = new XMLHttpRequest();
                      // ping.setRequestHeader('Access-Control-Allow-Origin', 'https://d1wzk0972nk23y.cloudfront.net/')
                      
                      ping.seq = i;
                      over_flag++;
                      ping.timeout = REQUEST_TIMEOUT; // it could happen that the request takes a very long time
                      ping.date1 = Date.now();
                      ping.onreadystatechange = function() { // the request has returned something, let's log it (starting after the first one)
          
                          if (ping.readyState == 4 && TIMEOUT_ERROR == 0) {
                              if (ping.seq > 1) {
                                  delta_time = Date.now() - ping.date1;
                                  if (delta_time<900){
                                    times.push(delta_time)
                                    availableFlag=true
                                  }
                                  else{
                                    i=i-1
                                  }
    
                                  
                                  // time_cumul += delta_time;
                                  console.log("http_seq=" + (ping.seq-1) + " time=" + delta_time + " ms",times)
                                  // document.getElementById('result').innerHTML += "</br>http_seq=" + (ping.seq-1) + " time=" + delta_time + " ms</br>";
                              }
                              over_flag--;
                          }
                      }
                      ping.ontimeout = function() {
                          TIMEOUT_ERROR = 1;
                      }
          
                      ping.open("GET", url, true);
                      ping.send();
          
                  }
          
                  if ((i >= MAX_ITERATIONS) && (over_flag <1)) { // all requests are passed and have returned
          
                   
                      whileFlag=false
                  }
          
                  if (TIMEOUT_ERROR == 1) { // timeout: data cannot be accurate
                    console.log("SomeError")
                    i=i-1
                  //     // clearInterval(ping_loop);
                  //     // document.getElementById('result').innerHTML += "<br/> THERE WAS A TIMEOUT ERROR <br/>";
                  //     return;
                    
                  }
                  if (over_flag >=1){
                    if (i >= MAX_ITERATIONS){
                    whileFlag=false
                    }
                  }
                  console.log(TIMEOUT_ERROR,over_flag)
              // }, TIME_PERIOD);
                i++;
                }

      // console.log("AVELatency",avg_time,AVELatency,pingTimeGlobal)
      console.log("Check latencytest instance available",availableFlag)
      // this.setState({pingTimeState:avg_time})
      // return avg_time,availableFlag
      return availableFlag

}

httppingtest=async (data) =>{

  var pingResult=[]
  let items2 = []; 
  var times=[]        
  var ping = new XMLHttpRequest();
  var delta_time=0

  var progress=20
  var progressinterval=60/data.length
  this.setState({processbarStatus:'30'})
  for (let j = 0; j < data.length; j++) {   
      
      var serverIP=data[j].instanceIP
      var serverpublicDNS=data[j].publicDnsName
      var serverID=data[j].instanceid
      var serverCity=data[j].instanceCity
      var serverCountry=data[j].instanceCountry
      var serverZone=data[j].zone
      
      this.setState({userHelpString:'Now ping '+serverZone})
     
    
      
      // var fqdn=serverIP
      var fqdn="https://"+serverIP+'.nip.io'
      var NB_ITERATIONS = 6; // number of loop iterations
      var MAX_ITERATIONS = 7; // beware: the number of simultaneous XMLHttpRequest is limited by the browser!
      var TIME_PERIOD = 1000; // 1000 ms between each ping
      var i = 0;
      var over_flag = 0;
      var time_cumul = 0;
      var REQUEST_TIMEOUT = 5000;
      var TIMEOUT_ERROR = 0;
  
      times=[]
  
      // document.getElementById('result').innerHTML = "HTTP ping for " + fqdn + "</br>";
      console.log(" myPingFunc2 Click")
      // var ping_loop = setInterval(function() {
      var whileFlag=true
      while(whileFlag){
          await timer(700)
              // let's change non-existent URL each time to avoid possible side effect with web proxy-cache software on the line
              var url =fqdn 
              console.log("--------- Ping----",url,serverZone);        
              // var url = "http://" + fqdn
              if (i < MAX_ITERATIONS) {
                  ping = new XMLHttpRequest();
                  // ping.setRequestHeader('Access-Control-Allow-Origin', 'https://d1wzk0972nk23y.cloudfront.net/')
                  
                  ping.seq = i;
                  over_flag++;
                  ping.timeout = REQUEST_TIMEOUT; // it could happen that the request takes a very long time
                  ping.date1 = Date.now();
                  ping.onreadystatechange = function() { // the request has returned something, let's log it (starting after the first one)
      
                      if (ping.readyState == 4 && TIMEOUT_ERROR == 0) {
                          if (ping.seq > 1) {
                              delta_time = Date.now() - ping.date1;
                              if (delta_time<900){
                                times.push(delta_time)
                              }
                              else{
                                i=i-1
                              }

                              
                              // time_cumul += delta_time;
                              console.log("http_seq=" + (ping.seq-1) + " time=" + delta_time + " ms",times)
                              // document.getElementById('result').innerHTML += "</br>http_seq=" + (ping.seq-1) + " time=" + delta_time + " ms</br>";
                          }
                          over_flag--;
                      }
                  }
                  ping.ontimeout = function() {
                      TIMEOUT_ERROR = 1;
                  }
      
                  ping.open("GET", url, true);
                  ping.send();
      
              }
      
              if ((i >= MAX_ITERATIONS) && (over_flag <1)) { // all requests are passed and have returned
      
               
                  whileFlag=false
              }
      
              if (TIMEOUT_ERROR == 1) { // timeout: data cannot be accurate
                console.log("SomeError")
                i=i-1
              //     // clearInterval(ping_loop);
              //     // document.getElementById('result').innerHTML += "<br/> THERE WAS A TIMEOUT ERROR <br/>";
              //     return;
                
              }
              if (over_flag >=1){
                if (i >= MAX_ITERATIONS){
                whileFlag=false
                }
              }
              console.log(TIMEOUT_ERROR,over_flag)
          // }, TIME_PERIOD);
            i++;
            }
            
          var sum = times.reduce((a, b) => a + b, 0);
          var avg_time = sum/times.length;
          console.log(times,'pingTime', avg_time)
    data[j].latency=(avg_time).toString()

    this.setState({processbarStatus:'70'})
    pingResult.push({'serverIP':serverIP,'serverID':serverID,'pingTime': avg_time})
    items2.push({itemString:" " , id: serverZone, city: serverCity,country:serverCountry,result: avg_time});   
      
    }
  console.log("=========update latency table=====",data)
  this.addLatencyDB(data)
  items2.sort((a, b) => (a.result > b.result) ? 1 : -1)
  console.log("=========completed ping=====",items2)
   // this.setState({
    //   latencyTestInstanceIds:data[0]['data'][0]['instanceData']
    // })
  this.setState({ 
    latencyResult :pingResult, 
    countries: items2,
    selectedZone:items2[0].id,
    selectedServerIP:pingResult[0].serverIP,
    latencyTestInstanceIds:data,
    processbarStatus:'90'
  });
}

httpspingtest=async (data) =>{

  var pingResult=[]
  let items2 = []; 
  var times=[]        
  var ping = new XMLHttpRequest();
  var delta_time=0
  for (let j = 0; j < data.length; j++) {   
      
      var serverIP=data[j].instanceIP
      var serverID=data[j].instanceid
      var serverCity=data[j].instanceCity
      var serverCountry=data[j].instanceCountry
      var serverZone=data[j].zone

      this.setState({userHelpString:'Now ping '+serverZone})
      console.log("--------- Ping----",data);
    
      
      var fqdn=serverIP
      var NB_ITERATIONS = 2; // number of loop iterations
      var MAX_ITERATIONS = 3; // beware: the number of simultaneous XMLHttpRequest is limited by the browser!
      var TIME_PERIOD = 1000; // 1000 ms between each ping
      var i = 0;
      var over_flag = 0;
      var time_cumul = 0;
      var REQUEST_TIMEOUT = 5000;
      var TIMEOUT_ERROR = 0;
  
      times=[]
  
      // document.getElementById('result').innerHTML = "HTTP ping for " + fqdn + "</br>";
      console.log(" myPingFunc2 Click")
      // var ping_loop = setInterval(function() {
      var whileFlag=true
      while(whileFlag){
          await timer(1000)
              // let's change non-existent URL each time to avoid possible side effect with web proxy-cache software on the line
              var url = "https://" + fqdn + "/a30Fkezt_77" + Math.random().toString(36).substring(7);
              // var url = "http://" + fqdn
              if (i < MAX_ITERATIONS) {
                  ping = new XMLHttpRequest();
                  
                  ping.seq = i;
                  over_flag++;
                  ping.timeout = REQUEST_TIMEOUT; // it could happen that the request takes a very long time
                  ping.date1 = Date.now();
                  ping.onreadystatechange = function() { // the request has returned something, let's log it (starting after the first one)
                  
                      if (ping.readyState == 4 && TIMEOUT_ERROR == 0) {
                          if (ping.seq > 1) {
                              delta_time = Date.now() - ping.date1;
                              if(delta_time<600){
                                times.push(delta_time)
                              }
                              else{
                                i=i-1
                              }

                              
                              // time_cumul += delta_time;
                              console.log("http_seq=" + (ping.seq-1) + " time=" + delta_time + " ms",times)
                              // document.getElementById('result').innerHTML += "</br>http_seq=" + (ping.seq-1) + " time=" + delta_time + " ms</br>";
                          }
                          over_flag--;
                      }
                  }
                  ping.ontimeout = function() {
                      TIMEOUT_ERROR = 1;
                  }

                  ping.open("GET", url, true);
                  ping.send();
      
              }
      
              if ((i >= MAX_ITERATIONS) && (over_flag <1)) { // all requests are passed and have returned
      
               
                  whileFlag=false
              }
      
              if (TIMEOUT_ERROR == 1) { // timeout: data cannot be accurate
                console.log("SomeError")
              //     // clearInterval(ping_loop);
              //     // document.getElementById('result').innerHTML += "<br/> THERE WAS A TIMEOUT ERROR <br/>";
              //     return;
                
              }
              if (over_flag >=1){
                if (i >= MAX_ITERATIONS){
                whileFlag=false
                }
              }
              console.log(TIMEOUT_ERROR,over_flag)
          // }, TIME_PERIOD);
            i++;
            }
        
          var sum = times.reduce((a, b) => a + b, 0);
          var avg_time = sum/times.length;
          console.log(times,'pingTime', avg_time)
     
    pingResult.push({'serverIP':serverIP,'serverID':serverID,'pingTime': avg_time})
    items2.push({itemString:" " , id: serverZone, city: serverCity,country:serverCountry,result: avg_time});   
      
    }
  items2.sort((a, b) => (a.result > b.result) ? 1 : -1)
  console.log("=========completed ping=====",items2)
  this.setState({ 
    latencyResult :pingResult, 
    countries: items2,
    selectedZone:items2[0].id,
    selectedServerIP:pingResult[0].serverIP});
}
selectAnalysisMethod = (e) => {
  let idx = e.target.selectedIndex;
  let dataset = e.target.options[idx].dataset;

  console.log('Choose zone : ',idx,e.target.options[idx].value);
  this.setState({selectedAnalysisMethod:e.target.options[idx].value})
 
}
selectRescueAction = (e) => {
  let idx = e.target.selectedIndex;
  let dataset = e.target.options[idx].dataset;

  console.log('Choose zone : ',idx,e.target.options[idx].value);
  this.setState({selectedRescueAction:e.target.options[idx].value})
 
}
selectAMI=(e)=>{
  let idx = e.target.selectedIndex;
  let dataset = e.target.options[idx].dataset;

  console.log('Choose AMI : ',idx,e.target.options[idx].value);
  this.setState({selectedAMI:e.target.options[idx].value})
}
selectCountry = (e) => {
  let idx = e.target.selectedIndex;
  let dataset = e.target.options[idx].dataset;

  console.log('Choose zone : ',idx,e.target.options[idx].value);
  this.setState({selectedZone:e.target.options[idx].value, selectedServerIP:e.target.options[idx].serverIP})
 
}
selectInstanceType = (e) => {
  let idx = e.target.selectedIndex;
  // let dataset = e.target.options[idx].dataset;

  console.log('Choose Type : ',idx,e.target.options[idx].value);
  this.setState({selectedInstanceType:e.target.options[idx].value})
 
}


onDropdownSelected(e) {
    console.log("THE VAL", e.target.value);
    //here you will see the current selected value of the select input
  }

wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }
  

 createEC2_v2=async (e)=>{
  console.log(e)
  this.setState({buttonclick_createEC2:true})
  var selectedZone=e.selectedZone
  var selectedInstanceType=e.selectedInstanceType
  
  console.log(selectedZone,selectedInstanceType)
  var userid=e.userinfo.id
  // var userAMI=e.userinfo.other.userAMI
  var userAMI=e.selectedAMI
  var appids=e.appidlist
  var spot=e.checkedSpotInstanceConfig
  // https://6uo8gzcff0.execute-api.us-east-1.amazonaws.com/prod/v1/user/developer-123456789
  // var url=APIs['CreateEC2']+'?ec2zone='+selectedZone+'&ec2type='+selectedInstanceType+'&userid='+userid
  var url=APIs['CreateEC2']+'/user/'+userid
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' ,
      'authorization':'allow',
        'authorizationtoken':'allow'
    },
    body: JSON.stringify({ 
      "userAMI": userAMI,
      "appids":appids,
      "spot":spot,
      "ec2type":selectedInstanceType,
      "ec2zone":selectedZone
  })
  };


  console.log("url",url)
  const response_from_init = await fetch(url,requestOptions)
  const data = await response_from_init.json();
  console.log(data)
  var instancedata=data[0]['data'][0]
  this.setState({
    createdInstanceInfo:{'data':data[0]['data'][0]}
  })
  // fetch(url,requestOptions)
  //   .then(res => res.json())
  //   .then(data => {
  //         /*接到request data後要做的事情*/
  //         console.log(data)
  
  //         this.setState({
  //           createdInstanceInfo:{'data':data['data'][0]}
  //         })
  //   })
  //   .catch(e => {
  //       /*發生錯誤時要做的事情*/
  //       console.log(e);
  //   })
   
    console.log("check status")
    var Flag=true
    while(Flag){
      Flag=false
      await timer(10000)
      
      var check_reponse=await this.manageEC2([instancedata.instance_id],[instancedata.instance_region],"check")
      console.log("check_reponse")
      console.log(check_reponse)
      console.log(check_reponse[0]["data"][0]["data"]["InstanceStatuses"][0])
       for (let i = 0; i < check_reponse[0]["data"].length; i++) {   
          if(check_reponse[0]["data"][i]["data"]["InstanceStatuses"][0]["SystemStatus"]["Status"]!="ok"){
            Flag=true
          }
       }
    
      console.log(check_reponse)
      }
    // var Flag=true
    // while(Flag){
    //   await timer(10000)
    //   // var check_reponse=await this.deleteEC2(instancedata.instance_id,instancedata.instance_region,"check")
    //   var check_reponse=await this.manageEC2([instancedata.instance_id],[instancedata.instance_region],"check")
      
    //   console.log("check_reponse")
    //   console.log(check_reponse["data"][0]["data"]["InstanceStatuses"][0])
    //   if(check_reponse["data"][0]["data"]["InstanceStatuses"][0]["SystemStatus"]["Status"]=="ok"){
    //     Flag=false
    //   }
    //   console.log(check_reponse)
    
    // }
    this.checkInstanceTablebyUser(userid)
    this.setState({
      buttonclick_createEC2:false
    })

    this.setState({
      createdInstanceInfo:{'data':data['data'][0]}
    })
    // this.checkInstanceStatus(this.state,userid)
    
    // this.setState({buttonclick_createEC2:false})
  }

createEC2(e){
console.log(e)
this.setState({buttonclick_createEC2:true})
var selectedZone=e.selectedZone
var selectedInstanceType=e.selectedInstanceType
console.log(selectedZone,selectedInstanceType)
var userid=e.userinfo.id
var appid=1

var url=APIs['CreateEC2']+'?ec2zone='+selectedZone+'&ec2type='+selectedInstanceType+'&userid='+userid+'&appid='+appid
console.log("url",url)
fetch(url,{method:"GET"})
  .then(res => res.json())
  .then(data => {
        /*接到request data後要做的事情*/
        console.log(data)

        this.setState({
          createdInstanceInfo:{'data':data['data'][0]}
        })
  })
  .catch(e => {
      /*發生錯誤時要做的事情*/
      console.log(e);
  })
}


manageEC2=async(ids,regions,action)=>{
 
  var url=APIs['DeleteEC2']+'/user/'+this.state.userinfo.id+'/action/'+action
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'authorization':'allow',
        'authorizationtoken':'allow'
       },
      body: JSON.stringify({ 
        "title": action,
        'ec2ids':ids,
        'ec2regions':regions
       })
  };
  const response_from_init = await fetch(url,requestOptions)
  const data = await response_from_init.json();
  
  if (action=='delete'){
    this.setState({
      createdInstanceInfo:{'data':'Nothing'}
    })
  }

    return data
    }

deleteEC2=async(id,region,action)=>{
 
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ 
//       title: 'Delete EC2',
//       'ec2ids':[id],
//       'ec2region':[region]
//      })
// };
//   // fetch(APIs['DeleteEC2'], {
//   //   method: 'post',
//   //   body: {
//   //     'ec2ids':[id],
//   //     'ec2region':[region]
//   //   }
//   //  })
//   fetch(APIs['DeleteEC2'],requestOptions )
//   .then(response => response.json())
//   .then(data => {
//         /*接到request data後要做的事情*/
//         console.log("Delete ec2 reponse: ",data)
//         this.setState({createdInstanceInfo:{'data':'No instance'}})
        
//     })
//     .catch(e => {
//       /*發生錯誤時要做的事情*/
//       console.log(e);
//     })
// var url=APIs['DeleteEC2']+'?ec2id='+id+'&ec2region='+region+'&action='+action
// https://astjo9g2mb.execute-api.us-east-1.amazonaws.com/prod/v1/user/developer-123456789/action/delete
var url=APIs['DeleteEC2']+'/user/'+this.state.userinfo.id+'/action/'+action
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization':'allow',
      'authorizationtoken':'allow'
     },
    body: JSON.stringify({ 
      title: 'Delete EC2',
      'ec2ids':[id],
      'ec2regions':[region]
     })
};
const response_from_init = await fetch(url,{method:"GET"})
const data = await response_from_init.json();

  // console.log("url",url)
  // fetch(url,{method:"GET"})
  //   .then(res => res.json())
  //   .then(data => {
  //         /*接到request data後要做的事情*/
  //         console.log(action ,"ec2 reponse: ",data)
  //         this.setState({createdInstanceInfo:{'data':'No instance'}})
          
  //   })
  //   .catch(e => {
  //       /*發生錯誤時要做的事情*/
  //       console.log(e);
  //   })
  return data
  }
  checkInstanceTable(e){
    
    var url=APIs['QueryDB']+'?tableName=VBS_Instances_Information'
    fetch(url,{method:"GET"})
    .then(res => res.json())
    .then(data => {
          this.setState({
            instanceTable:data['data'],

              displayTable:data['data'][0]['data']
           
          });
          console.log("==========VBS_Instances_Information=======")
          console.log(this.state.displayTable)
    })
    .catch(e => {
        /*發生錯誤時要做的事情*/
        console.log(e);
    })
  }

  checkUserTable(e){
    console.log("this is checkUserTable Function")
    var userid=e.userinfo.id

    var url=APIs['QueryDB']+'?tableName=VBS_Enterprise_Info&userid='+userid
    fetch(url,{method:"GET"})
    .then(res => res.json())
    .then(data => {
          var datalist=[]
          for (let i = 0; i < data['data'][0]['data'].length; i++) {   
            datalist.push({userId: userid,firstName:data['data'][0]['data'][i].firstName,lastName:data['data'][0]['data'][i].lastName})
          }
          this.setState({
            instanceTable:data['data'],

              displayTable:data['data'][0]['data'],
              tableDataState:datalist,
              tableColumnState:'basic'
              
          });
          console.log("==========VBS_Instances_Information=======")
          console.log(this.state.displayTable)
    })
    .catch(e => {
        /*發生錯誤時要做的事情*/
        console.log(e);
    })
  }
  
  checkInstanceDetailTableStatus= async (e,userid)=>{
    console.log("checkInstanceDe")
    // var datalist=e.tableDataState
    var datalist=e.instanceBasicTableDataState

    // var userid=e.userinfo.id
    console.log("=========call  checkInstanceStatus=========== ")
    var ec2ids=[]
    var regions=[]
    for (let i = 0; i < datalist.length; i++) {  
      ec2ids.push(datalist[i].instanceId)
      regions.push(datalist[i].region)
    }
    
    
    var url=APIs['Metrics']
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "ec2ids": ec2ids,
        "regions":regions
    })
    };
    console.log("=========call  requestOptions=========== ")
    console.log(requestOptions)
    
    var newDataList=[]
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          // this.setState({ postId: data.id })
          console.log("metric response")
          console.log(data)
          var statusDictList=[]
          for (let j = 0; j < data.length; j++) {
            var statusDict={}
            for (let i = 0; i < data[j]["data"].length; i++) {
              console.log("=========per ec2 per metric===========")
              console.log(data[j]["data"][i])
              if (data[j]["data"][i]["datapoints"].length>0){
                
                if (data[j]["data"][i]["label"]=="InstanceStatuses"){
                  if (data[j]["data"][i]["datapoints"][0]["InstanceStatuses"].length>0){
                    statusDict["InstanceState"]=data[j]["data"][i]["datapoints"][0]["InstanceStatuses"][0]["InstanceState"]['Name']
                    statusDict["InstanceStatus"]=data[j]["data"][i]["datapoints"][0]["InstanceStatuses"][0]["InstanceStatus"]["Status"]
                    statusDict["SystemStatus"]=data[j]["data"][i]["datapoints"][0]["InstanceStatuses"][0]["SystemStatus"]["Status"]
                  }
                }
                else{
                  statusDict[data[j]["data"][i]["label"]]=data[j]["data"][i]["datapoints"][0]["Average"]
                }
              
              }
              else{
                statusDict[data[j]["data"][i]["label"]]="No data"
              }
            }
            console.log(" statusDict")
            console.log( statusDict)
            statusDictList.push(statusDict)
          }
          for (let i = 0; i < datalist.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (datalist[i].instanceId==data[j]["ec2id"]){
                newDataList.push({
                  userId: userid,
                  instancetype:datalist[i].instancetype,
                  instanceId: datalist[i].instanceId,
                  instanceIp:datalist[i].instanceIp,
                  publicDnsName:datalist[i].publicDnsName,
                  cpuUtilization: statusDictList[j]["CPUUtilization"],
                  status:statusDictList[j]["InstanceState"],
                  launchtime:datalist[i].launchtime,
                  region:datalist[i].region,
                  zone:datalist[i].zone,
                  instanceStatus:statusDictList[j]["InstanceStatus"],
                  systemStatus:statusDictList[j]["SystemStatus"],
                  networkIn:statusDictList[j]["NetworkIn"],
                  networkOut:statusDictList[j]["NetworkOut"],
                  networkPacketsIn:statusDictList[j]["NetworkPacketsIn"],
                  networkPacketsOut:statusDictList[j]["NetworkPacketsOut"],
                  EBSIOBalance:statusDictList[j]["EBSIOBalance%"]
                  })

              }
            
            }
          }
          console.log(newDataList)
          console.log("==========checkInstanceStatus set data")
          this.setState({
            // instanceTable:data['data'],
           
            //   displayTable:data['data'][0]['data'],
              tableDataState:newDataList,
              tableColumnState:'instanceDetailTable',
              instanceDetailTableDataState:newDataList
              
          });
        
          }
          )    
  }

  
  checkInstanceStatus(e,userid){
    var datalist=e.tableDataState
    // var userid=e.userinfo.id
    console.log("=========call  checkInstanceStatus=========== ")
    var ec2ids=[]
    var regions=[]
    for (let i = 0; i < datalist.length; i++) {  
      ec2ids.push(datalist[i].instanceId)
      regions.push(datalist[i].region)
    }
    
    
    var url=APIs['Metrics']
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "ec2ids": ec2ids,
        "regions":regions
    })
    };
    console.log("=========call  requestOptions=========== ")
    console.log(requestOptions)
    
    var newDataList=[]
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          // this.setState({ postId: data.id })
          console.log("metric response")
          console.log(data)
          var statusDictList=[]
          for (let j = 0; j < data.length; j++) {
            var statusDict={}
            for (let i = 0; i < data[j]["data"].length; i++) {
              console.log("=========per ec2 per metric===========")
              console.log(data[j]["data"][i])
              if (data[j]["data"][i]["datapoints"].length>0){
                
                if (data[j]["data"][i]["label"]=="InstanceStatuses"){
                  if (data[j]["data"][i]["datapoints"][0]["InstanceStatuses"].length>0){
                    statusDict["InstanceState"]=data[j]["data"][i]["datapoints"][0]["InstanceStatuses"][0]["InstanceState"]['Name']
                    statusDict["InstanceStatus"]=data[j]["data"][i]["datapoints"][0]["InstanceStatuses"][0]["InstanceStatus"]["Status"]
                    statusDict["SystemStatus"]=data[j]["data"][i]["datapoints"][0]["InstanceStatuses"][0]["SystemStatus"]["Status"]
                  }
                }
                else{
                  statusDict[data[j]["data"][i]["label"]]=data[j]["data"][i]["datapoints"][0]["Average"]
                }
              
              }
              else{
                statusDict[data[j]["data"][i]["label"]]="No data"
              }
            }
            console.log(" statusDict")
            console.log( statusDict)
            statusDictList.push(statusDict)
          }
          for (let i = 0; i < datalist.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (datalist[i].instanceId==data[j]["ec2id"]){
                newDataList.push({
                  userId: userid,
                  instancetype:datalist[i].instancetype,
                  instanceId: datalist[i].instanceId,
                  instanceIp:datalist[i].instanceIp,
                  publicDnsName:datalist[i].publicDnsName,
                  cpuUtilization: statusDictList[j]["CPUUtilization"],
                  status:statusDictList[j]["InstanceState"],
                  launchtime:datalist[i].launchtime,
                  region:datalist[i].region,
                  zone:datalist[i].zone,
                  instanceStatus:statusDictList[j]["InstanceStatus"],
                  systemStatus:statusDictList[j]["SystemStatus"],
                  networkIn:statusDictList[j]["NetworkIn"],
                  networkOut:statusDictList[j]["NetworkOut"],
                  networkPacketsIn:statusDictList[j]["NetworkPacketsIn"],
                  networkPacketsOut:statusDictList[j]["NetworkPacketsOut"],
                  EBSIOBalance:statusDictList[j]["EBSIOBalance%"]
                  })

              }
            
            }
          }
          console.log(newDataList)
          console.log("==========checkInstanceStatus set data")
          this.setState({
            // instanceTable:data['data'],
           
            //   displayTable:data['data'][0]['data'],
              tableDataState:newDataList,
              tableColumnState:'instanceTable'
              
          });
        
          }
          )

    
    
  }

  issuehandle(e){
    console.log(e)
    if (e.tableSelctedItem.length!=1){
      alert ("Please select one instance.");
    }
    var datalist=e.tableSelctedItem
    var userid=e.userinfo.id
    console.log("=========call  checkInstanceStatus=========== ")
    var ec2ids=[]
    var regions=[]

    for (let i = 0; i < datalist.length; i++) {  
      ec2ids.push(datalist[i].instanceId)
      regions.push(datalist[i].region)
    }
    
    
    var url=APIs['EC2Rescue']+'/user/'+userid+'/ec2/'+ec2ids[0]
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "ec2ids": ec2ids,
        "regions":regions,
        "action":e.selectedRescueAction
    })
    };
    console.log("=========call  requestOptions=========== ")
    console.log(requestOptions)
    
    var newDataList=[]
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log()
            
      
        
          }
          )

    
    
  }
  putTest=(e)=>{
    var url="https://yi4iccnzw8.execute-api.us-east-1.amazonaws.com/prod/v1"
    const requestOptions = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization':'allow',
      },
      body: JSON.stringify({ 
        "action": "test"
    })
    };   
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })

  }
  postTest=(e)=>{
    var url="https://yi4iccnzw8.execute-api.us-east-1.amazonaws.com/prod/v1"
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization':'allow',
      },
      body: JSON.stringify({ 
        "action": "test"
    })
    };   
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })

  }
  getTest=(e)=>{
    var url="https://yi4iccnzw8.execute-api.us-east-1.amazonaws.com/prod/v1"
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization':'allow',
      },
    };   
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })

  }
  checkInstanceRouteAnalysis(e){
    var datalist=e.tableDataState
    var userid=e.userinfo.id
    console.log("=========call  checkInstanceStatus=========== ")
    var ec2ids=[]
    var regions=[]
    for (let i = 0; i < datalist.length; i++) {  
      ec2ids.push(datalist[i].instanceId)
      regions.push(datalist[i].region)
    }
    
    
    var url=APIs['Metrics']
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "ec2ids": ec2ids,
        "regions":regions,
        "action":"network_insights_path"
    })
    };
    console.log("=========call  requestOptions=========== ")
    console.log(requestOptions)
    
    var newDataList=[]
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          // this.setState({ postId: data.id })
          console.log("metric response")
          console.log(data)
          var statusDictList=[]
          for (let j = 0; j < data.length; j++) {
            var statusDict={}
            for (let i = 0; i < data[j]["data"].length; i++) {
              console.log("=========per ec2 per metric===========")
              console.log(data[j]["data"][i])
              if (data[j]["data"][i]["datapoints"].length>0){
                
                if (data[j]["data"][i]["label"]=="InstanceStatuses"){
                  if (data[j]["data"][i]["datapoints"][0]["InstanceStatuses"].length>0){
                    statusDict["InstanceState"]=data[j]["data"][i]["datapoints"][0]["InstanceStatuses"][0]["InstanceState"]['Name']
                    statusDict["InstanceStatus"]=data[j]["data"][i]["datapoints"][0]["InstanceStatuses"][0]["InstanceStatus"]["Status"]
                    statusDict["SystemStatus"]=data[j]["data"][i]["datapoints"][0]["InstanceStatuses"][0]["SystemStatus"]["Status"]
                  }
                }
                else if (data[j]["data"][i]["label"]=="network_insights_path"){
                  console.log("==========network path==============")
                  console.log(data[j]["data"][i]["datapoints"][0])
                  this.setState({
                  
                    resultDisplayString: JSON.stringify(data[j]["data"][i]["datapoints"][0]['ForwardPathComponents'])
                  })
               
                 
                } 
                else{
                  statusDict[data[j]["data"][i]["label"]]=data[j]["data"][i]["datapoints"][0]["Average"]
                }
              
              }
              else{
                statusDict[data[j]["data"][i]["label"]]="No data"
              }
            }
            console.log(" statusDict")
            console.log( statusDict)
            statusDictList.push(statusDict)
          }
          for (let i = 0; i < datalist.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (datalist[i].instanceId==data[j]["ec2id"]){
                newDataList.push({
                  userId: userid,
                  instancetype:datalist[i].instancetype,
                  instanceId: datalist[i].instanceId,
                  instanceIp:datalist[i].instanceIp,
                  cpuUtilization: statusDictList[j]["CPUUtilization"],
                  status:statusDictList[j]["InstanceState"],
                  launchtime:datalist[i].launchtime,
                  region:datalist[i].region,
                  zone:datalist[i].zone,
                  instanceStatus:statusDictList[j]["InstanceStatus"],
                  systemStatus:statusDictList[j]["SystemStatus"],
                  networkIn:statusDictList[j]["NetworkIn"],
                  networkOut:statusDictList[j]["NetworkOut"],
                  networkPacketsIn:statusDictList[j]["NetworkPacketsIn"],
                  networkPacketsOut:statusDictList[j]["NetworkPacketsOut"],
                  EBSIOBalance:statusDictList[j]["EBSIOBalance%"]
                  })

              }
            
            }
          }
          console.log(newDataList)
          console.log("==========checkInstanceStatus set data")
          this.setState({
            // instanceTable:data['data'],
           
            //   displayTable:data['data'][0]['data'],
              tableDataState:newDataList,
              tableColumnState:'instanceTable'
              
          });
        
          }
          )

    
    
  }
  checkInstanceTablebyUser=async(userid)=>{
    // var userid=e.userinfo.id
    var datalist=[]
    var url=APIs['QueryDB']+'?tableName=VBS_Instances_Information&userid='+userid
    fetch(url,{method:"GET"})
    .then(res => res.json())
    .then(data => {
          
         
          for (let i = 0; i < data['data'][0]['data'].length; i++) {   
            
            // datalist.push({
            // userId: userid,
            // instancetype:data['data'][0]['data'][i].instancetype,
            // instanceId: data['data'][0]['data'][i].id,
            // instanceIp:data['data'][0]['data'][i].publicIP,
            // // cpuUtilization:"No Data",
            // publicDnsName:data['data'][0]['data'][i].publicDnsName,
            // status:data['data'][0]['data'][i].state
            // ,launchtime:data['data'][0]['data'][i].launchtime
            // ,region:data['data'][0]['data'][i].region
            // ,zone:data['data'][0]['data'][i].zone,
            // instanceStatus:data['data'][0]['data'][i].instanceStatus,
            //       systemStatus:data['data'][0]['data'][i].systemStatus,
            //       networkIn:"No Data",
            //       networkOut:"No Data",
            //       networkPacketsIn:"No Data",
            //       networkPacketsOut:"No Data",
            //       EBSIOBalance:"No Data"
            
            // })
            datalist.push({
            userId: userid,
            instancetype:data['data'][0]['data'][i].instancetype,
            instanceId: data['data'][0]['data'][i].id,
            instanceIp:data['data'][0]['data'][i].publicIP,
            // cpuUtilization:"No Data",
            publicDnsName:data['data'][0]['data'][i].publicDnsName,
            status:data['data'][0]['data'][i].state
            ,launchtime:data['data'][0]['data'][i].launchtime
            ,region:data['data'][0]['data'][i].region
            ,zone:data['data'][0]['data'][i].zone,
            instanceStatus:data['data'][0]['data'][i].instanceStatus,
            systemStatus:data['data'][0]['data'][i].systemStatus,
                
            
            })
           
          }

          // var response=this.checkInstanceStatus(datalist)
          // console.log("==========response checkInstanceStatus=======")
          // console.log(response)
          this.setState({
            // instanceTable:data['data'],
           
            //   displayTable:data['data'][0]['data'],
              instanceBasicTableDataState:datalist,
              tableDataState:datalist,
              tableColumnState:'instanceTable'
              
          });
         
    })
    .catch(e => {
        /*發生錯誤時要做的事情*/
        console.log(e);
    })
    console.log("==========after get instance table update status=========")
    // this.checkInstanceStatus(this.state,userid)
    // console.log("==========checkInstanceStatus Input=======")
    // console.log(datalist)
    // var response=this.checkInstanceStatus(datalist)
    // console.log("StatusCheckResponse");
    // console.log(response)
    // this.setState({
    //   // instanceTable:data['data'],
     
    //   //   displayTable:data['data'][0]['data'],
    //     tableDataState:response,
    //     tableColumnState:'instanceTable'
        
    // });
    // this.componentDidUpdate()
  }
  updateLatencyTablebyUser(e,ec2id,pingTime){
    var userid=e.userinfo.id

    var url=APIs['UpdateDB']+'?tableName=VBS_Letency_Test&Action=updateItem_pingTime&ec2id='+ec2id+'&userid='+userid+'&pingTime='+pingTime
    fetch(url,{method:"GET"})
    .then(res => res.json())
    .then(data => {
          this.setState({
            instanceTable:data['data'],
           
              displayTable:data['data'][0]['data']

          });
          console.log("==========VBS_Instances_Information=======")
          console.log(this.state.displayTable)
    })
    .catch(e => {
        /*發生錯誤時要做的事情*/
        console.log(e);
    })
  }


  checkLatencyTablebyCity=async (e,userid)=>{
    const ipUrl='https://ip.nf/me.json'
 
    const response_from_userip = await fetch(ipUrl,{method:"GET"})
    const data_ip = await response_from_userip.json();
    
    
    var city=data_ip.ip.city

    // var city=e.userinfo.city
    // var userid=e.userinfo.id
    console.log("wait.......")
    // sleep(10000);
    console.log("wait end")
    var datalist=[]
    var url=APIs['QueryDB']+'?tableName=VBS_Letency_Test&city='+city

    const response_from_init = await fetch(url,{method:"GET"})
    const data = await response_from_init.json();
   
    let items = [];         
    var itemString=" "
    var defaultzone=""
    var Flag=false
    console.log("==========VBS_Latency_Test=======")
    console.log(data)
  
    for (let i = 0; i < data['data'][0]['latencyTest'].length; i++) {   
        
      datalist.push({
    
      user_id:userid,
      userCity:data['data'][0]['latencyTest'][i].userCity,
      userIP:data['data'][0]['latencyTest'][i].userIP,
      userLatitude:data['data'][0]['latencyTest'][i].userLatitude,
      userLongitude:data['data'][0]['latencyTest'][i].userLongitude,
      
      instanceid: data['data'][0]['latencyTest'][i].instanceid,
      instanceCity:data['data'][0]['latencyTest'][i].instanceCity,
      instanceCountry:data['data'][0]['latencyTest'][i].instanceCountry,
    
  
      instanceIp:data['data'][0]['latencyTest'][i].instanceIp,

      region:data['data'][0]['latencyTest'][i].region,
      zone:data['data'][0]['latencyTest'][i].zone,
      latency:data['data'][0]['latencyTest'][i].latency,
      
      
      })
      
    }

    // var response=this.checkInstanceStatus(datalist)
    // console.log("==========response checkInstanceStatus=======")
    // console.log(response)
    this.setState({
      // instanceTable:data['data'],
      
      //   displayTable:data['data'][0]['data'],
        tableDataState:datalist,
        tableColumnState:'latencyTable'
        
    });
    return datalist
    
    
  }

  checkLatencyTablebyUser(userid){
  console.log("wait.......")
  // sleep(10000);
  console.log("wait end")
  var datalist=[]
  var url=APIs['QueryDB']+'?tableName=VBS_Letency_Test&userid='+userid
  fetch(url,{method:"GET"})
  .then(res => res.json())
  .then(data => {
        let items = [];         
        var itemString=" "
        var defaultzone=""
        var Flag=false
        console.log("==========VBS_Latency_Test=======")
        console.log(data)
      
        for (let i = 0; i < data['data'][0]['latencyTest'].length; i++) {   
            
          datalist.push({
        
          user_id:data['data'][0]['latencyTest'][i].user_id,
          userCity:data['data'][0]['latencyTest'][i].userCity,
          userIP:data['data'][0]['latencyTest'][i].userIP,
          userLatitude:data['data'][0]['latencyTest'][i].userLatitude,
          userLongitude:data['data'][0]['latencyTest'][i].userLongitude,
          
          instanceid: data['data'][0]['latencyTest'][i].instanceid,
          instanceCity:data['data'][0]['latencyTest'][i].instanceCity,
          instanceCountry:data['data'][0]['latencyTest'][i].instanceCountry,
        
            
          instanceIp:data['data'][0]['latencyTest'][i].instanceIp,

          region:data['data'][0]['latencyTest'][i].region,
          zone:data['data'][0]['latencyTest'][i].zone,
          latency:data['data'][0]['latencyTest'][i].latency,
         
          
          })
         
        }

        // var response=this.checkInstanceStatus(datalist)
        // console.log("==========response checkInstanceStatus=======")
        // console.log(response)
        this.setState({
          // instanceTable:data['data'],
         
          //   displayTable:data['data'][0]['data'],
            tableDataState:datalist,
            tableColumnState:'latencyTable',
            latencyTableDataState:datalist
        });
        
  })
  .catch(e => {
      /*發生錯誤時要做的事情*/
      console.log(e);
  })
  
}

checkLatencyTable(userid){
  console.log("wait.......")
  // sleep(10000);
  var datalist=[]
  console.log("wait end")
  var url=APIs['QueryDB']+'?tableName=VBS_Letency_Test'
  fetch(url,{method:"GET"})
  .then(res => res.json())
  .then(data => {
        let items = [];         
        var itemString=" "
        var defaultzone=""
        var Flag=false
        console.log("==========VBS_Latency_Test=======")
        console.log(data)
        items.push({itemString:itemString , id: "zone",Ave_bits_per_second:"Average of bits per second",Ave_lost_percent:"Average of lost percent",Ave_jitter_ms: "Average of jitter_ms", ip:"instance IP",ec2id:"instance ID",instanceCity:"instanceCity",instanceCountry:"instanceCountry",result:"Latency",status:"Status"});
       
      
        for (let i = 0; i < data['data'][0]["latencyTest"].length; i++) {   
          if (i==0){
            itemString=" "
            defaultzone=data['data'][0]["latencyTest"][i].zone
          }
          else{
            itemString=" "
          }
            if (data['data'][0]["latencyTest"][i].status_testEC2=='initializing'){
              this.setState(
                {latencyTestStatus : 'NoIPs'}
              )
              Flag=true
            }

            
            items.push({itemString:itemString , id: data['data'][0]["latencyTest"][i].zone,Ave_bits_per_second: data['data'][0]["latencyTest"][i].Ave_bits_per_second,Ave_lost_percent: data['data'][0]["latencyTest"][i].Ave_lost_percent,Ave_jitter_ms: data['data'][0]["latencyTest"][i].Ave_jitter_ms, ip:data['data'][0]["latencyTest"][i].instanceIP,ec2id:data['data'][0]["latencyTest"][i].instanceid,instanceCity: data['data'][0]["latencyTest"][i].instanceCity,instanceCountry:data['data'][0]["latencyTest"][i].instanceCountry,result:data['data'][0]["latencyTest"][i].latency,status:data['data'][0]["latencyTest"][i].status_testEC2});   
        
          }

        if ((data['data'][0]["latencyTest"].length>0)&(Flag==false)){
          if (data['data'][0]["latencyTest"][1].instanceIP!=""){
            this.setState({latencyTestStatus:'startping'})
          
          console.log("----------Begin to Ping------------");
          this.httppingtest(data['data'][0]["latencyTest"])
          for (let i = 0; i < data['data'][0]["latencyTest"].length; i++) {   
            this.deleteEC2(data['data'][0]["latencyTest"][i].instanceid,data['data'][0]["latencyTest"][i].region)
          }

          }
        }

        
        this.setState({
          // instanceTable:data['data'],
         
          //   displayTable:data['data'][0]['data'],
            tableDataState:items,
            tableColumnState:'instanceTable'
            
        });
        console.log("==========LatencyTableByUserResponse=======")
        console.log(data)
        
  })
  .catch(e => {
      /*發生錯誤時要做的事情*/
      console.log(e);
  })
  
}
latencyResult(e){
 
  // this.checkLatencyTablebyUser(e.userinfo.id)
  this.checkLatencyTablebyUser("developer-123456789")
  
}
deleteSelectedEC2=async(e,action)=>{
  this.setState({buttonclick_statusmanage:true})
  console.log("Delete",e.tableSelctedItem)
  // for (let i = 0; i < e.tableSelctedItem.length; i++) {   
  //   await this.deleteEC2(e.tableSelctedItem[i].instanceId,e.tableSelctedItem[i].region,action)

  // }
  var allids=[]
  var allregions=[]
  for (let i = 0; i < e.tableSelctedItem.length; i++) {   
    allids.push(e.tableSelctedItem[i].instanceId)
    allregions.push(e.tableSelctedItem[i].region)
  }
  await this.manageEC2(allids,allregions,action)
  // for (let i = 0; i < e.tableSelctedItem.length; i++) {   
  //   await this.deleteEC2(e.tableSelctedItem[i].instanceId,e.tableSelctedItem[i].region,action)

  // }
  if (action=="start"){
        var Flag=true
        while(Flag){
          Flag=false
          await timer(10000)
          
          var check_reponse=await this.manageEC2(allids,allregions,"check")
          console.log("check_reponse")
          console.log(check_reponse)
          console.log(check_reponse[0]["data"][0]["data"]["InstanceStatuses"][0])
           for (let i = 0; i < e.tableSelctedItem.length; i++) {   
              if(check_reponse[0]["data"][i]["data"]["InstanceStatuses"][0]["SystemStatus"]["Status"]!="ok"){
                Flag=true
              }
           }
        
          console.log(check_reponse)
          }
      // var Flag=true
      //   while(Flag){
      //     Flag=false
      //     await timer(10000)
      //     for (let i = 0; i < e.tableSelctedItem.length; i++) {  
      //     var check_reponse=await this.deleteEC2(e.tableSelctedItem[i].instanceId,e.tableSelctedItem[i].region,"check")
      //     console.log("check_reponse")
      //     console.log(check_reponse)
      //     console.log(check_reponse["data"][0]["data"]["InstanceStatuses"][0])
          
      //       if(check_reponse["data"][0]["data"]["InstanceStatuses"][0]["SystemStatus"]["Status"]!="ok"){
      //         Flag=true
      //       }
      //     }
        
      //     console.log(check_reponse)
      //     }
    }
  
  this.checkInstanceTablebyUser(e.userinfo.id)
  this.setState({buttonclick_statusmanage:false})
}


checkCostUsage(e){
  var userid=e.userinfo.id
  var url=APIs['CostUsage']+'?UserID='+userid
  fetch(url,{method:"GET"})
  .then(res => res.json())
  .then(data => {
    console.log("==========Cost Explorer=======")
    console.log(data)
          var datalist=[]
          for (let i = 0; i < data['data'][0]['data']['ResultsByTime'].length; i++) {   
            datalist.push({userId: userid,startDate: data['data'][0]['data']['ResultsByTime'][i]['TimePeriod']['Start'],endDate: data['data'][0]['data']['ResultsByTime'][i]['TimePeriod']['End'],amortizedCost: data['data'][0]['data']['ResultsByTime'][i]['Total']['AmortizedCost']['Amount'],unit: data['data'][0]['data']['ResultsByTime'][i]['Total']['AmortizedCost']['Unit']})
          }
          this.setState({
              tableDataState:datalist,
              tableColumnState:'costTable',
              costTableDataState:datalist
              
          });
        
  })
  .catch(e => {
      /*發生錯誤時要做的事情*/
      console.log(e);
  })
}
handleClickPing=async (e) =>{
  // console.log("ping url",u)
  // var url='ec2.ap-northeast-1.amazonaws.com/ping'
  // var url='ec2.sa-east-1.amazonaws.com/ping'
  // var url='68.66.118.171'

  this.myPingFunc4(e.urlString)
  console.log("ping url",e.urlString)
   
           
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

createLatencyTestInstance=async (e) =>{
  console.log("create Latency Instance")
  console.log(e)
  // var url=APIs['LatencyTest']+'?userid='+e.userinfo.id
  // var url1=APIs['LatencyTest']+'/user/developer-123456789/action/init'
  // var url2=APIs['LatencyTest']+'/user/developer-123456789/action/check'
  // var url3=APIs['LatencyTest']+'/user/developer-123456789/action/delete'
  var url1=APIs['Test']+'?userid='+e.userinfo.id+'&actionid=init&source_ip='+e.userinfo.ip
  var url2=APIs['Test']+'?userid='+e.userinfo.id+'&actionid=check&source_ip='+e.userinfo.ip
  var url3=APIs['Test']+'?userid='+e.userinfo.id+'&actionid=delete&source_ip='+e.userinfo.ip


  const requestOptions1 = {
    method: 'GET',
  //   headers: { 
  //     'Content-Type': 'application/json' ,
  //     'Authorization':'allow',
  //     'authorizationToken':'allow'

  //   },
  //   body: JSON.stringify({ 
  //     'source_ip':e.userinfo.ip
  // })
    }

  let RegionInfo=[]
  this.setState({processbarStatus:'20'})
  console.log("requestOptions1",requestOptions1)
  const response_from_init = await fetch(url1,requestOptions1)
  const data = await response_from_init.json();
  // .then(res => res.json())
  // .then(data => {
    
  //   console.log("Response")
  //   console.log(data)
  //   var instanceData=data[0]['data'][0]['instanceData']
  //   console.log("========instanceData======")
  //   console.log(instanceData)
  //   this.setState({latencyTestInstanceIds2:instanceData})
    // for (let i = 0; i < data[0]['instanceData'].length; i++) {   
    //   RegionInfo.append({
    //     'zone':data[0]['instanceData'][i].zone,
    //     'instanceIP':data[0]['instanceData'][i].instanceIP,
    //     'instanceid': data[0]['instanceData'][i].instanceid,
    //     'instanceCity':data[0]['instanceData'][i].instanceCity,
    //     'instanceCountry':data[0]['instanceData'][i].instanceCountry
    //   },
    //   )
    // }
    console.log("========Created Instance Response======")
    console.log(data)

    // var Flag=true
    // while(Flag){
    //   Flag=false
    //   const requestOptions2 = {
    //     method: 'POST',
    //     headers: { 
    //       'Content-Type': 'application/json' ,
    //       'Authorization':'allow'
    //     },
    //     body: JSON.stringify({ 
    //       'instanceData':data[0]
    //   })}
      
    //     fetch(url2,requestOptions2 )
    //     .then(res => res.json())
    //     .then(data => {
    //      console.log("check latency test intance status")
    //      console.log(data[0]['instanceData']['InstanceStatuses'])
    //      for (let i = 0; i < data[0]['instanceData']['InstanceStatuses'].length; i++) {   
    //         if (data[0]['instanceData']['InstanceStatuses'][i]['InstanceStatus']['Status']!='ok'){
    //           Flag=true
    //         }
    //         // if (data[0]['instanceData']['InstanceStatuses'][i]['SystemStatus']['Status']!='ok'){
    //         //   Flag=true
    //         // }
    //      }
    //      console.log(Flag)

    //     })
      
    
     
    // }
    // var Flag=true
    
    // setTimeout(function(Flag){
    //   console.log("waiting 5 sec....")
    //   Flag=false
     
    // },5000)
    // while(Flag){
      
    // }
    // await timer(3000)
   
    // this.httppingtest(data[0]['data'][0]['instanceData'])
    
    // var instanceIds=[]

    // for (let i = 0; i < data[0]['data'][0]['instanceData'].length; i++) {  
    //   instanceIds.push(data[0]['data'][0]['instanceData'].instanceid)
    // }
    // this.setState({
    //   latencyTestInstanceIds:data[0]['data'][0]['instanceData']
    // })
    // const requestOptions3 = {
    //   method: 'POST',
    //   headers: { 
    //     'Content-Type': 'application/json' ,
    //     'Authorization':'allow'
    //   },
    //   body: JSON.stringify({ 
    //     'instanceData':data[0]['data'][0]['instanceData']
    // })}
    // fetch(url3,requestOptions3 )
    // .then(res => res.json())
    // .then(data => {
    //  console.log(data)
    // })
   

    // for (let i = 0; i < instanceData.length; i++) {   
    //   this.deleteEC2(instanceData[i].instanceid,instanceData[i].region)
    // }
    
   
  // })

  console.log("========Check latency test Instance Response======")
  
  var Flag=true
  var begintime= Date.now();
  while(Flag){
    Flag=false
    
    // var instanceIPsList=[]
    for (let i = 0; i < data[0]['data'][0]['instanceData'].length; i++) {  
      var url='https://'+data[0]['data'][0]['instanceData'][i].instanceIP+'.nip.io'
      var flag=false
      // flag=await this.myPingFunc4(url,flag)
      flag=await this.checkPing(url,flag)
      console.log(flag,Flag)
  
      if(flag==false){Flag=true}
      }
    var test_time = Date.now() - begintime;
    if(test_time>300000){Flag=false;}
      
  }
  // var Flag=true
  // while(Flag){
  //   Flag=false
  //   const requestOptions2 = {
  //     method: 'POST',
  //     headers: { 
  //       'Content-Type': 'application/json' ,
  //       'Authorization':'allow',
  //       'authorizationToken':'allow'
  //     },
  //     body: JSON.stringify({ 
  //       'instanceData':data[0]["data"][0]["instanceData"],
  //       'source_ip':e.userinfo.ip
  //   })}
  //   console.log(requestOptions2)
  
  //     await timer(3000)
  //     const response = await fetch(url2,requestOptions2 )
  //     const data2 = await response.json();
  //     console.log("check Status response")
  //     console.log(data2)
  //     for (let i = 0; i < data2[0]["data"][0]["instanceData"]['InstanceStatuses'].length; i++) {   
  //       if (data2[0]["data"][0]["instanceData"]['InstanceStatuses'][i]['InstanceStatus']['Status']!='ok'){
  //         Flag=true
  //       }
  //       // if (data[0]['instanceData']['InstanceStatuses'][i]['SystemStatus']['Status']!='ok'){
  //       //   Flag=true
  //       // }
  //     }
      // fetch(url2,requestOptions2 )
      // .then(res => res.json())
      // .then(data => {
      //   console.log("check latency test intance status")
      //   console.log(data[0]['instanceData']['InstanceStatuses'])
      //   for (let i = 0; i < data[0]['instanceData']['InstanceStatuses'].length; i++) {   
      //     if (data[0]['instanceData']['InstanceStatuses'][i]['InstanceStatus']['Status']!='ok'){
      //       Flag=true
      //     }
      //     // if (data[0]['instanceData']['InstanceStatuses'][i]['SystemStatus']['Status']!='ok'){
      //     //   Flag=true
      //     // }
      //   }
      //   console.log(Flag)

      // })
  // }
  this.httppingtest(data[0]['data'][0]['instanceData'])
  // console.log("outside fetch")
  // console.log(instanceData)


}

getUserInfo=async(userid,type)=>{
  const ipUrl='https://ip.nf/me.json'
  var ip=null
  var country=null
  var city=null
  var latitude=null
  var longitude=null
  var name=null
  var city=null
  var userinfo=this.state.userinfo

  const response_from_userip = await fetch(ipUrl,{method:"GET"})
  const data_ip = await response_from_userip.json();
  console.log(data_ip)
  var country=data_ip.ip.country
  var ip=data_ip.ip.ip
  var latitude=data_ip.ip.latitude
  var longitude=data_ip.ip.longitude
  var city=data_ip.ip.city
  this.setState({
    userinfo:{id:userid,city:city,ip:ip,name:name,type:type,latitude:latitude,longitude:longitude,"other":userinfo.other}
  })
  // fetch(ipUrl,{method:"GET"})
  // .then(res => res.json())
  // .then(data => {
  //   console.log(data)
  //   country=data.ip.country
  //   ip=data.ip.ip
  //   latitude=data.ip.latitude
  //   longitude=data.ip.longitude
  //   city=data.ip.city
  //   console.log(userinfo)
  //   this.setState({
  //     userinfo:{id:userid,city:city,ip:ip,name:name,type:type,latitude:latitude,longitude:longitude,"other":userinfo.other}
  //   })
 
    
  // })
  var url=APIs['QueryDB']+'?tableName=VBS_Enterprise_Info&userid='+userid
  const response_from_userdb = await fetch(url,{method:"GET"})
  const data = await response_from_userdb.json();
  console.log("==========VBS_Enterprise_Info=======")
  console.log(data)
  console.log("==========VBS_Enterprise_Info2=======")
  // console.log(data[0]['userinfo'])
  var instanceQuota=data['data'][0]['userinfo']['instanceQuota']
  var costarray=data['data'][0]['userinfo']['cost']['ResultsByTime']
  var username=data['data'][0]['userinfo']['username']
  var useremail=data['data'][0]['userinfo']['email']
  var userAMI=data['data'][0]['userinfo']['userAMI']
  var weeklycosts=[]
  var weeklycostlabels=[]
  function convert_to_float(a) {
    
    // Type conversion
    // of string to float
    var floatValue = +(a);
      
    // Return float value
    return floatValue;
      }
  console.log(instanceQuota)
  console.log(costarray)
    for (let i = 0; i < costarray.length; i++) {
      weeklycosts.push(convert_to_float(costarray[i]["Total"]["AmortizedCost"]["Amount"]))
      weeklycostlabels.push(costarray[i]["TimePeriod"]["End"])
    }
    var sum = weeklycosts.reduce((a, b) => a + b, 0);
    var otherinfo={
      "WeeklyCostSum":sum,
      "DailyCostList":weeklycosts,
      "DailyCostLabelList":weeklycostlabels,
      "instanceQuota":instanceQuota,
      "useremail":useremail,
      "userAMI":userAMI
    }
    this.setState({
      userinfo:{id:userid,city:city,ip:ip,name:username,type:type,latitude:latitude,longitude:longitude,"other":otherinfo},
      chartdata:weeklycosts,
      chartlabel:weeklycostlabels
    })
  
  // fetch(url,{method:"GET"})
  // .then(res => res.json())
  // .then(data => {
  //       // this.setState({
  //       //   instanceTable:data['data'],

  //       //     displayTable:data['data'][0]['data']
         
  //       // });
  //     console.log("==========VBS_Enterprise_Info=======")
  //     console.log(data)
  //     console.log("==========VBS_Enterprise_Info2=======")
  //     // console.log(data[0]['userinfo'])
  //     var instanceQuota=data['data'][0]['userinfo']['instanceQuota']
  //     var costarray=data['data'][0]['userinfo']['cost']['ResultsByTime']
  //     var username=data['data'][0]['userinfo']['username']
  //     var useremail=data['data'][0]['userinfo']['email']
  //     var userAMI=data['data'][0]['userinfo']['userAMI']
  //     var weeklycosts=[]
  //     var weeklycostlabels=[]
  //       function convert_to_float(a) {
         
  //         // Type conversion
  //         // of string to float
  //         var floatValue = +(a);
           
  //         // Return float value
  //         return floatValue;
  //           }
  //     console.log(instanceQuota)
  //     console.log(costarray)
  //       for (let i = 0; i < costarray.length; i++) {
  //         weeklycosts.push(convert_to_float(costarray[i]["Total"]["AmortizedCost"]["Amount"]))
  //         weeklycostlabels.push(costarray[i]["TimePeriod"]["End"])
  //       }
  //       var sum = weeklycosts.reduce((a, b) => a + b, 0);
  //       var otherinfo={
  //         "WeeklyCostSum":sum,
  //         "DailyCostList":weeklycosts,
  //         "DailyCostLabelList":weeklycostlabels,
  //         "instanceQuota":instanceQuota,
  //         "useremail":useremail,
  //         "userAMI":userAMI
  //       }
  //       this.setState({
  //         userinfo:{id:userid,city:city,ip:ip,name:username,type:type,latitude:latitude,longitude:longitude,"other":otherinfo},
  //         chartdata:weeklycosts,
  //         chartlabel:weeklycostlabels
  //       })
        
        
  // })
  // .catch(e => {
  //     /*發生錯誤時要做的事情*/
  //     console.log(e);
  // })
  this.checkInstanceTablebyUser(userid)
  this.checkInstanceStatus(this.state,userid)
  this.checkLatencyTablebyUser(userid)
  this.checkCostUsage(this.state)




}

generateUUID=async(type)=>{

  var userid=null
  
  var name=null
  const queryParameters = new URLSearchParams(window.location.search)
  const usertype = queryParameters.get("usertype")
  const user_id = queryParameters.get("username")
  console.log("==============Get URL")
  console.log(usertype)
  // console.log(username)
  type=usertype
 
  userid=user_id
  
  // if (type=='user'){
  //   // userid=uuid()
  //   // userid="2a27adb1-668e-dc89-6119-58eefdeccca2"
  //   userid=username
  //   name=username
  //   // name="username"
  // }
  // else{
  //   userid='developer-123456789'
  //   name="VBS Developer"
  

  // }
  await this.getUserInfo(userid,type)
  await this.findBestRegion_v2(this.state)
 
  console.log(this.state.userinfo)

}
deleteLatencyTestInstance(){
  console.log("After ping instances:")
  console.log(this.state.latencyTestInstanceIds)
  for (let i = 0; i < this.state.latencyTestInstanceIds.length; i++) {   
      this.deleteEC2(this.state.latencyTestInstanceIds[i].instanceid,this.state.latencyTestInstanceIds[i].region)
    }
  this.setState({latencyTestInstanceIds:[]})
  this.setState({processbarStatus:'100'})
  // const requestOptions3 = {
  //   method: 'POST',
  //   headers: { 
  //     'Content-Type': 'application/json' ,
  //     'Authorization':'allow'
  //   },
  //   body: JSON.stringify({ 
  //     'instanceData':this.state.latencyTestInstanceIds
  // })}
  // var url3=APIs['Test']+'?userid='+this.state.userinfo.id+'&actionid=delete'
  // fetch(url3,requestOptions3 )
  // .then(res => res.json())
  // .then(data => {
  // console.log(data)
  // this.setState({latencyTestInstanceIds:[]})
  // })

}


defaultRegionSelect=async (e) =>{
  var url=APIs['AnalysisIP']+'?routePolicy=Geolocation_Global&userid='+e.userinfo.id
  fetch(url,{method:"GET"})
  .then(res => res.json())
  .then(data => {
        this.setState({processbarStatus:'10'})
        console.log(data)
        let source_ip=data['data'][0]["source_ip"]
        let source_city=data['data'][0]["source_city"]
        // let user_id=data['data'][0]["user_id"]
        var userinfo={id:e.userinfo.id,city:source_city,ip:source_ip,other:e.userinfo.other}
        let items = [];         
        var itemString=" "
        var defaultzone=""

        this.setState({
          tableColumnState:'basic',
          tableDataState:[{firstName:'Developer',lastName:'Developer',Visits:1,status:'valid',userId:userinfo.id,city:source_city}],
        })
      
      
              for (let i = 0; i <1; i++) {   
                  if (i==0){
                    itemString="(Recommended): "
                    defaultzone=data['data'][0]["target"][i].zone
                  }
                  else{
                    itemString=" "
                  }
                    items.push({


                      itemString:itemString , 
                      id: data['data'][0]["target"][i].zone, 
                      city: data['data'][0]["target"][i].city,
                      country:data['data'][0]["target"][i].country,
                      result:data['data'][0]["target"][i].distance,});   
              }
              this.setState({
                // userinfo: {'ip':source_ip,'city':source_city,'id':e.userinfo.id,"other":e.userinfo.other},
                countries: items,
                selectedZone:defaultzone
              });
        
      
  })
  .catch(e => {
      /*發生錯誤時要做的事情*/
      console.log(e);
  })
}

findBestRegion_v2=async (e) =>{
  this.setState({buttonclick_findbestregion:true,processbarStatus:'10'})

  var user_id=null
  var userinfo={
    id:e.userinfo.id,
    city:null,
    ip:null
    
  }
  const latencydatalist=await this.checkLatencyTablebyCity(e)
  
  // const latencydatalist=[]
  console.log('latencydatalist')
  console.log(latencydatalist)
  var itemString 
  var defaultzone
  var items=[]
  
  if (latencydatalist.length!=0){
    this.setState({processbarStatus:'50'})
                for (let i = 0; i <latencydatalist.length; i++) {  
                 
                  if (i==0){
                    itemString="(Recommended): "
                    defaultzone=latencydatalist[i].zone
                  }
                  else{
                    itemString=" "
                  }
                    items.push({


                      itemString:itemString , 
                      id: latencydatalist[i].zone, 
                      city: latencydatalist[i].city,
                      country:latencydatalist[i].country,
                      result:latencydatalist[i].latency,});   
              }

              items.sort((a, b) => (a.result > b.result) ? 1 : -1)
              console.log("=========completed ping=====",items)
              this.setState({
                // userinfo: {'ip':source_ip,'city':source_city,'id':e.userinfo.id,"other":e.userinfo.other},
                countries: items,
                selectedZone:defaultzone
              });
              this.setState({buttonclick_findbestregion:false})
              this.setState({processbarStatus:'100'})

  }else{
  
  
      // var selectedAnalysisMethod=e.selectedAnalysisMethod

      // this.createLatencyTestInstance(this.state)
      // this.setState({buttonclick_findbestregion:false})

      var defulatRegionInfo=[
        {'zone':'us-east-1','instanceIP':'ec2.us-east-1.amazonaws.com/ping','instanceid': 'ec2.us-east-1.amazonaws.com/ping','instanceCity':'N. Virginia','instanceCountry':'US'},
        // {'zone':'us-east-2','instanceIP':'ec2.us-east-2.amazonaws.com/ping','instanceid': 'ec2.us-east-2.amazonaws.com/ping','instanceCity':'Ohio','instanceCountry':'US'},
        {'zone':'us-west-1','instanceIP':'ec2.us-west-1.amazonaws.com/ping','instanceid': 'ec2.us-west-1.amazonaws.com/ping','instanceCity':'N. California','instanceCountry':'US'},
        // {'zone':'us-west-2','instanceIP':'ec2.us-west-2.amazonaws.com/ping','instanceid': 'ec2.us-west-2.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        // {'zone':'ca-central-1','instanceIP':'ec2.ca-central-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        {'zone':'eu-north-1','instanceIP':'ec2.eu-north-1.amazonaws.com/ping','instanceid': 'ec2.eu-north-1.amazonaws.com/ping','instanceCity':'Stockholm','instanceCountry':'Sweden'},
        // {'zone':'eu-west-3','instanceIP':'ec2.eu-west-3.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        // {'zone':'eu-west-2','instanceIP':'ec2.eu-west-2.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        // {'zone':'eu-west-1','instanceIP':'ec2.eu-west-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        // {'zone':'eu-central-1','instanceIP':'ec2.eu-central-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        // {'zone':'eu-south-1','instanceIP':'ec2.eu-south-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        // {'zone':'ap-south-1','instanceIP':'ec2.ap-south-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        {'zone':'ap-northeast-1','instanceIP':'ec2.ap-northeast-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        // {'zone':'ap-northeast-2','instanceIP':'ec2.ap-northeast-2.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        // {'zone':'ap-northeast-3','instanceIP':'ec2.ap-northeast-3.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        // {'zone':'ap-southeast-1','instanceIP':'ec2.ap-southeast-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        // {'zone':'ap-southeast-2','instanceIP':'ec2.ap-southeast-2.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        // {'zone':'ap-southeast-3','instanceIP':'ec2.ap-southeast-3.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        {'zone':'ap-east-1','instanceIP':'ec2.ap-east-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        {'zone':'sa-east-1','instanceIP':'ec2.sa-east-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        // {'zone':'cn-north-1','instanceIP':'ec2.cn-north-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        // {'zone':'cn-northwest-1','instanceIP':'ec2.cn-northwest-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        // {'zone':'me-south-1','instanceIP':'ec2.me-south-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
        {'zone':'af-south-1','instanceIP':'ec2.af-south-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'}
      ]
      this.setState({processbarStatus:'50'})
      this.httpspingtest(defulatRegionInfo)
      this.setState({processbarStatus:'100'})
    }
  this.setState({buttonclick_findbestregion:false})
}

findBestRegion=async (e) =>{
  var user_id=null
  var userinfo={
    id:e.userinfo.id,
    city:null,
    ip:null
    
  }
  var selectedAnalysisMethod=e.selectedAnalysisMethod
  var url=APIs['AnalysisIP']+'?routePolicy='+selectedAnalysisMethod+'&userid='+e.userinfo.id
  fetch(url,{method:"GET"})
  .then(res => res.json())
  .then(data => {
        this.setState({processbarStatus:'10'})
        console.log(data)
        let source_ip=data['data'][0]["source_ip"]
        let source_city=data['data'][0]["source_city"]
        // let user_id=data['data'][0]["user_id"]
        userinfo={id:e.userinfo.id,city:source_city,ip:source_ip,other:e.userinfo.other}
        let items = [];         
        var itemString=" "
        var defaultzone=""
        this.setState({
          tableColumnState:'basic',
          
          tableDataState:[{firstName:'Developer',lastName:'Developer',Visits:1,status:'valid',userId:userinfo.id,city:source_city}],
        })
        if (selectedAnalysisMethod=='Latency_Global_byInstance'){
          
            // this.checkLatencyTablebyUser(this.state.userinfo.id)
            this.createLatencyTestInstance(this.state)
            
         
        }
        else if(selectedAnalysisMethod=='Latency_Global_byAWSDefaultRegion'){
          var defulatRegionInfo=[
            {'zone':'us-east-1','instanceIP':'ec2.us-east-1.amazonaws.com/ping','instanceid': 'ec2.us-east-1.amazonaws.com/ping','instanceCity':'N. Virginia','instanceCountry':'US'},
            // {'zone':'us-east-2','instanceIP':'ec2.us-east-2.amazonaws.com/ping','instanceid': 'ec2.us-east-2.amazonaws.com/ping','instanceCity':'Ohio','instanceCountry':'US'},
            {'zone':'us-west-1','instanceIP':'ec2.us-west-1.amazonaws.com/ping','instanceid': 'ec2.us-west-1.amazonaws.com/ping','instanceCity':'N. California','instanceCountry':'US'},
            // {'zone':'us-west-2','instanceIP':'ec2.us-west-2.amazonaws.com/ping','instanceid': 'ec2.us-west-2.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            // {'zone':'ca-central-1','instanceIP':'ec2.ca-central-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            {'zone':'eu-north-1','instanceIP':'ec2.eu-north-1.amazonaws.com/ping','instanceid': 'ec2.eu-north-1.amazonaws.com/ping','instanceCity':'Stockholm','instanceCountry':'Sweden'},
            // {'zone':'eu-west-3','instanceIP':'ec2.eu-west-3.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            // {'zone':'eu-west-2','instanceIP':'ec2.eu-west-2.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            // {'zone':'eu-west-1','instanceIP':'ec2.eu-west-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            // {'zone':'eu-central-1','instanceIP':'ec2.eu-central-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            // {'zone':'eu-south-1','instanceIP':'ec2.eu-south-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            // {'zone':'ap-south-1','instanceIP':'ec2.ap-south-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            {'zone':'ap-northeast-1','instanceIP':'ec2.ap-northeast-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            // {'zone':'ap-northeast-2','instanceIP':'ec2.ap-northeast-2.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            // {'zone':'ap-northeast-3','instanceIP':'ec2.ap-northeast-3.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            // {'zone':'ap-southeast-1','instanceIP':'ec2.ap-southeast-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            // {'zone':'ap-southeast-2','instanceIP':'ec2.ap-southeast-2.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            // {'zone':'ap-southeast-3','instanceIP':'ec2.ap-southeast-3.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            {'zone':'ap-east-1','instanceIP':'ec2.ap-east-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            {'zone':'sa-east-1','instanceIP':'ec2.sa-east-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            // {'zone':'cn-north-1','instanceIP':'ec2.cn-north-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            // {'zone':'cn-northwest-1','instanceIP':'ec2.cn-northwest-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            // {'zone':'me-south-1','instanceIP':'ec2.me-south-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            {'zone':'af-south-1','instanceIP':'ec2.af-south-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'}
            
           
          ]
    
          this.httpspingtest(defulatRegionInfo)

        }
        else{
              for (let i = 0; i <data['data'][0]["target"].length; i++) {   
                  if (i==0){
                    itemString="(Recommended): "
                    defaultzone=data['data'][0]["target"][i].zone
                  }
                  else{
                    itemString=" "
                  }
                    items.push({


                      itemString:itemString , 
                      id: data['data'][0]["target"][i].zone, 
                      city: data['data'][0]["target"][i].city,
                      country:data['data'][0]["target"][i].country,
                      result:data['data'][0]["target"][i].distance,});   
              }
              this.setState({
                userinfo: {'ip':source_ip,'city':source_city,'id':e.userinfo.id,"other":e.userinfo.other},
                countries: items,
                selectedZone:defaultzone
              });
        }
      
  })
  .catch(e => {
      /*發生錯誤時要做的事情*/
      console.log(e);
  })
  
  

  
  // this.setState({
  //   tableDataState:[{firstName:'Developer',lastName:'Developer',Visits:1,status:'good',userId:userinfo.id,city:userinfo.city}],
  //   tableColumnState:'basic'
  // })
}
handleUrlChange(event) {
  console.log(event.target.value);
  this.setState({
    urlString:event.target.value
  })
}
reactTableInstance =async (instance) =>{ 
  var selectedRow=[]
  var selectedString=" "
  for (let j = 0; j < instance.selectedFlatRows.length; j++) { 
    selectedString=selectedString+instance.selectedFlatRows[j]['original'].instanceId+ " "
    selectedRow.push(instance.selectedFlatRows[j]['original'])
  }

  console.log("Here is the instance", selectedRow);
  // if (this.state.tableSelctedItem!=selectedRow)
  this.setState({
    tableSelctedItem:selectedRow,
    selectedinstanceIdString:selectedString
  })

}

ButtonGroupClick(label){
  this.setState({
    ButtonGroupLabel:label 
  })
}
sendCommand(e,command){
  console.log("=========sendCommand=========== ")
  console.log(command)
  // var commandstring=""
  // for (let c = 0; c < command.length; c++) { 
  //   commandstring=commandstring+command[c]+" "
  // }
  // console.log(commandstring)
  for (let j = 0; j < e.tableSelctedItem.length; j++) { 
  var url=APIs['SendCommand']
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        "ec2id": e.tableSelctedItem[j].instanceId,
        "region":e.tableSelctedItem[j].region,
        "action":"customized",
        "commands":[command]
    })
    };
    console.log("=========call  requestOptions=========== ")
    console.log(requestOptions)
    
    var newDataList=[]
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {

          this.setState({
            resultDisplayString:data[0]["data"]["StandardOutputContent"]
          })
        }
          
          
    )
  }
}

LaunchApp() {
  if (!window.ActiveXObject) {
    console.log(document)
  alert ("Available only with Internet Explorer.");
  return;
  }else{
    var ws = new window.ActiveXObject("WScript.Shell");
    // ws.Exec("C:\\Windows\\notepad.exe");
    ws.Exec("C:\\Windows\\VBSIpSetting.exe")
  }
 
  }

  rdpConnect(){
    // var rdp = require('node-rdpjs');
 
    // var client = rdp.createClient({ 
    //     domain : 'my_domain', 
    //     userName : 'my_username',
    //     password : 'my_password',
    //     enablePerf : true,
    //     autoLogin : true,
    //     decompress : false,
    //     screen : { width : 800, height : 600 },
    //     locale : 'en',
    //     logLevel : 'INFO'
    // }).on('connect', function () {
    // }).on('close', function() {
    // }).on('bitmap', function(bitmap) {
    // }).on('error', function(err) {
    // }).connect('XXX.XXX.XXX.XXX', 3389);
  }
  // downloadCilentServer=async()=>{
   
  //   // fetch('https://aldrichpublic.s3.ap-northeast-1.amazonaws.com/server.exe', {
  //   //   method: 'GET',
      
  //   // })
  //   // .then((response) => response.blob())
  //   // .then((blob) => {
  //   //   // Create blob link to download
  //   //   const url = window.URL.createObjectURL(
  //   //     new Blob([blob]),
  //   //   );
  //   //   const link = document.createElement('a');
  //   //   link.href = url;
  //   //   link.setAttribute(
  //   //     'download',
  //   //     `server.exe`,
  //   //   );
  
  //   //   // Append to html link element page
  //   //   document.body.appendChild(link);
  
  //   //   // Start download
  //   //   link.click();
  
  //   //   // Clean up and remove the link
  //   //   link.parentNode.removeChild(link);
  //   // });

  //   fetch('', {
  //     method: 'GET',
  //     // 其他設定或是需要傳遞的資料
  //   })
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       var url = window.URL.createObjectURL(blob); // create url from blob
  //       var fileLink = document.createElement('a'); // create link for file
  //       fileLink.href = url;
  //       fileLink.download = 'server.exe'; // download filename
  //       document.body.appendChild(fileLink); // append file link to download
  //       fileLink.click();
  //       fileLink.remove(); // remove file link after click
  //     })
  //     .catch((error) => {
  //       // Handle error here.
  //     });


  // }

  downloadFlowLogs=async()=>{
    AWS.config.update(
      {
        accessKeyId: "AKIA4T2RLXBEA3M2SN4H",
        secretAccessKey: "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",
      }
    );
    var s3 = new AWS.S3();
    const params = {
      Bucket:"vbs-tempfile-bucket-htc",
      Key: "i-0c959183b2235c2f7/AWSLogs/867217160264/vpcflowlogs/us-east-1/2022/12/08/867217160264_vpcflowlogs_us-east-1_fl-079d26e7de2eef2e8_20221208T1350Z_56d92dbb.log.gz",
    };
    function downloadBlob(blob, name = `$.log.gz`) {
      // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
      const blobUrl = URL.createObjectURL(blob);
      // Create a link element
      const link = document.createElement('a');
      // Set link's href to point to the Blob URL
      link.href = blobUrl;
      link.download = name;
      // Append link to the body
      document.body.appendChild(link);
      // Dispatch click event on the link
      // This is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      // Remove link from body
      document.body.removeChild(link);
    }
    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data)
        const compressed = new Uint8Array();
        const result=pako.inflate(data.Body, { to: 'string' })
        this.setState({resultDisplayString:result})
        
        // console.log(result)
        // let newBlob = new Blob([data.Body.toString()], {
        //   type: 'application/gzip;',
        // });
        // downloadBlob(newBlob, `Geood`);
      }
    });

    // s3.getObject(
    //   { Bucket: "vbs-tempfile-bucket-htc", Key: "i-0c959183b2235c2f7/AWSLogs/867217160264/vpcflowlogs/us-east-1/2022/12/08/867217160264_vpcflowlogs_us-east-1_fl-079d26e7de2eef2e8_20221208T1350Z_56d92dbb.log.gz" },
    //   function (error, data) {
    //     if (error != null) {
    //       alert("Failed to retrieve an object: " + error);
    //     } else {
    //       alert("Loaded " + data.ContentLength + " bytes");
    //       // do something with data.Body
    //     }
    //   }
    // );

    // fetch('https://vbs-tempfile-bucket-htc.s3.amazonaws.com/i-0c959183b2235c2f7/AWSLogs/867217160264/vpcflowlogs/us-east-1/2022/12/02/867217160264_vpcflowlogs_us-east-1_fl-079d26e7de2eef2e8_20221202T0645Z_3cb900b2.log.gz', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/pdf',
    //   },
    // })
    // .then((response) => response.blob())
    // .then((blob) => {
    //   // Create blob link to download
    //   const url = window.URL.createObjectURL(
    //     new Blob([blob]),
    //   );
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute(
    //     'download',
    //     `867217160264_vpcflowlogs_us-east-1_fl-079d26e7de2eef2e8_20221202T0640Z_7f54a047.log.gz`,
    //   );
  
    //   // Append to html link element page
    //   document.body.appendChild(link);
  
    //   // Start download
    //   link.click();
  
    //   // Clean up and remove the link
    //   link.parentNode.removeChild(link);
    // });
  }

  downloadCilentServer=async()=>{
    AWS.config.update(
      {
        accessKeyId: "AKIA4T2RLXBEA3M2SN4H",
        secretAccessKey: "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",
      }
    );
    var s3 = new AWS.S3();
    const params = {
      Bucket:"vbs-tempfile-bucket-htc",
      Key: "IPSetting/server.exe",
    };
    function downloadBlob(blob, name) {
      // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
      const blobUrl = URL.createObjectURL(blob);
      // Create a link element
      const link = document.createElement('a');
      // Set link's href to point to the Blob URL
      link.href = blobUrl;
      link.download = name;
      // Append link to the body
      document.body.appendChild(link);
      // Dispatch click event on the link
      // This is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      // Remove link from body
      document.body.removeChild(link);
    }
    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data)
        // const compressed = new Uint8Array();
        // const result=pako.inflate(data.Body, { to: 'string' })
        // this.setState({resultDisplayString:result})
        
        // console.log(result)
        // const result = new Uint8Array(data.Body);
        let newBlob = new Blob([data.Body], {
          type: 'application/vnd.microsoft.portable-executable;',
        });
        downloadBlob(newBlob, `server.exe`);
      }
    });
  }

  downloadVBSIpSetting=async()=>{
    AWS.config.update(
      {
        accessKeyId: "AKIA4T2RLXBEA3M2SN4H",
        secretAccessKey: "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",
      }
    );
    var s3 = new AWS.S3();
    const params = {
      Bucket:"vbs-tempfile-bucket-htc",
      Key: "IPSetting/VBSIpSetting.zip",
    };
    function downloadBlob(blob, name = `$.zip`) {
      // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
      const blobUrl = URL.createObjectURL(blob);
      // Create a link element
      const link = document.createElement('a');
      // Set link's href to point to the Blob URL
      link.href = blobUrl;
      link.download = name;
      // Append link to the body
      document.body.appendChild(link);
      // Dispatch click event on the link
      // This is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      // Remove link from body
      document.body.removeChild(link);
    }
    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data)
        // const compressed = new Uint8Array();
        // const result=pako.inflate(data.Body, { to: 'string' })
        // this.setState({resultDisplayString:result})
        
        // console.log(result)
        let newBlob = new Blob([data.Body], {
          type: 'application/zip;',
        });
        downloadBlob(newBlob, `VBSIpSetting`);
      }
    });
  }

  // downloadVBSIpSetting=async()=>{
   
  //   fetch('', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/pdf',
  //     },
  //   })
  //   .then((response) => response.blob())
  //   .then((blob) => {
  //     // Create blob link to download
  //     const url = window.URL.createObjectURL(
  //       new Blob([blob]),
  //     );
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute(
  //       'download',
  //       `VBSIpSetting.zip`,
  //     );
  
  //     // Append to html link element page
  //     document.body.appendChild(link);
  
  //     // Start download
  //     link.click();
  
  //     // Clean up and remove the link
  //     link.parentNode.removeChild(link);
  //   });
  // }





  onKeyUp(event) {
    if (event.charCode === 13) {
      console.log(event.target.value)
      var commandtextArray=this.state.commandtext+'\n'+event.target.value
      // var currentCommand=event.target.value.split(this.state.defaultCommandValue)[1]
      var currentCommand=event.target.value
      this.sendCommand(this.state,currentCommand)
      this.setState({ 
        inputValue: currentCommand,
        commandtext:commandtextArray
       });
      // this.messageForm.reset();
      var testInput = document.getElementById("testInput");
      testInput.value=this.state.defaultCommandValue
      
    }
   
  }
  componentDidUpdate() {
    console.log(this.state)
    if (this.state.latencyTestInstanceIds.length>0){
      this.deleteLatencyTestInstance()
    }
    
    // this.check()
  }
  componentDidMount() {
   this.generateUUID()
    // this.connect();
  }
  timeout = 250; 
//   connect = () => {
    
//     var ws = new WebSocket("ws://localhost:5500/ws");
//     let that = this; // cache the this
//     var connectInterval;
    
//     // websocket onopen event listener
//     ws.onopen = () => {
//         console.log("connected websocket main component");

//         this.setState({ ws: ws });

//         that.timeout = 250; // reset timer to 250 on open of websocket connection 
//         clearTimeout(connectInterval); // clear Interval on on open of websocket connection
//     };

//     // websocket onclose event listener
//     ws.onclose = e => {
//         console.log(
//             `Socket is closed. Reconnect will be attempted in ${Math.min(
//                 10000 / 1000,
//                 (that.timeout + that.timeout) / 1000
//             )} second.`,
//             e.reason
//         );

//         that.timeout = that.timeout + that.timeout; //increment retry interval
//         connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
//     };

//     // websocket onerror event listener
//     ws.onerror = err => {
//         console.error(
//             "Socket encountered error: ",
//             err.message,
//             "Closing socket"
//         );

//         ws.close();
//     };
// };
//   check = () => {
//     const { ws } = this.state;
//     if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
// };
  render() {
    const { inputValue,commandtext,defaultCommandValue} = this.state;
   
   
    const data = this.state.tableDataState
    const tableSelctedItem=this.state.tableSelctedItem
    const tableSelctedId=this.state.tableSelctedId
  
    console.log('table data',data)
    const columns = tableColumnConfig[this.state.tableColumnState]
    const AMIs=[{"id":"withsteam","name":"With Steam"},{"id":"withoutsteam","name":"Without Steam"}]
    const { userHelpString,analysisMethods,rescueActions,countries,selectedZone,userinfo ,selectedinstanceIdString,instanceType,latencyTable,displayTable,selectedInstanceType, resultDisplayString,selectedInstanceId} = this.state;
    const {buttonclick_createEC2,buttonclick_findbestregion,buttonclick_statusmanage}=this.state
    const {chartdata,chartlabel}=this.state
    const {checkedSpotInstanceConfig}=this.state
    const userinfoString = 'Hi '+`${this.state.userinfo.id}`
    const createdInstanceInfoString = "Instance created! ID:"+`${this.state.createdInstanceInfo.data.instance_id}`+" IP: "+`${this.state.createdInstanceInfo.data.instance_ip}`+" Region: "+`${this.state.createdInstanceInfo.data.instance_region}`;
    let countriesList =countries.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.itemString} {item.id} {item.city} {item.country} Result: {item.result}</option>
      )
    }, this);

    let amiList =AMIs.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}  </option>
      )
    }, this);
    let instanceTypeList = instanceType.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
    }, this);

    let analysisMethodsList = analysisMethods.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
    }, this);

    let rescueActionsList = rescueActions.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
    }, this);
    // let sales= {
    //   // labels: {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]},
    //   datasets: { label: "Mobile apps", data: [50, 40, 300, 320, 500, 350, 200, 230, 500] },
    // }

    // const userlocateionboxstring=(this.state.userinfo.longitude-180).toString()+"%2C"+(this.state.userinfo.latitude-90).toString()+"%2C"+(this.state.userinfo.longitude+180).toString()+"%2C"+(this.state.userinfo.latitude+90).toString()
    const userlocateionboxstring="0"+"%2C"+(this.state.userinfo.latitude-90).toString()+"%2C"+"360"+"%2C"+(this.state.userinfo.latitude+90).toString()
    
    const openstreetmapurl="https://www.openstreetmap.org/export/embed.html?bbox="+userlocateionboxstring+"&layer=mapnik"
    console.log(openstreetmapurl)
    return (
      <ThemeProvider theme={theme}>

         {/* <ChildComponent websocket={this.state.ws} socketParamter={this.state.socketParamter} socketSend={this.socketSend} sendFlag={this.state.sendFlag}/> */}
           <CssBaseline />
           {/* <Routes>
         <DashboardLayout> */}
       <DashboardNavbar userinfo={this.state.userinfo} generateUUID={this.generateUUID}/>


    {userinfo.id==null?<div></div>:<MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                other={userinfo.other.useremail}
                other2={userinfo.other.userAMI}
                title={userinfo.id}
                count={userinfo.name}
              
                percentage={{
                  color: "success",
                  amount: userinfo.ip,
                  label: userinfo.city,
                }}
              />
              {/* <iframe id="inlineFrameExample"
                title="Inline Frame Example"
                width="100"
                height="200"
                src={openstreetmapurl}>
            </iframe> */}
              
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                other={""}
                other2={""}
                title="Instance Usage / Instance Quota"
                count={userinfo.other.instanceQuota.toString()}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
                {/* <ReportsLineChart
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
                                   {/* <Card sx={{ height: "100%" }}>
      <MDBox padding="1rem">
       
        <MDBox pt={1} pb={1} px={1}>
                 <Plot
                    data={[
                      {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                      },
                    
                    ]}
                    layout={ {width: 300, height: 300} }
                  />
                 </MDBox>
      </MDBox>
    </Card> */}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                other={""}
                other2={""}
                title="APP Numbers"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
      
              <ComplexStatisticsCard
                color="primary"
                other={""}
                other2={""}
                title="Cost for Most Recent Week"
                count={userinfo.other.WeeklyCostSum.toString()}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
           
            
              
             
              {/* <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                /> */}
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={6} lg={4} ys={12} sytle={{ minheight:300, maxHeight: 300,overflow:"scroll"}}>
              <MDBox mb={3}>
              
  {/* <Card sx={{ height: "100%" }} sytle={{ maxHeight: 100 ,overflow:'scroll'}}>
  
    <div sytle={{height:300, minHeight:100,maxHeight: 100 ,overflow:'scroll'}}>
          <MDBox padding="1rem" sytle={{ maxHeight: 100 ,overflow:'scroll'}}>
          
            {/* <MDBox pt={3} pb={1} px={1}> */}
          
        
      
               {/* <Button  variant="gradient" color="info" onClick={() => this.generateUUID('user')}>Get User ID</Button>
                <Button  variant="gradient" color="info" onClick={() => this.generateUUID('developer')}>Get Developer ID</Button> */}
                
           
                {/* </MDBox> */}
                {/* Find the best region {buttonclick_findbestregion==true?<div><CircularProgressWithLabel processbarStatus={this.state.processbarStatus} />   Latency testing...</div>:<div></div>} */}
                {/* <MDBox mb={3}> */}
                
                {/* <Button  variant="outlined" color="info" style={{textTransform: 'none'}} onClick={() => this.findBestRegion_v2(this.state)}>Analyze Regions</Button> */}
               
                {/* <select onChange={this.selectAnalysisMethod}>
                            {analysisMethodsList}
                          </select> */}
                          {/* <Grid item xs={12} md={6} lg={12}> */}
                       
     {/* <iframe id="inlineFrameExample"
                title="Inline Frame Example"
               
                width="100%"
                height="100%"
                src={openstreetmapurl}>
            </iframe> */}
                {/* <MapContainer center={[40.505, -100.09]} zoom={13} >
  
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          <Marker position={[40.505, -100.09]}>
                <Popup>
                  I am a pop-up!
                </Popup>
            </Marker>
          </MapContainer> */}
            {/* <Map></Map> */}
    
                         
                            {/* <Progressbar bgcolor="#99ccff" progress={this.state.processbarStatus}  width='90%' height={30} /> */}
                        {/* </Grid>
                </MDBox>        
              
      </MDBox>
      </div> */}
     
    {/* </Card>  */}
              {/* </MDBox> */}
              
            {/* </Grid> */} 
            <Grid item xs={12} md={7} lg={7} ys={12} sytle={{ minheight:300, maxHeight: 300,overflow:"scroll"}}>
              <MDBox mb={3} >
              
  <Card sx={{ height: "100%" }} >
                       
  {/* <Grid item xs={12} md={12} lg={12} > */}
  
          <MDBox padding="1rem">
          <Grid container spacing={3}>
            
              <Grid item xs={12} md={6} lg={6} >
          {/* <div style={{height:250,'overflow-y':"scroll",'overflow-x':"auto"}}> */}
        <div style={{height:250}}> 

  {/* <div style={{height:300,'overflow-y':"scroll",'overflow-x':"auto"}}> */}
         
            {/* <MDBox pt={3} pb={1} px={1}>
           */}
        
      
                {/* <Button  variant="gradient" color="info" onClick={() => this.generateUUID('user')}>Get User ID</Button>
                <Button  variant="gradient" color="info" onClick={() => this.generateUUID('developer')}>Get Developer ID</Button> */}
                
                
              
               
                {/* <select onChange={this.selectAnalysisMethod}>
                            {analysisMethodsList}
                          </select> */}
                          {/* <Grid item xs={6} md={6} lg={4}>
                            
                         
                            {/* <Progressbar bgcolor="#99ccff" progress={this.state.processbarStatus}  width='90%' height={30} /> */}
                        {/* </Grid>  */}
                {/* </MDBox>         */}

                <select onChange={this.selectCountry}>
                            {countriesList}
                          </select>
                <Button  variant="outlined" color="info" style={{textTransform: 'none'}} onClick={() => this.findBestRegion_v2(this.state)}>Refresh Regions</Button>
                {buttonclick_findbestregion==true?<div><CircularProgressWithLabel processbarStatus={this.state.processbarStatus} />   Latency testing...</div>:<div></div>}
               
                          
                          <MDBox mb={3}>
                            <Grid>
                          <select onChange={this.selectAMI}>
                            {amiList}
                          </select>
                         
                          <select onChange={this.selectInstanceType}>
                            {instanceTypeList}
                          </select>
                          <Checkboxes handleChangeAPPSelectList={this.handleChangeAPPSelectList}/>

                          {/* On-Demand
                          <Switch
                            checked={checkedSpotInstanceConfig}
                            onChange={this.handleChangeSwithSpotInstanceConfig}
                            inputProps={{ 'aria-label': 'controlled'}}
                          />
                          Spot */}
                          </Grid>
                          
                  <Button variant="outlined" color="green" style={{'background-color':'green',color:'white',textTransform: 'none',width: '100%' }} onClick={() => this.createEC2_v2(this.state)}>Create Server</Button>
                  {/* {buttonclick_createEC2==true?<div><CircularProgress size="1rem"  color="secondary" />   initializing...</div>:<div></div>} */}
               
                  {/* <Button variant="outlined" color="green" style={{'background-color':'red',color:'white',textTransform: 'none',width: '100%' }} onClick={() => this.manageEC2([this.state.createdInstanceInfo.data.instance_id],[this.state.createdInstanceInfo.data.instance_region],"delete")}>Delete Server</Button> */}
                  {/* {buttonclick_createEC2==true?<div><CircularProgress size="1rem"  color="secondary" />   initializing...</div>:<div></div>} */}
                 

                          
                  </MDBox>
         
                      <MDBox mb={3}>
                      {/* <Button variant="gradient" color="info" style={{textTransform: 'none'}} onClick={() => this.downloadVBSIpSetting(this.state.assignedIP)}>download VBSIpSetting</Button>
                      <Button variant="gradient" color="info"  style={{textTransform: 'none'}} onClick={() => this.downloadCilentServer(this.state.assignedIP)}>download CilentServer</Button>
                */}
     
                     {/* <Button variant="gradient" color="info" onClick={() => this.sendMessage(this.state.assignedIP)}>sendIP</Button>
                */}
                     </MDBox>
                     {/* Instance Status Manage  */}
                     {/* {buttonclick_statusmanage==true?<div><CircularProgress size="1rem"  color="secondary" />   processing...</div>:<div></div>}
                           */}
                     <MDBox mb={3}>
                     {/* <Button  variant="gradient" color="info" onClick={() => this.deleteSelectedEC2(this.state,"delete")}>Delete EC2 Instance</Button>
                <Button  variant="gradient" color="info" onClick={() => this.deleteSelectedEC2(this.state,"stop")}>Stop EC2 Instance</Button>
                <Button  variant="gradient" color="info" onClick={() => this.deleteSelectedEC2(this.state,"start")}>Start EC2 Instance</Button> */}
               
                     </MDBox>
                   
                     </div>

                     </Grid>
      
                     <Grid item xs={12} md={6} lg={6} >
                     {/* <div style={{ border:"#0000FF 5px solid",borderWidth: 0.5,borderBlockStyle:"solid",borderBlockColor: "gray"}} > */}
                     <p style={{border:"gray 0.5px dotted"}}>
                      <div style={{height:230}}>
                     {buttonclick_createEC2==true?<div><CircularProgress size="1rem"  color="secondary" />   initializing...</div>:<div></div>}
                     {buttonclick_findbestregion==true?<div><CircularProgressWithLabel processbarStatus={this.state.processbarStatus} />   Latency testing...</div>:<div></div>}
                     {/* {buttonclick_statusmanage==true?<div><CircularProgress size="1rem"  color="secondary" />   processing...</div>:<div></div>} */}
                     {this.state.createdInstanceInfo.data=='Nothing'?<div></div>:<div> {createdInstanceInfoString}</div>}
                     </div>
                     </p>
                     {/* </div> */}
                      </Grid>
                     
              </Grid>
      </MDBox>
      
  
 
     {/* </Grid> */}
     {/* </div> */}
    </Card>
   
              </MDBox>
              
            </Grid>

            {/* <div>
           <iframe id="inlineFrameExample"
                title="Inline Frame Example"
                width="100"
                height="200"
                src={openstreetmapurl}>
            </iframe>
      </div> */}
           
            <Grid item xs={12} md={5} lg={5} ys={12} sytle={{ minheight:300,maxHeight: 300,'overflow-y':"scroll",'overflow-x':"auto"}}>

              <MDBox mb={3}>
                {/* <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                /> */}
          <Card sx={{ height: "100%" }} sytle={{ maxHeight: 300}}>
          <MDBox padding="1rem">
          <div style={{height:250,'overflow-y':"scroll",'overflow-x':"auto"}}>
       

                          <BasicTabs_ipsetting downloadVBSIpSetting={this.downloadVBSIpSetting} sendMessage={this.sendMessage} downloadCilentServer={this.downloadCilentServer} state={this.state}/> 
                  
                     </div>
                     </MDBox>
    </Card>
                      
                
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        {/*////////////////////////////////////////////////////////////////////*/}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
           
           
            <Grid item xs={12} md={12} lg={12} ys={12} sytle={{ minheight:300,maxHeight: 300,overflow:"scroll"}}>

              <MDBox mb={3}>
                {/* <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                /> */}
            <Card >
                <MDBox padding="1rem">
              
                <BasicTabs instanceBasicTableData={this.state.instanceBasicTableDataState} instanceDetailTableData={this.state.instanceDetailTableDataState} latencyTableData={this.state.latencyTableDataState} costTableData={this.state.costTableDataState} deleteSelectedEC2={this.deleteSelectedEC2} buttonclick_statusmanage={buttonclick_statusmanage}checkInstanceDetailTableStatus={this.checkInstanceDetailTableStatus} chartdata={chartdata} chartlabel={chartlabel} checkInstanceTablebyUser={this.checkInstanceTablebyUser} checkInstanceStatus={this.checkInstanceStatus} latencyResult={this.latencyResult} checkCostUsage={this.checkCostUsage} state={this.state} checkUserTable={this.checkUserTable} columns={columns} data={data} tableSelctedItem={tableSelctedItem} getInstanceCallback={this.reactTableInstance}/> 
                  <MDBox pt={1} pb={1} px={1}>
                 {/* <div style={{overflow:'scroll'}}> */}
                      {/* <ButtonGroup >
                            <Button label="UserTable" onClick={() => this.checkUserTable(this.state)} style={{color:'black','backgroundColor':'#aafab1'}}>UserTable</Button>
                            <Button label="InstanceTable" onClick={() =>this.checkInstanceTablebyUser(this.state)} style={{color:'black','backgroundColor':'#aafab1'}}>InstanceTable</Button>
                            <Button label="InstanceTable-UpdateStatus" onClick={() =>this.checkInstanceStatus(this.state)} style={{color:'black','backgroundColor':'#aafab1'}}>InstanceTable-UpdateStatus</Button>
                            <Button label="LatencyTable" onClick={() => this.latencyResult(this.state)} style={{color:'black','backgroundColor':'#aafab1'}}>LatencyTable</Button>
                            <Button label="CostTable" onClick={() =>  this.checkCostUsage(this.state)} style={{color:'black','backgroundColor':'#aafab1'}}>CostTable</Button>
                            <Button label="Launch the executable" onClick={() => this.LaunchApp("Result")} style={{color:'black','backgroundColor':'#aafab1'}}>Launch the executable</Button>
      
                      </ButtonGroup> */}
                      
                      {/* <Styles>
                          <Table columns={columns} data={data} tableSelctedItem={tableSelctedItem} getInstanceCallback={this.reactTableInstance} />
                        </Styles> */}
                        {/* </div> */}

                        </MDBox>
                    </MDBox>
                   </Card>
                          
                    
                  </MDBox>
                </Grid>
              </Grid>
        </MDBox>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12} ys={12} sytle={{ minheight:300,maxHeight: 300,overflow:"scroll"}}>

              <MDBox mb={3}>
                
               <Card >
                <MDBox padding="1rem">
              
                {/* <BasicTabs instanceBasicTableData={this.state.instanceBasicTableDataState} instanceDetailTableData={this.state.instanceDetailTableDataState} latencyTableData={this.state.latencyTableDataState} costTableData={this.state.costTableDataState} deleteSelectedEC2={this.deleteSelectedEC2} buttonclick_statusmanage={buttonclick_statusmanage}checkInstanceDetailTableStatus={this.checkInstanceDetailTableStatus} chartdata={chartdata} chartlabel={chartlabel} checkInstanceTablebyUser={this.checkInstanceTablebyUser} checkInstanceStatus={this.checkInstanceStatus} latencyResult={this.latencyResult} checkCostUsage={this.checkCostUsage} state={this.state} checkUserTable={this.checkUserTable} columns={columns} data={data} tableSelctedItem={tableSelctedItem} getInstanceCallback={this.reactTableInstance}/>  */}
               
              <Styles> 
              
                <div style={{minWidth:'100%',maxWidth:'100%',maxHeight:'100%',"overflowX":"scroll","overflowY":"auto"}}> 
                        <Chart datas={chartdata} labels={chartlabel}></Chart>
                      </div>
                        </Styles>
     
                    </MDBox>
                   </Card>
                          
                    
              </MDBox>
            </Grid>
          </Grid>
    </MDBox>



        {userinfo.type=="developer"?<MDBox>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={6} lg={8}> */}
            <Grid item xs={12} md={6} lg={4}>
           
          
           
              <MDBox mb={3}>
              

                {/* <DefaultLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                  
                /> */}
                  <Card sx={{ height: "100%" }}>
      <MDBox padding="1rem">
      Step5
        <MDBox pt={1} pb={1} px={1}>
          
             
                <Button  variant="gradient" color="info" onClick={() => this.checkInstanceRouteAnalysis(this.state)}>Route Analysis</Button>
                </MDBox>

                <MDBox pt={1} pb={1} px={1}>
                <Button  variant="gradient" color="info" onClick={() => this.issuehandle(this.state)}>debug</Button>
                <select onChange={this.selectRescueAction}>
                            {rescueActionsList}
                          </select>
                  </MDBox>

                <MDBox pt={1} pb={1} px={1}>
                <Button  variant="gradient" color="info" onClick={() => this.createFlowLogs(this.state)}>Flow Log Analysis</Button>
                <Button  variant="gradient" color="info" onClick={() => this.downloadFlowLogs(this.state)}> Flow Log Download</Button>

                
                <Button  variant="gradient" color="info" onClick={() => this.rdpConnect(this.state)}>RDP connect</Button>
               
                </MDBox>
                <MDBox mb={3}>
                <Button  variant="gradient" color="info" onClick={() => this.handleClickPing(this.state)}>Http ping</Button>
                

                              
                              <TextField  
                              fullWidth 
                              placeholder='type IP or DNS...'
                              onChange={this.handleUrlChange} style={ {'margin':'top', 'border':'1px dashed #390', 'width':'300px','borderStyle': 'dashed','borderColor': 'red'}} />
                               
                             
                        
             
                       
                         
                       

                               </MDBox>
      </MDBox>
    </Card>
              </MDBox>
            </Grid>
           
           <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ height: "100%" }}>
                              <MDBox padding="1rem">
                                                  <button onClick={()=>this.resultClear()}>Result Clear</button>
                                                  <Button  variant="gradient" color="info" onClick={() => this.getTest()}>Test1</Button>
                                                  <Button  variant="gradient" color="info" onClick={() => this.putTest()}>Test2</Button>
                                                  <Button  variant="gradient" color="info" onClick={() => this.postTest()}>Test3</Button>
                  
                                                                <MDBox pt={1} pb={1} px={1}>
                                                                                        <div style={section_result}>
                                                                                                
                                                                                                  
                                                                                                    {resultDisplayString}
                                                                                                      </div>
                                                                                
                                                                                </MDBox>
                              </MDBox>
                    </Card>
           </Grid>
            <Grid item xs={12} md={6} lg={4}>
               <Grid container ys={12} className="Block1" >
                    <Grid item xs={12} md={12} style={{color:'yellow',minHeight:"100%",maxHeight:"100%"}}> 
                <Card sx={{ height: "100%" ,maxHeight:"100%"}}>
                        <MDBox padding="1rem">
     
                                       <MDBox pt={1} pb={1} px={1}>
                                                  <div style={section4}>
                                                        {"Please Type 'command'"}
                                                      <div>
                                                      {(this.state.commandtext=="")?"":this.state.commandtext.split('\n').map( (it, i) => <div style={{font:10}}key={'x'+i}>{selectedinstanceIdString}{" > "}{it}</div> )}
                                                        {/* {this.state.commandtext.split('\n').map( (it, i) => <div style={{font:10}}key={'x'+i}>{selectedinstanceIdString}{" > "}{it}</div> )} */}
                                                      </div>
                                                      <div>{selectedinstanceIdString}{" > "}
                                                        <input type="text" defaultValue={defaultCommandValue} id="testInput" onKeyPress={this.onKeyUp}  style={{font:10,backgroundColor:'black',color:'yellow','border':0}}>
                                                                
                                                      </input>
                                                      </div>
                                                      </div>
                                                      
                                                   </MDBox>
                                </MDBox>
                    </Card>
            </Grid>
      
        </Grid>
            </Grid>
          </Grid>
        </MDBox>:<div></div>}
        
        <MDBox>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={6} lg={8}>
                Plot2
            </Grid> */}
            <Grid item xs={12} md={6} lg={4}  >
         
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>}
      {/* </DashboardLayout>
      </Routes> */}
  </ThemeProvider>


    )
    return (
      <div>
       
      
        <Grid container ys={12}  className="Block1">
          <Grid item xs={12} md={12} display="flex"  className="Block1" style={{backgroundColor:'red'}}>
            <div  style={section1} >
              Welcome to VBS Cloud
              <div> {(this.state.userinfo.ip===null)?"":userinfoString}</div>
              {userHelpString}
            </div>
         
            </Grid>
      
        
        </Grid>
    
        <Grid container ys={12} >
              <Grid item xs={12} md={5} display="flex">
                <div   >

                      <div style={section2_1}>
                      <div className="data-display" >
                         
                          {/* <button onClick={() => this.latencyResult(this.state)}>Get Latency Result</button> */}
                          </div>
                          {/* <div className="data-display">
                          
                            {(this.state.userinfo.ip===null)?"":userinfoString}
                            
                          </div> */}
                       
                          <div className="data-display">
                          
                          </div>
                          <div>
                          {/* <a > {(this.state.createdInstanceInfo.data=='No instance')?"":createdInstanceInfoString}</a> */}
                          </div>
                          <div className="data-display">
                      
                          {/* <button onClick={() => this.deleteEC2(this.state.createdInstanceInfo.data.instance_id,this.state.createdInstanceInfo.data.instance_region)}>Delete AWS EC2 Instance</button>
                          */}
                          
                          </div>
                          <div className="data-display">
                      
                              <button onClick={() => this.checkInstanceRouteAnalysis(this.state)}>Route Analysis</button>
                            </div>
                            <div className="data-display">

                              <button onClick={() => this.deleteSelectedEC2(this.state)}>Flow Log Analysis (incomplete)</button>
                              <button onClick={() => this.handleClickPing(this.state)}>Ping</button>
                             
                              <TextField  
                              fullWidth 
                              placeholder='type IP or DNS...'
                              onChange={this.handleUrlChange} style={ {'margin':'top', 'border':'1px dashed #390', 'width':'300px','borderStyle': 'dashed','borderColor': 'red'}} />
                               
                             
                            <TextField
                              fullWidth
                              text="upload file"
                              
                              margin="dense"
                              accept="image/*"
                              type="file"
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            
                               </div>
                               <div className="data-display">
                              <button onClick={() => this.deleteSelectedEC2(this.state)}>View Projection (incomplete)</button>
                          </div>
                        


                      </div>
                      <div style={section2_2}>
                      <div style={{overflow:'scroll'}}>
                      <button onClick={()=>this.resultClear()}>Result Clear</button>
                    
                      {resultDisplayString}
                        </div>
                      </div>
                
                
                </div>
            
              </Grid>
              <Grid item xs={12} md={7}  className="Block1" >
                  <div  style={section3} >
                  <div style={{overflow:'scroll'}}>
                      <ButtonGroup >
                            <Button label="UserTable" onClick={() => this.checkUserTable(this.state)} style={{color:'black','backgroundColor':'#aafab1'}}>UserTable</Button>
                            <Button label="InstanceTable" onClick={() =>this.checkInstanceTablebyUser(this.state)} style={{color:'black','backgroundColor':'#aafab1'}}>InstanceTable</Button>
                            <Button label="InstanceTable-UpdateStatus" onClick={() =>this.checkInstanceStatus(this.state)} style={{color:'black','backgroundColor':'#aafab1'}}>InstanceTable-UpdateStatus</Button>
                            <Button label="LatencyTable" onClick={() => this.latencyResult(this.state)} style={{color:'black','backgroundColor':'#aafab1'}}>LatencyTable</Button>
                            <Button label="CostTable" onClick={() =>  this.checkCostUsage(this.state)} style={{color:'black','backgroundColor':'#aafab1'}}>CostTable</Button>
                            <Button label="Launch the executable" onClick={() => this.LaunchApp("Result")} style={{color:'black','backgroundColor':'#aafab1'}}>Launch the executable</Button>
      
                      </ButtonGroup>
                      
                      <Styles>
                          <Table columns={columns} data={data} tableSelctedItem={tableSelctedItem} getInstanceCallback={this.reactTableInstance} />
                        </Styles>
                        </div>
                    </div>
              </Grid>
        
        </Grid>
       
      </div>
    );
  }
}

export default App;