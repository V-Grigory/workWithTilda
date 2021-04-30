describe('test createDirsIfNotExists()', () => {

  test('test 1', () => {
    const fs = require('fs');
    const path = require('path');
    const currDir = path.resolve(__dirname);

    const Tilda = require('./index');
    const tilda = new Tilda();
    tilda.createDirsIfNotExists();

    expect(fs.existsSync(`${currDir}/tilda`)).toBeTruthy();
    expect(fs.existsSync(`${currDir}/tilda/js`)).toBeTruthy();
    expect(fs.existsSync(`${currDir}/tilda/css`)).toBeTruthy();
    expect(fs.existsSync(`${currDir}/tilda/images`)).toBeTruthy();
  })

});
