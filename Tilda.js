class Tilda {

  constructor(api) {
    this.api = api
  }

  checkApiParams() {

  }

  createDirsIfNotExists() {
    const fs = require('fs');
    const path = require('path');

    const currDir = path.resolve(__dirname);
    const needDirs = ['tilda', 'tilda/js', 'tilda/css', 'tilda/images'];

    needDirs.forEach(needDir => {
      if (!fs.existsSync(`${currDir}/${needDir}`)) {
        fs.mkdirSync(`${currDir}/${needDir}`, 0o744)
      }
    })
  }

  getProjectItselfData() {

  }

  getPageData() {

  }

  getPage(pageId) {
    this.checkProjectIdAndAccessKeys();
    this.createDirsIfNotExists();
    this.getProjectItselfData();
    this.getPageData();
  }

}


module.exports = Tilda;
