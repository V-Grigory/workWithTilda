class Tilda {

  constructor() {

  }

  createDirsIfNotExists() {
    const fs = require('fs');
    const path = require("path");

    const jsDir = `${path.resolve(__dirname)}/js`;
    const cssDir = `${path.resolve(__dirname)}/css`;
    const imagesDir = `${path.resolve(__dirname)}/images`;

    if (!fs.existsSync(jsDir)) fs.mkdirSync(jsDir, 0o744);
    if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir, 0o744);
    if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, 0o744);
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
