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
    /*
      cursor type is Array
      cursor like ['items', 'item']
    */
    if (typeof cursor === 'object' && cursor.length !== undefined) {
      this[_O] = this[_O].setIn(cursor, this[_O].getIn(cursor).push(value));
    }
    //only string
    if (typeof cursor === 'string') {
      value = cursor;
      this[_O] = this[_O].push(value);
    }
    //if push list and bind some method
    if (typeof cursor === 'boolean') {
      value = cursor;
      this[_O] = this[_O].push(value);
    }

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

  reverse = (cursor) => {
    if (this[_O]._isMap && typeof cursor === 'object' && cursor.length !== undefined) {
      this[_O] = this[_O].setIn(cursor, !this[_O].getIn(cursor));
    }

    if (this[_O]._isMap && typeof cursor === 'object' && cursor.length === undefined) {
      this[_O] = this[_O].setIn(!this[_O].getIn(cursor));
    }

    if (this[_O]._isList) {
      this[_O] = this[_O].setIn(cursor, !this[_O].getIn(cursor));
    }

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
    return this[_O].getIn(cursor);
  }

  hasIn = (cursor) => {
    return this[_O].hasIn(cursor);
  }

  getJS = (cursor) => {
    return this[_O].getIn(cursor).toJS();
  }

  /*
   * auto bind method
   */
  autoBindMethod = () => {
    this[_O]['_isMap'] = () => {
      return Im.Map.isMap(this[_O]);
    }
    this[_O]['_isList'] = () => {
      return Im.List.isList(this[_O]);
    }
    if(this[_O]._isMap()) {
      this[_O].mapKeys((o) => {
        const autoGetMethodString = 'get'+o.toString().charAt(0).toUpperCase()+o.slice(1);
        this[autoGetMethodString] = () => this[_O].getIn([o]);
      })
    }
  }

  /*
   * check immutable type
   */
  get isMap() {
    return Im.Map.isMap(this[_O]);
  }

  get isList() {
    return Im.List.isList(this[_O]);
  }

  /*
   * get return self
   */
  get getSelf() {
    return this[_O];
  }
};
