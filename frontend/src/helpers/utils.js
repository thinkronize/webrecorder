
/**
 * Remove trailing slash
 * @param  {string} val url to modify
 * @return {string}     url without trailing slash
 */
export function rts(val) {
  return val.replace(/\/$/, '');
}

/**
 * Remove http/https from urls
 * @param  {string} val url to modify
 * @return {string}     url without protocol
 */
export function stripProtocol(url) {
  return url.replace(/https?:\/\//i, '');
}

export function addTrailingSlash(url) {
  if (url.match(/^https?\:\/\/[\w-.]+$/)) {
    url += '/';
  }
  return url;
}

export function fixMalformedUrls(url) {
  if (!url.match(/^https?:\/\//)) {
    const malformed = url.match(/^([https]+)?[:/]{1,3}/i);
    url = `http://${url.substr(malformed ? malformed[0].length : 0)}`;
  }
  return url;
}

export function isSafari() {
  return navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1;
}

export function isMS() {
  if (/(MSIE|Edge|rv:11)/i.test(navigator.userAgent)) {
    return true;
  }

  return false;
}

export function remoteBrowserMod(rb, ts, sep) {
  let base = ts || '';
  if (rb) {
    base += `$br:${rb}`;
  }
  if (base && sep) {
    base += sep;
  }
  return base;
}
