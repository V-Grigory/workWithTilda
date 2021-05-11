class Tilda {

  constructor(api) {
    this.tildaDir = 'tilda'
    this.api = api
    // this.getProjectDataMethod = 'getRejectedRequest'
    // this.getProjectDataMethod = 'getResolvedWrongMockData'
    this.getProjectDataMethod = 'getResolvedSuccessMockData'
    // this.getProjectDataMethod = 'sendRequestByHttp'
  }

  createDirsIfNotExists() {
    const fs = require('fs')

    const currDir = '.'
    const needDirs = [
      this.tildaDir, `${this.tildaDir}/js`, `${this.tildaDir}/css`, `${this.tildaDir}/images`
    ]

    needDirs.forEach(needDir => {
      if (!fs.existsSync(`${currDir}/${needDir}`)) {
        try {
          fs.mkdirSync(`${currDir}/${needDir}`, 0o744)
        } catch (e) {
          throw new Error(e)
        }
      }
    })
  }

  setProjectData(projectData) {
    try {
      console.log('--- setProjectData ... ---')
      //console.log(projectData)
      console.log(projectData.result.title)
      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  }

  setPageData() {
    // console.log('444444444')
    // return Promise.resolve('resolve setPageData')
    // return Promise.reject('reject setPageData')
  }

  downloadPage(pageId) {
    return new Promise((resolve, reject) => {

      try { this.api.checkParams() }
      catch (e) { return reject(e) }

      try { this.createDirsIfNotExists() }
      catch (e) { return reject(e) }

      let projectData = this.api.getProjectData(this.getProjectDataMethod).then(v => {
        return this.setProjectData(v)
      })
      // let pageData = this.api.getPageData(pageId).then(v => this.setPageData(v))

      Promise.all([projectData, /*pageData*/])
          .then(() => resolve())
          .catch(errors => reject(errors))
    })
  }

}

module.exports = Tilda
