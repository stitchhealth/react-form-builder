/**
 * <FormBuilderCanvas />
 */

import React from 'react';
import uuid from 'uuid/v4';
import Sortable from 'react-anything-sortable';
import cx from 'classnames';
import ElementStore from './stores/ElementStore';
import ElementActions from './actions/ElementActions';
import FormElementsEdit from './form-elements-edit';
import { Annotation, Camera, Checkboxes, DatePicker, Download, Dropdown, Header, HyperLink, Image, Label, LineBreak, NumberInput, Paragraph, RadioButtons, Range, Rating, Signature, TextArea, TextInput } from './form-elements';

export default class FormBuilderCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editElement: null,
    };

    ElementStore.listen(this._onChange);
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

  editModeOn = (element, e) => {
    e.stopPropagation();

    this.setState({
      editMode: !this.state.editMode,
      editElement: this.state.editMode ? null : element,
    });
  };

  editModeOff = (e) => {
    if ($('.edit-modal').is(e.target)) {
      this.manualEditModeOff();
    }
  };

  _onClone = (element) => {
    const { value } = this.props;
    const index = value.findIndex(item => item.id === element.id);
    let newArray = [...value];
    const newElement = {
      ...element,
      id: uuid()
    }

    newArray.splice(index + 1, 0, newElement)
    ElementActions.updateElements(newArray);
  }

  manualEditModeOff = () => {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
        editElement: null,
      });
    }
  };

  _setValue(text) {
    return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
  }

  updateElement = (element) => {
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
  };

  _onChange = (data) => {
    this.props.onChange(data);
  };

  _onDestroy(item) {
    ElementActions.deleteElement(item);
  }

  handleSort = (orderedIds) => {
    const { value } = this.props;
    let sortedArray = [];
    let index = 0;

    for (let i = 0, len = value.length; i < len; i++) {
      index = orderedIds.indexOf(value[i].id);
      sortedArray[index] = value[i];
    }

    ElementActions.updateElements(sortedArray);
  };

  render() {
    const { value } = this.props;
    let classes = cx(this.props.className, 'ql-editor', 'rfbc', {
      'is-editing': this.state.editMode
    });

    const items = value.map(item => {
      const itemProps = {
        mutable: false,
        editModeOn: this.editModeOn,
        key: item.id,
        sortData: item.id,
        onClone: this._onClone,
        data: item
      };

      switch (item.element) {
        case 'Header':
          return <Header {...itemProps} />;
        case 'Paragraph':
          return <Paragraph {...itemProps} />;
        case 'Label':
          return <Label {...itemProps} />;
        case 'LineBreak':
          return <LineBreak {...itemProps} />;
        case 'TextInput':
        case 'Other':
          return <TextInput {...itemProps} />;
        case 'NumberInput':
          return <NumberInput {...itemProps} />;
        case 'TextArea':
          return <TextArea {...itemProps} />;
        case 'Dropdown':
          return <Dropdown {...itemProps} />;
        case 'Checkboxes':
          return <Checkboxes {...itemProps} />;
        case 'DatePicker':
          return <DatePicker {...itemProps} />;
        case 'RadioButtons':
          return <RadioButtons {...itemProps} />;
        case 'Rating':
          return <Rating {...itemProps} />;
        case 'Image':
          return <Image {...itemProps} />;
        case 'Annotation':
          return <Annotation {...itemProps} />;
        case 'Signature':
          return <Signature {...itemProps} />;
        case 'HyperLink':
          return <HyperLink {...itemProps} />;
        case 'Download':
          return <Download {...itemProps} />;
        case 'Camera':
          return <Camera {...itemProps} />;
        case 'Range':
          return <Range {...itemProps} />;
      }
    });

    return (
      <div className={classes}>
        {this.state.editElement !== null && this.renderEditModal()}
        <Sortable sensitivity={0} key={value.length} onSort={this.handleSort} direction="vertical" className="" dynamic>
          {items}
        </Sortable>
      </div>
    );
  }

  renderEditModal() {
    const { files, showCorrectColumn } = this.props;

    return (
      <div role="dialog">
        <div className="fade modal-backdrop in" />
        <div role="dialog" tabIndex="-1" className="fade invite-people-modal in modal edit-modal">
          <div className="modal-dialog">
            <div className="modal-content" role="document">
              <div className="modal-header">
                <h4 className="modal-title pull-left">{this.state.editElement.text}</h4>
                <a role="link" onClick={this.manualEditModeOff}><i className="pull-right fa fa-times dismiss-edit" /></a>
              </div>
              <div className="modal-body edit-form">
                <FormElementsEdit showCorrectColumn={showCorrectColumn} files={files} manualEditModeOff={this.manualEditModeOff} preview={this} element={this.state.editElement} updateElement={this.updateElement} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FormBuilderCanvas.defaultProps = {
  value: [],
  files: [],
  showCorrectColumn: false,
  onChange: () => undefined,
  className: 'rfbp',
};
