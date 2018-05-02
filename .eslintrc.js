const { devDependencies } = require('./package.json');

module.exports = {
  "parser": "babel-eslint",
  "extends": ["airbnb"],
  "env": {
    "es6": true
  },
  "rules": {
    "react/jsx-filename-extension": 0,
    "jsx-a11y/label-has-for": 0,
    "filenames/match-exported": 0
  },
  "overrides": [
    {
      "files": [ "stories.js", "test.js", "example.js", "scripts/**", "src/stories/**" ],
      "rules": {
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
      },
      "settings": {
        "import/core-modules": Object.keys(devDependencies)
      }
    },
    {
      "files": [ "test.js", "*.test.js" ],
      "env": {
        "mocha": true,
        "enzyme": true,
        "browser": true
      }
    }
  ]
}
