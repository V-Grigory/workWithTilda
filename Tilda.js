const https = require('https')
const fs = require('fs')

class Tilda {

  constructor(api) {
    this.tildaDir = './tilda'
    this.api = api
    // this.getProjectDataMethod = 'getRejectedRequest'
    // this.getProjectDataMethod = 'getResolvedWrongMockData'
    // this.getProjectDataMethod = 'getResolvedSuccessMockData'
    this.getProjectDataMethod = 'sendRequestByHttp'
  }

  createDirsIfNotExists() {
    const needDirs = [
      this.tildaDir, `${this.tildaDir}/js`, `${this.tildaDir}/css`, `${this.tildaDir}/images`
    ]
    needDirs.forEach(needDir => {
      if (!fs.existsSync(needDir)) {
        try { fs.mkdirSync(needDir, 0o744) }
        catch (e) { throw new Error(e) }
      }
    })
  }

  setProjectData(projectData) {
    console.log('--- setProjectData ... ---')
    return new Promise((resolve, reject) => {

      let downloadFilePromises = [
          this.createFile(`${this.tildaDir}/.htaccess`, projectData.result.htaccess)
      ];

      ['images', 'css', 'js'].forEach(typeAsset => {
        projectData.result[typeAsset].forEach(asset => {
          downloadFilePromises.push(
            this.downloadFile(asset.from, `${this.tildaDir}/${typeAsset}/${asset.to}`)
          )
        })
      })
      Promise.all(downloadFilePromises)
          .then(() => resolve())
          .catch(errors => reject(errors))
    })
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

  downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
      console.log('--- downloadFile ... ---')
      // setTimeout(() => { return resolve() }, 1000)
      // setTimeout(() => reject(new Error(`Server responded with `)), 1000)

      // return;
      https.get(url, response => {

        if (response.statusCode === 200) {

          const file = fs.createWriteStream(dest, { flags: 'w' })

          response.pipe(file)

          file.on('error', error => {
            file.close()
            fs.unlink(dest, () => {})
            return reject(error)
          })

          file.on('finish', () => {
            file.close()
            return resolve()
          })

        } else {
          let error = `When downloadFile, tilda responded with `
          error += `${response.statusCode}: ${response.statusMessage}`
          return reject(new Error(error))
        }

      }).on('error', error => reject(error))

    })
  }

  createFile(pathAndNameFile, contentFile) {
    console.log('--- createFile ... ---')
    return new Promise((resolve, reject) => {
      fs.writeFile(pathAndNameFile, contentFile, error => {
        if (error) return reject(error)
        console.log('Saved!')
        return resolve()
      })
    })
  }

}

module.exports = Tilda
