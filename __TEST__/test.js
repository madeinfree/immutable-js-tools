import ImUtil from '../src/';
import Im from 'immutable';
import expect from 'expect';

const _O = Symbol();

describe('Im', function() {

    const obj = {
      items: [
        {
          id: 1,
          item: 'bar'
        }
      ],
      selected: []
    }

    const list = ['foo', 'bar'];

    /* Map test */
    it('create Im Map', () => {
      this.ImMap = getMap.bind(this)();
      expect(this.ImMap.isMap).toEqual(true);
    })

    it('isMap type error', () => {
      this.ImMap = getMap.bind(this)();
      expect(this.ImMap.isList).toEqual(false);
    })

    it('set Map items and added one item', () => {
      let cursor = ['items', 0, 'item'];
      this.ImMap = getMap.bind(this)();
      this[_O] = this.ImMap.setIn(cursor, 'first item');
      expect(this.ImMap.getIn(cursor)).toEqual('first item');
    })

    it('set Map items and added one Im.List', () => {
      let cursor = ['items'];
      this.ImMap = getMap.bind(this)();
      this[_O] = this.ImMap.addList(cursor, Im.fromJS({id:2, item: 'foo'}));
      expect(this.ImMap.getIn(cursor.concat([1, 'item']))).toEqual('foo');
    })

    it('remove list items id:1', () => {
      let cursor = ['items'];
      this.ImMap = getMap.bind(this)();
      this[_O] = this.ImMap.removeList(cursor, 0);
      expect(this.ImMap.getIn(cursor).size).toEqual(0);
    })

    it('clear items list', () => {
      let cursor = ['items'];
      this.ImMap = getMap.bind(this)();
      this[_O] = this.ImMap.setEmptyList(cursor);
      expect(this[_O].getIn(cursor).size).toEqual(0);
    })

    it('add two values auto create the suger method', () => {
      let cursor = ['selected'];
      this.ImMap = getMap.bind(this)();
      this[_O] = this.ImMap.addList(cursor, 'foo');
      this[_O] = this.ImMap.addList(cursor, 'bar');
      expect(this[_O].getSelected().toJS()).toEqual(['foo', 'bar']);
      expect(this[_O].getItems().toJS()[0]).toEqual({ id: 1, item: 'bar' });
    })

    /* list test */
    it('create Im List', () => {
      this.ImList = getList.bind(this)();
      expect(this.ImList.isList).toEqual(true);
    })

    it('remove and clear Im List item', () => {
      this.ImList = getList.bind(this)();
      this[_O] = this.ImList.addList('foo');
      this[_O] = this.ImList.addList('bar');
      this[_O] = this.ImList.addList('foo-bar');
      expect(this[_O].size).toEqual(5);
      this[_O] = this.ImList.removeList(3);
      expect(this[_O].size).toEqual(4);
      this[_O] = this.ImList.setEmptyList();
      expect(this[_O].size).toEqual(0);
    });

    /* other test */
    it('reverse boolean in array', () => {
      //create List
      this.ImList = getList.bind(this)();
      expect(this.ImList.isList).toEqual(true);

      this[_O] = this.ImList.addList(true);
      expect(this.ImList.getIn([2])).toEqual(true);
      [0, 1, 2, 3, 4, 5, 6].forEach((n) => {
        if(n % 2 === 0) {
          this[_O] = this.ImList.addList(true);
        } else {
          this[_O] = this.ImList.addList(false);
        }
      });
      this[_O] = this.ImList.reverse([1]);
      this[_O] = this.ImList.reverse([4]);
      this[_O] = this.ImList.reverse([6]);
      expect(this.ImList.getIn([1])).toEqual(false);
      expect(this.ImList.getIn([4])).toEqual(true);
      expect(this.ImList.getIn([6])).toEqual(true);
    })

    function getMap() {
      this.ImMap = new ImUtil(Im.fromJS(obj));
      return this.ImMap;
    }

    function getList() {
      this.ImList = new ImUtil(Im.fromJS(list));
      return this.ImList;
    }
});
