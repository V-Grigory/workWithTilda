const http = require('http')

class Api {

  constructor(params) {
    if (!params) return
    this.projectid = params.projectid
    this.publickey = params.publickey
    this.secretkey = params.secretkey
    this.getProjectDataMethod = params.getProjectDataMethod
    this.getPageDataMethod = params.getPageDataMethod
  }

  checkParams() {
    if (!this.projectid || !this.publickey || !this.secretkey) {
      throw new Error('When creating a tilda object, ' +
          'you must pass projectid, publickey and secretkey')
    }
  }

  getProjectData() {
    return new Promise((resolve, reject) => {

      let url = `http://api.tildacdn.info/v1/getprojectexport/`
      url += `?publickey=${this.publickey}`
      url += `&secretkey=${this.secretkey}`
      url += `&projectid=${this.projectid}`

      this[this.getProjectDataMethod](url).then(res => {

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

      let url = `http://api.tildacdn.info/v1/getpageexport/`
      url += `?publickey=${this.publickey}`
      url += `&secretkey=${this.secretkey}`
      url += `&pageid=${pageId}`

      this[this.getPageDataMethod](url).then(res => {

        try {
          this.validatePageData(res)
          resolve(res)
        }
        catch (e) { return reject(e) }

      }).catch(e => {
        reject(e)
      })
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

  getResolvedSuccessMockProjectData() {
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

  getResolvedSuccessMockPageData() {
    return Promise.resolve({
      status: "FOUND",
      result: {
        title: "Культиваторы SOLAR FIELDS вышли на новый уровень",
        filename: "page19509131.html",
        images: [
          {
            from: "https://static.tildacdn.com/tild3730-6534-4562-a135-373335393161/_.jpg",
            to: "tild3730-6534-4562-a135-373335393161___.jpg"
          },
          {
            from: "https://static.tildacdn.com/tild6462-3832-4130-b534-336166626133/_.jpg",
            to: "tild6462-3832-4130-b534-336166626133___.jpg"
          }
        ],
        html: "HTML content"
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

  validatePageData(pageData) {
    if (pageData.status === 'ERROR') {
      throw new Error(`validatePageData -> ${pageData.message}`)
    }
    if (pageData.status !== 'FOUND') {
      throw new Error('validatePageData -> status is not "FOUND"')
    }
    if (!pageData.result) {
      throw new Error(`validatePageData -> does not exist result`)
    }
    if (!pageData.result.title) {
      throw new Error(`validatePageData -> does not exist result.title`)
    }
    if (!pageData.result.filename) {
      throw new Error(`validatePageData -> does not exist result.filename`)
    }
    if (!pageData.result.html) {
      throw new Error(`validatePageData -> does not exist result.html`)
    }
    let errMsg = `validatePageData -> not isset data in result.images`
    if (!pageData.result.images) throw new Error(errMsg)
    if (!pageData.result.images.length) throw new Error(errMsg)
    pageData.result.images.forEach(v => {
      if (!v.from || !v.to) throw new Error(errMsg)
    })
  }

}

module.exports = Api
