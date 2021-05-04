class Tilda {

  constructor(api) {
    this.api = api
  }

  createDirsIfNotExists() {
    const fs = require('fs');

    const currDir = '.';
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
    return new Promise((resolve, reject) => {

      let errors = this.api.checkParams().errors;
      if (errors) return reject(errors);

      this.createDirsIfNotExists();
      // this.getProjectItselfData();
      // this.getPageData();

      return resolve()
    })
  }

}


module.exports = Tilda;
