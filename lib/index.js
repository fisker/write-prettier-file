'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var fs = _interopDefault(require('fs-extra'));
var format = _interopDefault(require('prettier-format'));

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
    filePath: file
  }, defaultOptions, options);

  if (!options.resolveConfig) {
    delete options.filePath;
  }

  return _await(format(data, options), function (formatted) {
    return writeFile(file, formatted, options);
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

var writeFile = _async(function (file, data, options) {
  return _await(fs.ensureDir(path.dirname(file)), function () {
    return fs.writeFile(file, data, options);
  });
});

var defaultOptions = {
  resolveConfig: true
};

function writeFileSync(file, data, options) {
  fs.ensureDirSync(path.dirname(file));
  return fs.writeFileSync(file, data, options);
}

function writePrettierFileSync(file, data, options) {
  options = _objectSpread({
    filePath: file
  }, defaultOptions, options);

  if (!options.resolveConfig) {
    delete options.filePath;
  }

  var formatted = format.sync(data, options);
  return writeFileSync(file, formatted, options);
}

writePrettierFile.sync = writePrettierFileSync;

module.exports = writePrettierFile;
