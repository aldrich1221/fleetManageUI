import { MaterialUIControllerProvider } from "./context";
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-app-polyfill/ie11'
import { BrowserRouter } from "react-router-dom";
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
require("@babel/register")({
  presets: [["@babel/preset-env"], ["@babel/preset-react"]],
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <MaterialUIControllerProvider>
    <App />
    </MaterialUIControllerProvider>
  </React.StrictMode>
  // <BrowserRouter>
  //   <MaterialUIControllerProvider>
  //     <App />
  //   </MaterialUIControllerProvider>
  // </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
