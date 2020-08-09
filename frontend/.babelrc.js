module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "ie": "11",
          "chrome": "60",
        },
        "useBuiltIns": "entry",
        "corejs": 3,
      }
    ],
    "@babel/preset-react",
  ],
  "plugins": [
    "@babel/plugin-proposal-object-rest-spread",
    ["@babel/plugin-proposal-class-properties", {"loose": true}],
    "lodash",
  ],
  "env": {
    "test": {
      "plugins": [
        "rewire"
      ]
    }
  }
};
