const ServerRequestHandler = require("../server/srh/http");

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
  