module.exports = {
  env: {
    amd: true,
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier", "babel", "react", "react-hooks", "import"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "babel-eslint",
  rules: {
    "prettier/prettier": 1,
    "import/order": 2,
    "import/named": 2,
    "import/no-unresolved": 2,
    "jsx-quotes": [2, "prefer-double"],
    "max-len": [1, 120, 2],
    "no-shadow": 2,
    "no-console": 0,
    "no-unused-vars": 2,
    "no-use-before-define": 2,
    quotes: [0, "single"],
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 1,
    "react/display-name": 1,
    "react/no-this-in-sfc": 2,
    "react/no-unescaped-entities": 0,
    "react/no-unused-prop-types": 2,
    "react/prop-types": 2,
  },
};
