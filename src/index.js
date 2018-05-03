import { Component } from 'react';
import PropTypes from 'prop-types';

class Sortable extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    fields: PropTypes.arrayOf(PropTypes.shape({
      default: PropTypes.bool,
      key: PropTypes.string.isRequired,
      reversed: PropTypes.bool,
      sort: PropTypes.func,
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    defaultSort: PropTypes.func,
    render: PropTypes.func,
  }

  static defaultProps = {
    children: null,
    defaultSort: (reverseSort, byField) =>
      (a, b) => (reverseSort ? -1 : 1) * (a[byField] || '').localeCompare(b[byField] || ''),
    render: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // find default field to sort on
    if (Array.isArray(nextProps.fields)) {
      if (
        prevState.sortField
        && nextProps.fields.find(field => field.key === prevState.sortField)
      ) {
        // old selected sortField is still valid, so don't change state
        return null;
      }

      const fieldInfo = nextProps.fields.find(field => field.default);

      if (fieldInfo) {
        return {
          sortField: fieldInfo.key,
          reversed: !!fieldInfo.reversed,
        };
      }
    }

    return null;
  }

  state = {}

  setSortField(sortField) {
    if (this.state.sortField === sortField) {
      this.setState({ reversed: !this.state.reversed });
    } else {
      const { fields } = this.props;

      this.setState({
        sortField,
        reversed: !!(fields.find(field => field.key === sortField) || {}).reversed,
      });
    }
  }

  render() {
    const { sortField, reversed } = this.state;
    const {
      children, fields = [], data, defaultSort, render,
    } = this.props;
    const { sort = defaultSort } = (fields.find(field => field.key === sortField) || {});
    const sortedData = sort ? [...data].sort(sort(reversed, sortField)) : [...data];
    const renderProps = {
      data: sortedData, reversed, setSortField: field => this.setSortField(field), sortField,
    };

    if (render instanceof Function) {
      return render(renderProps);
    }

    if (children instanceof Function) {
      return children(renderProps);
    }

    return null;
  }
}

export default Sortable;
