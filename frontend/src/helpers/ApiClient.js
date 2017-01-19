import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  if (__SERVER__) {
    // on the server use internal network
    return `http://${config.internalApiHost}:${config.internalApiPort}${config.apiPath}${adjustedPath}`;
  }
  // client side use external network
  return `${__DEVELOPMENT__ ? '' : config.prodApi}${config.apiPath}${adjustedPath}`;
}

export default class ApiClient {
  constructor(req) {
    // eslint-disable-next-line no-return-assign
    methods.forEach(method =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        console.log('requesting', formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          console.log('sending data..', data);
          request.send(data);
        }
        // eslint-disable-next-line no-confusing-arrow
        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {} // eslint-disable-line class-methods-use-this
}
