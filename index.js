const Tilda = require('./Tilda')
const Api = require('./Api')

module.exports = function TildaConstructor (apiParams) {

  // apiParams.getProjectDataMethod = 'getRejectedRequest'
  // apiParams.getProjectDataMethod = 'getResolvedWrongMockData'
  // apiParams.getProjectDataMethod = 'getResolvedSuccessMockData'
  apiParams.getProjectDataMethod = 'sendRequestByHttp'

  // with dependency injection
  return new Tilda(new Api(apiParams))
}
