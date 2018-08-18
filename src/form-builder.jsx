/**
 * <FormBuilder />
 */

import React from 'react';
import Toolbar from './toolbar';
import ElementStore from './stores/ElementStore';
import FormBuilderCanvas from './form-builder-canvas';

export default class FormBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editElement: null,
    };

    this.editModeOn = this.editModeOn.bind(this);
    document.addEventListener('click', this.editModeOff.bind(this));

    if (props.onChange && typeof props.onChange === 'function') {
      ElementStore.listen(props.onChange);
    }
  }

  editModeOn(data, e) {
    e.stopPropagation();

    this.setState({
      editMode: !this.state.editMode,
      editElement: this.state.editMode ? null : data,
    });
  }

  manualEditModeOff() {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
        editElement: null,
      });
    }
  }

  editModeOff(e) {
    const $menu = $('.edit-form');
    const $edit = $('.fa-pencil-square-o');

    if (
      !$menu.is(e.target) &&
      !$edit.is(e.target) &&
      !$menu.has(e.target).length === 0 &&
      !$edit.has(e.target).length === 0
    ) {
      this.manualEditModeOff();
    }
  }

  render() {
    let toolbarProps = {};
    if (this.props.toolbarItems) {
      toolbarProps.items = this.props.toolbarItems;
    }

    return (
      <div>
        <div className="react-form-builder clearfix">
          <div>
            <FormBuilderCanvas files={this.props.files}
                               manualEditModeOff={this.manualEditModeOff.bind(this)}
                               url={this.props.url}
                               saveUrl={this.props.saveUrl}
                               editModeOn={this.editModeOn}
                               editMode={this.state.editMode}
                               variables={this.props.variables}
                               editElement={this.state.editElement} />
            <Toolbar {...toolbarProps} />
          </div>
        </div>
      </div>
    );
  }
}
