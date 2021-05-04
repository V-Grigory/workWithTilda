class Api {

  constructor(params) {
    if (!params) return;
    this.projectid = params.projectid;
    this.publickey = params.publickey;
    this.secretkey = params.secretkey;
  }

  checkParams() {
    if (!this.projectid || !this.publickey || !this.secretkey) {
      return {
        errors: 'When creating a tilda object, you must pass projectid, publickey and secretkey'
      }
    }
    return { errors: '' }
  }

}

module.exports = Api;
