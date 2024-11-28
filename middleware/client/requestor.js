const Marshaller = require("../marshaller");
const ClientRequestHandler = require("./crh/http");

class Requestor {
    constructor(address = 'localhost',port= 3001) {
      this.address = address;
      this.port = port;
    }
  
    sendRequest(methodName, params) {
      console.log('senRequest')
      const marshaller = new Marshaller();
      const request = marshaller.marshal(methodName, params);
      const clientRequestHandler = new ClientRequestHandler(this.address, this.port);
      console.log(this.address);
      console.log(this.port);
      return clientRequestHandler.send(request);
    }

    sendRequestLookup(methodName, params) {
      const marshaller = new Marshaller();
      const request = marshaller.marshal(methodName, params);
      const clientRequestHandler = new ClientRequestHandler(this.address, this.port);
      return clientRequestHandler.send(request);
    }
  }

module.exports = Requestor;