/**
 * <Toolbar />
 */

import React from 'react';
import uuid from 'uuid/v4';
import { Sticky } from 'react-sticky';
import cx from 'classnames';
import ToolbarItem from './toolbar-item';
import ElementActions from './actions/ElementActions';
import ElementStore from './stores/ElementStore';
import HistoryStack from './stores/HistoryStack';

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    var items = (this.props.items) ? this.props.items : this._defaultItems();
    this.historyStack = new HistoryStack();

    this.state = {
      items: items,
      hasUndo: false,
      hasRedo: false
    };

    ElementStore.listen(this.checkUndoStatus);
  }

  checkUndoStatus = () => {
    this.setState({
      hasUndo: this.historyStack.hasUndo,
      hasRedo: this.historyStack.hasRedo
    });
  }

  undo = () => {
    const data = this.historyStack.undo();
    if (data) {
      ElementStore.load(data);
    }
  }

  redo = () => {
    const data = this.historyStack.redo();
    if (data) {
      ElementStore.load(data);
    }
  }

  _defaultItemOptions(element) {
    switch (element) {
      case 'Dropdown':
        return [
          { value: 'place_holder_option_1', text: 'Place holder option 1', key: 'dropdown_option_' + uuid() },
          { value: 'place_holder_option_2', text: 'Place holder option 2', key: 'dropdown_option_' + uuid() },
          { value: 'place_holder_option_3', text: 'Place holder option 3', key: 'dropdown_option_' + uuid() },
        ];
      case 'Checkboxes':
        return [
          { value: 'place_holder_option_1', text: 'Place holder option 1', key: 'checkboxes_option_' + uuid() },
          { value: 'place_holder_option_2', text: 'Place holder option 2', key: 'checkboxes_option_' + uuid() },
          { value: 'place_holder_option_3', text: 'Place holder option 3', key: 'checkboxes_option_' + uuid() },
        ];
      case 'RadioButtons':
        return [
          { value: 'place_holder_option_1', text: 'Place holder option 1', key: 'radiobuttons_option_' + uuid() },
          { value: 'place_holder_option_2', text: 'Place holder option 2', key: 'radiobuttons_option_' + uuid() },
          { value: 'place_holder_option_3', text: 'Place holder option 3', key: 'radiobuttons_option_' + uuid() },
        ];
      default:
        return [];
    }
  }

  _defaultItems() {
    return [
      {
        key: 'Header',
        name: 'Header Text',
        icon: 'fa fa-header',
        static: true,
        content: 'Placeholder Text...',
      },
      // {
      //   key: 'Label',
      //   name: 'Label',
      //   static: true,
      //   icon: 'fa fa-font',
      //   content: 'Placeholder Text...',
      // },
      {
        key: 'Paragraph',
        name: 'Paragraph',
        static: true,
        icon: 'fa fa-paragraph',
        content: 'Placeholder Text...',
      },
      {
        key: 'LineBreak',
        name: 'Line Break',
        static: true,
        icon: 'fa fa-arrows-h',
      },
      {
        key: 'Dropdown',
        canHaveAnswer: true,
        name: 'Dropdown',
        icon: 'fa fa-caret-square-o-down',
        label: 'Placeholder Label',
        field_name: 'dropdown_',
        options: [],
      },
      {
        key: 'Checkboxes',
        canHaveAnswer: true,
        name: 'Checkboxes',
        icon: 'fa fa-check-square',
        label: 'Placeholder Label',
        field_name: 'checkboxes_',
        options: [],
      },
      {
        key: 'RadioButtons',
        canHaveAnswer: true,
        name: 'Multiple Choice',
        icon: 'fa fa-dot-circle-o',
        label: 'Placeholder Label',
        field_name: 'radio_buttons_',
        options: [],
      },
      {
        key: 'TextInput',
        canHaveAnswer: true,
        name: 'Text Input',
        label: 'Placeholder Label',
        icon: 'fa fa-font',
        field_name: 'text_input_',
      },
      {
        key: 'NumberInput',
        canHaveAnswer: true,
        name: 'Number Input',
        label: 'Placeholder Label',
        icon: 'fa fa-plus',
        field_name: 'number_input_',
      },
      {
        key: 'TextArea',
        canHaveAnswer: true,
        name: 'Multi-line Input',
        label: 'Placeholder Label',
        icon: 'fa fa-text-height',
        field_name: 'text_area_',
      },
      {
        key: 'Image',
        name: 'Image',
        label: '',
        icon: 'fa fa-photo',
        field_name: 'image_',
        src: '',
      },
      {
        key: 'Annotation',
        name: 'Annotations',
        label: '',
        icon: 'fa fa-paint-brush',
        field_name: 'annotation_',
        src: '',
      },
      // {
      //   key: 'Rating',
      //   canHaveAnswer: true,
      //   name: 'Rating',
      //   label: 'Placeholder Label',
      //   icon: 'fa fa-star',
      //   field_name: 'rating_',
      // },
      {
        key: 'DatePicker',
        canDefaultToday: true,
        canReadOnly: true,
        name: 'Date',
        icon: 'fa fa-calendar',
        label: 'Placeholder Label',
        field_name: 'date_picker_',
      },
      {
        key: 'Signature',
        name: 'Signature',
        icon: 'fa fa-pencil-square-o',
        label: 'Signature',
        field_name: 'signature_',
      },
      // {
      //   key: 'HyperLink',
      //   name: 'Web site',
      //   icon: 'fa fa-link',
      //   static: true,
      //   content: 'Placeholder Web site link ...',
      //   href: 'http://www.example.com',
      // },
      // {
      //   key: 'Download',
      //   name: 'File Attachment',
      //   icon: 'fa fa-file',
      //   static: true,
      //   content: 'Placeholder file name ...',
      //   field_name: 'download_',
      //   file_path: '',
      //   _href: '',
      // },
      {
        key: 'Range',
        name: 'Range',
        icon: 'fa fa-sliders',
        label: 'Placeholder Label',
        field_name: 'range_',
        step: 1,
        defaultValue: 3,
        min_value: 1,
        max_value: 5,
        min_label: 'Easy',
        max_label: 'Difficult',
      },
      {
        key: 'Camera',
        name: 'Camera',
        icon: 'fa fa-camera',
        label: 'Placeholder Label',
        field_name: 'camera_',
      },
      {
        key: 'Other',
        canHaveAnswer: true,
        name: 'Other',
        label: 'Placeholder Label',
        icon: 'fa fa-font',
        field_name: 'other_',
      },
    ];
  }

  _onClick(item) {
    var elementOptions = {
      id: uuid(),
      element: item.key,
      text: item.name,
      static: item.static,
      required: false,
    };

    if (item.static) {
      elementOptions['bold'] = false;
      elementOptions['italic'] = false;
    }

    if (item.canHaveAnswer)
      elementOptions['canHaveAnswer'] = item.canHaveAnswer;

    if (item.canReadOnly)
      elementOptions['readOnly'] = false;

    if (item.canDefaultToday)
      elementOptions['defaultToday'] = false;

    if (item.content)
      elementOptions['content'] = item.content;

    if (item.href)
      elementOptions['href'] = item.href;

    if (item.key === 'Image' || item.key === 'Annotation') {
      elementOptions['src'] = item.src;
    }

    if (item.key === 'Download') {
      elementOptions['_href'] = item._href;
      elementOptions['file_path'] = item.file_path;
    }

    if (item.key === 'Range') {
      elementOptions['step'] = item.step;
      elementOptions['min_value'] = item.min_value;
      elementOptions['max_value'] = item.max_value;
      elementOptions['min_label'] = item.min_label;
      elementOptions['max_label'] = item.max_label;
    }

    if (item.defaultValue)
      elementOptions['defaultValue'] = item.defaultValue;

    if (item.field_name)
      elementOptions['field_name'] = item.field_name + uuid();

    if (item.label)
      elementOptions['label'] = item.label;

    if (item.options) {
      elementOptions['options'] = this._defaultItemOptions(elementOptions['element']);
    }

    ElementActions.createElement(elementOptions);
  }

  renderContent() {
    return (
      <ul>
        {
          this.state.items.map(item => {
            return <ToolbarItem data={item} key={item.key} onClick={this._onClick.bind(this, item)} />;
          })
        }
      </ul>
    );
  }

  renderTop() {
    const { hasRedo, hasUndo } = this.state;
    const undoCN = cx('btn', 'btn-default', 'rfbt__top-btn', {
      'rfbt__top-btn--disabled': !hasUndo
    });
    const redoCN = cx('btn', 'btn-default', 'rfbt__top-btn', {
      'rfbt__top-btn--disabled': !hasRedo
    });

    return (
      <div className="rfbt__top">
        <button disabled={!hasUndo} type="button" onClick={this.undo} className={undoCN}>
         <i className="fa fa-undo" /> Undo
        </button>
        <button disabled={!hasRedo} type="button" onClick={this.redo} className={redoCN}>
          <i className="fa fa-rotate-right" /> Redo
        </button>
      </div>
    )
  }

  render() {
    if (this.props.isSticky) {
      return (
        <div className="rfbt">
          <Sticky relative={true}>
            {({style, isSticky}) => (
              <div style={style} className={isSticky ? 'rfbt__inner--sticky' : ''}>
                <h4>Toolbox</h4>
                {this.renderTop()}
                {this.renderContent()}
              </div>
            )}
          </Sticky>
        </div>
      );
    }

    return (
      <div className="rfbt">
        <h4>Toolbox</h4>
        {this.renderTop()}
        {this.renderContent()}
      </div>
    );
  }
}
