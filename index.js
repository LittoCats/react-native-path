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

function normalize(path) {
  valid(path);
  return `${path}/`.split(/\/+/g).reduce((previous, current)=>{
    if (!Array.isArray(previous)) previous = [previous];
    if (current === '.') return previous;
    if (current === '..') previous.pop();
    else if (current.length) previous.push(current);
    return previous;
  }).join('/');
}

function basename(path, ext) {
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

function dirname(path) {
  return path.split(/\//g).pop().join('/')
}

function extname(path) {
  var tmp = path.replace(/^[\.]+/, '');
  if (/\./.test(tmp)) return tmp.match(/\.[^.]*$/)[0];
  return '';
}

function format(options) {
  var {dir, root, base, name, ext} = options;
  var _dir = dir || root;
  var _base = base || `${name || ''}${/^\./.test(ext) ? '' : '.'}${ext || ''}`;

  return normalize(`${_dir}/${_base}`);
}

function isAbsolute(path) {
  return /^\//.test(path)
}

function parse(path) {
  var obj = {}, tmp;
  var components = path.split(/\//g)

  obj.base = components.pop();
  obj.dir = components.join('/');

  if (/^\//.test(obj.dir)) {
    obj.root = '/';
  }

  if (obj.base != undefined){
    tmp = obj.base.replace(/^[\.]+/, '');
    if (/\./.test(tmp)) {
      obj.ext = tmp.match(/\.[^.]*$/)[0];
      obj.name = obj.base.slice(0, -obj.ext.length);
    }else{
      obj.name = obj.base
    }
  }else{
    delete obj.base
  }

  return obj;
}

function resolve(segments) {
  var flat = segments.reduce((previous, current)=>{
    if (!Array.isArray(previous)) previous = [previous];
    if (Array.isArray(current)) Array.prototype.push.apply(previous, current);
    Array.prototype.push.call(previous, current);
    return previous;
  }).reduce((previous, current)=>{
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

class Path {
  normalize(path) {
    return normalize(path);   
  }
  basename(path, ext){
    return basename(normalize(path), ext);
  }

  dirname(path) {
    return dirname(normalize(path));
  }

  extname(path) {
    return extname(normalize(path))
  }

  format(options) {
    return format(options);
  }

  isAbsolute(path) {
    return isAbsolute(valid(path))
  }

  parse(path) {
    return parse(normalize(path))
  }

  resolve() {
    return resolve.call({}, Array.prototype.slice.call(arguments, 0));
  }
}

Object.setPrototypeOf(Path, new Path);

export default Path