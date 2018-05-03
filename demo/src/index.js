import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from 'react-dom';

import Sortable from '../../src';

const characters = [
  { name: 'Captain Scarlet', series: 'Captain Scarlet and the Mysterons', year: '1967' },
  { name: 'Captain Black', series: 'Captain Scarlet and the Mysterons', year: '1967' },
  { name: 'Brains', series: 'Thunderbirds', year: '1965' },
  { name: 'Lady Penelope', series: 'Thunderbirds', year: '1965' },
  { name: 'Scott Tracy', series: 'Thunderbirds', year: '1965' },
  { name: 'Joe McLaine', series: 'Joe 90', year: '1968' },
];

const TableExample = () => {
  const fields = [
    { key: 'name', default: true },
    { key: 'series' },
    { key: 'year', reversed: true },
  ];

  return (
    <Sortable data={characters} fields={fields}>
      {
        ({
          data, reversed, setSortField, sortField,
        }) => (
          <table>
            <thead>
              <tr>
                {fields.map(({ key }) => {
                  const selected = (sortField === key);
                  return (
                    <th key={key} onClick={() => setSortField(key)}>
                      {selected && '> '}{key} {selected && (reversed ? '^' : 'v')}
                    </th>
                  );
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
        )
      }
    </Sortable>
  );
};

const ULExample = () => (
  <Sortable
    data={characters.map(character => character.name)}
    defaultSort={reversed => (a, b) => (reversed ? -1 : 1) * a.localeCompare(b)}
    render={({ data, setSortField }) => (
      <div>
        <ul>
          {data.map(character => <li key={character}>{character}</li>)}
        </ul>
        <button onClick={() => setSortField()}>Reverse</button>
      </div>
    )}
  />
);

const Demo = () => (
  <div>
    <h1>react-sort-data Demo</h1>

    <h2>Example using a Table-based display, rendering via children</h2>
    <TableExample />

    <h2>Example using UL-based display, an alternative sorting method, and render prop</h2>
    <ULExample />
  </div>
);

// eslint-disable-next-line no-undef
render(<Demo />, document.querySelector('#demo'));
