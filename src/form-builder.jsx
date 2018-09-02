/**
 * <FormBuilder />
 */

import React from 'react';
import Toolbar from './toolbar';
import FormBuilderCanvas from './form-builder-canvas';

export default class FormBuilder extends React.Component {
  render() {
    let toolbarProps = {};
    if (this.props.toolbarItems) {
      toolbarProps.items = this.props.toolbarItems;
    }

    let value = [];
    if (this.props.value && Array.isArray(this.props.value)) {
      value = this.props.value;
    }

    let onChange = () => undefined;
    if (this.props.onChange && typeof this.props.onChange === 'function') {
      onChange = this.props.onChange;
      //   ElementStore.listen(props.onChange);
    }

    return (
      <div>
        <div className="react-form-builder clearfix">
          <div>
            <FormBuilderCanvas value={value}
                               onChange={onChange}
                               files={this.props.files}
                               variables={this.props.variables} />
            <Toolbar {...toolbarProps} />
          </div>
        </div>
      </div>
    );
  }
}
