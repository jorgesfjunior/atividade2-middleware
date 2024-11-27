const ClientRequestHandler = require("./crh/udp");
const Marshaller = require('../marshaller');

class ClientProxy {

  constructor() {
    this.clientRequestHandler = new ClientRequestHandler();
  }

  sendRequest(methodName, args) {
    const marshaller = new Marshaller();
    const request = marshaller.marshal(methodName, args);
    return this.clientRequestHandler.send(request);
  }


  register(...args) {
    const methodName = 'register';
    return this.sendRequest(methodName, args);
  }

  // Remove um método do lookup
  unregister(...args) {
    const methodName = 'unregister';
    return this.sendRequest(methodName,args);
  }

  // Busca a implementação de um método
  resolve(...args) {
    const methodName = 'resolve';
    return this.sendRequest(methodName,args);
  }

}

module.exports = ClientProxy;