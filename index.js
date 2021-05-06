const Tilda = require('./Tilda')
const Api = require('./Api')

module.exports = function TildaConstructor (params) {
  // with dependency injection
  return new Tilda(new Api(params))
}
