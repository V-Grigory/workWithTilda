class Tilda {

  constructor() {

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

  getProjectData() {

  }

  loadAll() {
    this.createDirsIfNotExists();
    this.getProjectData();
    console.log('completed')
  }
}


module.exports = Tilda;
