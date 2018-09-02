import React from "react";
import ReactDOM from "react-dom";
import DemoBar from './demobar';
import {ReactFormBuilder} from "./src/index";
import * as variables from './variables'

// Add our stylesheets for the demo.
require('./css/application.css.scss');

let value =
  [{"id": "7329b896-5998-4f7c-b96e-18bcaed5b61d", "bold": false, "text": "Header Text", "italic": false, "static": true, "content": "Placeholder Text...", "element": "Header", "required": false},
    {"id": "b1710656-94d8-49eb-968c-9cc21418a578", "bold": false, "text": "Label", "italic": false, "static": true, "content": "Placeholder Text...", "element": "Label", "required": false},
    {"id": "2b511e69-55c7-4e1f-810e-60c78bfcdabc", "bold": false, "text": "Line Break", "italic": false, "static": true, "element": "LineBreak", "required": false}]

let onChange = (data) => {
  value = data;
}

ReactDOM.render(
  <ReactFormBuilder variables={variables} value={value} onChange={onChange}/>,
  document.getElementById('form-builder')
)

ReactDOM.render(
  <DemoBar variables={variables} />,
  document.getElementById('demo-bar')
)
