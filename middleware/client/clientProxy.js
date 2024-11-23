const Requestor = require("./requestor");

class ClientProxy {

  constructor() {
    this.requestor = new Requestor();
  }


  createFile(...args){
    const methodName = "createFile"
    return this.requestor.sendRequest(methodName, args);
  }

  updateFile(...args){
    const methodName = "attFile"
    return this.requestor.sendRequest(methodName, args);
  }

  deleteFile(...args){
    const methodName = "deleteFile"
    return this.requestor.sendRequest(methodName, args);
  }

  // invoke(methodName, ...args) {
  //  return this.requestor.sendRequest(methodName, args);
  //}
}

module.exports = ClientProxy;