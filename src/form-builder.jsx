/**
 * <FormBuilder />
 */

import React from 'react';
import Toolbar from './toolbar';
import FormBuilderCanvas from './form-builder-canvas';

export default class FormBuilder extends React.Component {
  render() {
    let toolbarProps = {
      isSticky: this.props.isSticky
    };
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
      <div className="rfbw">
        <div className="rfbb">
          <FormBuilderCanvas
            value={value}
            onChange={onChange}
            files={this.props.files}
            variables={this.props.variables}
            showCorrectColumn={this.props.showCorrectColumn} />
          <Toolbar {...toolbarProps} />
        </div>
      </div>
    );
  }
}
