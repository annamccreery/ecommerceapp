import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';

//import "antd/lib/select/style/index.css";
//import 'antd/dist/antd.compact.less'
//import 'antd/es/style/themes/default.less';
//import 'antd/dist/antd.less';
//import 'antd/dist/reset.css';
//import 'antd/dist/antd.css';
//import 'antd/dist/antd.min.css';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config)

ReactDOM.render(
  <Router />,
  document.getElementById('root')
);

