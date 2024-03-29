const Tilda = require('../Tilda')

describe('Tilda class', () => {

  test('createDirsIfNotExists() method', () => {
    const fs = require('fs')
    const path = require('path')
    const currDir = path.resolve(__dirname  + '/..')

    const tilda = new Tilda()
    tilda.createDirsIfNotExists()

    expect(() => { tilda.createDirsIfNotExists() }).not.toThrow()

    expect(fs.existsSync(`${currDir}/${tilda.tildaDir}`)).toBeTruthy()
    expect(fs.existsSync(`${currDir}/${tilda.tildaDir}/js`)).toBeTruthy()
    expect(fs.existsSync(`${currDir}/${tilda.tildaDir}/css`)).toBeTruthy()
    expect(fs.existsSync(`${currDir}/${tilda.tildaDir}/images`)).toBeTruthy()
  })

})
