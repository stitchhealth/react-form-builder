/**
 * <FormValidator />
 */

import React from 'react';
import myxss from './filter-xss';

export default class FormValidator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  componentWillMount() {
    this.subscription = this.props.emitter.addListener('formValidation', errors => {
      this.setState({ errors: errors });
    });
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  dismissModal = (e) => {
    e.preventDefault();
    this.setState({ errors: [] });
  };

  render() {
    let errors = this.state.errors.map((error, index) => {
      return <li key={'error_' + index} dangerouslySetInnerHTML={{ __html: myxss.process(error) }} />;
    });

    return (
      <div>
        {this.state.errors.length > 0 &&
        <div className="alert alert-danger validation-error">
          <div className="clearfix">
            <i className="fa fa-exclamation-triangle pull-left"></i>
            <ul className="pull-left validation-errors">
              {errors}
            </ul>
          </div>
          <div className="clearfix">
            <a className="pull-right btn btn-sm btn-danger" onClick={this.dismissModal}>Dismiss</a>
          </div>
        </div>
        }
      </div>
    );
  }
}
