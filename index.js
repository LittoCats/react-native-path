/**
path.basename(path[, ext])
path.dirname(path)
path.extname(path)
path.format(pathObject)
path.isAbsolute(path)
path.join([...paths])
path.normalize(path)
path.parse(path)
path.relative(from, to)
path.resolve([...paths])
path.sep
*/
<<<<<<< HEAD
function _normalize(path) {
=======
function normalize(path) {
>>>>>>> fcebacbe70ed4ef6a0a3b3be464eec0f06e6e9b7
  valid(path);
  return `${path}/`.split(/\/+/g).reduce((previous, current) => {
    if (!Array.isArray(previous)) previous = [previous];
    if (current === '.') return previous;
    if (current === '..') previous.pop();
    else if (current.length) previous.push(current);
    return previous;
  }).join('/');
}

<<<<<<< HEAD
function _basename(path, ext) {
=======
function basename(path, ext) {
>>>>>>> fcebacbe70ed4ef6a0a3b3be464eec0f06e6e9b7
  var basename = path.split(/\//g).pop();
  if (ext) {
    var tmp = basename.split(/\./g);
    var _ext = tmp.pop();
    if (ext === _ext || ext.slice(1) === _ext) {
      return tmp.join('.')
    }
  }
  return basename;
}

<<<<<<< HEAD
function _dirname(path) {
  return path.split(/\//g).slice(0, -1).join('/')
}

function _extname(path) {
=======
function dirname(path) {
  return path.split(/\//g).pop().join('/')
}

function extname(path) {
>>>>>>> fcebacbe70ed4ef6a0a3b3be464eec0f06e6e9b7
  var tmp = path.replace(/^[\.]+/, '');
  if (/\./.test(tmp)) return tmp.match(/\.[^.]*$/)[0];
  return '';
}

<<<<<<< HEAD
function _format(options) {
=======
function format(options) {
>>>>>>> fcebacbe70ed4ef6a0a3b3be464eec0f06e6e9b7
  var {
    dir,
    root,
    base,
    name,
    ext
  } = options;
  var _dir = dir || root;
  var _base = base || `${name || ''}${/^\./.test(ext) ? '' : '.'}${ext || ''}`;
  return normalize(`${_dir}/${_base}`);
}

<<<<<<< HEAD
function _isAbsolute(path) {
  return /^\//.test(path)
}

function _parse(path) {
=======
function isAbsolute(path) {
  return /^\//.test(path)
}

function parse(path) {
>>>>>>> fcebacbe70ed4ef6a0a3b3be464eec0f06e6e9b7
  var obj = {},
    tmp;
  var components = path.split(/\//g)
  obj.base = components.pop();
  obj.dir = components.join('/');
  if (/^\//.test(obj.dir)) {
    obj.root = '/';
  }
  if (obj.base != undefined) {
    tmp = obj.base.replace(/^[\.]+/, '');
    if (/\./.test(tmp)) {
      obj.ext = tmp.match(/\.[^.]*$/)[0];
      obj.name = obj.base.slice(0, -obj.ext.length);
    } else {
      obj.name = obj.base
    }
  } else {
    delete obj.base
  }
  return obj;
}

<<<<<<< HEAD
function _resolve(segments) {
=======
function resolve(segments) {
>>>>>>> fcebacbe70ed4ef6a0a3b3be464eec0f06e6e9b7
  var flat = segments.reduce((previous, current) => {
    if (!Array.isArray(previous)) previous = [previous];
    if (Array.isArray(current)) Array.prototype.push.apply(previous, current);
    Array.prototype.push.call(previous, current);
    return previous;
  }).reduce((previous, current) => {
    if (/^\//.test(current)) return current;
    return `${previous}/${current}`;
  });
  return normalize(flat);
}

function valid(path) {
  if (typeof path != 'string') {
    throw new TypeError('path must be string.');
  }
}

export function normalize(path): string {
<<<<<<< HEAD
  return _normalize(path);
}
export function basename(path, ext): string {
  return _basename(normalize(path), ext);
}
export function dirname(path): string {
  return _dirname(normalize(path));
}
export function extname(path): string {
  return _extname(normalize(path))
}
export function format(options): string {
  return _format(options);
}
export function isAbsolute(path): boolean {
  return _isAbsolute(valid(path))
}
export function parse(path): string {
  return _parse(normalize(path))
}
export function resolve(): string {
  return _resolve.call({}, Array.prototype.slice.call(arguments, 0));
}

export default exports;
=======
  return normalize(path);
}
export function basename(path, ext): string {
  return basename(normalize(path), ext);
}
export function dirname(path): string {
  return dirname(normalize(path));
}
export function extname(path): string {
  return extname(normalize(path))
}
export function format(options): string {
  return format(options);
}
export function isAbsolute(path): boolean {
  return isAbsolute(valid(path))
}
export function parse(path): string {
  return parse(normalize(path))
}
export function resolve(): string {
  return resolve.call({}, Array.prototype.slice.call(arguments, 0));
}

export default exports;
>>>>>>> fcebacbe70ed4ef6a0a3b3be464eec0f06e6e9b7
