import { useRoute } from 'vue-router';

/**
 * 解码
 * @param str
 */
function decode(str: string) {
  try {
    return decodeURIComponent(str);
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(false, `解码错误 "${str}", 保持原有输出`);
    }
  }
  return str;
}

/**
 * 编码
 * @param str
 */
function encode(str: string) {
  try {
    return encodeURIComponent(str);
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(false, `编码错误 "${str}", 保持原有输出`);
    }
  }
  return str;
}

/**
 * 解析参数
 * @param query
 */
function parseQuery(query: string) {
  const res = {} as Record<string, string | null | (string | null)[]>;

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach((param) => {
    const parts = param.replace(/\+/g, ' ').split('=');
    const key = decode(parts.shift() as string);
    const val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      (res[key] as (string | null)[]).push(val);
    } else {
      res[key] = [res[key] as string | null, val];
    }
  });

  return res;
}

function hasHash(path?: string) {
  if (path) {
    return path.includes('/#');
  }
  const { href } = window.location;
  return href.includes('/#');
}
/**
 * 获取地址栏hash部分
 */
function getHash(): string {
  let { href } = window.location;
  const index = href.indexOf('#');
  // 无效地址
  if (index < 0) return '';

  href = href.slice(index + 1);

  return href;
}

/**
 * 解析路径
 * @param path 地址
 */
function parsePath(path: string): {
  path: string;
  query: string;
  hash: string;
} {
  let query = '';

  if (!hasHash(path)) {
    const queryIndex = path.indexOf('?');

    if (queryIndex >= 0) {
      query = path.slice(queryIndex + 1);
      path = path.slice(0, queryIndex);
    }

    return {
      query,
      path,
      hash: '',
    };
  }

  let hash = '';

  const hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  const queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path,
    query,
    hash,
  };
}

const getRoute = () => {
  const route = useRoute();
  if (route) {
    return {
      path: route.path,
      query: route.query,
    };
  }
  const { path, query: _queryStr } = parsePath(
    hasHash()
      ? getHash()
      : window.location.pathname + window.location.search,
  );
  const query = parseQuery(_queryStr);

  return {
    query,
    path,
  };
};

export {
  getRoute,
  parseQuery,
  decode,
  encode,
  getHash,
  parsePath,

  hasHash,
};
