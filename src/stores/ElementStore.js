import Reflux from 'reflux';
import ElementActions from '../actions/ElementActions';

export default Reflux.createStore({
  data: [],

  init: function() {
    this.listenTo(ElementActions.createElement, this._create);
    this.listenTo(ElementActions.deleteElement, this._delete);
    this.listenTo(ElementActions.updateElements, this._update);
  },

  load: function(data) {
    this.data = data;
    this.trigger(this.data);
  },

  _create: function(element) {
    this.data.push(element);
    this.trigger(this.data);
  },

  _delete: function(element) {
    const index = this.data.indexOf(element);
    this.data.splice(index, 1);
    this.trigger(this.data);
  },

  _update: function(elements) {
    this.data = elements;
    this.trigger(this.data);
  },
});
