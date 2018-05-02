module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false,
  },
  karma: {
    testContext: 'tests/setupTests.js',
  },
};
