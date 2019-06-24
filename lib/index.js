'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var importCwd = _interopDefault(require('import-cwd'));
var fs = _interopDefault(require('fs'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var writeFileSync = fs.writeFileSync;
/* eslint-disable node/no-unsupported-features/node-builtins */

var writeFile = fs.promises ? fs.promises.writeFile : require("util").promisify(fs.writeFile);

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var writePrettierFile = _async(function (file, data) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  options = _objectSpread({
    loadConfig: true,
    formatWithCursor: false
  }, options);
  var prettier = importCwd("prettier");
  return _await(prettier.resolveConfig(file, options), function (config) {
    var formatted = prettier[options.formatWithCursor ? "formatWithCursor" : "format"](data, _objectSpread({}, config, options));
    return _await(writeFile(file, formatted, options));
  });
});

function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function writePrettierFileSync(file, data, options) {
  options = _objectSpread({
    loadConfig: true,
    formatWithCursor: false
  }, options);
  var prettier = importCwd("prettier");
  var config = prettier.resolveConfig.sync(file, options);
  var formatted = prettier[options.formatWithCursor ? "formatWithCursor" : "format"](data, _objectSpread({}, config, options));
  var result = writeFileSync(file, formatted, options);
  return result;
}

writePrettierFile.sync = writePrettierFileSync;

exports.default = writePrettierFile;
exports.sync = writePrettierFileSync;
