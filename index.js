const isJSON = require('koa-is-json');
const typeset = require('tipograph').Replace;

/**
 * Expose `typesetter()`.
 */

module.exports = typesetter;

/**
 * Serve static files from `root`.
 *
 * @param {String} root
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

function typesetter(opts) {
  opts = opts || {};

  // options

  return function *typesetter(next){
    yield* next;

    var body = this.response.body;
    if (!body) return;
    if (isJSON(body)) body = this.body = JSON.stringify(body);

    typeof body.pipe === 'function'
      ? body.pipe(typeset.all(body))
      : (this.body = typeset.all(body))
  };
}
