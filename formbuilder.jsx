import React from 'react';
import ReactFormBuilder from './src/form-builder';

export default class FormBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <ReactFormBuilder value={this.state.value} onChange={this.onChange} />
    );
  }
}
