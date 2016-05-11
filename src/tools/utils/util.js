import Im from 'immutable';

const _O = Symbol();

export default class ImUtil {
  /*
   * bind _Data
   */
   constructor(immutable) {
     this[_O] = immutable;
     this.changeImmutable();
   }

   changeImmutable() {
     this.autoBindMethod();
   }

  /*
   * new Map()
   */
   setEmptyMap = (cursor) => {
     this[_O] = this[_O].setIn(cursor, new Im.Map());
     this.changeImmutable();
     return this[_O];
   }

   mergeInMap = (cursor, data) => {
     this[_O] = this[_O].setIn(cursor, this[_O].getIn(cursor).merge(data));
     this.changeImmutable();
     return this[_O];
   }

  /*
   * new List()
   */
  addList = (cursor, value) => {
    this[_O] = this[_O].setIn(cursor, this[_O].getIn(cursor).push(value));
    this.changeImmutable();
    return this[_O];
  }

  removeList = (cursor, index) => {
    this[_O] = this[_O].setIn(cursor, this[_O].getIn(cursor).remove(index));
    this.changeImmutable();
    return this[_O];
  }

  clearList = (cursor) => {
    this[_O] = this[_O].setIn(cursor, new Im.List());
    this.changeImmutable();
    return this[_O];
  }

  /*
   * new Set()
   */
  clearSet = (cursor) => {
   this[_O] = this[_O].setIn(cursor, new Im.Set());
   this.changeImmutable();
   return this[_O];
  }

  reverse = (obj, cursor) => {
    this[_O] = this[_O].setIn(!this[_O].getIn(cursor));
    this.changeImmutable();
    return this[_O];
  }

  /*
   * basic method
   */
  setIn = (cursor, data) => {
    this[_O] = this[_O].setIn(cursor, data);
    this.changeImmutable();
    return this[_O];
  }

  getIn = (cursor) => {
    this[_O] = this[_O].getIn(cursor);
    return this[_O];
  }

  hasIn = (cursor) => {
    this[_O] = this[_O].hasIn(cursor);
    return this[_O];
  }

  getJS = (cursor) => {
    this[_O] = this[_O].getIn(cursor).toJS();
    return this[_O];
  }

  /*
   * auto bind method
   */
  autoBindMethod = () => {
    this[_O].mapKeys((o) => {
      const autoGetMethodString = 'get'+o.toString().charAt(0).toUpperCase()+o.slice(1);
      this[autoGetMethodString] = () => this[_O].getIn([o]);
    })
  }

  /*
   * get return self
   */
  get getSelf() {
    return this[_O];
  }
};
