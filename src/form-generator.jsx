/**
 * <FormGenerator />
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { EventEmitter } from 'fbemitter';
import FormValidator from './form-validator';
import { Annotation, Camera, Checkboxes, DatePicker, Download, Dropdown, Header, HyperLink, Image, Label, LineBreak, NumberInput, Paragraph, RadioButtons, Range, Rating, Signature, TextArea, TextInput } from './form-elements';

export default class FormGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.emitter = new EventEmitter();
  }

  _checkboxesDefaultValue(item, answer_data = this.props.answer_data) {
    return item.options.map(x => answer_data[`option_${x.key}`]).filter(x => x);
  }

  _isIncorrect(item, answer_data) {
    let incorrect = false;
    if (item.canHaveAnswer) {
      if (item.element === 'Checkboxes' || item.element === 'RadioButtons') {
        item.options.forEach(option => {
          let $option = ReactDOM.findDOMNode(this.refs[item.field_name].refs[`child_ref_${option.key}`]);
          if ((option.hasOwnProperty('correct') && !$option.checked) || (!option.hasOwnProperty('correct') && $option.checked)) {
            incorrect = true;
          }
        });
      } else {
        let $item = null;
        if (item.element === 'Rating') {
          $item = {};
          $item.value = this.refs[item.field_name].refs[`child_ref_${item.field_name}`].state.rating;
          if ($item.value.toString() !== item.correct) {
            incorrect = true;
          }
        } else {
          if (item.element === 'Dropdown') {
            $item = {};
            $item.value = this.refs[item.field_name].refs[`child_ref_${item.field_name}`].state.value;
          } else if (item.element === 'DatePicker') {
            $item = {};
            $item.value = this.refs[item.field_name].state.value;
          } else {
            $item = ReactDOM.findDOMNode(this.refs[item.field_name].refs[`child_ref_${item.field_name}`]);
            $item.value = $item.value.trim();
          }

          if ($item.value.toLowerCase() !== item.correct.trim().toLowerCase()) {
            incorrect = true;
          }
        }
      }
    }
    return incorrect;
  }

  _isInvalid(item, answer_data) {
    if (item.required === true) {
      let value;
      if (item.element === 'Checkboxes') {
        value = this._checkboxesDefaultValue(item, answer_data).join(',');
      } else if (item.element === 'Signature') {
        try {
          value = JSON.parse(answer_data[item.field_name])['value'];
        } catch (e) {
          //
        }
      } else {
        value = answer_data[item.field_name];
      }

      return value === undefined || value === '' || value === null;
    } else {
      return false;
    }

  }

  getFormData = (validate = true) => {
    const $form = $(ReactDOM.findDOMNode(this.refs.form));

    const answer_data = {};
    $form.serializeArray().forEach(({ name, value }) => {
      answer_data[name] = value;
    });

    let errors = [];
    if (validate) {
      errors = this.validateForm(answer_data);

      // Publish errors, if any.
      this.emitter.emit('formValidation', errors);
    }

    return { valid: errors.length === 0, errors: errors, data: answer_data };
  };

  validateForm(answer_data) {
    let errors = [];
    let data_items = this.props.data;

    data_items.forEach(item => {
      if (this._isInvalid(item, answer_data)) {
        errors.push(`${item.label} is required!`);
      }

      if (this.props.validateForCorrectness && this._isIncorrect(item, answer_data)) {
        errors.push(`${item.label} was answered incorrectly!`);
      }
    });

    return errors;
  }

  render() {
    let data_items = this.props.data;
    let read_only = this.props.read_only;

    data_items.forEach((item) => {
      if (item.readOnly && item.variableKey && this.props.variables[item.variableKey]) {
        this.props.answer_data[item.field_name] = this.props.variables[item.variableKey];
      }
    });

    let items = data_items.map(item => {
      const key = `form_${item.id}`;

      switch (item.element) {
        case 'Header':
          return <Header key={key} mutable={true} data={item} />;
        case 'Paragraph':
          return <Paragraph key={key} mutable={true} data={item} />;
        case 'Label':
          return <Label key={key} mutable={true} data={item} />;
        case 'LineBreak':
          return <LineBreak key={key} mutable={true} data={item} />;
        case 'TextInput':
          return <TextInput ref={item.field_name} key={key} mutable={true} data={item} read_only={read_only} defaultValue={this.props.answer_data[item.field_name]} />;
        case 'NumberInput':
          return <NumberInput ref={item.field_name} read_only={read_only} key={key} mutable={true} data={item} defaultValue={this.props.answer_data[item.field_name]} />;
        case 'TextArea':
          return <TextArea ref={item.field_name} read_only={read_only} key={key} mutable={true} data={item} defaultValue={this.props.answer_data[item.field_name]} />;
        case 'Dropdown':
          return <Dropdown ref={item.field_name} read_only={read_only} key={key} mutable={true} data={item} defaultValue={this.props.answer_data[item.field_name]} />;
        case 'Checkboxes':
          return <Checkboxes ref={item.field_name} read_only={read_only} key={key} mutable={true} data={item} defaultValue={this._checkboxesDefaultValue(item)} />;
        case 'DatePicker':
          return <DatePicker ref={item.field_name} read_only={read_only} key={key} mutable={true} data={item} defaultValue={this.props.answer_data[item.field_name]} />;
        case 'RadioButtons':
          return <RadioButtons ref={item.field_name} read_only={read_only} key={key} mutable={true} data={item} defaultValue={this.props.answer_data[item.field_name]} />;
        case 'Rating':
          return <Rating ref={item.field_name} read_only={read_only} key={key} mutable={true} data={item} defaultValue={this.props.answer_data[item.field_name]} />;
        case 'Image':
          return <Image ref={item.field_name} key={key} mutable={true} data={item} defaultValue={this.props.answer_data[item.field_name]} />;
        case 'Annotation':
          return <Annotation ref={item.field_name} read_only={read_only} key={key} mutable={true} data={item} defaultValue={this.props.answer_data[item.field_name]} />;
        case 'Signature':
          return <Signature ref={item.field_name} read_only={this.props.read_only || item.readOnly} key={key} mutable={true} data={item} defaultValue={this.props.answer_data[item.field_name]} />;
        case 'HyperLink':
          return <HyperLink key={key} mutable={true} data={item} />;
        case 'Download':
          return <Download download_path={this.props.download_path} key={key} mutable={true} data={item} />;
        case 'Camera':
          return <Camera ref={item.field_name} read_only={read_only} key={key} mutable={true} data={item} defaultValue={this.props.answer_data[item.field_name]} />;
        case 'Range':
          return <Range ref={item.field_name} read_only={read_only} key={key} mutable={true} data={item} defaultValue={this.props.answer_data[item.field_name]} />;
      }
    });

    return (
      <div className="rfbw">
        <form ref='form' onSubmit={(e) => e.preventDefault()}>
          <FormValidator emitter={this.emitter} />
          <div className='rfbg ql-editor'>{items}</div>
        </form>
      </div>
    );
  }
}

FormGenerator.defaultProps = { validateForCorrectness: false };
