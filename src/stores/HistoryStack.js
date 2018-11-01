import throttle from 'lodash.throttle';
import ElementStore from './ElementStore';

const MAX_STACK_SIZE = 30;
const THROTTLE_MS = 1000;

/**
 * Stores history over time and allows undo & redo
 */
class HistoryStack {
  history = []
  pointer = -1;

  constructor() {
    this.applyChange = throttle(this._applyChange.bind(this), THROTTLE_MS);

    // listening to element store to automatically store history
    ElementStore.listen(this.applyChange);
  }

  _applyChange(data) {
    // when applying change, forget about all recent changes, refresh the stack by setting pointer to 0
    // and put new item on the very top
    // MAX_STACK_SIZE is needed to reduce memory size
    const item = this.encode(data);

    // if item is same as top of history, ignore it
    if (item === this.history[this.pointer]) {
      return;
    }

    this.history = this.history.slice(this.pointer, this.pointer + MAX_STACK_SIZE);
    this.pointer = 0;
    this.history.unshift(item);
  }

  get hasUndo() {
    return this.pointer < this.history.length - 1;
  }

  get hasRedo() {
    return this.pointer > 0;
  }

  undo() {
    if (this.hasUndo) {
      this.pointer += 1;
      return this.decode(this.history[this.pointer]);
    }

    return false;
  }

  redo() {
    if (this.hasRedo) {
      this.pointer -= 1;
      return this.decode(this.history[this.pointer]);
    }

    return false;
  }

  encode(data) {
    return JSON.stringify(data);
  }

  decode(data) {
    return JSON.parse(data);
  }
}

export default new HistoryStack();