# Immutable Js Tools

## Installation
**Test Version 0.0.5**

```bash
npm install --save immutable-js-tools
```

## What Is Immutable Js ?

if you are in the beginning with immutable, you have to go [here](https://facebook.github.io/immutable-js/) to understanding it.

## What Is Immutable Js Tools ?

Do you always diving in immutable hell ? This maybe help you to use it clearly.
* only use the `setIn` and `getIn` cursor with this tools.


## Quick Start
```javascript
import Im from 'immutable';
import ImUtil from './src/';
const obj = {
  items: [
    {
      id: 1,
      item: 'bar'
    }
  ],
  selected: []
}
const _D = new ImUtil(Im.fromJS(obj));
let _O;
/*
 * basic to getIn key
 */
_O = _D.getIn(['items', 0]); // Map { "id": 1, "item": "bar" }

/*
 * addList(cursor, value);
 * handle add list method
 */
_O = _D.addList(['selected'], 'foo'); // Map { "items": List [ Map { "id": 1, "item": "bar" } ], "selected": List [ "foo" ] }

/*
 * reverse(cursor);
 * reverse the boolean
 */
_O = _D.addList(['selected'], true); // Map { "items": List [ Map { "id": 1, "item": "bar" } ], "selected": List [ "foo", true ] }
_O = _D.reverse(['selected', 1]); // Map { "items": List [ Map { "id": 1, "item": "bar" } ], "selected": List [ "foo", false ] }

/*
 * auto bind Functions of Sugar
 * selected => getSelected();
 */
console.log(_O.getSelected()); // List [ "foo", false ]
```

## Document
[Immutable.js document](https://facebook.github.io/immutable-js/docs/)

## API

### - Immutable.Map
  * setEmptyMap(cursor)
  * mergeInMap(cursor, data)

### - Immutable.List
  * addList(cursor, value)
  * removeList(cursor, index)
  * clearList(cursor)

### - Immutable.Set
  * clearSet(cursor)

### - little helper
  * reverse(cursor)

### - basic getter & setter
  * getIn(cursor)
  * setIn(cursor, data)
  * hasIn(cursor)
  * getJS(cursor)

### - basic validation: static method
  * isMap
  * isList

### - auto bind Functions of Sugar method helper
```javascript
const _D = new ImUtil(Im.fromJS(obj));
const obj = {
  items: [
    {
      id: 1,
      item: 'bar'
    }
  ],
  selected: [1, 2, 3]
}
//Functions of Sugar
console.log(_D.getItems().toJS()); // => [ { id: 1, item: 'bar' } ]
console.log(_D.getSelected().toJS()); // => [1, 2, 3]
```

## TODO
* To support much method
* Documentation

## License
MIT
