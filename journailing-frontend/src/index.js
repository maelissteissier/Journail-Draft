import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/VarelaRound-Regular.ttf';
// import './fonts/Mukta-Light.ttf';
// import './fonts/Mukta-ExtraLight.ttf';
// import './fonts/Mukta-Medium.ttf';
// import './fonts/Mukta-Bold.ttf';
// import './fonts/Mukta-SemiBold.ttf';
// import './fonts/Mukta-ExtraBold.ttf';
import './global.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
