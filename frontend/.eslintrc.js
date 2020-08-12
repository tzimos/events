module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 9,
    "sourceType": "module",
    "ecmaFeatures": {
      "arrowFunctions": true,
      "blockBindings": true,
      "classes": true,
      "defaultParams": true,
      "destructuring": true,
      "forOf": true,
      "jsx": true,
      "modules": true,
      "objectLiteralComputedProperties": true,
      "objectLiteralDuplicateProperties": true,
      "objectLiteralShorthandMethods": true,
      "objectLiteralShorthandProperties": true,
      "objectRestSpread": true,
      "restParams": true,
      "spread": true,
      "templateStrings": true,
      "experimentalDecorators": true
    }
  },
  // Add some environments
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "jest": true
  },
  "plugins": [
    "promise",
    "react",
    "require-path-exists",
    "import"
  ],
  // Use recommend ESLint config
  "extends": [
    "eslint:recommended",
    "plugin:promise/recommended",
    "plugin:react/recommended"
  ],
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  // Add some rules of our own
  "rules": {
    "quotes": ["error", "double", {"avoidEscape": true}],
    "no-undef": "error",
    "indent": ["error", 2, {"SwitchCase": 1}], // Two spaces for indent
    "curly": ["error", "multi-line"], // All require curly brace for multi line bodies
    "no-template-curly-in-string": "error", // Guard against accidentally using quotes instead of backticks when writing template strings
    "array-callback-return": "error", // Enforce returning from array functions (map, filter, etc)
    "no-eval": "error",
    "max-params": ["error", 5],
    "max-statements-per-line": ["error", {"max": 1}],
    "no-param-reassign": "error", // Don't allow reassigning function param variables
    "no-unused-vars": ["error", {
      "ignoreRestSiblings": true,
      argsIgnorePattern: "^_$"
    }],  // allow "omitting" via destructuring -- all other unused vars are forbidden
    "semi": ["error", "always"],
    "strict": ["error", "global"], // Enforce 'use strict' statements. Use global because browserify/webpack will wrap each module in a function anyway
    "eol-last": ["error", "always"], // Enforce empty last line. See http://stackoverflow.com/a/729795/4887407
    "react/display-name": "off", // We don't care about displayNames because the build step adds them
    "react/jsx-max-props-per-line": ["error", {"maximum": 1}],
    "react/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
    "promise/always-return": "off",
    "promise/avoid-new": "off",
    "space-in-parens": ["error", "never"],
    "object-curly-spacing": ["error", "never"],
    "array-bracket-spacing": ["error", "never"],
    "require-path-exists/notEmpty": 2,
    "require-path-exists/tooManyArguments": 2,
    "require-path-exists/exists": [2, {
      "extensions": [
        "",
        ".js",
        ".json"
      ],
    }],

    "import/no-unresolved": "error",
    "import/named": "error",
    "import/default": "error",
    "import/namespace": "error",
    "import/no-dynamic-require": "warn"
  },
};
