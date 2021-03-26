/*******************************************************************************
 * @author      : 程巍巍 (littocats@gmail.com)
 * @created     : Thursday Mar 25, 2021 11:12:30 CST
 *
 * @description : index
 *
 ******************************************************************************/

function _normalize(path: string) {
  const components: string[] = [];
  for (const component of `${path}`.split(/\/+/g)) {
    if (component == '.') {
    } else if (component == '..') {
      components.pop();
    } else {
      components.push(component);
    }
  }
  let normalized = (
    (path.startsWith('/') ? '/' : '') + components.join('/')
  ).replace(/\/\/+/g, '/');
  return normalized || '.';
}

function _basename(path: string, ext: string) {
  const basename = path.split(/\//g).pop();
  if (ext) {
    const tmp = basename!.split(/\./g);
    const _ext = tmp.pop();
    if (ext === _ext || ext.slice(1) === _ext) {
      return tmp.join('.');
    }
  }
  return basename;
}

function _dirname(path: string) {
  return path.split(/\//g).slice(0, -1).join('/');
}

function _extname(path: string) {
  const tmp = path.replace(/^[\.]+/, '');
  if (/\./.test(tmp)) {
    return tmp.match(/\.[^.]*$/)![0];
  }
  return '';
}

type PathOptions = {
  dir?: string;
  root?: string;
  base?: string;
  name?: string;
  ext?: string;
};
function _format(options: PathOptions) {
  const {dir, root, base, name, ext} = options;
  const _dir = dir || root;
  const _base =
    base || `${name || ''}${ext && /^\./.test(ext) ? '' : '.'}${ext || ''}`;
  return _normalize(`${_dir}/${_base}`);
}

function _isAbsolute(path: string) {
  return /^\//.test(path);
}

function _parse(path: string) {
  const options: PathOptions = {};
  const components = path.split(/\//g);
  options.base = components.pop();
  options.dir = components.join('/');
  if (/^\//.test(options.dir)) {
    options.root = '/';
  }
  if (options.base != undefined) {
    const tmp = options.base.replace(/^[\.]+/, '');
    if (/\./.test(tmp)) {
      options.ext = tmp.match(/\.[^.]*$/)![0];
      options.name = options.base.slice(0, -options.ext!.length);
    } else {
      options.name = options.base;
    }
  } else {
    delete options.base;
  }
  return options;
}
type Segment = string | string[] | Segment[];
function _flatten(segment: Segment): string[] {
  if (!Array.isArray(segment)) {
    return [segment];
  }
  let flatten: string[] = [];
  for (const seg of segment) {
    flatten = flatten.concat(_flatten(seg));
  }
  return flatten;
}
function _resolve(...segments: Segment[]) {
  const flatten = _flatten(segments).reduce((previous, current) => {
    if (/^\//.test(current)) {
      return current;
    }
    return `${previous}/${current}`;
  });
  return _normalize(flatten);
}

function _relative(base: string, path: string) {
  const _base = base.split(/\//g);
  const _path = path.split(/\//g);

  while (_base[0] === _path[0]) {
    _base.shift();
    _path.shift();
  }

  return Array(base.length).fill('..').concat(path).join('/');
}

export const normalize = _normalize;
export const basename = (path: string, ext: string) =>
  _basename(_normalize(path), ext);
export const dirname = (path: string) => _dirname(_normalize(path));
export const extname = (path: string) => _extname(_normalize(path));
export const format = _format;
export const parse = (path: string) => _parse(_normalize(path));
export const resolve = _resolve;
export const relative = (base: string, path: string) =>
  _relative(_normalize(base), _normalize(path));
export const isAbsolute = _isAbsolute;

export default {
  normalize,
  basename,
  dirname,
  extname,
  parse,
  format,
  resolve,
  relative,
  isAbsolute,
};
