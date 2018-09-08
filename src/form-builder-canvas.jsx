/**
 * <FormBuilderCanvas />
 */

import React from 'react';
import Sortable from 'react-anything-sortable';
import ElementStore from './stores/ElementStore';
import ElementActions from './actions/ElementActions';
import FormElementsEdit from './form-elements-edit';
import { Camera, Checkboxes, DatePicker, Download, Dropdown, Header, HyperLink, Image, Label, LineBreak, NumberInput, Paragraph, RadioButtons, Range, Rating, Signature, Tags, TextArea, TextInput } from './form-elements';

export default class FormBuilderCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editElement: null,
    };

    ElementStore.listen(this._onChange.bind(this));

    this.editModeOn = this.editModeOn.bind(this);
    this.editModeOff = this.editModeOff.bind(this);
    this.manualEditModeOff = this.manualEditModeOff.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.editModeOff);
  }

  componentWillReceiveProps(props) {
    ElementStore.data = props.value;
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.editModeOff);
  }

  editModeOn(element, e) {
    e.stopPropagation();

    this.setState({
      editMode: !this.state.editMode,
      editElement: this.state.editMode ? null : element,
    });
  }

  editModeOff(e) {
    const $menu = $('.edit-form');
    const $edit = $('.fa-pencil-square-o');

    if (
      !$menu.is(e.target) &&
      !$edit.is(e.target) &&
      $menu.has(e.target).length === 0 &&
      $edit.has(e.target).length === 0
    ) {
      this.manualEditModeOff();
    }
  }

  manualEditModeOff() {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
        editElement: null,
      });
    }
  }

  _setValue(text) {
    return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
  }

  updateElement(element) {
    let { value } = this.props;
    let found = false;

    for (let i = 0, len = value.length; i < len; i++) {
      if (element.id === value[i].id) {
        value[i] = element;
        found = true;
        break;
      }
    }

    if (found) {
      ElementActions.updateElements(value);
    }
  }

  _onChange(data) {
    this.props.onChange(data);
  }

  _onDestroy(item) {
    ElementActions.deleteElement(item);
  }

  handleSort(orderedIds) {
    const { value } = this.props;
    let sortedArray = [];
    let index = 0;

    for (let i = 0, len = value.length; i < len; i++) {
      index = orderedIds.indexOf(value[i].id);
      sortedArray[index] = value[i];
    }

    ElementActions.updateElements(sortedArray);
  }

  render() {
    const { value, files, showCorrectColumn } = this.props;
    let classes = this.props.className;
    if (this.state.editMode) {
      classes += ' is-editing';
    }

    const items = value.map(item => {
      switch (item.element) {
        case 'Header':
          return <Header mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Paragraph':
          return <Paragraph mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Label':
          return <Label mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'LineBreak':
          return <LineBreak mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'TextInput':
          return <TextInput mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'NumberInput':
          return <NumberInput mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'TextArea':
          return <TextArea mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Dropdown':
          return <Dropdown mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Checkboxes':
          return <Checkboxes mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'DatePicker':
          return <DatePicker mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'RadioButtons':
          return <RadioButtons mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Rating':
          return <Rating mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Image':
          return <Image mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Tags':
          return <Tags mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Signature':
          return <Signature mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} read_only={item.readOnly} defaultValue={undefined} _onDestroy={this._onDestroy} />;
        case 'HyperLink':
          return <HyperLink mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Download':
          return <Download mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Camera':
          return <Camera mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
        case 'Range':
          return <Range mutable={false} editModeOn={this.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />;
      }
    });

    return (
      <div className={classes}>
        <div className="edit-form">
          {this.state.editElement !== null &&
          <FormElementsEdit showCorrectColumn={showCorrectColumn} files={files} manualEditModeOff={this.manualEditModeOff} preview={this} element={this.state.editElement} updateElement={this.updateElement} />
          }
        </div>
        <Sortable sensitivity={0} key={value.length} onSort={this.handleSort.bind(this)} direction="vertical" className="" dynamic>
          {items}
        </Sortable>
      </div>
    );
  }
}

FormBuilderCanvas.defaultProps = {
  value: [],
  files: [],
  showCorrectColumn: false,
  onChange: () => undefined,
  className: 'rfbp pull-left',
};
