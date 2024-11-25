const Marshaller = require("../marshaller");
const ServerRequestHandler = require("../server/srh/tcp");

class Invoker {
    constructor(service) {
      this.service = service;
    }
    
    run(){
      const serverRequestHandler = new ServerRequestHandler(this.service);
      serverRequestHandler.receive();
    }
  }

  module.exports = Invoker;
  