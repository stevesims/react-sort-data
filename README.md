# react-sort-data

A data sorting component that uses render props.

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/stevesims/react-sort-data/master.png?style=flat-square
[build]: https://travis-ci.org/stevesims/react-sort-data

[npm-badge]: https://img.shields.io/npm/v/react-sort-data.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-sort-data

[coveralls-badge]: https://img.shields.io/coveralls/stevesims/react-sort-data/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/stevesims/react-sort-data

Data sorting by this component intended primarily for sorting arrays of objects using string values of given keys.  Provide the component with an array of `data` objects, and an array of `field` definitions (with one indicated as being the `default`) and you'll get back a sorted `data` array.  A field definition may also contain a `sort` function, which should take a `reversed` argument and return back a function that can be used with `Array.sort`.

The component uses the render-props pattern so as to allow for maximum flexibility and control when rendering out sorted data.

## Usage

```sh
npm install react-sort-data --save
```

```js
import Sortable from 'react-sort-data';

const MyComponent = () => {
  const andersonCharacters = [
    { name: 'Captain Scarlet', series: 'Captain Scarlet and the Mysterons', year: '1967' },
    { name: 'Captain Black', series: 'Captain Scarlet and the Mysterons', year: '1967' },
    { name: 'Brains', series: 'Thunderbirds', year: '1965' },
    { name: 'Lady Penelope', series: 'Thunderbirds', year: '1965' },
    { name: 'Scott Tracy', series: 'Thunderbirds', year: '1965' },
    { name: 'Joe McLaine', series: 'Joe 90', year: '1968' }
  ];
  const fields = [
    { key: 'name', default: true },
    { key: 'series' },
    { key: 'year', reversed: true }
  ];

  return (
    <Sortable data={andersonCharacters} fields={fields}>
      {({ data, reversed, setSortField, sortField }) => (
        <table>
          <thead>
            <tr>
              {fields.map(({ key }) => {
                const selected = (sortField === key);
                return <th key={key} onClick={() => setSortField(key)}>
                  {selected && '> '}{key} {selected && (reversed ? '^' : 'v')}
                </th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.series}</td>
                <td>{row.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Sortable>
  );
};
```

## Contributors

- [Steve Sims](https://github.com/stevesims)
