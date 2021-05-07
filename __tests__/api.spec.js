const Api = require('../Api')

describe('Api class', () => {

  test('checkParams() method', () => {

    let api

    api = new Api({
      projectid: '111222',
      publickey: 'hash_publickey',
      secretkey: 'hash_secretkey'
    })
    expect(() => { api.checkParams() }).not.toThrow()

    api = new Api({
      projectid: '',
      publickey: 'hash_publickey',
      secretkey: 'hash_secretkey'
    })
    expect(() => { api.checkParams() }).toThrow()

    api = new Api({
      publickey: 'hash_publickey',
      secretkey: 'hash_secretkey'
    })
    expect(() => { api.checkParams() }).toThrow()

    api = new Api({
      projectid: '333333',
      publickey: '',
      secretkey: 'hash_secretkey'
    })
    expect(() => { api.checkParams() }).toThrow()

    api = new Api({
      projectid: '111222',
      publickey: 'hash_publickey'
    })
    expect(() => { api.checkParams() }).toThrow()

    api = new Api({
      projectid: '111222'
    })
    expect(() => { api.checkParams() }).toThrow()

    api = new Api({
      projectid: '',
      publickey: 'hash_publickey',
      secretkey: ''
    })
    expect(() => { api.checkParams() }).toThrow()

    api = new Api({
      secretkey: ''
    })
    expect(() => { api.checkParams() }).toThrow()

    api = new Api({})
    expect(() => { api.checkParams() }).toThrow()

    api = new Api()
    expect(() => { api.checkParams() }).toThrow()

    api = new Api({
      keyA: '111222',
      keyB: 'hash_publickey'
    })
    expect(() => { api.checkParams() }).toThrow()

    api = new Api({
      keyA: '111222',
      keyB: 'hash_publickey',
      secretkey: 'hash_secretkey'
    })
    expect(() => { api.checkParams() }).toThrow()

  })

  test('validateProjectData() method', () => {

    let api = new Api(), params

    params = {
      status: 'ERROR',
      message: 'Bad request line. Wrong publickey length',
      errorside: 'info'
    }
    expect(() => { api.validateProjectData(params) }).toThrow()

    params = {
      status: 'some_wrong_status',
      message: 'Bad request line. Wrong publickey length',
      errorside: 'info'
    }
    expect(() => { api.validateProjectData(params) }).toThrow()

    params = {
      status: 'FOUND',
      result: {
        images: [{ from: 'xxx', to: 'ccc' }],
        css: []
      }
    }
    expect(() => { api.validateProjectData(params) }).toThrow()

    params = {
      status: 'FOUND',
      result: {
        images: [{ from: 'xxx', to2: 'xxx' }],
        css: [{ from: 'xxx', to: 'xxx' }],
        js: [{ from1: 'xxx', to: 'xxx' }, { from: 'xxx', to: 'xxx' }]
      }
    }
    expect(() => { api.validateProjectData(params) }).toThrow()

    params = {
      status: 'FOUND',
      result: {
        images: [{ from: 'xxx', to: 'xxx' }],
        css: [{ from: 'xxx', to: 'xxx' }],
        js: [{ from: 'xxx', to: 'xxx' }, { from: 'xxx', to: 'xxx' }]
      }
    }
    expect(() => { api.validateProjectData(params) }).not.toThrow()

  })

})
