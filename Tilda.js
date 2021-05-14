const https = require('https')
const fs = require('fs')

class Tilda {

  constructor(api) {
    this.tildaDir = './tilda'
    this.api = api
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
    return new Promise((resolve, reject) => {

      let filePromises = [
          this.createFile(`${this.tildaDir}/.htaccess`, projectData.result.htaccess)
      ];

      ['images', 'css', 'js'].forEach(typeAsset => {
        projectData.result[typeAsset].forEach(asset => {
          filePromises.push(
            this.downloadFile(asset.from, `${this.tildaDir}/${typeAsset}/${asset.to}`)
          )
        })
      })
      Promise.all(filePromises)
          .then(() => resolve())
          .catch(errors => reject(errors))
    })
  }

  setPageData(pageData) {
    return new Promise((resolve, reject) => {
      // console.log('setPageData')
      // return resolve()
      // return reject(new Error('errors setPageData'))

      let filePromises = [
        this.createFile(
            `${this.tildaDir}/${pageData.result.filename}`,
            pageData.result.html
        )
      ]

      pageData.result.images.forEach(asset => {
        filePromises.push(
            this.downloadFile(asset.from, `${this.tildaDir}/images/${asset.to}`)
        )
      })
      Promise.all(filePromises)
          .then(() => resolve())
          .catch(errors => reject(errors))
    })
  }

  downloadPage(pageId) {
    return new Promise((resolve, reject) => {

      try { this.checkPageId(pageId) }
      catch (e) { return reject(e) }

      try { this.api.checkParams() }
      catch (e) { return reject(e) }

      try { this.createDirsIfNotExists() }
      catch (e) { return reject(e) }

      let projectData = this.api.getProjectData().then(v => this.setProjectData(v))
      let pageData = this.api.getPageData(pageId).then(v => this.setPageData(v))

      Promise.all([projectData, pageData])
          .then(() => resolve())
          .catch(errors => reject(errors))
    })
  }

  checkPageId(pageId) {
    if (!pageId) throw new Error('does not exist pageId')
    if (isNaN(pageId)) throw new Error('pageId is not a number')
    if (typeof pageId !== 'number') throw new Error('pageId is not a number')
  }

  downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
      // setTimeout(() => { return resolve() }, 1000)
      // setTimeout(() => reject(new Error(`Server responded with `)), 1000)
      // return resolve()

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
    return new Promise((resolve, reject) => {
      fs.writeFile(pathAndNameFile, contentFile, error => {
        if (error) return reject(error)
        return resolve()
      })
    })
  }

}

module.exports = Tilda
