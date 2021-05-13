const http = require('http')

class Api {

  constructor(params) {
    if (!params) return
    this.projectid = params.projectid
    this.publickey = params.publickey
    this.secretkey = params.secretkey
  }

  checkParams() {
    if (!this.projectid || !this.publickey || !this.secretkey) {
      throw new Error('When creating a tilda object, ' +
          'you must pass projectid, publickey and secretkey')
    }
  }

  getProjectData(getProjectDataMethod) {
    return new Promise((resolve, reject) => {

      let url = `http://api.tildacdn.info/v1/getprojectexport/`
      url += `?publickey=${this.publickey}`
      url += `&secretkey=${this.secretkey}`
      url += `&projectid=${this.projectid}`

      this[getProjectDataMethod](url).then(res => {

        try {
          this.validateProjectData(res)
          resolve(res)
        }
        catch (e) { return reject(e) }

      }).catch(e => {
        reject(e)
      })
    })
  }

  getPageData(pageId) {
    return new Promise((resolve, reject) => {
      console.log('2222222')
      return resolve()
      return reject('errors getPageData')
    })
  }

  getRejectedRequest() {
    return Promise.reject(new Error('getRejectedRequest'))
  }

  getResolvedWrongMockData() {
    return Promise.resolve({
      status: 'ERROR',
      message: 'Bad request line. Wrong publickey length',
      errorside: 'info'
    })
  }

  getResolvedSuccessMockData() {
    return Promise.resolve({
      status: "FOUND",
      result: {
        title: 'test Title',
        images: [
          {
            from: "https://static.tildacdn.com/img/tildafavicon.ico",
            to: "tildafavicon.ico"
          }
        ],
        css: [
          {
            from: "https://static.tildacdn.com/css/tilda-grid-3.0.min.css",
            to: "tilda-grid-3.0.min.css"
          },
          {
            from: "https://tilda.ws/project627900/tilda-blocks-2.12.css",
            to: "tilda-blocks-2.12.css"
          }
        ],
        js: [
          {
            from: "https://static.tildacdn.com/js/jquery-1.10.2.min.js",
            to: "jquery-1.10.2.min.js"
          },
          {
            from: "https://static.tildacdn.com/js/tilda-scripts-2.8.min.js",
            to: "tilda-scripts-2.8.min.js"
          }
        ],
        htaccess: "DirectoryIndex page2755600.html RewriteEngine On "
      }
    })
  }

  sendRequestByHttp(url) {
    return new Promise((resolve, reject) => {
      let data = ''
      http.get(url, resp => {

        resp.on('data', chunk => data += chunk)
        resp.on('end', () => resolve(JSON.parse(data)))

      }).on('error', error => reject(error))
    })
  }

  validateProjectData(projectData) {
    if (projectData.status === 'ERROR') {
      throw new Error(`validateProjectData -> ${projectData.message}`)
    }
    if (projectData.status !== 'FOUND') {
      throw new Error('validateProjectData -> status is not "FOUND"')
    }
    if (!projectData.result) {
      throw new Error(`validateProjectData -> does not exist result`)
    }
    if (!projectData.result.htaccess) {
      throw new Error(`validateProjectData -> does not exist result.htaccess`)
    }
    ['images', 'css', 'js'].forEach(asset => {
      let errMsg = `validateProjectData -> not isset data in result.${asset}`
      if (!projectData.result[asset]) throw new Error(errMsg)
      if (!projectData.result[asset].length) throw new Error(errMsg)
      projectData.result[asset].forEach(v => {
        if (!v.from || !v.to) throw new Error(errMsg)
      })
    })
  }

}

module.exports = Api
