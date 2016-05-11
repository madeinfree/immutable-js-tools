import ImUtil from '../src/';
import Im from 'immutable';
import expect from 'expect';

const _O = Symbol();

describe('Im', function() {

    const obj = {
      items: [
        {
          id: 1,
          item: 'fan'
        }
      ],
      selected: []
    }

    it('create Im Map', () => {
      this.ImMap = getMap.bind(this)();
      expect(Im.Map.isMap(this.ImMap.getSelf)).toEqual(true);
    })

    it('set Map items and added one item', () => {
      let cursor = ['items', 0, 'item'];
      this.ImMap = getMap.bind(this)();
      this[_O] = this.ImMap.setIn(cursor, 'first item');
      expect(this[_O].getIn(cursor)).toEqual('first item');
    })

    it('set Map items and added one Im.List', () => {
      let cursor = ['items'];
      this.ImMap = getMap.bind(this)();
      this[_O] = this.ImMap.addList(cursor, Im.fromJS({id:2, item: 'foo'}));
      expect(this[_O].getIn(cursor.concat([1, 'item']))).toEqual('foo');
    })

    it('remove list items id:1', () => {
      let cursor = ['items'];
      this.ImMap = getMap.bind(this)();
      this[_O] = this.ImMap.removeList(cursor, 0);
      expect(this[_O].getIn(cursor).size).toEqual(0);
    })

    it('add two values auto create the suger method', () => {
      let cursor = ['selected'];
      this.ImMap = getMap.bind(this)();
      this[_O] = this.ImMap.addList(cursor, 'foo');
      this[_O] = this.ImMap.addList(cursor, 'bar');
      expect(this.ImMap.getSelected().toJS()).toEqual(['foo', 'bar']);
    })

    function getMap() {
      this[_O] = new Im.Map();
      this.ImMap = new ImUtil(Im.fromJS(obj));
      return this.ImMap;
    }
});
