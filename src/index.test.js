import expect from 'expect';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { shallow } from 'enzyme';

import Component from '../src';

describe('Component', () => {
  let node;

  beforeEach(() => {
    node = document.createElement('div');
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it('will render with no props', () => {
    render(<Component />, node, () => {
      expect(node.innerHTML).toContain('');
    });
  });

  it('will render with basic props', () => {
    render(<Component fields={[]} data={[]} />, node, () => {
      expect(node.innerHTML).toContain('');
    });
  });

  it('can render via children', () => {
    render(
      <Component fields={[]} data={[]}>
        {() => <div>Content</div>}
      </Component>,
      node,
      () => {
        expect(node.innerHTML).toContain('Content');
      },
    );
  });

  it('will sort provided data', () => {
    const data = [{ name: 'first' }, { name: 'before' }, { name: 'second' }];

    render(
      <Component
        fields={[{ key: 'name', default: true }]}
        data={data}
        render={({ data: renderedData }) => {
          expect(renderedData).toEqual([...data].sort((a, b) => a.name.localeCompare(b.name)));
          return null;
        }}
      />,
      node,
    );
  });

  it('provides setSortField method which will reverse sort of current/default field', () => {
    const data = [{ name: 'first' }, {}, { name: 'before' }, { name: 'second' }];
    let checkData;
    let setSort;

    shallow(<Component
      fields={[{ key: 'name', default: true }]}
      data={data}
      render={({ data: renderedData, setSortField }) => {
        setSort = setSortField;
        checkData = renderedData;

        return null;
      }}
    />);

    expect(setSort).toBeTruthy();

    setSort('name');

    expect(checkData).toEqual([...data].sort((a, b) => (b.name || '').localeCompare(a.name || '')));
  });

  it('provides setSortField method which can set sort on a different field', () => {
    const data = [{ name: 'first' }, {}, { name: 'before' }, { name: 'second' }];
    let checkData;
    let setSort;

    shallow(<Component
      fields={[{ key: 'name', default: true }]}
      data={data}
      render={({ data: renderedData, setSortField }) => {
        setSort = setSortField;
        checkData = renderedData;

        return null;
      }}
    />);

    setSort('foobar');

    expect(checkData).toEqual([...data]);
  });

  it('will cope with no sorting', () => {
    const data = [{ name: 'first' }, {}, { name: 'before' }, { name: 'second' }];
    let checkData;
    let setSort;

    shallow(<Component
      fields={[{ key: 'name', default: true }]}
      data={data}
      defaultSort={null}
      render={({ data: renderedData, setSortField }) => {
        setSort = setSortField;
        checkData = renderedData;

        return null;
      }}
    />);

    setSort('foobar');

    expect(checkData).toEqual([...data]);
  });

  it('will not change sorting if fields change but we still have sorting field', () => {
    const data = [{ name: 'first' }, {}, { name: 'before' }, { name: 'second' }];
    const fields = [{ key: 'name', default: true }];
    let checkData;

    const wrapper = shallow(<Component
      fields={fields}
      data={data}
      render={({ data: renderedData }) => {
        checkData = renderedData;

        return null;
      }}
    />);

    expect(wrapper.state('sortField')).toEqual('name');

    wrapper.setProps({ fields: [{ key: 'name' }, { key: 'test', default: true }] });

    expect(wrapper.state('sortField')).toEqual('name');

    expect(checkData).toEqual([...data].sort((a, b) => (a.name || '').localeCompare(b.name || '')));
  });
});
