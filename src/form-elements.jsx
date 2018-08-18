import React from 'react';
import HeaderBar from './header-bar';
import Select from 'react-select';
import SignaturePad from 'react-signature-pad';
import { sortable } from 'react-anything-sortable';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import ReactDatePicker from 'react-datepicker';
import StarRating from './star-rating';
import myxss from './filter-xss';
import moment from 'moment';
import cx from 'classnames';

class RfbItem extends React.Component {
  render() {
    const invalidClases = ['', 'true', 'false', 'undefined'];
    const {children = '', pageBreakBefore = false, className = '', ...props} = this.props;
    const classes = className.split(' ').map(x => x.trim()).filter(x => !invalidClases.includes(x));
    pageBreakBefore && classes.push('alwaysbreak');
    classes.push('rfb-item');

    return <div {...props} className={classes.join(' ')}>{children}</div>;
  }
}

@sortable
class Header extends React.Component {
  render() {
    const classNames = cx('static', {bold: this.props.data.bold, italic: this.props.data.italic});

    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <h3 className={classNames} dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.content)}} />
      </RfbItem>
    );
  }
}

@sortable
class Paragraph extends React.Component {
  render() {
    const classNames = cx('static', {bold: this.props.data.bold, italic: this.props.data.italic});

    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <p className={classNames} dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.content)}} />
      </RfbItem>
    );
  }
}

@sortable
class Label extends React.Component {
  render() {
    const classNames = cx('static', {bold: this.props.data.bold, italic: this.props.data.italic});

    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <label className={classNames} dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.content)}} />
      </RfbItem>
    );
  }
}

@sortable
class LineBreak extends React.Component {
  render() {
    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <hr />
      </RfbItem>
    );
  }
}

@sortable
class TextInput extends React.Component {
  render() {
    let props = {};
    props.type = 'text';
    props.className = 'form-control';
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = 'child_ref_' + this.props.data.field_name;
    }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <div className="form-group">
          <label>
            <span dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.label)}} />

            {(this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only) &&
            <span className="label-required label label-danger">Required</span>
            }
          </label>
          <input {...props} />
        </div>
      </RfbItem>
    );
  }
}

@sortable
class NumberInput extends React.Component {
  render() {
    let props = {};
    props.type = 'number';
    props.className = 'form-control';
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = 'child_ref_' + this.props.data.field_name;
    }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <div className="form-group">
          <label>
            <span dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.label)}} />

            {(this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only) &&
            <span className="label-required label label-danger">Required</span>
            }
          </label>
          <input {...props} />
        </div>
      </RfbItem>
    );
  }
}

@sortable
class TextArea extends React.Component {
  render() {
    let props = {};
    props.className = 'form-control';
    props.name = this.props.data.field_name;

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = 'child_ref_' + this.props.data.field_name;
    }

    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <div className="form-group">
          <label>
            <span dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.label)}} />
            {(this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only) &&
            <span className="label-required label label-danger">Required</span>
            }
          </label>
          <textarea {...props} />
        </div>
      </RfbItem>
    );
  }
}

@sortable
class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    var value, internalValue;

    if (this.props.data.defaultToday && (this.props.defaultValue === '' || this.props.defaultValue === undefined)) {
      value = moment().format('MM/DD/YYYY');
      internalValue = moment();
    } else {
      value = this.props.defaultValue;

      if (this.props.defaultValue !== '' && this.props.defaultValue !== undefined) {
        internalValue = moment(value, 'MM/DD/YYYY');
      }
    }

    return {
      value: value,
      internalValue: internalValue,
      placeholder: 'mm/dd/yyyy',
      defaultToday: this.props.data.defaultToday,
    };
  }

  handleChange(dt) {
    if (dt && dt.target) {

      var placeholder = (dt && dt.target && dt.target.value === '') ? 'mm/dd/yyyy' : '';
      var formattedDate = (dt.target.value) ? moment(dt.target.value).format('YYYY-MM-DD') : '';

      this.setState({
        value: formattedDate,
        internalValue: formattedDate,
        placeholder: placeholder,
      });

    } else {
      this.setState({
        value: (dt) ? dt.format('MM/DD/YYYY') : '',
        internalValue: dt,
        placeholder: placeholder,
      });
    }
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.data.defaultToday && !this.state.defaultToday) {
      this.state.value = moment().format('MM/DD/YYYY');
      this.state.internalValue = moment(this.state.value);
    } else if (!this.props.data.defaultToday && this.state.defaultToday) {
      this.state.value = '';
      this.state.internalValue = undefined;
    }

    this.state.defaultToday = this.props.data.defaultToday;
  }

  render() {
    let props = {};
    props.type = 'date';
    props.className = 'form-control';
    props.name = this.props.data.field_name;

    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = 'child_ref_' + this.props.data.field_name;
    }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <div className="form-group">
          <label>
            <span dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.label)}} />
            {(this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only) &&
            <span className="label-required label label-danger">Required</span>
            }
          </label>
          <div>
            {this.props.data.readOnly &&
            <input type="text"
                   name={props.name}
                   ref={props.ref}
                   readOnly="true"
                   dateFormat="MM/DD/YYYY"
                   placeholder={this.state.placeholder}
                   value={this.state.value}
                   className="form-control" />
            }
            {iOS && !this.props.data.readOnly &&
            <input type="date"
                   name={props.name}
                   ref={props.ref}
                   onChange={this.handleChange}
                   dateFormat="MM/DD/YYYY"
                   placeholder={this.state.placeholder}
                   value={this.state.value}
                   className="form-control" />
            }
            {!iOS && !this.props.data.readOnly &&
            <ReactDatePicker
              name={props.name}
              ref={props.ref}
              onChange={this.handleChange}
              selected={this.state.internalValue}
              todayButton={'Today'}
              className="form-control"
              isClearable={true}
              dateFormat="MM/DD/YYYY"
              placeholderText='mm/dd/yyyy' />
            }
          </div>
        </div>
      </RfbItem>
    );
  }
}

@sortable
class Dropdown extends React.Component {
  render() {
    let props = {};
    props.className = 'form-control';
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = 'child_ref_' + this.props.data.field_name;
    }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <div className="form-group">
          <label>
            <span dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.label)}} />
            {(this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only) &&
            <span className="label-required label label-danger">Required</span>
            }
          </label>
          <select {...props}>
            {this.props.data.options.map(function(option) {
              let this_key = 'preview_' + option.key;
              return <option value={option.value} key={this_key}>{option.text}</option>;
            })}
          </select>
        </div>
      </RfbItem>
    );
  }
}

@sortable
class Signature extends React.Component {
  componentDidMount() {
    if (this.props.defaultValue !== undefined && this.props.defaultValue.length > 0 && !this.props.read_only) {
      let canvas = this.refs['canvas_' + this.props.data.field_name];
      canvas.fromDataURL('data:image/png;base64,' + this.props.defaultValue);
    }
  }

  render() {
    let props = {};
    props.type = 'hidden';
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = 'child_ref_' + this.props.data.field_name;
    }
    let pad_props = {};
    pad_props.clearButton = true;
    if (this.props.mutable) {
      pad_props.defaultValue = this.props.defaultValue;
      pad_props.ref = 'canvas_' + this.props.data.field_name;
    }

    let sourceDataURL;
    if (this.props.read_only === true && this.props.defaultValue && this.props.defaultValue.length > 0) {
      sourceDataURL = `data:image/png;base64,${this.props.defaultValue}`;
    }

    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <div className="form-group">
          <label>
            <span dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.label)}} />
            {(this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only) &&
            <span className="label-required label label-danger">Required</span>
            }
          </label>
          {this.props.read_only === true && this.props.defaultValue && this.props.defaultValue.length > 0
            ? (<div><img src={sourceDataURL} /></div>)
            : (<SignaturePad {...pad_props} />)
          }
          <input {...props} />
        </div>
      </RfbItem>
    );
  }
}

@sortable
class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.defaultValue !== undefined ? this.props.defaultValue.split(',') : []};
  }

  handleChange(e) {
    this.setState({value: e});
  }

  render() {
    let options = this.props.data.options.map(option => {
      option.label = option.text;
      return option;
    });

    let props = {};
    props.multi = true;
    props.name = this.props.data.field_name;
    props.onChange = this.handleChange;

    props.options = options;
    if (!this.props.mutable) {
      props.value = options[0].text;
    } // to show a sample of what tags looks like
    if (this.props.mutable) {
      props.value = this.state.value;
      props.ref = 'child_ref_' + this.props.data.field_name;
    }

    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <div className="form-group">
          <label>
            <span dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.label)}} />
            {(this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only) &&
            <span className="label-required label label-danger">Required</span>
            }
          </label>
          <Select {...props} />
        </div>
      </RfbItem>
    );
  }
}

@sortable
class Checkboxes extends React.Component {
  render() {
    let self = this;
    const classNames = cx('checkbox-label', {'option-inline': this.props.data.inline});

    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <div className="form-group">
          <label className="form-label">
            <span dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.label)}} />
            {(this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only) &&
            <span className="label-required label label-danger">Required</span>
            }
          </label>
          {this.props.data.options.map(function(option) {
            let this_key = 'preview_' + option.key;
            let props = {};
            props.name = 'option_' + option.key;

            props.type = 'checkbox';
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = self.props.defaultValue.indexOf(option.value) > -1 ? true : false;
              props.ref = 'child_ref_' + option.key;
            }
            return (
              <label className={classNames} key={this_key}>
                <input {...props} /> {option.text}
              </label>
            );
          })}
        </div>
      </RfbItem>
    );
  }
}

@sortable
class RadioButtons extends React.Component {
  render() {
    let self = this;
    const classNames = cx('radio-label', {'option-inline': this.props.data.inline});

    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <div className="form-group">
          <label className="form-label">
            <span dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.label)}} />
            {(this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only) &&
            <span className="label-required label label-danger">Required</span>
            }
          </label>
          {this.props.data.options.map(function(option) {
            let this_key = 'preview_' + option.key;
            let props = {};
            props.name = self.props.data.field_name;

            props.type = 'radio';
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = (self.props.defaultValue !== undefined && self.props.defaultValue.indexOf(option.value) > -1) ? true : false;
              props.ref = 'child_ref_' + option.key;
            }
            return (
              <label className={classNames} key={this_key}>
                <input {...props} /> {option.text}
              </label>
            );
          })}
        </div>
      </RfbItem>
    );
  }
}

@sortable
class Image extends React.Component {
  render() {
    const style = {...this.props.style};

    if (this.props.data.center) {
      style.textAlign = 'center';
    }

    return (
      <RfbItem
        style={style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >

        {!this.props.mutable &&
        <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} required={this.props.data.required} />
        }
        {this.props.data.src &&
        <img src={this.props.data.src} width={this.props.data.width} height={this.props.data.height} style={{maxWidth: '100%'}} />
        }
        {!this.props.data.src &&
        <div className="no-image">No Image</div>
        }
      </RfbItem>
    );
  }
}

@sortable
class Rating extends React.Component {
  render() {
    let props = {};
    props.name = this.props.data.field_name;
    props.ratingAmount = 5;

    if (this.props.mutable) {
      props.rating = (this.props.defaultValue !== undefined && this.props.defaultValue.length) ? parseFloat(this.props.defaultValue, 10) : 0;
      props.editing = true;
      props.ref = 'child_ref_' + this.props.data.field_name;
    }

    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <div className="form-group">
          <label>
            <span dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.label)}} />
            {(this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only) &&
            <span className="label-required label label-danger">Required</span>
            }
          </label>
          <StarRating {...props} />
        </div>
      </RfbItem>
    );
  }
}

@sortable
class HyperLink extends React.Component {
  render() {
    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <div className="form-group">
          <a target="_blank" href={this.props.data.href} dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.content)}} />
        </div>
      </RfbItem>
    );
  }
}

@sortable
class Download extends React.Component {
  render() {
    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <div className="form-group">
          <a href={this.props.download_path + '?id=' + this.props.data.file_path} dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.content)}} />
        </div>
      </RfbItem>
    );
  }
}

@sortable
class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {img: null};
  }

  displayImage(e) {
    var self = this;
    var target = e.target;
    var file, reader;

    if (target.files && target.files.length) {
      file = target.files[0];
      reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function() {
        self.setState({
          img: reader.result,
        });
      };
    }
  }

  clearImage() {
    this.setState({
      img: null,
    });
  }

  render() {
    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <div className="form-group">
          <label>
            <span dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.label)}} />
            {(this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only) &&
            <span className="label-required label label-danger">Required</span>
            }
          </label>
          <div className="image-upload-container">

            {!this.state.img &&
            <div>
              <input type="file" accept="image/*" capture="camera" className="image-upload" onChange={this.displayImage} />
              <div className="image-upload-control">
                <div className="btn btn-default btn-school"><i className="fa fa-camera"></i> Upload Photo</div>
                <p>Select an image from your computer or device.</p>
              </div>
            </div>
            }

            {this.state.img &&
            <div>
              <img src={this.state.img} height="100" className="image-upload-preview" /><br />
              <div className="btn btn-school btn-image-clear" onClick={this.clearImage}>
                <i className="fa fa-times"></i> Clear Photo
              </div>
            </div>
            }

          </div>
        </div>
      </RfbItem>
    );
  }
}

@sortable
class Range extends React.Component {
  render() {
    let props = {};
    props.type = 'range';
    props.name = this.props.data.field_name;
    props.list = 'tickmarks_' + this.props.data.field_name;
    props.min = this.props.data.min_value;
    props.max = this.props.data.max_value;
    props.step = this.props.data.step;

    props.defaultValue = this.props.defaultValue !== undefined ? parseInt(this.props.defaultValue, 10) : parseInt(this.props.data.default_value, 10);

    if (this.props.mutable) {
      props.ref = 'child_ref_' + this.props.data.field_name;
    }

    let datalist = [];
    for(var i = parseInt(this.props.data.min_value, 10); i <= parseInt(this.props.data.max_value, 10); i += parseInt(this.props.data.step, 10)) {
      datalist.push(i);
    }

    let oneBig = 100 / (datalist.length - 1);

    let _datalist = datalist.map((d, idx) => {
      return <option key={props.list + '_' + idx}>{d}</option>;
    });

    let visible_marks = datalist.map((d, idx) => {
      let option_props = {};
      let w = oneBig;
      if (idx === 0 || idx === datalist.length - 1)
        w = oneBig / 2;
      option_props.key = props.list + '_label_' + idx;
      option_props.style = {width: w + '%'};
      if (idx === datalist.length - 1)
        option_props.style = {width: w + '%', textAlign: 'right'};
      return <label {...option_props}>{d}</label>;
    });

    return (
      <RfbItem
        style={this.props.style}
        className={this.props.className}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        pageBreakBefore={this.props.data.pageBreakBefore}
      >
        {!this.props.mutable &&
        <div>
          {this.props.data.pageBreakBefore &&
          <div className="preview-page-break">Page Break</div>
          }
          <HeaderBar editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} static={this.props.data.static} required={this.props.data.required} />
        </div>
        }
        <div className="form-group">
          <label>
            <span dangerouslySetInnerHTML={{__html: myxss.process(this.props.data.label)}} />
            {(this.props.data.hasOwnProperty('required') && this.props.data.required === true && !this.props.read_only) &&
            <span className="label-required label label-danger">Required</span>
            }
          </label>
          <div className="range">
            <div className="clearfix">
              <span className="pull-left">{this.props.data.min_label}</span>
              <span className="pull-right">{this.props.data.max_label}</span>
            </div>
            <ReactBootstrapSlider
              name={props.name}
              value={props.defaultValue}
              step={this.props.data.step}
              max={this.props.data.max_value}
              min={this.props.data.min_value} />
          </div>
          <div className="visible_marks">
            {visible_marks}
          </div>
          <datalist id={props.list}>
            {_datalist}
          </datalist>
        </div>
      </RfbItem>
    );
  }
}

export {
  Header,
  Paragraph,
  Label,
  LineBreak,
  TextInput,
  NumberInput,
  TextArea,
  Dropdown,
  Signature,
  Checkboxes,
  DatePicker,
  RadioButtons,
  Image,
  Rating,
  Tags,
  HyperLink,
  Download,
  Camera,
  Range,
};
