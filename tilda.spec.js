describe('test Tilda class', () => {

  test('test createDirsIfNotExists() method', () => {
    const fs = require('fs');
    const path = require('path');
    const currDir = path.resolve(__dirname);

    const Tilda = require('./Tilda');
    const tilda = new Tilda();
    tilda.createDirsIfNotExists();

    expect(fs.existsSync(`${currDir}/tilda`)).toBeTruthy();
    expect(fs.existsSync(`${currDir}/tilda/js`)).toBeTruthy();
    expect(fs.existsSync(`${currDir}/tilda/css`)).toBeTruthy();
    expect(fs.existsSync(`${currDir}/tilda/images`)).toBeTruthy();
  })

});
