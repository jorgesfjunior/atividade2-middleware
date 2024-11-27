const Requestor = require("./requestor");

class ClientProxy {

  constructor(address = 'localhost',port= 3001) {
    this.address = address;
    this.port = port;
    this.requestor = new Requestor(address,port);
  }


  createFile(...args){
    console.log('createFile client proxy');
    console.log(this.address)
    console.log(this.port)
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

  register(...args) {
    const methodName = 'register';
    return this.requestor.sendRequestLookup(methodName, args);
  }

  // Remove um método do lookup
  unregister(...args) {
    const methodName = 'unregister';
    return this.requestor.sendRequestLookup(methodName,args);
  }

  // Busca a implementação de um método
  resolve(...args) {
    const methodName = 'resolve';
    return this.requestor.sendRequestLookup(methodName,args);
  }

}

module.exports = ClientProxy;