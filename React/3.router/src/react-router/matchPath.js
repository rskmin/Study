import { pathToRegexp } from 'path-to-regexp';

function compilePath(path, options) {
  const keys = [];
  const regexp = pathToRegexp(path, keys, options);
  return { keys, regexp };
}

/**
 * /post/:id
 */
function matchPath(pathname, options = {}) {
  let { path = '/', exact = false, strict = false, sensitive = false } = options;
  let { keys, regexp } = compilePath(path, {
    end: exact,
    strict,
    sensitive,
  });
  const match = regexp.exec(pathname);
  if (!match) return null;
  const [ url, ...values ] = match;
  const isExact = pathname === url;
  if (exact && !isExact) return null;
  return { /// 路由组件中的 props.match
    path, // 路由的path
    url,  // 匹配成功部分的url
    isExact,
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index];
      return memo;
    }, {}),
  }
}

export default matchPath;