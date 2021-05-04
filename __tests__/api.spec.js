const Api = require('../Api');

describe('Api class', () => {

  test('checkParams() method', () => {

    let api;
    let errorMessage = 'When creating a tilda object, you must pass ' +
        'projectid, publickey and secretkey';

    api = new Api({
      projectid: '111222',
      publickey: 'hash_publickey',
      secretkey: 'hash_secretkey'
    });
    expect(api.checkParams().errors).toBe('');

    api = new Api({
      projectid: '',
      publickey: 'hash_publickey',
      secretkey: 'hash_secretkey'
    });
    expect(api.checkParams().errors).toBe(errorMessage);

    api = new Api({
      publickey: 'hash_publickey',
      secretkey: 'hash_secretkey'
    });
    expect(api.checkParams().errors).toBe(errorMessage);

    api = new Api({
      projectid: '333333',
      publickey: '',
      secretkey: 'hash_secretkey'
    });
    expect(api.checkParams().errors).toBe(errorMessage);

    api = new Api({
      projectid: '111222',
      publickey: 'hash_publickey'
    });
    expect(api.checkParams().errors).toBe(errorMessage);

    api = new Api({
      projectid: '111222'
    });
    expect(api.checkParams().errors).toBe(errorMessage);

    api = new Api({
      projectid: '',
      publickey: 'hash_publickey',
      secretkey: ''
    });
    expect(api.checkParams().errors).toBe(errorMessage);

    api = new Api({
      secretkey: ''
    });
    expect(api.checkParams().errors).toBe(errorMessage);

    api = new Api({});
    expect(api.checkParams().errors).toBe(errorMessage);

    api = new Api();
    expect(api.checkParams().errors).toBe(errorMessage);

    api = new Api({
      keyA: '111222',
      keyB: 'hash_publickey'
    });
    expect(api.checkParams().errors).toBe(errorMessage);

    api = new Api({
      keyA: '111222',
      keyB: 'hash_publickey',
      secretkey: 'hash_secretkey'
    });
    expect(api.checkParams().errors).toBe(errorMessage);

  })

});
