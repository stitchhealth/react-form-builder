/**
 * <Preview />
 */

import React from 'react';
import Sortable from 'react-anything-sortable';
import ElementStore from './stores/ElementStore';
import ElementActions from './actions/ElementActions';
import FormElementsEdit from './form-elements-edit';
import { Camera, Checkboxes, DatePicker, Download, Dropdown, Header, HyperLink, Image, Label, LineBreak, NumberInput, Paragraph, RadioButtons, Range, Rating, Signature, Tags, TextArea, TextInput } from './form-elements';

export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      answer_data: {},
    };

    var loadData = (this.props.url) ? this.props.url : (this.props.data) ? this.props.data : [];
    var saveUrl = (this.props.saveUrl) ? this.props.saveUrl : '';

    ElementStore.load(loadData, saveUrl);
    ElementStore.listen(this._onChange.bind(this));
  }

  _setValue(text) {
    return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
  }

  updateElement(element) {
    let data = this.state.data;
    let found = false;

    for(var i = 0, len = data.length; i < len; i++) {
      if (element.id === data[i].id) {
        data[i] = element;
        found = true;
        break;
      }
    }

    if (found) {
      ElementActions.saveData(data);
    }
  }

  _onChange(data) {

    let answer_data = {};

    data.forEach((item) => {
      if (item.readOnly && this.props.variables[item.variableKey]) {
        answer_data[item.field_name] = this.props.variables[item.variableKey];
      }
    });

    this.setState({
      data,
      answer_data,
    });
  }

  _onDestroy(item) {
    ElementActions.deleteElement(item);
  }

  handleSort(orderedIds) {
    let sortedArray = [];
    let data = this.state.data;
    let index = 0;

    for(var i = 0, len = data.length; i < len; i++) {
      index = orderedIds.indexOf(data[i].id);
      sortedArray[index] = data[i];
    }

    ElementActions.saveData(sortedArray);
    this.state.data = sortedArray;
  }

  render() {
    let classes = this.props.className;
    if (this.props.editMode) {
      classes += ' is-editing';
    }
    let items = this.state.data.map(item => {
      switch(item.element) {
        case 'Header':
          return <Header mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Paragraph':
          return <Paragraph mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Label':
          return <Label mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'LineBreak':
          return <LineBreak mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'TextInput':
          return <TextInput mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'NumberInput':
          return <NumberInput mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'TextArea':
          return <TextArea mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Dropdown':
          return <Dropdown mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Checkboxes':
          return <Checkboxes mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'DatePicker':
          return <DatePicker mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'RadioButtons':
          return <RadioButtons mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Rating':
          return <Rating mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Image':
          return <Image mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Tags':
          return <Tags mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Signature':
          return <Signature mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} read_only={item.readOnly} defaultValue={this.state.answer_data[item.field_name]} _onDestroy={this._onDestroy} />;
        case 'HyperLink':
          return <HyperLink mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Download':
          return <Download mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Camera':
          return <Camera mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Range':
          return <Range mutable={false} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
      }
    });


    return (
      <div className={classes}>
        <div className="edit-form">
          {this.props.editElement !== null &&
          <FormElementsEdit showCorrectColumn={this.props.showCorrectColumn} files={this.props.files} manualEditModeOff={this.props.manualEditModeOff} preview={this} element={this.props.editElement} updateElement={this.updateElement} />
          }
        </div>
        <Sortable sensitivity={0} key={this.state.data.length} onSort={this.handleSort.bind(this)} direction="vertical" className="" dynamic>
          {items}
        </Sortable>
      </div>
    );
  }
}

Preview.defaultProps = {
  showCorrectColumn: false,
  files: [],
  editMode: false,
  editElement: null,
  className: 'react-form-builder-preview pull-left',
};
