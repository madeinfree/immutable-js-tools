import Im from 'immutable';

const _O = Symbol();

export default class ImUtil {
  /*
   * get return self
   */
  get _getState() {
    return this[_O];
  }
  /*
   * bind _Data
   */
   constructor(immutable) {
     this[_O] = immutable;
     const newState = this[_O];
     this.changeImmutable(newState);
   }

   changeImmutable(state) {
     return this.autoBindMethod(state);
   }

  /*
   * new Map()
   */
   setEmptyMap = (cursor) => {
     const newState = this._getState.setIn(cursor, new Im.Map());
     return this.changeImmutable(newState);
   }

   mergeInMap = (cursor, data) => {
     const newState = this._getState.setIn(cursor, this._getState.getIn(cursor).merge(data));
     return this.changeImmutable(newState);
   }

  /*
   * new List()
   */
  addList = (cursor, value) => {
    /*
      cursor type is Array
      cursor like ['items', 'item']
    */
    let newState;
    if (typeof cursor === 'object' && cursor.length !== undefined) {
      newState = this._getState.setIn(cursor, this._getState.getIn(cursor).push(value));
    }
    //only string
    if (typeof cursor === 'string') {
      value = cursor;
      newState = this._getState.push(value);
    }
    //if push list and bind some method
    if (typeof cursor === 'boolean') {
      value = cursor;
      newState = this._getState.push(value);
    }

    return this.changeImmutable(newState);
  }

  removeList = (cursor, index) => {
    let newState;
    if(typeof cursor === 'number') {
      const index = cursor;
      newState = this._getState.remove(index);
    }
    if(typeof cursor === 'object' && cursor.length !== undefined) {
      newState = this._getState.setIn(cursor, this._getState.getIn(cursor).remove(index));
    }
    return this.changeImmutable(newState);
  }

  setEmptyList = (cursor) => {
    let newState;
    if(cursor && typeof cursor === 'object') {
      newState = this._getState.setIn(cursor, new Im.List());
    }
    if(typeof cursor === 'undefined') {
      newState = new Im.List();
    }
    return this.changeImmutable(newState);
  }

  /*
   * new Set()
   */
  clearSet = (cursor) => {
   const newState = this._getState.setIn(cursor, new Im.Set());
   return this.changeImmutable(newState);
  }

  reverse = (cursor) => {
    let newState;

    if (this._getState._isMap() && typeof cursor === 'object' && cursor.length !== undefined) {
      newState = this._getState.setIn(cursor, !this._getState.getIn(cursor));
    }

    if (this._getState._isMap() && typeof cursor === 'object' && cursor.length === undefined) {
      newState = this._getState.setIn(!this._getState.getIn(cursor));
    }

    if (this._getState._isList()) {
      newState = this._getState.setIn(cursor, !this._getState.getIn(cursor));
    }

    return this.changeImmutable(newState);
  }

  /*
   * basic method
   */
  setIn = (cursor, data) => {
    const newState = this._getState.setIn(cursor, data);
    return this.changeImmutable(newState);
  }

  getIn = (cursor) => {
    return this._getState.getIn(cursor);
  }

  hasIn = (cursor) => {
    return this._getState.hasIn(cursor);
  }

  getJS = (cursor) => {
    return this._getState.getIn(cursor).toJS();
  }

  /*
   * auto bind method
   */
  autoBindMethod = (state) => {
    this[_O] = state;
    this[_O]['_isMap'] = () => {
      return Im.Map.isMap(state);
    }
    this[_O]['_isList'] = () => {
      return Im.List.isList(state);
    }
    let autoGetMethodString;
    if(this[_O]._isMap()) {
      state.mapKeys((o) => {
        autoGetMethodString = 'get'+o.toString().charAt(0).toUpperCase()+o.slice(1);
        state[autoGetMethodString] = () => state.getIn([o]);
      })
    }
    return state;
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
};
