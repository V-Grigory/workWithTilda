const Tilda = require('./Tilda')
const Api = require('./Api')

module.exports = function TildaConstructor (apiParams) {

  // apiParams.getProjectDataMethod = 'getRejectedRequest'
  // apiParams.getProjectDataMethod = 'getResolvedWrongMockData'
  apiParams.getProjectDataMethod = 'getResolvedSuccessMockProjectData'
  // apiParams.getProjectDataMethod = 'sendRequestByHttp'

  // apiParams.getPageDataMethod = 'getRejectedRequest'
  // apiParams.getPageDataMethod = 'getResolvedWrongMockData'
  apiParams.getPageDataMethod = 'getResolvedSuccessMockPageData'
  // apiParams.getPageDataMethod = 'sendRequestByHttp'

  // with dependency injection
  return new Tilda(new Api(apiParams))
}
