const Tilda = require('./Tilda');
const Api = require('./Api');

module.exports = function (params) {
  return new Tilda(new Api(params))
};
