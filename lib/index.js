'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = require('path');
var fs = _interopDefault(require('fs-extra'));
var importFrom = _interopDefault(require('import-from'));

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

function importPrettier(directories) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = directories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var directory = _step.value;
      var prettier = importFrom.silent(directory, 'prettier');

      if (prettier) {
        return prettier;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
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
  options = _objectSpread({}, defaultOptions, options);
  var directory = path.dirname(file);
  var prettier = importPrettier([directory, process.cwd(), path.join(__dirname, '..')]);
  return _await(prettier.resolveConfig(file, options), function (config) {
    var _exit = false;
    var formatted = prettier[options.formatWithCursor ? 'formatWithCursor' : 'format'](data, _objectSpread({}, config, options));
    return _invoke(function () {
      if (options.write) {
        return _await(fs.ensureDir(directory), function () {
          _exit = true;
          return fs.writeFile(file, formatted, options);
        });
      }
    }, function (_result) {
      return _exit ? _result : formatted;
    });
  });
});

function _invoke(body, then) {
  var result = body();

  if (result && result.then) {
    return result.then(then);
  }

  return then(result);
}

var defaultOptions = {
  write: true,
  loadConfig: true,
  formatWithCursor: false
};

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
  options = _objectSpread({}, defaultOptions, options);
  var directory = path.dirname(file);
  var prettier = importPrettier([directory, process.cwd(), path.join(__dirname, '..')]);
  var config = prettier.resolveConfig.sync(file, options);
  var formatted = prettier[options.formatWithCursor ? 'formatWithCursor' : 'format'](data, _objectSpread({}, config, options));

  if (options.write) {
    fs.ensureDirSync(directory);
    return fs.writeFileSync(file, formatted, options);
  }

  return formatted;
}

writePrettierFile.sync = writePrettierFileSync;

module.exports = writePrettierFile;
