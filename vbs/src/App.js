"use strict";
import logo from './logo.svg';
import './App.css';
import React, {Component,useState, useEffect,useMemo } from 'react';
import { makeStyles, Grid,Box,Container ,ButtonGroup,Button, TextField } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import styled from 'styled-components'
import uuid from 'react-uuid';
import {Table,Styles,tableColumnConfig} from './Table'
import { useTable,usePagination, useRowSelect } from 'react-table'
import { timer } from 'timer';
import { InputGroup, FormControl, Input } from "react-bootstrap";
import Plot from 'react-plotly.js';

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
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./assets/theme";
import { ThemeProvider } from "@mui/material/styles";
import MDBox from "./components/MDBox";
import MDTypography from "./components/MDTypography";
import MDButton from "./components/MDButton";
// Material Dashboard 2 React example components
import DashboardLayout from "./examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "./examples/Navbars/DashboardNavbar";
import Footer from "./examples/Footer";
import ReportsBarChart from "./examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "./examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "./examples/Cards/StatisticsCards/ComplexStatisticsCard";
// import routes from "./routes";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AWS from 'aws-sdk';
// import fsreact from 'fs-react';

const axios = require('axios');
const APIs={
  'CreateEC2':'https://qggbftqkl6.execute-api.us-east-1.amazonaws.com/prod/v1',
  'DeleteEC2':'https://tbym4io348.execute-api.us-east-1.amazonaws.com/prod/v1',
  'QueryDB':' https://w8mk0bw6t9.execute-api.us-east-1.amazonaws.com/prod/v1',
  'AnalysisIP':'https://b0diuhkc9f.execute-api.us-east-1.amazonaws.com/prod/v1',
  'CostUsage':'https://vgwh8al5v1.execute-api.us-east-1.amazonaws.com/prod/v1',
  'Metrics':'https://fzghypjvb1.execute-api.us-east-1.amazonaws.com/prod/v1',
  'LatencyTest':'https://9prtgwbcnf.execute-api.us-east-1.amazonaws.com/prod/v1',
  'SendCommand':'https://sf43cgtn5g.execute-api.us-east-1.amazonaws.com/prod/v1',
  'UpdateDB':'https://hjkjl682ci.execute-api.us-east-1.amazonaws.com/prod/v1'
    
}




var pingTimeGlobal=9999
var ws = new WebSocket("ws://localhost:5500/");
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
const section4 = {
  minHeight:300,
  height: "100%",
  paddingTop: 5,
  backgroundColor:'black',
  　color:'yellow',
  　'fontWeight':'bold',
  
  
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
  sendMessage=()=>{
      const {websocket,socketParamter} = this.props // websocket instance passed as props to the child component.
      var data=socketParamter   
      try {
          websocket.send(data) //send data to the server
      } catch (error) {
          console.log(error) // catch error
      }
  }
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

      tableColumnState:'basic',
      tableDataState:[{'firstName':'None'}],
      tableSelctedItem:[],

      userinfo: {ip:null,city:null},
      suitableZones:[],
      assignedIP:'',
      countries: [],
      analysisMethods:[],
      selectedZone:"Default",
      selectedServerIP:"",
      selectedInstanceType:"g4dn.xlarge",
      selectedInstanceId:'No',
      createdInstanceInfo:{'data':'Nothing'},
      selectedAnalysisMethod: 'Geolocation_Global',
      userHelpString:"Helper: Please click 'Analyze Regions' button",
      latencyTable:[{'latencyTest':[{id: "zone",Ave_bits_per_second:"Average of bits per second",Ave_lost_percent:"Average of lost percent",Ave_jitter_ms: "Average of jitter_ms", ip:"instance IP",ec2id:"instance ID",instanceCity:"instanceCity",instanceCountry:"instanceCountry",result:"Latency",status:"Status"}]}],
      instanceTable:{},
      displayTable:[],
      latencyResult:[{}],
      latencyTestStatus:'NoIPs',
      pingTimeState:0,
      tableColumnState:'basic',
      tableDataState:[],
      tableSelctedItem:[],
      selectedinstanceIdString:'No instance',
      ButtonGroupLabel:'Result',
      resultDisplayString:'',
      urlString:'',
      instanceType: [
        {id: 'g4dn.2xlarge', name: 'g4dn.2xlarge'},
        {id: 'g4dn.xlarge', name: 'g4dn.xlarge'},
        {id: 't3.medium', name: 't3.medium'},
        
      ],
      analysisMethods: [
        {id: 'Geolocation_Global', name: 'Geolocation_Global'},
        {id: 'Latency_Global_byInstance', name: 'Latency_Global_byInstance '},
        {id: 'Latency_Global_byAWSDefaultRegion', name: 'Latency_Global_byAWSDefaultRegion'},
      ],
      
      
    
    };
    this.onKeyUp=this.onKeyUp.bind(this);

    this.handleClickPing=this.handleClickPing.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.selectAnalysisMethod = this.selectAnalysisMethod.bind(this);
    this.latencyResult=this.latencyResult.bind(this);
    this.myPingFunc4=this.myPingFunc4.bind(this);
    this.checkCostUsage=this.checkCostUsage.bind(this);
    this.checkInstanceStatus=this.checkInstanceStatus.bind(this);
    this.reactTableInstance=this.reactTableInstance.bind(this);
    this.deleteSelectedEC2=this.deleteSelectedEC2.bind(this);
    this.findBestRegion=this.findBestRegion.bind(this);
    this.generateUUID=this.generateUUID.bind(this);
    this.createLatencyTestInstance=this.createLatencyTestInstance.bind(this);
    this.sendCommand=this.sendCommand.bind(this);
    this.ButtonGroupClick=this.ButtonGroupClick.bind(this);
    this.checkInstanceRouteAnalysis=this.checkInstanceRouteAnalysis.bind(this);
    this.handleUrlChange=this. handleUrlChange.bind(this);
    this.addLatencyDB=this.addLatencyDB.bind(this);
    this.resultClear=this.resultClear.bind(this);
    this.rdpConnect=this.rdpConnect.bind(this);
    this.socketSend=this.socketSend.bind(this);
    this.sendMessage=this.sendMessage.bind(this);
    this.downloadVBSIpSetting=this.downloadVBSIpSetting.bind(this);
    this.downloadFlowLogs=this.downloadFlowLogs.bind(this);

  }


  sendMessage=(ip)=>{
    var url="http://localhost:9090/notepad"
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

  componentDidMount() {
    ws = new WebSocket("ws://localhost:5500/");
    ws.onopen = () => {
    // on connecting, do nothing but log it to the console
    console.log('connected')
    }

    ws.onmessage = evt => {
    // listen to data sent from the websocket server
    const message = JSON.parse(evt.data)
    this.setState({dataFromServer: message})
    console.log(message)
    }

    ws.onclose = () => {
    console.log('disconnected')
    // automatically try to reconnect on connection loss

    }

}

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
    
    
    var url=APIs['Metrics']
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
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
myPingFunc4 =async (fqdn) =>{

  var NB_ITERATIONS = 4; // number of loop iterations
  var MAX_ITERATIONS = 5; // beware: the number of simultaneous XMLHttpRequest is limited by the browser!
  var TIME_PERIOD = 1000; // 1000 ms between each ping
  var i = 0;
  var over_flag = 0;
  var time_cumul = 0;
  var REQUEST_TIMEOUT = 15000;
  var TIMEOUT_ERROR = 0;
  
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
              i++;
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
  
          if ((i > NB_ITERATIONS) && (over_flag < 1)) { // all requests are passed and have returned
  
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
        }

      console.log("AVELatency",avg_time,AVELatency,pingTimeGlobal)
      this.setState({pingTimeState:avg_time})
      return avg_time
}

httppingtest=async (data) =>{

  var pingResult=[]
  let items2 = []; 
  var times=[]        
  var ping = new XMLHttpRequest();
  var delta_time=0
  for (let j = 0; j < data.length; j++) {   
      
      var serverIP=data[j].instanceIP
      var serverpublicDNS=data[j].publicDnsName
      var serverID=data[j].instanceid
      var serverCity=data[j].instanceCity
      var serverCountry=data[j].instanceCountry
      var serverZone=data[j].zone

      this.setState({userHelpString:'Now ping '+serverZone})
     
    
      
      // var fqdn=serverIP
      var fqdn="https://"+serverpublicDNS
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
          await timer(1000)
              // let's change non-existent URL each time to avoid possible side effect with web proxy-cache software on the line
              var url =fqdn 
              console.log("--------- Ping----",url);        
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
                              times.push(delta_time)
                              time_cumul += delta_time;
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
    data[j].latency=(avg_time).toString()
    pingResult.push({'serverIP':serverIP,'serverID':serverID,'pingTime': avg_time})
    items2.push({itemString:" " , id: serverZone, city: serverCity,country:serverCountry,result: avg_time});   
      
    }
  console.log("=========update latency table=====",data)
  this.addLatencyDB(data)
  items2.sort((a, b) => (a.result > b.result) ? 1 : -1)
  console.log("=========completed ping=====",items2)
  this.setState({ 
    latencyResult :pingResult, 
    countries: items2,
    selectedZone:items2[0].id,
    selectedServerIP:pingResult[0].serverIP});
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
                              times.push(delta_time)
                              time_cumul += delta_time;
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
  
createEC2(e){
console.log(e)
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

deleteEC2(id,region,action){
 
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
var url=APIs['DeleteEC2']+'?ec2id='+id+'&ec2region='+region+'&action='+action
  

  console.log("url",url)
  fetch(url,{method:"GET"})
    .then(res => res.json())
    .then(data => {
          /*接到request data後要做的事情*/
          console.log(action ,"ec2 reponse: ",data)
          this.setState({createdInstanceInfo:{'data':'No instance'}})
          
    })
    .catch(e => {
        /*發生錯誤時要做的事情*/
        console.log(e);
    })
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
  
  checkInstanceStatus(e){
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
  checkInstanceTablebyUser(e){
    var userid=e.userinfo.id
    var datalist=[]
    var url=APIs['QueryDB']+'?tableName=VBS_Instances_Information&userid='+userid
    fetch(url,{method:"GET"})
    .then(res => res.json())
    .then(data => {
          
         
          for (let i = 0; i < data['data'][0]['data'].length; i++) {   
            
            datalist.push({
            userId: userid,
            instancetype:data['data'][0]['data'][i].instancetype,
            instanceId: data['data'][0]['data'][i].id,
            instanceIp:data['data'][0]['data'][i].publicIP,
            cpuUtilization:"No Data",
            publicDnsName:data['data'][0]['data'][i].publicDnsName,
            status:data['data'][0]['data'][i].status
            ,launchtime:data['data'][0]['data'][i].launchtime
            ,region:data['data'][0]['data'][i].region
            ,zone:data['data'][0]['data'][i].zone,
            instanceStatus:"No Data",
                  systemStatus:"No Data",
                  networkIn:"No Data",
                  networkOut:"No Data",
                  networkPacketsIn:"No Data",
                  networkPacketsOut:"No Data",
                  EBSIOBalance:"No Data"
            
            })
           
          }

          // var response=this.checkInstanceStatus(datalist)
          // console.log("==========response checkInstanceStatus=======")
          // console.log(response)
          this.setState({
            // instanceTable:data['data'],
           
            //   displayTable:data['data'][0]['data'],
              tableDataState:datalist,
              tableColumnState:'instanceTable'
              
          });
         
    })
    .catch(e => {
        /*發生錯誤時要做的事情*/
        console.log(e);
    })
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
            tableColumnState:'latencyTable'
            
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
 
  this.checkLatencyTablebyUser(e.userinfo.id)
}
deleteSelectedEC2(e,action){
  console.log("Delete",e.tableSelctedItem)
  for (let i = 0; i < e.tableSelctedItem.length; i++) {   
    this.deleteEC2(e.tableSelctedItem[i].instanceId,e.tableSelctedItem[i].region,action)
  
  }
  
  
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
              tableColumnState:'costTable'
              
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



createLatencyTestInstance=async (e) =>{
  var url=APIs['LatencyTest']+'?userid='+e.userinfo.id
  let RegionInfo=[]
  fetch(url,{method:"GET"})
  .then(res => res.json())
  .then(data => {
    var instanceData=data[0]['instanceData']
    console.log("========instanceData======")
    console.log(instanceData)
    
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
    console.log("========RegionInfo======")
    console.log(data[0]['instanceData'])
    this.httppingtest(data[0]['instanceData'])

    

    for (let i = 0; i < data[0]['instanceData'].length; i++) {   
      this.deleteEC2(data[0]['instanceData'][i].instanceid,data[0]['instanceData'][i].region)
    }

   
  })


}

generateUUID(type){
  var userid=null
  if (type=='user'){
    userid=uuid()
  }
  else{
    userid='developer-123456789'
  }
  this.setState({
    userinfo:{id:userid,city:'Unknown',ip:'Unknown'}
  })
  console.log(this.state.userinfo)

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
        console.log(data)
        let source_ip=data['data'][0]["source_ip"]
        let source_city=data['data'][0]["source_city"]
        // let user_id=data['data'][0]["user_id"]
        userinfo={id:e.userinfo.id,city:source_city,ip:source_ip}
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
            {'zone':'us-west-1','instanceIP':'ec2.us-west-1.amazonaws.com/ping','instanceid': 'ec2.us-west-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'US'},
            // {'zone':'us-west-2','instanceIP':'ec2.us-west-2.amazonaws.com/ping','instanceid': 'ec2.us-west-2.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            // {'zone':'ca-central-1','instanceIP':'ec2.ca-central-1.amazonaws.com/ping','instanceid': 'ec2.ca-central-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
            {'zone':'eu-north-1','instanceIP':'ec2.eu-north-1.amazonaws.com/ping','instanceid': 'ec2.eu-north-1.amazonaws.com/ping','instanceCity':'None','instanceCountry':'None'},
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
                      result:data['data'][0]["target"][i].distance});   
              }
              this.setState({
                userinfo: {'ip':source_ip,'city':source_city,'id':e.userinfo.id},
                countries: items,
                selectedZone:defaultzone
              });
        }
      
  })
  .catch(e => {
      /*發生錯誤時要做的事情*/
      console.log(e);
  })


  

  
  this.setState({
    tableDataState:[{firstName:'Developer',lastName:'Developer',Visits:1,status:'good',userId:userinfo.id,city:userinfo.city}],
    tableColumnState:'basic'
  })
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
  downloadFlowLogs=async()=>{
    AWS.config.update({
      accessKeyId:"AKIA4T2RLXBEFJ7EQC5T",
      secretAccessKey:"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",
    });
    const s3 = new AWS.S3();

    const params = {
      Bucket:"vbs-tempfile-bucket-htc",
      Key: "i-0c959183b2235c2f7/AWSLogs/867217160264/vpcflowlogs/us-east-1/2022/12/02/867217160264_vpcflowlogs_us-east-1_fl-079d26e7de2eef2e8_20221202T0640Z_7f54a047.log.gz",
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
        console.log(data.Body)
        // let csvBlob = new Blob([data.Body.toString()], {
        //   type: 'text/csv;charset=utf-8;',
        // });
        // downloadBlob(csvBlob, `${template}`);
      }
    });
    // fetch("https://97sv9tdshc.execute-api.us-east-1.amazonaws.com/default/test-lifecycle",{
    //   method:"GET",
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data)
    // })   
    // .catch(e => {
    //     /*發生錯誤時要做的事情*/
    //     console.log(e);
    // })
    //   console.log("download flow logs")
    //   var url="https://vbs-tempfile-bucket-htc.s3.amazonaws.com/i-058200245bfa41801/AWSLogs/867217160264/vpcflowlogs/us-east-1/2022/12/02/867217160264_vpcflowlogs_us-east-1_fl-09881bdb9eb3c734f_20221202T0720Z_156f591c.log.gz"
    //   fetch(url,{
    //     method:"GET",
    //     headers:{
    //       "x-amz-security-token":"FwoGZXIvYXdzEJv//////////wEaDJGkH44hD5XqwvN+UiLfAYe8Fe3ejVWwH+Mkq3mTkWExtFJmR6pMPWdYV1koq9vasGY1g9mic+Qwd0iNEte2HbBIa9KSbvjrdXH6Grz8SsJhlA8KVabXVith+zAiAlrO+IeXGEMMusB8u+hIA2d+RvPXRD8URr22ZkVB6Kujy9FW10VNOgtK7w87YcAuC0IC3F6ZRoXVEM7IvWsju7xZXNKF5FYYFDwNm9ZKxYs1b/us4Vl4WBMUZP69BsIQkfP6B4JPsOCEJmpwZCh1+TOELM4YZgjNluXOk0XlcUbrLNt/2mWQDEloyJ3nczJG2M4o046nnAYyLQFr5hhFW/OXbLpcdzp6sIkk2gae2pLoqOqLupOVNO16RLEFhkD91AFWE7I/oQ=="
    //       ,"authorization":"AWS AKIA4T2RLXBEFJ7EQC5T:MIdI50ppcOMoA5Gst50jcc9G+9AKNWRTzHJk7c+b"
    //       ,"x-amz-date":(new Date()).toUTCString()
    //     }
    
    //   })
    //   .then(res => {console.log(res)})
    //   .catch(e => {
    //       /*發生錯誤時要做的事情*/
    //       console.log(e);
    //   })


  }
  downloadVBSIpSetting=async()=>{

   

    // const s3bucket = new AWS.S3({
    //   accessKeyId: "",
    //   secretAccessKey: "",
    //   signatureVersion: 'v4',
    //   region: "us-east-1", // ex) us-west-2
    // });
    // const params = {
    //   Bucket: "aldrichpublic",
    //   Expires: 3000,
    //   Key:"/VBSIpSetting.exe", // this key is the S3 full file path (ex: mnt/sample.txt)
    // };
    // const url = await s3bucket
    //   .getSignedUrlPromise('getObject', params)
    //   .catch((err) => {
    //     console.log(err);
    //   });
    
    //   // please note that the responseType is stream
    //   const res = await axios.get(url, {
    //     responseType: 'stream',
    //   });

    //   // receive the data as a read stream
    //   const istream = res.data;

    //   // create a write stream with the path including file name and its extension that you want to store the file in your directory.
    //   // const ostream = fsreact.createWriteStream("C:/Users/aldrich_chen.HTCTAIPEI");
    //   fsreact.writeFile("C:/Users/aldrich_chen.HTCTAIPEI/VBSIpSetting.exe",res.data)
    //   // using node.js pipe method to pipe the writestream
    //   // istream.pipe(ostream);
  }
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
    // this.check()
  }
  componentDidMount() {
    // this.connect();
  }
  timeout = 250; 
  connect = () => {
    
    var ws = new WebSocket("ws://localhost:5500/ws");
    let that = this; // cache the this
    var connectInterval;
    
    // websocket onopen event listener
    ws.onopen = () => {
        console.log("connected websocket main component");

        this.setState({ ws: ws });

        that.timeout = 250; // reset timer to 250 on open of websocket connection 
        clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    // websocket onclose event listener
    ws.onclose = e => {
        console.log(
            `Socket is closed. Reconnect will be attempted in ${Math.min(
                10000 / 1000,
                (that.timeout + that.timeout) / 1000
            )} second.`,
            e.reason
        );

        that.timeout = that.timeout + that.timeout; //increment retry interval
        connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = err => {
        console.error(
            "Socket encountered error: ",
            err.message,
            "Closing socket"
        );

        ws.close();
    };
};
  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
};
  render() {
    const { inputValue,commandtext,defaultCommandValue} = this.state;
   
   
    const data = this.state.tableDataState
    const tableSelctedItem=this.state.tableSelctedItem
    const tableSelctedId=this.state.tableSelctedId
  
    console.log('table data',data)
    const columns = tableColumnConfig[this.state.tableColumnState]
    const { userHelpString,analysisMethods,countries,selectedZone,userinfo ,selectedinstanceIdString,instanceType,latencyTable,displayTable,selectedInstanceType, resultDisplayString,selectedInstanceId} = this.state;
    const userinfoString = 'Hi '+`${this.state.userinfo.id}`
    const createdInstanceInfoString = "ID:"+`${this.state.createdInstanceInfo.data.instance_id}`+" IP: "+`${this.state.createdInstanceInfo.data.instance_ip}`+" Region: "+`${this.state.createdInstanceInfo.data.instance_region}`;
    let countriesList =countries.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.itemString} {item.id} {item.city} {item.country} Result: {item.result}</option>
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
    // let sales= {
    //   // labels: {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]},
    //   datasets: { label: "Mobile apps", data: [50, 40, 300, 320, 500, 350, 200, 230, 500] },
    // }
    
    return (
      <ThemeProvider theme={theme}>

         {/* <ChildComponent websocket={this.state.ws} socketParamter={this.state.socketParamter} socketSend={this.socketSend} sendFlag={this.state.sendFlag}/> */}
           <CssBaseline />
           {/* <Routes>
         <DashboardLayout> */}
       
    <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
               
                title={userinfo.id}
                count={"VBS Developer"}
                percentage={{
                  color: "success",
                  amount: userinfo.ip,
                  label: userinfo.city,
                }}
              />
              
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                
                title="Running Instance / Registrated Instance"
                count="10/23"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
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
               
                title="APP Numbers"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                
                title="Weekly Cost "
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
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
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                {/* <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                /> */}
                         <Card sx={{ height: "100%" }}>
      <MDBox padding="1rem">
       
        <MDBox pt={3} pb={1} px={1}>
       
        
      
                     Step1
                <MDButton  variant="gradient" color="info" onClick={() => this.generateUUID('user')}>Get User ID</MDButton>
                <MDButton  variant="gradient" color="info" onClick={() => this.generateUUID('developer')}>Get Developer ID</MDButton>
                </MDBox>

                <MDBox mb={3}>
                Step2
                <MDButton  variant="gradient" color="info" onClick={() => this.findBestRegion(this.state)}>Analyze Regions</MDButton>
                <select onChange={this.selectAnalysisMethod}>
                            {analysisMethodsList}
                          </select>
                          <iframe id="inlineFrameExample"
    title="Inline Frame Example"
    width="300"
    height="200"
    src="https://www.openstreetmap.org/export/embed.html?bbox=119.5%2C22.5%2C120.5%2C23.5&layer=mapnik">
</iframe>
                </MDBox>        
                          <MDBox mb={3}>
                  Step3
                  <MDButton variant="gradient" color="info" onClick={() => this.createEC2(this.state)}>Create AWS EC2 Instance</MDButton>
               

                          <select onChange={this.selectCountry}>
                            {countriesList}
                          </select>
                          <select onChange={this.selectInstanceType}>
                            {instanceTypeList}
                          </select>
                  </MDBox>
                  Step4 Assign IP
                          <MDBox mb={3}>
                          Method 1
                          <MDButton
                              component="a"
                              href="https://vbs-user-website-bucket.s3.us-east-1.amazonaws.com/setIP.html"
                              target="_blank"
                              rel="noreferrer"
                              variant="gradient"
                              color="info"
                             
                            >
                              Browser Trigger and USB( IE only)
                     
                     </MDButton>
                     </MDBox>
                      <MDBox mb={3}>
                      <MDButton variant="gradient" color="info" onClick={() => this.downloadVBSIpSetting(this.state.assignedIP)}>download VBSIpSetting</MDButton>
                      <MDButton variant="gradient" color="info" onClick={() => this.downloadCilentServer(this.state.assignedIP)}>download CilentServer</MDButton>
               
                     <MDButton variant="gradient" color="info" onClick={() => this.sendMessage(this.state.assignedIP)}>sendIP</MDButton>
               
                     </MDBox>
      </MDBox>
    </Card>
              </MDBox>
              
            </Grid>
           
            <Grid item xs={12} md={6} lg={8}>

              <MDBox mb={3}>
                {/* <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                /> */}
                    <Card sx={{ height: "100%" }}>
      <MDBox padding="1rem">
       
        <MDBox pt={1} pb={1} px={1}>
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

                        </MDBox>
      </MDBox>
    </Card>
                      
                
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
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
          
                <MDButton  variant="gradient" color="info" onClick={() => this.deleteSelectedEC2(this.state,"delete")}>Delete EC2 Instance</MDButton>
                <MDButton  variant="gradient" color="info" onClick={() => this.deleteSelectedEC2(this.state,"stop")}>Stop EC2 Instance</MDButton>
                <MDButton  variant="gradient" color="info" onClick={() => this.deleteSelectedEC2(this.state,"start")}>Start EC2 Instance</MDButton>
                  
                <MDButton  variant="gradient" color="info" onClick={() => this.checkInstanceRouteAnalysis(this.state)}>Route Analysis</MDButton>
                <MDButton  variant="gradient" color="info" onClick={() => this.checkFlowLogs(this.state)}>Flow Log Analysis</MDButton>
                <MDButton  variant="gradient" color="info" onClick={() => this.downloadFlowLogs('developer')}>Download Flow Logs</MDButton>
                
                
                
                <MDButton  variant="gradient" color="info" onClick={() => this.rdpConnect(this.state)}>RDP connect</MDButton>
               
                </MDBox>
                <MDBox mb={3}>
                <MDButton  variant="gradient" color="info" onClick={() => this.handleClickPing(this.state)}>Flow Log Analysis</MDButton>
                

                              
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
        <MDBox pt={1} pb={1} px={1}>
           <div style={{overflow:'scroll'}}>
                  
                    
                      {resultDisplayString}
                        </div>
                        
                        </MDBox>
      </MDBox>
    </Card>
           </Grid>
            <Grid item xs={12} md={6} lg={4}>
            <Grid container ys={12} className="Block1" >
                <Grid item xs={12} md={12} style={{color:'yellow',minHeight:70,overflow:'scroll'}}> 
                <Card sx={{ height: "100%" }}>
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
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
                Plot2
            </Grid>
            <Grid item xs={12} md={6} lg={4}  >
         
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
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