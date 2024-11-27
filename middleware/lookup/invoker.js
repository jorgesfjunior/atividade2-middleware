const ServerRequestHandler = require("./srh/udp");
const Marshaller = require("../marshaller");

class Invoker {
    constructor(service) {
      this.service = service;
    }

    handleRequest(request) {
      console.log("INVOKER" + request)
      const marshaller = new Marshaller();
      const { method, args } = marshaller.unmarshal(request);
      return this.service[method](...args);
    }

    run(){
      console.log("INVOKER: Inicializando o ServerRequestHandler...");

      const serverRequestHandler = new ServerRequestHandler(this.handleRequest.bind(this));
      serverRequestHandler.receive();
    }
  }

  module.exports = Invoker;
  