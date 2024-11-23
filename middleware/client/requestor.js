const Marshaller = require("../marshaller");
const ClientRequestHandler = require("./crh/udp");

class Requestor {
    constructor() {
      this.clientRequestHandler = new ClientRequestHandler();
    }
  
    sendRequest(methodName, params) {
      const marshaller = new Marshaller();
      const request = marshaller.marshal(methodName, params);
      return this.clientRequestHandler.send(request);
    }
  }

module.exports = Requestor;